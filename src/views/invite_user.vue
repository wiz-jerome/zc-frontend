<template>
    <!-- <div style="width: 100vw;overflow: scroll"> -->
    <div style="width:100%;overflow-x:hidden;">
        <!--<img src="../assets/image/invite-user.png" style="width: 100%;height: 100%;"/>-->
        <img :src="invitePic" alt="" class="invite-pic">
        <p class="tips">邀请好友即可获得现金奖励</p>
        <div class="invite-code">
            <!-- <input ref="code" type="hidden" :value="code"> -->
            <!-- <p class="invite-code"><span>邀请码：</span><span ref="codeInfo">{{code}}</span></p> -->
            <p>邀请码:{{code}}</p>
        </div>
        <!--<a @click="copyCode" class="copy">点击复制</a>-->
        <!-- <button class="copy tag-read" :data-clipboard-text="code" @click="copy" style="border:none;outline: none">点击复制</button> -->
        <button class="copy"  @click="share" >分享给好友</button>

        <!-- <div class="warnTxt">被邀请好友必须完成平台置顶找财APP视频活动</div>
        <div class="shareimg">
            <img src="../assets/image/shareImg.png" alt="">
        </div> -->
    </div>
</template>
<script>
    import Vue from 'vue'
    import invitePic from '../assets/image/invite-picture.png'
    import Clipboard from 'clipboard';
    import native from "@/native"
    export default {
        data(){
            return{
                code:this.$route.query.code,
                invitePic: invitePic
            }
        },
        created(){
            document.title="邀请好友"
        },
        methods:{
          share() {
            native.method("inviteUser",function (result) { 
              console.log("调用成功");
            })
          }, 
        //   copy() {
        //     var clipboard = new Clipboard('.tag-read')
        //     clipboard.on('success', e => {
        //       Vue.$vux.toast.show({text:"复制成功"});
        //       // 释放内存
        //       clipboard.destroy()
        //     })
        //     clipboard.on('error', e => {
        //       // 不支持复制
        //       Vue.$vux.toast.show({text:"复制失败",type:"warn"});
        //       // 释放内存
        //       clipboard.destroy()
        //     })
        //   },
        }
    }
</script>
<style lang="less" scoped>
    .warnTxt{
        font-size:0.4rem;
        text-align: center;
    }
    .shareimg{
        width: 596/50rem;
        height: 792/50rem;
        margin: 38/50rem auto 40/50rem;
        >img{
            width: 100%;
            height: 100%;
        }
    }
    .invite-pic {
        width: 100%;
        display:block;
    }
    .tips {
        text-align: center;
        color: #000;
        font-size: 24/50rem;
        padding: 20/50rem 0 52/50rem 0;
    }
    .invite-code {
        position: relative;
        text-align: center;
        font-size: 36/50rem;
        >p{
            width:622/50rem;
            height:80/50rem;
            line-height: 80/50rem;
            margin: 0 auto;
            border-radius:8/50rem;
            border:1/50rem solid rgba(0,0,0,1);
        }
        // span:first-of-type {
        //     color: #9d9d9d;
        // }
        // span:last-of-type {
        //     font-size: 40/50rem;
        // }
        // p {
        //     width: 622/50rem;
        //     height: 80/50rem;
        //     border-radius: 80/50rem;
        //     border: 1px solid #9d9d9d;
        //     position: relative;
        //     outline: none;
        //     color: #4f44e8;
        //     text-align: center;
        //     text-indent: 10%;
        //     font-size: 36/50rem;
        //     line-height: 80/50rem;
        //     margin: 0 auto;
        //     font-weight: bold;
        // }
    }
    .copy {
        width:622/50rem;
        height:80/50rem;
        background:rgba(0,0,0,1);
        border-radius:8/50rem;
        color: #FFFFFF;
        display: block;
        margin: 40/50rem auto 60/50rem;
        text-align: center;
        line-height: 80/50rem;
        font-size: 36/50rem;
        border:none;
        outline: none;
    }
</style>