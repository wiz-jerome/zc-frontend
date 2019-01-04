<!--视频观看完毕弹出问卷-->
<template>
    <div style="text-align: left;position: relative;left: 0;top: 0;overflow:hidden;">
        <div style="border-radius:.32rem;background:#ffffff;overflow:hidden;">
            <div class="questionWrapper" ref="questionWrapper" style="height: 60vh;overflow-x: hidden;border-radius:.32rem; ">
                <ul class="content" ref="content" style="padding: .8rem;">
                    <li v-for="(item,i) in question" :key="i">
                        <p class="font-40 f-1b mg-b20">
                            <span class="f-base" v-if="item.questionType == 0">单选</span>
                            <span class="f-base" v-if="item.questionType != 0">多选</span>
                            {{item.name}}</p>
                        <div class="font-28 f-1b mg-b20" style="line-height:1.2rem;" v-for="(answer,j) in item.answerList" :key="j" @click="checkAnswer(i,j)" v-if="item.questionType == 0">
                            <div class="selectIdot" v-if="j != item.checking"></div>
                            <div class="selectIdot chosed" v-if="j == item.checking"></div>
                            <span>{{answer.name}}</span>
                        </div>
                        <div class="font-28 f-1b mg-b20" style="height:1.2rem;" v-for="(answer,j) in item.answerList" :key="j" @click="checkMultiselect(i,j+'')" v-if="item.questionType != 0">
                            <div class="checkIdot" v-if="item.checking.indexOf(j+'')==-1"></div>
                            <div class="checkIdot chosed" v-if="item.checking&&item.checking.indexOf(j+'')!=-1"></div>
                            <span>{{answer.name}}</span>
                        </div>
                        <div class="line1px" v-if="i!==question.length-1"></div>
                    </li>
                </ul>
            </div>
            <div style="padding:.4rem 0;" class="tc">
                <a class="sureBtn" @click="commitQuestionActivity">提交</a>
            </div>
        </div>
        <!-- 问卷非必填才显示底部X号 -->
        <div style="text-align: center" v-if="result.questionRequest !== 1"> 
            <img @click="closeDialog" src="../assets/image/alert-question-close.png" style="width: 45px;margin-top: 15px;"/>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .sureBtn{
        width: 260/50rem;
        height: 80/50rem;
        background: #000000;
        color: #ffffff;
        text-align: center;
        line-height:80/50rem;
        display: block;
        border-radius: 40/50rem;
        margin:0 auto;
        font-size:36/50rem;
    }
</style>
<script>
    import {Scroller} from 'vux'
    import http from '@/axios'
    import Vue from 'vue'
    import store from '@/store'
	//better-scroll 弹力滑动
	import BScroll from 'better-scroll'
    export default {
        name:"dialoguestionnaire",
        props:['result','callback','questionRequest'],
        data(){
            return {
                question:null,
                info:{},
            }
        },
        mounted(){
        	//数据加载完成之后获取容器content高度
			this.$nextTick(() => { 
//				setTimeout(() => {
					this.scroll = new BScroll(this.$refs.questionWrapper,{
						click:true,//允许点击子元素
					})
//				},20)
			})
        },
        methods:{
            checkAnswer(i,j){
                this.question[i].checking = j;
            },
            checkMultiselect(i,j){
                if(this.question[i].checking.indexOf(j)==-1){
                    this.question[i].checking+= `,${j}`;
                }else{
                    this.question[i].checking =  this.question[i].checking.replace(new RegExp(`,${j}`,'g'),'');
                }
            },
            
            // 关闭问卷弹窗，提交提交问卷[]没有答案
            closeDialog(){
                http.submitQuestion(this.$route.query.id,[],(response)=>{
                    this.$emit('closeDialog')
                    this.callback(2);//问卷状态：0待回答 1已完成 2已取消
                })
            },
             // 提交问卷答案
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
                            var tmpIndex = arr[k];
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

                http.submitQuestion(this.$route.query.id,param
                ,(response)=>{
                    // Vue.$vux.toast.show({text:"提交成功"});
                    // this.$emit("listenToChildEvent");
                    this.callback(1);//问卷状态：0待回答 1已完成 2已取消
                })
            }
        },
        components:{
            Scroller
        },
        created(){
            var self = this;
            if(this.result.questionId) {
                http.getQuestionList(this.result.questionId,(response)=>{
                    store.commit('HTTP_LOADING', {httpLoading:false})
                    for(var i = 0;i<response.data.questionList.length;i++){
                        response.data.questionList[i].checking = "t";
                    }

                    self.question = response.data.questionList;
                    self.info = {
                        name:response.data.name,
                        content:response.data.content,
                        kid:response.data.kid
                    };
                })
            }
        }
    }
</script>