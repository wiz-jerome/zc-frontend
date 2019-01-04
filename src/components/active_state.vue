<!-- 活动状态 -->
<template>
    <!--<scroller lock-x :scrollbar-y="false" ref="scroller"   class="animated fadeInRight height-55vh">-->
    <div class="row" style="padding-bottom: 10px">
        <div class="activity-tab-header">活动状态</div>
        <div class="activity-box height-290">
            <div class="statistics-left-box">
                <canvas ref="leftCanvas" class="mg-t15"></canvas>
                <p class="mg-b10 f-dark font-14">
                    <span>总额度</span>
                    <span>
                        <img src="../assets/image/money.png" class="icon">
                    </span>
                    <span class="f-base font-18">{{result.totalAmount|keepTwoNumber}}</span>
                </p>
            </div>
            <div class="statistics-right-box">
                <canvas ref="rightCanvas" class="mg-t15"></canvas>
                <p class="mg-b10 f-dark font-14">
                    <span>总人数</span>
                    <span>
                        <img src="../assets/image/person.png" class="icon">
                    </span>
                    <span class="f-base font-18">{{result.maxUser}}</span></p>
            </div>
            <router-link class="have-money" :to="{path:'/activity/joinmembers',query:{id:result.kid}}">
                <div style="display: flex;align-items: center;margin-left: .4rem">
                    <img v-loading-head class="user-img" :src="user.avatar" v-for="(user,index) in result.finishUser?result.finishUser.slice(0,8):[]" :key="index" :class="{'overlap-img':index != 0}">
                </div>
                <div class="single-award  f-black font-14">
                    <span style="display: flex;align-items: center">
                        <img src="../assets/image/money.png" class="">
                    </span>
                    <span class="font-22 f-base" style="margin-right: .2rem;">{{result.rewardAmount|keepTwoNumber}}</span>
                    <span class="va-text-b">奖励 元／人</span>
                </div>
            </router-link>
            <p class="resetMoney">
                此轮活动结束还有<span class="f-base">{{restTime}}</span>天
            </p>
        </div>
       <!-- <activity-btn :result="result"></activity-btn> -->
    </div>
    <!--</scroller>-->
</template>
<style lang="less" scoped>
    .activity-tab-header {
        font-size: 36/50rem;
        color: #4A4A4A;
        line-height: normal;
        margin-top: 40/50rem;
        margin-bottom: 20/50rem;
        font-weight: bold;
    }
    .mg-t15 {
        width: 180/50rem !important;
        height: 180/50rem !important;
        margin-top: 80/50rem;
    }
    .statistics-left-box, .statistics-right-box {
        height: 340/50rem;
    }
    .mg-b10 {
        display: flex;
        justify-content: center;
        align-items: center;
        span:first-of-type {
            font-size: 28/50rem;
        }
        span:last-of-type {
            font-size: 44/50rem;
        }
        span:nth-of-type(2) {
            display: flex;
            align-items: center;
            .icon {
                height: 1rem;
            }
        }
    }
    .user-img {
        width: 55/50rem !important;
        height: 55/50rem !important;
        border: 5/50rem solid white !important;
        border-radius: 50%;
    }
    .have-money {
        width: 100%;
        height: 100/50rem;
        display: flex;
        border-bottom: 1px solid #D8D8D8;
        align-items: center;
        justify-content: space-between;
    }
    .single-award {
        display: flex;
        align-items: center;
        margin-right: 32/50rem;
        color: #4A4A4A;
        img {
            height: 1rem;
        }
    }
    .f-base {
        font-size: .66rem !important;
    }



    .overlap-img{
        margin-left: -18px;
    }
    .zc-icon-img1,.zc-icon-img1{
        height: 22px;
        width: 22px;
        margin-top: -6px;
        margin-right: -7px;
    }
    .zc-icon-img1{ margin-right: -7px;}
    .zc-icon-img2{ margin-right: -5px;}

    .pd-tb-8{
        /*padding: 8px 0;*/
        position: relative;
        top: -13px;
        height: 37px;
    }
    .resetMoney {
        font-size: 28/50rem;
        text-align: center;
        /*padding: 10px 0;*/
        height: 72/50rem;
        line-height: 72/50rem;
        /*line-height: normal;*/
        color: #39393A;
    }
</style>
<script>
    import {Scroller} from 'vux'
    import activityBtn from './activity_btn'

    export default {
        name:"activity-state",
        components:{Scroller,activityBtn},
        computed:{
            restTime(){
                var s1 = this.result.endTime;

                s1 = new Date(s1.replace(/-/g, "/"));
                var s2 = new Date();
                var days = s1.getTime() - s2.getTime();
                var time = parseInt(days / (1000 * 60 * 60 * 24));

                if(time<=0) time = 0;
                return time;
            }
        },
        props:['result'],
        methods:{
            drawStatistics(canvas,percent,imgSrc,num,word){
                var ctx = canvas.getContext("2d");

                let width = canvas.width,height = canvas.height;
                if (window.devicePixelRatio) {
                    canvas.style.width = width + "px";
                    canvas.style.height = height + "px";
                    canvas.height = height * window.devicePixelRatio;
                    canvas.width = width * window.devicePixelRatio;
                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                }

                var y = height/2;
                var x = width/2;
                var r = width/2;
                var startPoint =(Math.PI/180)*(-90);
                var endPoint = (Math.PI/180)*(-360);
                var i = 0;

                var draw = setInterval(()=>{
                    if(i>=percent){
                        window.clearInterval(draw);
                    }else{
                        i++
                    }
                    var endPoint = (Math.PI/180)*((-360)*(i/100)-90);

                    ctx.strokeStyle = "#9B9B9B";
                    ctx.beginPath();
                    ctx.arc(x,y,r-5,0,Math.PI*2,true);
                    ctx.stroke();

                    ctx.fillStyle="#FBC873";
                    ctx.beginPath();
                    ctx.moveTo(x,y);
                    ctx.arc(x,y,r,startPoint,endPoint,true);
                    ctx.closePath();
                    ctx.fill();

                    ctx.fillStyle="#F5F5F5";
                    ctx.beginPath();
                    ctx.arc(x,y,r-5,0,Math.PI*2,true);
                    ctx.fill();

                    ctx.textAlign="center";
                    ctx.fillStyle="#FBC873";
                    ctx.font = '26px DINCondensed-Bold';
                    ctx.fillText(num,70,83);

                    ctx.textAlign="center";
                    ctx.fillStyle="#9B9B9B";
                    ctx.font = '18px PingFangSC-Regular';
                    ctx.fillText(word,70,103);

                    var img = new Image();
                    img.src = imgSrc;

                    if(img.complete){
                        ctx.drawImage(img,53,25,33,33);
                    }else{
                        img.onload = () => {
                            ctx.drawImage(img,55,25,33,33);
                        }
                    }
                },25)




            }
        },
        mounted:function () {
            var leftCanvas = this.$refs.leftCanvas;
            leftCanvas.width = 140;
            leftCanvas.height = 140;
            var rightCanvas = this.$refs.rightCanvas;
            rightCanvas.width = 140;
            rightCanvas.height = 140;

            var restPercent = (this.result.leftAmount/this.result.totalAmount) * 100;
            var drawPercent = (this.result.actualUser/this.result.maxUser) * 100;
            this.drawStatistics(leftCanvas,restPercent,require("../assets/image/money.png"),this.result.leftAmount.toFixed(2),"剩余额度");
            this.drawStatistics(rightCanvas,drawPercent,require("../assets/image/person.png"),this.result.actualUser,"已领取人数");
        }
    }
</script>