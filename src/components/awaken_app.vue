<template>
    <transition name="fade">
        <div v-if="type === 1" class="awaken-app-box-new">
            <div class="info-app-box-new info-app-box">
                是否确认下载？
            </div>
            <div @click="download" class="open-app-button">
                确认
            </div>
        </div>
       <div v-else class="awaken-app-box">
            <div class="info-app-box">
                打开阅值APP参与活动
            </div>
            <div @click="startApp" class="open-app-button">
                立即打开
            </div>
            <div ref="body"></div>
        </div> 
    </transition>
</template>
<style lang="less">
    /* 开始过渡阶段,动画出去阶段 */
    .fade-enter-active{
    transition: all 0.5s ease-out;
    }
    /* 进入开始 */
    .fade-enter{
    transform: translateY(1000px);
    opacity: 0;
    }
    .awaken-app-box{
        
        height:50px;
        width: 96%;
        position: fixed;
        bottom:8px;
        border-radius: 4px;
        margin-left: 2%;
        -moz-box-shadow: -1px 2px 5px #888888; /* 老的 Firefox */
        box-shadow: -1px 2px 5px #888888;
        background: url(../assets/image/open-app-button.png) no-repeat center;
        background-size: 100%;
        z-index:999;
    }
    .info-app-box{
        height: 100%;
        line-height: 50px;
        width: 70%;
        float: left;
        text-align: center;
        font-size: .55rem;
        color: #FFF;
    }
    .open-app-button{
        height: 100%;
        line-height: 50px;
        font-size: .65rem;
        width: 30%;
        float: left;
        text-align: center;
        color: #1B1B1B;
        font-weight: bold;
    }
    
    .awaken-app-box-new{
        
        height:50px;
        width: 96%;
        position: fixed;
        bottom:8px;
        border-radius: 4px;
        margin-left: 2%;
        background: url(../assets/image/welcome-app.png) no-repeat center;
        background-size: 100%;
        z-index:999;
    }
        
    .info-app-box-new{
        color:#1B1B1B;
    }
    
</style>
<script>
    import * as constant from '@/constant'
    import mengban from '../assets/image/mengban.png'
    export default {
        name:"awaken_app",
        props:["result","type"],
        data() {
            return {
                mengban: mengban,
            }
        },
        methods: {
            startApp() {
                var code = this.$route.query.code?this.$route.query.code:0;

                if(this.isWeixinBrowser() || this.isQQBrowser()){
                    alert("微信和QQ浏览器貌似不行");
                    return;
                }

                if(!navigator.userAgent.match(/ipad|iphone|ipod|ios/i)){

                    if(this.is_weixn_qq()=='weixin' || this.is_weixn_qq()=='weibo'){
                        this.addMark();
                        return
                    }
                    try{
                        this.$refs.body.innerHTML+="<iframe src='" + constant.ANDROID_AWAKEN_SCHEMA + `?id=${this.result.kid}&name=${this.result.name}&code=${code}`  + "' style='display:none' target='' ></iframe>";

                        setTimeout(function(){window.location = constant.ANDROID_DOWNLOAD_URL},2000);
                    }catch(e){
                       alert(e.toString());
                    }
                }else{
                    //ios
                    if(this.is_weixn_qq()){
                        this.addMark();
                        return
                    }

                    window.location = constant.IOS_AWAKEN_SCHEMA+`${this.result.kid}&${this.result.name}~${code}`;
                    setTimeout(function(){window.location = constant.IOS_DOWNLOAD_URL},2000);
                    setTimeout(function() {
                        location.reload();
                    }, 3000);
                }
            },
            isWeixinBrowser() {
                return (/micromessenger/.test(navigator.userAgent)) ? true : false;
            },
            isQQBrowser() {
                return (navigator.userAgent.match(/QQ/i) == "qq") ? true : false;
            },

            is_weixn_qq(){
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    return "weixin";
                } else if (ua.match(/QQ/i) == "qq") {
                    return "QQ";
                } else if (ua.match(/WeiBo/i) == "weibo") {
                    return "weibo";
                }
                return false;
            },
            addMark() {
                let mark = document.createElement('div');
                mark.style.width = document.body.clientWidth+'px';
                mark.style.height = document.body.clientHeight+'px';
                mark.style.position = 'fixed';
                mark.style.top = 0;
                mark.style.left = 0;
                mark.style.zIndex = 99;
                mark.style.background = 'rgba(0,0,0,.7)'
                mark.onclick = function () {
                    mark.style.display = 'none';
                };
                let img = document.createElement('img');
                img.src = this.mengban;
                img.style.width = '100%';
                mark.appendChild(img);
                document.body.appendChild(mark);
            },
            download() {
                if(!navigator.userAgent.match(/ipad|iphone|ipod|ios/i)){

                    window.location = constant.ANDROID_DOWNLOAD_URL
                }else{

                    window.location = constant.IOS_DOWNLOAD_URL
                }
            }
        }
    }
</script>