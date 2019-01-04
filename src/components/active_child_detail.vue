<template>
    <div class="width-100per tl active_child_detail">
        <div class="active-html" v-html="result.contentRich" style="word-wrap:break-word; word-break:break-all;">

        </div>

        <div class="goMap">
            活动地点：
            <span class="f-dark">{{detailAddress}}</span>
            <img src="../assets/image/position.png" class="activity-icon mg-l5">
            <router-link class="f-base" :to="{ path:'/map/gaode', query: { x: result.longitude,y:result.latitude}}">到这去</router-link>
        </div>
        <div class="cankaoImg-title">
            参考图片
        </div>
        <div class="line"></div>
        <div style="padding-top: 10px;position: relative;border-top: 1px solid #e5e5e5e5">
            <img class="cankaoImg" :src="result.referImage1"/>
            <span class="close-detail" style="" @click="closeDetail">
                收起
                <img src="../assets/image/arrow-up.png" class="zc-icon1-img2" width="16" height="16">
            </span>
        </div>
    </div>
</template>
<script>
    import http from "@/axios"
    import Vue from "vue"

    export default {
        name:"active_child_detail",
        props:["result"],
        data(){
            return{
                detail:{},
            }
        },
        computed: {
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
        methods:{
            closeDetail() {
                this.$emit("listenToChildEvent", {name: "activity-child-list"});
            },
            commitChild(){
                var self = this;
                http.submitSeriesActivity(this.query.id,{
                    seriesId:this.detail.kid,
                    deliverImage1:"https://desk-fd.zol-img.com.cn/t_s1024x768c5/g5/M00/0F/08/ChMkJlauzFOIEC4LAAhwlr8IRvMAAH88wNxMdcACHCu543.jpg",
                    questionStatus:2,
                    lastOne:this.query.lastOne,
                },(response)=>{
                    Vue.$vux.toast.show({text:"提交成功"});
                })
            }
        }
    }
</script>
<style scoped lang="less">


    .active_child_detail {
        line-height: normal;
        .active-html {
            margin: 0 .4rem;
        }
        .goMap {
            margin: .5rem .4rem;
            color: #39393A;
            font-size: 28/50rem;
            line-height: 40/50rem;
        }
        .cankaoImg-title {
            font-size:36/50rem;
            color:rgba(74,74,74,1);
            margin-left: 40/50rem;
            font-weight: bold;
        }
        .line {
            width: 100%;
            height: 1px;
            background: #D8D8D8;
            margin-top: 10/50rem;
        }
        .cankaoImg {
            width: 320/50rem;
            height: 320/50rem;
            border-radius: 8px;
            margin-left: 20/50rem;
            margin-bottom: 20/50rem;
        }
        .close-detail {
            position: absolute;
            bottom: 20/50rem;
            right: 30/50rem;
            display: flex;
            align-items: center;
            color: #9B9B9B;
            font-size: 24/50rem;
        }
    }

    .active-child-area {
        padding: 0;
        border: 0;
        font-size: 14px;
        padding-bottom: 2px;
    }
</style>