<template>
    <div v-if="!isH5">
        <div v-if="!result.join&&result.online == 1" class="mg-t15" style="padding-bottom: 1.5rem;">
            <!-- 报名活动 -->
            <div class="activity-box font-14 f-black zc-activity-rule-box">
                <img v-if="agreeRule" src="../assets/image/check-in.png" class="activity-icon" @click="clickRule">
                <img v-if="!agreeRule" src="../assets/image/check-out.png" class="activity-icon"  @click="clickRule">
                <span>同意活动条款</span>
            </div>
            <!--<div class="btn-box">-->
            <!--</div>-->
            <a class="sure-btn mg-b15 btn" @click="joinActivity">报名参与</a>
        </div>
        <!-- online:活动进行状态0未开始，1进行中 2已结束 -->
        <div ref="tijiao" v-if="activityStatus!=5&&result.join&&result.online == 1&&result.activityForm!=2&&result.activityForm!=4&&result.activityType!=1&&(result.activityStatus==0||result.activityStatus==3)">
            <router-link v-if="result.activityForm == 0" class="sure-btn mg-b15 btn" :to="{path:'/activity/commitoffline',query:{id:id}}">提交活动</router-link>
            <a v-if="result.activityForm != 0" @click="commitActivity" class="sure-btn mg-b15 btn">提交活动</a>
        </div>
        <div ref="quxiao" v-if="activityStatus==0&&result.online == 1&&(result.activityType==1||result.activityForm == 0||result.activityForm == 1||result.activityForm == 2||result.activityForm == 4)" class="mg-b20">
            <a @click="cancelActivity" class="cancel-btn btn">取 消</a>
        </div>
        <!-- 领钱音乐 -->
        <div v-if="result.activityStatus == 2 || getMoneyBtn" class="mg-t15">
            <a @click="getMoney" class="sure-btn mg-b15 btn">领钱</a>
        </div>
        <!-- 弹窗问卷  -->
        <!--<x-dialog v-model="dialogShow" hide-on-blur :dialog-style="{ width: '93%','max-width': '100%', 'background-color': 'transparent'}">
            <dialog-questionnaire :result="result" :callback="commitActivity2"  v-if="result.kid" @listenToChildEvent="closeDialog"></dialog-questionnaire>
        </x-dialog>-->
        <div class="dialogQuestion" v-if="dialogShow">
        	<div class="box">
        		<dialog-questionnaire :result="result" :callback="commitActivity2"  v-if="result.kid" @listenToChildEvent="closeDialog"></dialog-questionnaire>
        	</div>
        </div>
    </div>
