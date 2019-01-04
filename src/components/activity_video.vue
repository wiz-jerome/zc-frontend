<template>
    <div class="bgBox" style="position: relative">
        <div class="picBox">
            <!-- 活动类型 状态 -->
            <!-- <span v-if="!hasStartPlay" class="activity-info-box abs-state1 tip1">{{online}}</span>
            <span v-if="!hasStartPlay" class="activity-info-box abs-state2 tip2">{{activityType}}</span> -->
            <!-- 点赞  -->
            <!-- <img src="../assets/image/follow-in.png" v-if="result.follow&&!hasStartPlay&&!isH5"  @click="followActivity" class="abs-state3">
            <img src="../assets/image/follow-out.png" v-if="!result.follow&&!hasStartPlay&&!isH5" @click="followActivity" class="abs-state3"> -->


            <video ref="video" preload="auto" @playing="startPlay" @ended="playEnd" :src="result.activityVedio" id="video" :poster="result.activityImage1" width="100%" height="220px" x-webkit-airplay="true" webkit-playsinline playsinline></video>
            <div ref="platBtn" class="playBtn-box"  @click="endPlay&&clickPlayBtn()">
                <img :src="platBtn" alt="" class="playBtn">
                <img @click.stop="playAll" :src="allPlayImg" alt="" class="allPlayBtn">
            </div>
            <!--<div style="font-size:16px;position: absolute;background: red;position: absolute;background: red;top: 60px; width: 271px;height: 26px;text-align: center;left: 0;right: 0;margin: auto;" v-if="trialOver">{{trialOverText}}</div>-->

        </div>
        <!--<div @click="playAll" style="font-size: 20px">全屏</div>-->
    </div>
</template>
<style lang="less" scoped>
    .bgBox{
        padding: 20/50rem 24/50rem;
    }
    .tip1,.tip2 {
        height: 48/50rem;
        padding-top: 0;
        padding-bottom: 0;
        line-height: 48/50rem;
        font-size: 24/50rem;
        position: absolute;
        z-index: 3;
    }
    .picBox {
        width: 100%;
        height: 401/50rem;
        border-radius: 16/50rem;
        position: relative;
        video {
            width: 100% !important;
            height: 100% !important;
            display: block;
        }
        .tip1 {
            top: 20/50rem;
            left: 16/50rem;
        }
        .tip2 {
            top: 92/50rem;
            left: 16/50rem;
        }
        .abs-state3 {
            z-index: 3;
            right: 16/50rem;
            top: 20/50rem;
            width: 60/50rem;
            height: 60/50rem;
        }
        .playBtn {
            width: 96/50rem;
            height: 96/50rem;
            position: absolute;
            top: 35%;
            left: 50%;
            transform: translate(-50%);
        }
        .playBtn-box{
            opacity: 0;
        }
        .playBtn-box,.loadingBox{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.7);
            position: absolute;
            top: 0;
            left: 0;
            transition: .3s;
            .allPlayBtn {
                position: absolute;
                right: 24/50rem;
                bottom: 24/50rem;
                width: 40/50rem;
            }
            .loadingImg{
            	position: absolute;
                left: 50%;
                top: 35%;
                margin-left: -96/50/2rem;
                width: 96/50rem;
                height: 96/50rem;
                animation:rotate .5s 100ms linear;
                >img{
                	width: 100%;
                	height: 100%;
                }
            }
        }
        
    }

@keyframes rotate{
	from{
		transform: rotate(0deg);
		transform-origin: center;
	}
	to{
		transform: rotate(360deg);
		transform-origin: center;
	}
}
    .abs-state1{
        position: absolute;
        left: 20px;
        top: 10px;
    }

    .abs-state2{
        position: absolute;
        left: 20px;
        top: 40px;
    }

    .abs-state3{
        position: absolute;
        right: 20px;
        top: 10px;
        width: 40px;
        height: 40px;
    }
