<template>
    <div class="share_money" style="width: 100%">
        <img :src="bg_img" alt="">
        <div class="box">
            <!--<img :src="bg_card" alt="">-->
            <p class="money">{{shareOrDownload?'好友':'当前'}}总收入<span>{{income}}</span>元</p>
            <p class="tips">看广告也能赚钱，分享给好友看看你的战绩吧！</p>
            <!--<img :src="bg_img" alt="">-->
            <!--<div>-->
                <!--<p>扫描二维码下载</p>-->
                <!--<p>或</p>-->
                <!--<p>APPStore搜索找财</p>-->
            <!--</div>-->
        </div>
        <div class="btn" @click="downLoadApp">{{shareOrDownload?'点击下载':'炫耀一下'}}</div>
    </div>
</template>
<script>
    import bg_img from '../assets/image/shareMoney_bg.png'
    import bg_card from '../assets/image/shareMoney_card.png'
    import * as constant from '@/constant'
    import native from "@/native"
    export default {
        data(){
            return {
                income: Number(this.$route.query.income).toFixed(2),
                bg_img: bg_img,
                bg_card: bg_card,
                shareOrDownload: constant.PRODUCTION_ENV!=0,
            }
        },
        methods: {
            downLoadApp() {
              if(this.shareOrDownload) {
                if(!navigator.userAgent.match(/ipad|iphone|ipod|ios/i)){
                  window.location = constant.ANDROID_DOWNLOAD_URL;
                }else{
                  //ios
                  window.location = constant.IOS_DOWNLOAD_URL;
                }
              }else {
                native.method("shareIncome",function (result) {
                  console.log("调用成功");
                })
              }
            },
        }
    }
</script>
<style scoped lang="less">
    .share_money {
        img {
            width: 100%;
        }
        .box {
            position: relative;
            font-size: .6rem;
            height: 5rem;
            img:first-of-type {
                width: 351*2/50rem;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                box-shadow:0 0 20px #ededed
            }
            img:last-of-type {
                width: 3.5rem;
                position: absolute;
                top: 2.7rem;
                left: 1.7rem;
            }
            .money {
                position: absolute;
                top: 0;
                z-index: 1;
                font-size: .6rem;
                /*left: 50%;*/
                /*transform: translateX(-50%);*/
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;
                span {
                    font-size: 1.3rem;
                    font-weight: bold;
                    margin: 0 2px;
                }
            }
            .tips {
                position: absolute;
                top: 2rem;
                z-index: 1;
                font-size: .5rem;
                text-align: center;
                width: 100%;
            }
            div {
                position: absolute;
                top: 5.5rem;
                left: 6rem;
                color: #525252;
                p {
                    line-height: .8rem;
                }
            }
        }
        .btn {
            width: 85%;
            height: 1.7rem;
            background: #fcc874;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            line-height: 1.7rem;
            border-radius: 1rem;
            color: white;
            font-size: .8rem;
            margin-bottom: .3rem;
        }
    }
</style>