<template>
	<!--线下、竞猜、banner图-->
    <div class="bgBox">
        <div class="picBox">
            <img v-loading-img  class="activity-post-img" :src="result.activityImage1">
            <!-- 活动类型 状态 -->
            <!-- <span class="activity-info-box abs-state1 tip1">{{online}}</span> -->
            <!-- <span class="activity-info-box abs-state2 tip2">{{activityType}}</span> -->
            <!-- 点赞 -->
            <!-- <img src="../assets/image/follow-in.png" v-if="result.follow&&!isH5" @click="followActivity" class="abs-state3"> -->
            <!-- <img src="../assets/image/follow-out.png" v-if="!result.follow&&!isH5" @click="followActivity" class="abs-state3"> -->
        </div>
    </div>
</template>
<style scoped lang="less">
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
        img:first-of-type {
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
        img:nth-of-type(2),img:nth-of-type(3) {
            z-index: 3;
            right: 16/50rem;
            top: 20/50rem;
            width: 60/50rem;
            height: 60/50rem;
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

// .abs-state3{
// position: absolute;
// right: 20px;
// top: 10px;
// width: 40px;
// height: 40px;
// }
</style>
<script>
    import http from '@/axios'
    import * as constant from '@/constant'

    export default {
        name:"activity-picture",
        props:['result'],
        data(){
            return{
                isH5:constant.PRODUCTION_ENV!=0,
            }
        },
        computed:{
            activityType(){
                var tmp = "";
                if(this.result.activityForm == 1){
                    tmp =  "视频活动";
                }else if(this.result.activityForm == 0){
                    tmp =  "线下活动";
                }else if(this.result.activityForm == 2){
                    tmp = "问卷活动";
                }else if(this.result.activityForm == 3){
                    tmp = "资讯活动";
                }else if(this.result.activityForm == 4){
                    tmp = "竞猜活动";
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
        methods:{
            followActivity(){
                http.followActivity(this.result.kid,{follow:this.result.follow?0:1},()=>{
                    if(this.result.follow == true){
                        this.result.follow = false
                    }else{
                        this.result.follow = true
                    }
                })
            }
        }
    }
</script>