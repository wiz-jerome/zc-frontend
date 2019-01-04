<template>
  <div id="app" class="bg">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <keep-alive :exclude="['activity','commit_offline_activity']">
        <router-view class="router-view vux-pop-out-enter-active" ></router-view>
      </keep-alive>
    </transition>
    <div class="vidoeMask" @click = "closeMask" v-if="isShowVideoMask">
      <div class="dialog" :class="isIphoneX?'iphoneXbot':''">
        <div class="con">请报名继续观看视频</div>
        <div class="line1px" style="margin:0;"></div>
        <div class="btn" @click.stop = "closeMask">我知道啦</div>
        <div class="corner"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import "assets/less/mian";
  @import "assets/less/activity";
  @import '~vux/src/styles/reset.less';
  @import "assets/less/animate";
  html,body{
    height: 100vh;
    overflow: hidden;
    padding: 0;
  }
  html{
    position: fixed;
  }
  .vidoeMask{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);

    .dialog{
      width: 606/50rem;
      position: absolute;
      background: #fff;
      border-radius: 4/50rem;
      bottom: 121/50rem;
      left: 120/50rem;
      .con{
        height: 107/50rem;
        line-height: 107/50rem;
        font-size: 28/50rem;
        color: #696969;
        text-align: center;
      }
      .btn{
        font-size: 24/50rem;
        color: #FFB433;
        line-height: 80/50rem;
        text-align: center;
      }
      .corner{
        width: 0;
        height: 0;
        border:15/50rem solid #fff;
        border-left: 25/50rem solid transparent;
        border-right: 25/50rem solid transparent;
        border-bottom: 15/50rem solid transparent;
        margin: 0 auto;
        margin-bottom: -28/50rem;
      }
    }
    .iphoneXbot{
      bottom: 3.7rem;
    }
  }
  .selectIdot{
			display: inline-block;
			width: 20/50rem;
			height: 20/50rem;
			border: 1px solid #000000;
			border-radius: 50% ;
			// vertical-align: sub;
		}
		.checkIdot{
			display: inline-block;
			width: 20/50rem;
			height: 20/50rem;
			border: 1px solid #000000;
			border-radius: 4/50rem;
		}
		.chosed{
			background: #000000;
    }
    
  .font-40{
    font-size:40/50rem;
  } 
  .f-1b{
    color: #1B1B1B;
  } 
  .f-8f{
    color:#8F8F8F;
  }
  .mg-b20{
    margin-bottom: 20/50rem;
  }
  .font-28{
    font-size: 28/50rem;
  }
  .line750{
    width: 750/50rem;
    height: 2/50rem;
    background: #D8D8D8;
    margin:20/50rem 0;
  }
  .line650{
    height: 2/50rem;
    padding: 10/50rem 0;
    .line{
      width: 650/50rem;
      height: 2/50rem;
      background: #D8D8D8;
      float: right;
      transform: scale(1, .5);
    }
  }
  .line1px{
    height: 2/50rem;
    transform:scale(1,.5);
    background: #D8D8D8;
    margin:0.1rem 0;
  }
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    // will-change: transform;//添加会导致内部元素fixed定位失效，效果类似absolute定位
    // transition: all 250ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
  }
  .bg{
    overflow-x: hidden;
    height: 100vh;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }


  .activity-box .html-box img {
    max-width: 100%-40/50rem;
  }
	li{
		list-style: none;
  }
  .weui-toast{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .weui-icon_toast.weui-loading{
    margin: 0 0 20px !important;
  }
  .weui-loading_toast .weui-toast__content{
    margin-bottom: 0 !important;
  }
  .weui-icon_toast{
    margin: 0 0 20px !important;
  }
  
</style>
<script>
    import { mapState } from 'vuex'
    import Vue from 'vue'
    import store from './store'

    export default {
      name: 'app',
        computed:{
            ...mapState({
                direction: state => state.routerModule.direction,
                loading: state => state.axiosModule.httpLoading,
                isShowVideoMask:state => state.activityModule.isShowVideoMask
            }),
            isIphoneX(){
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            },
        },
        methods:{
          closeMask(){
            store.commit('UPDATE_VIDEOMASK', {isShowVideoMask:false });
          }
        },
        watch:{
          loading(newValue,oldValue){
              console.log(newValue)
              if(newValue){
                  this.$loading.show()
                // 之前的loading
                // Vue.$vux.loading.show({
                //   text: 'Loading'
                // })
              }else{
                  this.$loading.hide()
                  // Vue.$vux.loading.hide();
              }
          }
        }
    }
</script>
