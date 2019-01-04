<template>
    <div :style="'background:#000 url('+bgImg+') no-repeat top center;background-size:100%;width:100%;position:relative;height:100vh;'">
        <!-- <img :src="bgImg" alt=""> -->
        <div class="btn" @click="download">下载阅值APP</div>
        <awaken-app v-show="show" :type=1></awaken-app>
    </div>
</template>

<script>
    import bgImg from '../assets/image/downloadBG.jpg'
    import * as constant from '@/constant'
    import awakenApp from '../components/awaken_app'

    export default {
        name: "welcome_to_app",
        data() {
            return {
                bgImg: bgImg,
                show: false
            }
        },
        components: {
            awakenApp,
        },
        methods: {
            download() {
                this.show = true;
            }
        }
    }
</script>

<style lang="less" scoped>
    img {
        width: 100%;
    }
    p {
        color: #fbc974;
        text-align: center;
        font-size: 1rem;
    }
    .btn {
        width:460/50rem;
        height:80/50rem;
        background:linear-gradient(90deg,rgba(255,180,51,1),rgba(255,146,44,1));
        border-radius:4/50rem;
        color: #1B1B1B;
        font-size: 32/50rem;
        text-align: center;
        line-height: 80/50rem;
        margin:0 auto;
        position: absolute;
        left: 140/50rem;
        top: 1079/50rem;
    }
</style>