</template>
<style scoped lang="less">
.dialogQuestion{
	width: 100%;
	height: 100%;
	z-index: 998;
	background: rgba(0,0,0,.6);
	position: fixed;
	top: 0;
	left: 0;
	margin: 0 auto;
    .box{
    	position: fixed;
    	z-index: 999;
    	width: 93%;	
    	top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
    }
}
    .activity-box {
        height: 80/50rem;
        padding: 0 !important;
        display: flex;
        align-items: center;
        img {
            margin-left: 38/50rem;
            margin-right: 10/50rem;
        }
        font-size: 28/50rem;
    }
    .btn {
        width: 622/50rem;
        height: 80/50rem;
        margin: 0;
        padding: 0;
        line-height: 80/50rem;
        border-radius: 300/50rem;
        font-size: 36/50rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .sure-btn {
        margin-top: 60/50rem;
    }
    .cancel-btn {
        margin-top: 28/50rem;
        border: 1/50rem solid #979797;
        width: 621/50rem;
        height: 79/50rem;
    }
    .zc-activity-rule-box{
        padding: 13px 23px;
    }
</style>
<script>
    import http from '../axios'
    import store from '../store'
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import {XDialog,TransferDomDirective as TransferDom} from 'vux'
    import dialogQuestionnaire from './dialog_questionnaire'
    import animateGetMoney from './animate_getmoney'
    import * as constant from '@/constant'
    import native from "@/native"

    export default {
        name:"activity-btn",
        props:['result'],
        data(){
            return {
                agreeRule:false,
                // dialogShow:false,
                dialogShow:true,//显示弹窗问卷
                showAnimate:true,
                isH5:constant.PRODUCTION_ENV==0,//模拟器显示按钮==0，否则!=0
                id: this.$route.query.id,
            }
        },
        directives: {
            TransferDom
        },
        computed:{
            ...mapState({
                activityStatus: state => state.activityModule.activityStatus,
                activityAuditStatus: state => state.activityModule.activityAuditStatus,
                getMoneyBtn: state => state.activityModule.getMoneyBtn,//协同的视频或问卷活动情况下，提交活动后 直接出现领钱按钮
                questionStatus: state => state.activityModule.questionStatus,//问卷状态
            })
        },
        components:{
           XDialog,dialogQuestionnaire
        },
        watch:{
            'result.activityStatus':{
                handler: function (newVal,oldVal) {
                    console.log(newVal);
                },
                deep: true      //深度监听
            },
        },
        methods:{
            clickRule(){    //点击同意活动规则
                this.agreeRule = !this.agreeRule;
            },
            cancelActivity(){//活动取消
                var self = this;
                Vue.$vux.confirm.show({
                    title: '警告',
                    content: `取消活动超过三次以后，3天内不能参加活动，您已经有${this.result.cancelTimes}次取消记录了～`,
                    onConfirm () {
                        http.cancelActivity(self.$route.query.id,(response)=>{
                            Vue.$vux.toast.show({text:"取消成功"});
                            store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus:5});
                            store.commit('UPDATE_STATUS');
                            // self.$refs.tijiao.style.display = 'none';
                            // self.$refs.quxiao.style.display = 'none';
                        })
                    }
                })
            },
            joinActivity(){ //活动报名
                if(this.agreeRule){
                    var param = {};

                    if(this.result.activityType == 2){
                        if(this.$route.query.code){
                            param.coopRoleType = 1;
                            param.coopInviteCode = this.$route.query.code;
                        }else{
                            param.coopRoleType = 0;
                        }
                    }
                    http.joinActivity(this.$route.query.id,param,(response)=>{
                        //活动报名成功
                        Vue.$vux.toast.show({text:"报名成功"});
                        store.commit('UPDATE_JOIN', {join: true});
                        store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus:0 });

                        if(constant.PRODUCTION_ENV == 0){
                            var time = 0;
                            if(constant.isIOS) time = 50;
                            setTimeout( () => {
                                native.method("getPage",function (response) {
                                    response = JSON.parse(response);
                                    //deviceUUID
                                    if(response.type == 0){
                                        var tmp = {path:"/activity/detail",query:{
                                                id:response.id
                                            }}
                                        if(response.code){
                                            tmp.query.code = response.code;
                                        }
                                        this.$router.push(tmp);

                                        store.commit("DEVICE_UUID",{uuid:response.deviceUUID})

                                        store.commit("USER_TOKEN",{token:response.token})
                                        store.commit("USER_POSITION",{
                                            x:response.longitude,
                                            y:response.latitude,
                                        })
                                    }else if(response.type == 1){
                                        //用户协议
                                        router.push({path:"/agreement/user"});
                                    }else if(response.type == 2){
                                        //隐私协议
                                        router.push({path:"/agreement/privacy"});
                                    }else{
                                        alert("type为空");
                                    }

                                })
                            },time)
                        }else {
                            setTimeout(function () {
                                location.reload();//报名成功后页面刷新，先这样做，后期再改
                            },100)
                        }
                    })

                }else{
                    Vue.$vux.toast.show({text:"请同意活动条款",type:"warn"});
                }

            },
            commitActivity(result){
                //提交活动
                var self = this;
                http.activityDetail(self.$route.query.id,function(response) {
                    if(response.data.activityForm==1){
                        if(!self.result.hasPlay){
                            Vue.$vux.toast.show({text:"请先观看视频后提交",type:"warn"});
                            return;
                        }
                        // else if(self.$route.query.id === 333) {
                        //     Vue.$vux.toast.show({text:"优惠券已用短信方式发送到您绑定的手机号"});
                        // }
                    }
                    if(response.data.questionStatus == 0){//问卷状态，0是未回答1是已回答，2取消   问卷ID
                        self.dialogShow = true;
                    }else{
                        self.commitActivity2();
                    }
                })


                // if(this.result) {
                //     if(this.result.activityForm==1){
                //         if(!this.result.hasPlay){
                //             Vue.$vux.toast.show({text:"请先观看视频后提交",type:"warn"});
                //             return;
                //         }
                //     }
                //     if(this.questionStatus == 0){//问卷状态，0是未回答1是已回答，2取消   问卷ID
                //         this.dialogShow = true;
                //     }else{
                //         this.commitActivity2();
                //     }
                // }


            },
            commitActivity2(result){
                var self = this;
                http.submitActivity(this.$route.query.id,{
                    questionStatus: result,
                    activityForm:self.result.activityForm
                },(response)=>{
                    Vue.$vux.toast.show({text:"提交成功"});
                    var status = 1;

                    if( (this.result.activityForm==1 || this.result.activityForm==2 || this.result.activityForm==4) && this.result.activityType !=2 ){

                        status = 4;
                        self.animateGetMoney();
                    }
                    else if(this.result.activityType ==2 && (this.result.activityForm==1 || this.result.activityForm==2 || this.result.activityForm==4)) {
                        status = 2;
                        store.commit('GET_MONEY_BTN',true)
                    }
                    store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus:status });
                    store.commit('UPDATE_STATUS');
                })
            },
            getMoney(){
                var self = this;
                http.getActivityMoney(this.$route.query.id,(response)=>{
                    self.animateGetMoney();
                    store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus: 4})
                })
            },
            animateGetMoney(){
                store.commit('GET_MONEY',true);
                setTimeout(()=>{
                    store.commit('GET_MONEY',false)
                },2000)
            },

            closeDialog(){
                this.dialogShow = false;
            }
        }
    }
</script>