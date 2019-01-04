<!-- 子活动列表 -->
<template>
    <div class="row transition-all-2" style="padding-bottom: 10px">
        <div class="activity-tab-header">子任务</div>
        <div class="activityBox" v-for="(child,index) in childrenList" :key="index"><!-- kid -->
            <div class="list">
                <span class="title-box">
                    <span>

                        <img src="../assets/image/star.png" class="zc-icon1-img1" width="14" height="14" style="margin-top: -1px">
                    </span>
                    <span class="list-title">{{child.serialActivityName}}</span>
                </span>
                <span v-if="showDetail != child.kid" @click="goDetail(child.kid,index)" class="fr">
                    <span class="font-12 f-light" >展开</span>
                    <img src="../assets/image/arrow-down.png" class="zc-icon1-img2" width="16" height="16">
                </span>
            </div>
            <active-child-detail :result="child" v-if="showDetail == child.kid" @listenToChildEvent="closeDetail"></active-child-detail>
        </div>

        <activity-btn :result="result"></activity-btn>
    </div>
</template>
<style lang="less" scoped>

    .activityBox {
        height: 100%;
        min-height: 120/50rem;
        background:rgba(245,245,245,1);
        border-radius: 8px;
        margin-bottom: 20/50rem;
        .list {
            height: 120/50rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .zc-icon1-img1 {
                margin-left: 40/50rem;
            }
            .title-box {
                display: flex;
                align-items: center;
            }
            .list-title {
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                width: 448/50rem;
                display: inline-block;
                color: #4A4A4A;
                font-size: 28/50rem;
            }
            .fr {
                margin-right: 30/50rem;
                display: flex;
                align-items: center;
                span {
                    font-size: 24/50rem;
                    color: #9B9B9B;
                }
            }
        }
    }


    .pd-tb-16{
        padding-top: 16px;
        padding-bottom: 16px;
    }

    .zc-child-activity-box{
        display: inline-block;
        width: 70%;
        vertical-align: middle;
        text-align:left;
    }

    .zc-icon1-img1{
        vertical-align: middle;
        display: inline-block;
        margin-right: 5px;
    }

    .zc-icon1-img2{
        vertical-align: middle;
        display: inline-block;
    }
</style>
<script>
    import activityBtn from './activity_btn'
    import http from '../axios'
    import activeChildDetail from './active_child_detail'

    export default {
        name:"activity-child-list",
        components:{activityBtn,activeChildDetail},
        props:['result'],
        data(){
            return{
                childrenList:[],
                showDetail:-1,
            }
        },
        created(){
            var self = this;
            http.getChildrenList(this.result.kid,(response)=>{
                self.childrenList = response.data;
            })
        },
        methods:{
            goDetail(kid,index){
                this.showDetail = kid;

            },
            closeDetail(){
                this.showDetail = -1;
            }
        }
    }
</script>