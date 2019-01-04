<template>
    <!--<scroller lock-x :scrollbar-y="false" ref="scroller" class="animated fadeInRight height-55vh">-->
        <div class="row " style="padding-bottom: 10px">
            <div class="activity-tab-header">{{result.activityForm===4?'竞猜答题':'问卷答题'}}</div>
            <div class="activity-box" v-for="(item,i) in question" :key="i">
                <p class="font-14 f-black title">{{item.name}}</p>
                <div class="font-14 f-dark" style="line-height: 20px;" v-for="(answer,j) in item.answerList" :key="j" @click="checkAnswer(i,j)" v-if="item.questionType == 0">
                    <div class="noChoose choose" style="border-radius: 50% ;" v-if="j != item.checking"></div>
                    <div class="hadChoose choose" style="border-radius: 50% ;" v-if="j == item.checking"></div>
                    <span>{{answer.name}}</span>
                </div>
                <div class="font-14 f-dark" style="line-height: 20px;" v-for="(answer,j) in item.answerList" :key="j" @click="checkMultiselect(i,j+'')" v-if="item.questionType != 0">
                    <div class="noChoose choose" style="border-radius: 4px ;" v-if="item.checking.indexOf('n'+j+'n')==-1"></div>
                    <div class="hadChoose choose" style="border-radius: 4px ;" v-if="item.checking&&item.checking.indexOf('n'+j+'n')!=-1"></div>
                    <span>{{answer.name}}</span>
                </div>
            </div>
            <a @click="commitQuestionActivity" class="sure-btn mg-b15" v-if="result.activityStatus == 0">提交活动</a>
        </div>
    <!--</scroller>-->
</template>
<style scoped lang="less">
    .activity-box {
        padding: 40/50rem 40/50rem 5/50rem 40/50rem;
        margin-bottom: 10px;
        .title {
            font-size: 30/50rem;
            font-weight: bold;
            color: #4A4A4A;
            line-height: normal;
            margin-bottom: 20/50rem;
        }
        .f-dark {
            margin-bottom: 40/50rem;
            line-height: normal !important;
            font-size: 28/50rem;
            color: #4A4A4A;
            display: flex;
            align-items: center;
            .choose {
                display: inline-block;
                width: 28/50rem;
                height: 28/50rem;
                /*vertical-align: sub;*/
            }
            .noChoose {
                border: 1px solid #979797;
            }
            .hadChoose {
                border: 1px solid #FBC873;
                background: #FFD795;
            }
            span {
                margin-left: 20/50rem;
            }
        }
    }
</style>
<script>
    import {Scroller} from 'vux'
    import http from '@/axios'
    import store from '../store'
    import Vue from 'vue'

    export default {
        name:"activity-questionnaire",
        props:['result'],
        data(){
            return {
                question:null,
                info:{},
            }
        },
        methods:{
            checkAnswer(i,j){
                if(this.result.activityStatus == 4){
                    return;
                }

                this.question[i].checking = j;
            },
            checkMultiselect(i,j){
                if(this.result.activityStatus == 4){
                    return;
                }

                if(this.question[i].checking.indexOf('n'+j+'n')==-1){
                    this.question[i].checking+= ',n'+j+'n';
                }else{
                    this.question[i].checking =  this.question[i].checking.replace(new RegExp(',n'+j+'n','g'),'');
                }
            },
            commitQuestionActivity(){
                var param = [];
                for(var i = 0;i<this.question.length;i++){
                    var question = this.question[i];
                    if(question.checking == "t"){
                        Vue.$vux.toast.show({text:"请填写完所有问题再提交",type:"cancel"});
                        return;
                    }

                    var index = question.checking;
                    if(question.questionType == 0){
                        var tmp = {
                            questionId:question.kid,
                            questionName:question.name,
                            questionType:question.questionType,
                            answerId:question.answerList[index].kid,
                            answerName:question.answerList[index].name,
                            answerType:question.answerList[index].type,
                            questionnaireName:this.info.name,
                            questionnaireId:this.info.kid
                        };
                        param.push(tmp);
                    }else{
                        var arr = index.split(",");
                        for(var k = 1;k<arr.length;k++){
                            var tmpIndex = arr[k].slice(1,arr[k].length-1);
                            var tmp = {
                                questionId:question.kid,
                                questionName:question.name,
                                questionType:question.questionType,
                                answerId:question.answerList[tmpIndex].kid,
                                answerName:question.answerList[tmpIndex].name,
                                answerType:question.answerList[tmpIndex].type,
                                questionnaireName:this.info.name,
                                questionnaireId:this.info.kid
                            };
                            param.push(tmp);
                        }
                    }
                }

                var self = this;
                var status;
                http.submitQuestionActivity(this.$route.query.id,{
                    userQuestionnaireRefDtos:param
                },(response)=>{
                    if(response.code?response.code===6001:false) {
                        Vue.$vux.confirm.show({
                            title: '',
                            content: '您的个人标签已超过最大数量上限(50)，不能将您本次选择的标签存入，是否继续？',

                            onCancel () {
                                Vue.$vux.confirm.hide();
                            },
                            onConfirm () {
                                http.submitQuestionActivity(self.$route.query.id,Object.assign({
                                    userQuestionnaireRefDtos:param
                                }, {isTrue:1}),(response)=>{
                                    if( (self.result.activityForm==1 || self.result.activityForm==2 || self.result.activityForm==4) && self.result.activityType !=2 ){

                                        status = 4;
                                        self.animateGetMoney();
                                    }
                                    else if(self.result.activityType ==2 && (self.result.activityForm==1 || self.result.activityForm==2 || self.result.activityForm==4)) {
                                        status = 2;
                                        store.commit('GET_MONEY_BTN',true)
                                    }
                                    store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus: status})
                                })
                            }
                        });
                    }else{
                        if( (self.result.activityForm==1 || self.result.activityForm==2 || self.result.activityForm==4) && self.result.activityType !=2 ){

                            status = 4;
                            self.animateGetMoney();
                        }
                        else if(self.result.activityType ==2 && (self.result.activityForm==1 || self.result.activityForm==2 || self.result.activityForm==4)) {
                            status = 2;
                            store.commit('GET_MONEY_BTN',true)
                        }
                        store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus: status})
                    }
                })
            },
            animateGetMoney(){
                store.commit('GET_MONEY',true);
                setTimeout(()=>{
                    store.commit('GET_MONEY',false)
                },2000)
            },
        },
        components:{
            Scroller
        },
        created(){
            var self = this;
            http.getQuestionList(this.result.questionId,(response)=>{
                for(var i = 0;i<response.data.questionList.length;i++){
                    response.data.questionList[i].checking = "t";
                }
                self.question = response.data.questionList;
                self.info = {
                    name:response.data.name,
                    kid:response.data.kid
                };

                if(self.result.activityStatus == 4){
                    http.getQuestionResult(self.result.questionId,(response)=>{
                        var answerResult =response.data;
                        for(var i = 0;i<self.question.length;i++){
                            for(var j = 0;j<answerResult.length;j++){
                                if(answerResult[j].questionId == self.question[i].kid){
                                    for(var k = 0;k<self.question[i].answerList.length;k++){
                                        if(self.question[i].answerList[k].kid == answerResult[j].answerId){
                                            if(self.question[i].questionType != 0){
                                                self.question[i].checking+=`,${k}`;
                                            }else{
                                                self.question[i].checking = `${k}`;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })
                }
            })
        }
    }
</script>