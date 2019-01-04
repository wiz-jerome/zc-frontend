<template>
    <div class="error">
        <div class="error-page">
            <div><img src="../assets/image/net-error.png" class="error-img"></div>
            <div>
                <p class="error-text">网络连接失败</p>
                <p class="error-massge">网络好像掉进了沙漠中，别担心～</p>
                <div class="btn" @click="goback">刷新看看</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"error",
        data(){
            return{}
        },
        methods:{
            goback(){
                this.$router.go(-1)
            }
        }
}
</script>

<style lang="less" scoped>
.error{
    width:100%;
    height:100%;
    position:relative;

    .error-page{
        position: absolute;
        width:380/50rem;
        left: 50%;
        top:328/50rem;
        margin-left:-190/50rem;
        .error-img{
            width:380/50rem;
            height:406/50rem;
        }
        .error-text{
            text-align: center;
            height:32/50rem;
            font-size:28/50rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(143,143,143,1);
            line-height:32/50rem;
        }
        .error-massge{
            text-align: center;
            font-size:16/50rem;
            font-family:PingFangSC-Light;
            font-weight:300;
            color:rgba(202,202,202,1);
            margin-top:20/50rem;
        }
        .btn{
            width:280/50rem;
            height:68/50rem;
            background:rgba(27,27,27,1);
            box-shadow:0px 8px 16px 0px rgba(206,206,206,1),0px 1px 0px 0px rgba(255,255,255,0.5);
            border-radius:4/50rem;
            margin-left:1rem;
            margin-top:56/50rem;
            color:#CECECE;
            text-align: center;
            line-height: 68/50rem;
            font-size:32/50rem;
            letter-spacing: 2px;
        }
    }
}
</style>
