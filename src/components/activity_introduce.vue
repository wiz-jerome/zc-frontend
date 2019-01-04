<!-- 活动介绍 -->
<template>
    <div class="activityIntroduceBox">
        <!-- <div class="activity-tab-header">{{result.name}}</div> -->
        <div class="introduceInfo">
            <div class="blod">完成周期</div>
            <div>{{cycle}}</div>
        </div>
        <div class="introduceInfo">
            <div class="blod">报名时间</div>
            <div>
                <span>{{result.startTime.substring(5,7)}}月{{result.startTime.substring(8,10)}}日{{result.startTime.substring(10)}}</span>
                 到
                <span>{{result.endTime.substring(5,7)}}月{{result.endTime.substring(8,10)}}日{{result.endTime.substring(10)}}</span>
            </div>
        </div>
        <div v-if="result.activityForm===0" class="introduceInfo addressInfo">
            <router-link class="address" :to="{ path:'/map/gaode', query: { x: result.longitude,y:result.latitude}}">
                <img src="../assets/image/addressPoint.png" class="positionIcon">
                <div class="blod">活动地点</div>
                <div>{{detailAddress}}</div>
            </router-link>
        </div>
        <!-- <activity-btn :result="result"></activity-btn> -->
    </div>

</template>
<style lang="less" scoped>
.activityIntroduceBox{
    .introduceInfo{
        padding:14/50rem 24/50rem 0 100/50rem;
        font-size:28/50rem;
        color: #1B1B1B;
        display: flex;
        .blod{
            font-weight: 600;
            flex-shrink:0;
            margin-right: 20/50rem;
        }
    }
    .addressInfo{
        position: relative;
        .address{
            display: flex;
            color: #1B1B1B;
            .positionIcon{
                width: 32/50rem;
                height: 32/50rem;
                position: absolute;
                left: 60/50rem;
                top:16/50rem;
            }
        }
    }
}
    .zc-introduce-box{
        min-width: 33%;
        max-width: 40%;
        text-align: left;
        display: inline-block;
    }

    .zc-introduce-box1{
        display: inline-block;
    }
</style>
<script>
    import {Scroller} from 'vux'
    import activityBtn from './activity_btn'
    import activityJoin from '../components/activityJoin'

    export default {
        name:"activity-introduce",
        components:{Scroller,activityBtn,activityJoin},
        methods:{
        },
        computed:{
            cycle(){
                var mss = this.result.requireTime;
                var days = parseInt(mss / ( 60 * 24));
                var hours = parseInt((mss % ( 60 * 24)) / (60));
                var minutes = parseInt(mss % 60);
                return days + "天" + hours + "小时" + minutes + "分钟";
            },
            detailAddress(){
                let tmp = "";
                tmp += this.result.provinceName;
                if(!this.result.provinceName == this.result.cityName){
                    tmp += this.result.cityName;
                }
                tmp += this.result.areaName;
                tmp += this.result.addressDetail;
                return tmp;
            }
        },
        props:['result'],
        mounted(){
            this.$nextTick(() => {
                // this.$refs.scroller.reset();
            })
        }
    }
</script>
<style scoped lang="less">
    .f-black {
        font-size: 28/50rem;
        color: #39393A;
    }
    .detail-box {
        display: flex;
        justify-content: space-between;
        .zc-introduce-box {
            /*text-align: center;*/
            p:last-of-type {
                margin: 0;
                font-size:24/50rem;
                color:rgba(74,74,74,1);
                margin-left: .6rem;
            }
            .detail {
                display: flex;
                /*justify-content: center;*/
                align-items: center;
                img {
                    margin-top: 1px;
                    width: .6rem;
                }
                .number {
                    font-size:34/50rem;
                    color:rgba(74,74,74,1);
                    line-height: normal;
                    font-weight: bold;
                }
                .yuan {
                    margin-top: 2px;
                    font-size: 18/50rem;
                    color: #39393A;
                }
            }
        }
    }
    .activity-tab-header {
        white-space:normal;
        word-break:break-all;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
</style>