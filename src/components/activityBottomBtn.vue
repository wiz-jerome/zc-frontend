<template>
<!-- // 底部按钮&&点赞 -->
    <div class="activityBottom" v-if="!isH5">
        <div class="bottomBox">
            <div class="follow">
                <img src="../assets/image/followed.png" v-if="result.follow"  @click="followActivity">
                <img src="../assets/image/follow.png" v-if="!result.follow"  @click="followActivity">
            </div>
            <div class="rightBtn">
                <!-- 活动未开始 -->
                <div v-if="result.online===0">活动未开始</div>
                <!-- 活动进行中 -->
                <div v-else-if="result.online===1">
                    <!-- 资讯 || 竞猜活动 -->
                    <div v-if="result.activityForm === 3 || result.activityForm === 4">
                        <div v-if="!result.join" @click="sureQuestionBtn">提交</div>
                        <div v-else @click="sureQuestionBtn">{{result.activityStatus===4&&(result.activityForm === 4 || result.questionType===4)?'您已经参与过了':(result.informationQuestionStatus===1?'恭喜您答对啦':'不好意思您答错了')}}</div>
                    </div>
                    <!-- 视频||线下活动 -->
                    <div v-if="result.activityForm === 0 || result.activityForm === 1">
                        <!-- 未参与 -->
                        <!-- 视频活动 -->
                        <div v-if="!result.join">
                            <div v-if="result.activityForm===1" @click="startPlay">报名（播放视频）</div>
                            <div v-else @click="joinActivity">报名</div>
                        </div>
                        <!-- 已参与 -->
                        <div v-else>
                            <div v-if="result.activityStatus===0 || activityStatus===0">
                                <!-- 线下活动 -->
                                <router-link v-if="result.activityForm === 0" :to="{path:'/activity/commitoffline',query:{id:id}}">提交活动</router-link>
                                <!-- 视频活动 -->
                                <div v-else class="submitBtn">提交活动</div>
                            </div>
                            <div v-if="result.activityStatus===1 ||activityStatus===1">
                                <div class="">待审核</div>
                            </div>
                            <div v-if="result.activityStatus===2 || getMoneyBtn || activityStatus===2">
                                <div class="" @click="getMoney">领钱</div>
                            </div>
                            <div v-if="result.activityStatus===3 || activityStatus===3">
                                <!-- 线下活动 -->
                                <router-link v-if="result.activityForm === 0" :to="{path:'/activity/commitoffline',query:{id:id}}">重新提交</router-link>
                                <!-- 视频活动 -->
                                <div v-else @click="commitActivity" class="submitBtn">重新提交</div>
                            </div>
                            <div v-if="result.activityStatus === 4 || activityStatus === 4">
                                <div>已完成</div>
                            </div>
                        </div>

                        <!-- 问卷弹窗 -->
                        <div class="dialogQuestion" v-if="dialogShow">
                            <div class="box">
                                <dialog-questionnaire :result="result" :callback="commitActivity2"  v-if="result.kid" @closeDialog="closeDialog"></dialog-questionnaire>
                            </div>
                        </div>   
                    </div>
                </div>
                <!-- 活动已结束 -->
                <div v-else-if="result.online===2">活动已结束</div>
            </div>
        </div>
        <!-- <div style="width: 100%;height: 34px;background:#fff;" v-if="isIphoneX"></div> -->
    </div>