</style>
<script>
    import http from '@/axios'
    import * as constant from '@/constant'
    import platBtn from '../assets/image/play-btn.png'
    import { mapState } from 'vuex'
    import store from '../store'
    import native from "@/native"

    import allPlayImg from '../assets/image/allPlay.png'
    import loadingImg from '../assets/image/loading.png'

    export default {
        data(){
            return {
                trialOver:false,
                trialOverText:constant.PRODUCTION_ENV==0?"请报名参加活动再继续观看":"请使用APP参加活动再继续观看",
                isH5:constant.PRODUCTION_ENV!=0,
                hasStartPlay:false,
                isPlay: false,
                platBtn: platBtn,
                endPlay:true,
                allPlayImg: allPlayImg,
                loadingImg:loadingImg,
                userType:this.$route.query.userType
            }
        },
        props:['result','commitActivityAuto'],
        computed:{
            ...mapState({
                videoContinue: state => state.activityModule.videoContinue,
                activityStatus: state => state.activityModule.activityStatus,
            }),
            activityType(){
                var tmp = "";
                if(this.result.activityForm == 1){
                    tmp =  "视频活动";
                }else if(this.result.activityForm == 0){
                    tmp =  "线下活动";
                }else if(this.result.activityForm == 2){
                    tmp = "问卷活动";
                }

                return tmp;
            },
            online(){
                var tmp = "";
                if(this.result.online == 0){
                    tmp = "未开始";
                }else if(this.result.online == 1){
                    tmp = "进行中";
                }else if(this.result.online == 2){
                    tmp = "已结束";
                }

                return tmp;
            }
        },
        mounted(){
            //  console.log('userType:',this.userType)
            var videoImg = new Image();
            videoImg.src = this.result.activityImage1;
            // 普通用户 && 活动在进行中&& 用户未交付
            if(this.userType==0 && this.result.online ==1 && this.result.activityStatus!=4){
                var video = this.$refs.video;
                video.play()
                this.$refs.platBtn.style.opacity = 0;
            }else{
                this.$refs.platBtn.style.opacity = 1;   
            }
        },
        watch:{
            videoContinue:{
                handler: function (newVal,oldVal) {
                    if(newVal.allPlay == 1) {
                        this.playEnd();
                        this.$refs.video.currentTime = this.$refs.video.duration;
                    }else {
                        this.$refs.video.currentTime = newVal.currentTime;
                    }
                },
                deep: true
            },
            activityStatus:function(newVal,oldVal){
                if(newVal != 4){
                    // 自动播放视频
                    var video = this.$refs.video;
                    video.play()
                    this.$refs.platBtn.style.opacity = 0
                }
            }
        },
        methods:{
            playAll() {
                var self = this;
                if(constant.PRODUCTION_ENV!=0) {
                    this.$vux.toast.show({text:"请打开APP使用全屏播放",type:'warn'});
                    return;
                }
                if(!this.result.join) {
                    this.$vux.toast.show({text:"请报名活动后再全屏播放",type:'warn'});
                    return
                }

                var currentTime = this.$refs.video.currentTime;
                var src = this.$refs.video.src;
                try {
                    native.method("enterFull",function (result) {
                        console.log("调用成功");
                        self.$refs.video.pause();
                    },src,currentTime)
                }catch (e){
                    alert(e);
                }
                this.$refs.video.webkitRequestFullscreen()||this.$refs.video.webkitEnterFullscreen();

            },
            //暂停 || 播放
            clickPlayBtn() {
                // console.log('点击视频',this.isPlay)
                var video = this.$refs.video;
                if (this.isPlay) {
                    video.pause();
                    this.$refs.platBtn.style.opacity = 1;
                } else {
                    video.play();
                    this.$refs.platBtn.style.opacity = 0;
                }
                this.isPlay = !this.isPlay;
            },
//           // 缓冲
//          waitLoading(){
//          	this.isVideoLoading = true
//          },
            //播放结束
            playEnd(){
                this.hasStartPlay = false;
                this.$emit("listenToChildEvent",1);
                this.$refs.platBtn.style.opacity = 1;
                this.isPlay = !this.isPlay;
                
                // console.log('播放结束，提交')

                // 活动已完成状态的不提交
                if(this.result.activityStatus != 4){
                    this.commitActivityAuto()
                }
            },

            startPlay(event){
//				this.isVideoLoading = false//播放视频
				this.isPlay = true//播放视频
                this.hasStartPlay = true;
                store.commit('UPDATE_VIDEOMASK', {isShowVideoMask:false});
                
                if(!this.hasStartPlay && constant.PRODUCTION_ENV==0) {
                // if(!this.hasStartPlay && constant.PRODUCTION_ENV==0 && this.result.join) {//原来的
                    var src = this.$refs.video.src;
                    try {
                        native.method("postUrl",function (result) {
                            console.log("调用成功");
                        },src)
                    }catch (e){
                        alert(e);
                    }
                }


                var video = event.currentTarget;
                var self = this;
                // 活动在线上
                if(this.result.online ==1 ){
                    var timer = setInterval(()=>{
                        // console.log(video.currentTime)
                        if(!self.result.join && video.currentTime >= 5){
                            video.pause();
                            // 原生--显示遮罩，提示报名观看全部视频
                            if(constant.PRODUCTION_ENV==0){
                                store.commit('UPDATE_VIDEOMASK', {isShowVideoMask:true});
                                this.$refs.platBtn.style.opacity = 1;//显示视频遮罩
                                video.currentTime = 0//视频播放点归0
                                this.isPlay = false//视频未在播放
                                return
                            }else{
                            //h5--提示报名参与活动再观看视频
                                this.$vux.toast.show({text:this.trialOverText,type:'warn'});
                            }
                            
                            this.hasStartPlay = false;
                            this.trialOver = true;
                            // this.endPlay = false;
                            clearInterval(timer) 
                        }
                    },50)
                }
            },
            followActivity(){
                http.followActivity(this.result.kid,{follow:this.result.follow?0:1},()=>{
                    if(this.result.follow == true){
                        this.result.follow = false
                    }else{
                        this.result.follow = true
                    }
                })
            }
        },
       
        beforeDestroy(){
            var video = this.$refs.video;
            video.stop();
        },
    }
</script>