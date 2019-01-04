<template>
    <div style="position: fixed;left:0; top:0;z-index: 1000">
        <div>
            <img src="../assets/image/get-money.gif" style="width: 100vw;height: 100vh">
        </div>
        <!-- 动画声音 -->
        <!--<audio src="../../static/get-money.mp3" preload autoplay loop ref="audio"></audio>-->
        <audio src="../assets/image/get-money.mp3" autoplay ref="audio"></audio>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Native from "@/native"
    export default {
        name:"aimate_getmoney",
        created(){
        },
        computed:{
            ...mapState({
                getMoney: state => state.activityModule.getMoney
            })
        },
        watch:{
            // getMoney(newval,oldval) {
            //     this.$refs.audio.play();
            // }
        },
        mounted() {
          // this.$refs.audio.play();
        //   动画声音
          	// Native.method('playMedia',(res)=>{});
        }
    }
</script>