</template>
<style scoped lang="less">
a{
    color: #000000;
    display: block;
}
.dialogQuestion{
	width: 100%;
	height: 100%;
	z-index: 99999;
	background: rgba(0,0,0,.6);
	position: fixed;
	top: 0;
	left: 0;
	margin: 0 auto;
    .box{
    	position: fixed;
    	z-index: 100000;
        width: 682/50rem;	
    	top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
    }
}
.activityBottom{
    position: fixed;
    z-index:99998;
	bottom: 0;
	width: 750/50rem;
    .bottomBox{
        width: 100%;
        height: 96/50rem;
        display: flex;
        .follow{
            height: 96/50rem;
            width: 120/50rem;
            background: #000000;
            display: flex;
            justify-content: center;
            align-items: center;
            >img{
                width: 40/50rem;
                height: 40/50rem;
            }
        }
        .rightBtn{
            width: 630/50rem;
            height: 96/50rem;
            box-sizing: border-box;
            background: #ffffff;
            border:1/50rem solid rgba(0,0,0,1);
            font-size:36/50rem;
            font-weight: 400;
            text-align: center;
            line-height:96/50rem;
        }

    }
}
</style>
<script>
    import http from '../axios'
    import store from '../store'
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import {XDialog,TransferDomDirective as TransferDom} from 'vux'
    import dialogQuestionnaire from "./dialog_questionnaire"
    import animateGetMoney from './animate_getmoney'
    import * as constant from '@/constant'
    import native from "@/native"
    export default {
        name:"activityBottomBtn",
        props:['result'],
        data(){ 
            return {
                isH5:constant.PRODUCTION_ENV!=0,//模拟器显示按钮==0，否则!=0
                dialogShow:false,//是否显示线下、视频活动的问卷弹窗
                id: this.$route.query.id,
            }
        },   
        directives: {
            TransferDom
        },
        components:{
           XDialog,animateGetMoney,dialogQuestionnaire
        },
        computed: {
            ...mapState({
                activityStatus: state => state.activityModule.activityStatus,
                join: state => state.activityModule.join,
                getMoneyBtn: state => state.activityModule.getMoneyBtn,//协同的视频或问卷活动情况下，提交活动后 直接出现领钱按钮
            }),
            isIphoneX(){
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            },
        },
        watch: {
            activityStatus: {
                handler: function(newVal, oldVal) {
                    // console.log('活动状态改变',newVal);
                    this.result.activityStatus = newVal;
                },
                deep: true //深度监听
            },
            join: {
                handler: function(newVal, oldVal) {
                    this.result.join = newVal;
                },
                deep: false //深度监听
            }
        },
        methods:{
            startPlay(){
                this.$emit('startPlayVideo')
                // 报名活动
                this.joinActivity()
            },
            // 问卷弹窗消失
            closeDialog(){
                if (this.result.questionRequest === 1){
                    // 如果问卷必填,直接
                    this.dialogShow = false;
                }else{
                    // 提交活动
                    this.commitActivity2(2)
                }

            },
            commitActivity(result){
                //点击提交活动
                var self = this;
                http.activityDetail(self.$route.query.id,function(response) {
                    if(response.data.activityForm==1){
                        if(!self.result.hasPlay){
                            Vue.$vux.toast.show({text:"请先观看视频后提交",type:"warn"});
                            return;
                        }
                    }
                    if(response.data.questionId){//是否有关联问卷
                        self.dialogShow = true;
                    }else{
                        // 活动提交请求
                        // self.$emit('commitActivity')
                        self.commitActivity2();
                    }
                })
            },
            commitActivity2(result){
                var self = this;
                http.submitActivity(this.$route.query.id,{
                    questionStatus: result,
                    activityForm:self.result.activityForm
                },(response)=>{
                    self.dialogShow = false;
                    Vue.$vux.toast.show({text:"提交成功"});

                    var status = 1;
                    // 
                    if( this.result.activityType !=2 && (this.result.activityForm==1 || this.result.activityForm==2 || this.result.activityForm==4)  ){
                        status = 4;//按钮状态--已完成
                        // console.log("执行领钱动画")
                        self.animateGetMoney();
                    }
                    else if(this.result.activityType ==2 && (this.result.activityForm==1 || this.result.activityForm==2 || this.result.activityForm==4)) {
                        status = 2;//按钮状态--待领钱
                        store.commit('GET_MONEY_BTN',true)
                    }
                    store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus:status });
                    store.commit('UPDATE_STATUS');
                    // this.$refs.tijiao.style.display = 'none';
                    // this.$refs.quxiao.style.display = 'none';
                })
            },
            getMoney(){
                var self = this;
                http.getActivityMoney(this.$route.query.id,(response)=>{
                    self.animateGetMoney();
                    store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus: 4})
                })
            },
            // 领钱动画
            animateGetMoney(){
                store.commit('GET_MONEY',true);
                setTimeout(()=>{
                    store.commit('GET_MONEY',false)
                },2000)
            },
            joinActivity(){ //活动报名
                // if(this.agreeRule){
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
                        // Vue.$vux.toast.show({text:"报名成功"});
                        // console.log('报名成功')
                        store.commit('UPDATE_JOIN', {join: true});
                        store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus:0 });
                        store.commit('UPDATE_VIDEOMASK', {isShowVideoMask:false});
                        // 原生app内
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
                            // setTimeout(function () {
                            //     location.reload();//报名成功后页面刷新，先这样做，后期再改
                            // },100)
                        }
                    })

                // }else{
                //     Vue.$vux.toast.show({text:"请同意活动条款",type:"warn"});
                // }

            },
            
            // 点赞
            followActivity() {
                http.followActivity(this.result.kid, {
                    follow: this.result.follow ? 0 : 1
                }, () => {
                    if(this.result.follow == true) {
                        this.result.follow = false
                    } else {
                        this.result.follow = true
                    }
                })
            },
            // 提交
            sureQuestionBtn(){
                this.$emit("sureQuestionBtn");
            },
            
        }
    }
</script>