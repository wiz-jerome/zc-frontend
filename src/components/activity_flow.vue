<!-- 活动进展 -->
<template>
    <!--<scroller lock-x :scrollbar-y="false" ref="scroller"  class="animated fadeInRight height-55vh">-->
        <div class="row" style="padding-bottom: 10px;" ref="flowBox">
        	<!--更改，活动结束，不显示倒计时，显示“已结束”-->
            <activity-flow-count-down :time="coutDownTime" v-if="state == 0 "></activity-flow-count-down>
            
            <div class="activity-tab-header" v-if="state == 1">待审核</div>
            <div class="activity-tab-header" v-if="state == 2">待领钱</div>
            <div class="activity-tab-header" v-if="state == 3">未通过</div>
            <div class="activity-tab-header" v-if="state == 4">已完成</div>
            <div class="activity-tab-header" v-if="state == 5">已关闭</div>

            <activity-flow-team v-if="result.activityType == 2 && result.activityStatus!=5"  :count="result.coopCount"></activity-flow-team>

           <div class="activity-box font-12 f-dark mg-b15" :class="{'zc-flow-complete':point.state == 1,'zc-flow-unfinish':point.state == 0}" v-for="(point,index) in flow" :key="index">
                <div class=" zc-time-line-box">
                    <div ref="point" class="ver-center time-line-point"></div>
                </div>
                <div class=" zc-content-box">
                    <p v-for="(item,index) in point.list" :key="index" class="font-14 f-black" v-if="item.value"><span v-if="item.key">{{item.key}}</span>
                        <span class="f-dark" v-if="!item.isImg">{{item.value}}</span>
                        <img   v-if="item.isImg" :src="item.value"  v-loading-img  class="flow-img">
                    </p>
                </div>
                <div class="zc-state-box">
                    <p @click="routeInsert(index,point)" class="info-mark fr mg-r15 ver-center  time-line-btn" v-if="point.childId">{{point.stateName}}</p>
                    <div class="info-mark fr mg-r15 ver-center  time-line-btn" v-if="!point.childId">{{point.stateName}}</div>
                </div>
            </div>
            <!-- <activity-btn :result="result"></activity-btn> -->
        </div>
    <!--</scroller>-->

</template>
<style lang="less" scoped>

    .mg-b15 {
        margin-bottom: 20/50rem;
    }
    .font-14 {
        font-size: 28/50rem;
        color: #39393A;
    }

    .zc-time-line-box{
        width: 45/50rem;
        padding-left: 14px;
        display: inline-block;
        position:relative;
    }
    .zc-content-box{
        width: 70%;
        display: inline-block;
        position: relative;
    }
    .zc-state-box{
        width: 22%;
        display: inline-block;
        position: relative;
    }

    .zc-flow-complete,.zc-flow-unfinish{
        padding: 13px 0;
        display: flex;
        .time-line-point{
            width:10px;
            height: 10px;
            border-radius: 50%;
            display: inline-block;
        }
        .time-line-btn{
            /*border-radius: 12px ;*/
            /*padding: 3px 9px;*/
            text-align: center;
            font-size: 24/50rem;
            height: 40/50rem;
            width: 100/50rem; 
            line-height: 40/50rem;
            border-radius: 40/50rem;
        }
    }

    .zc-flow-complete{
        background: #FDEED5;
        .time-line-point{
            background: #FBC873;
            border:1px solid #FBC873;
        }
        .time-line-btn{
            border: 1px solid #FBC873;
            background: #FBC873;
            color: #FFFFFF;
        }
    }

    .zc-flow-unfinish{
        background: #F5F5F5;
        .time-line-point{
            background: #ffffff;
            border: 1px solid #e9e9e9;
        }
        .time-line-btn{
            border: 1px solid #FBC873;
            color: #FBC873;
        }
    }

    .activity-part-btn{
        border: 1px solid #FBC873;
        background: #FBC873;
        color: #FFFFFF;
        border-radius: 12px ;
        padding: 3px 9px;
        text-align: center;
        font-size: 12px;
        line-height: 17px;
    }

    .flow-img{
       margin-top: 10px;
        width: 70px;
        height: 70px;
        border-radius: 6px;
        display: block
    }
</style>
<script>
    import http from '@/axios'

    import store from '../store'
    import {Scroller} from 'vux'
    import activityBtn from './activity_btn'
    import activityFlowCountDown from './activity_flow_count_down'
    import activityFlowTeam from './activity_flow_team'
    import { mapState } from 'vuex'

    export default {
        name:"activity-flow",
        components:{Scroller,activityBtn,activityFlowCountDown,activityFlowTeam},
        props:['result'],
        data(){
            return{
                flow:{},
                leftTime:0,
                state:-1,
                childDoNow: 0,
                havedo: true,
                cHeight:0
            }
        },
        created() {
            // alert(JSON.stringify(this.result));
        },
        methods:{
            routeInsert(index,point) {
                // if (this.childDoNow+1 == index) {//index从1开始 所以+1
                //     this.$router.push({path:'/activity/commitoffline',query:{id:this.$route.query.id,childId:point.childId,lastOne:point.lastOne}})
                // }
                if(point.doIt && this.result) {
                    this.$router.push({path:'/activity/commitoffline',query:{id:this.$route.query.id,childId:point.childId,lastOne:point.lastOne,questionStatus:this.result.questionStatus,questionId:this.result.questionId}})
                }
            },
            initTimeLine(){
                var self = this;
                http.getUserActivityFlow(self.result.kid,(result)=>{

                    var temp = [];
                    var result = result.data;

                    var activityAuditStatus = true;
                    if(result.seriesActivity) {
                        result.seriesActivity.forEach((item,index) => {
                            // if (item.activityAuditStatus == 1 || item.activityAuditStatus == 2) {
                            //     activityAuditStatus = false;
                            //     self.childDoNow++;
                            // }

                            if (item.activityAuditStatus == 1 || item.activityAuditStatus == 2) {
                                item.doIt = false;
                            } else if (this.havedo && item.activityAuditStatus == 0) {
                                item.doIt = true;
                                activityAuditStatus = false;
                                this.havedo = false;
                            } else if (item.activityAuditStatus == 3) {
                                item.doIt = true;
                                activityAuditStatus = false;
                            } else {
                                item.doIt = false;
                            }

                        });
                        store.commit('UPDATE_ACTIVITY_AUDIT_STATUS', {activityAuditStatus: activityAuditStatus});
                    }
                    //


                    self.state = result.activityStatus;
                    // console.log(result)
                    if(!result){
                        return temp;
                    }

                    //报名时间
                    temp.push({
                        title:"报名",
                        list:[
                            {
                                key:"报名时间：",
                                value:result.joinTime
                            }
                        ],
                        stateName:result.joinTime?"已报名":"未报名",
                        state:result.joinTime?1:0,
                    });

                    //交付时间
                    if(result.activityType!=1){
                        var questionStatusName = null;
                        if(result.questionId){
                            if(result.questionStatus == 0){
                                questionStatusName = "待回答";
                            }else if(result.questionStatus == 1){
                                questionStatusName = "已完成";
                            }else if(result.questionStatus == 2){
                                questionStatusName = "已取消";
                            }
                        }

                        var param1 = [
                                {
                                    key:"交付时间：",
                                    value:result.deliverTime?result.deliverTime:"暂无"
                                },
                                {
                                    key:"交付图片：",
                                    isImg:true,
                                    value:result.deliverImage1
                                }

                            ];

                        if(questionStatusName){
                            param1.push({
                                key:"调查问卷：",
                                value:questionStatusName
                            });
                        }
                        temp.push({
                            title:"交付",
                            list:param1,
                            stateName:result.deliverTime?"已交付":"未交付",
                            state:result.deliverTime?1:0,
                        });
                    }else{
                        var childActivities = result.seriesActivity;
                        for(var i = 0;i<childActivities.length;i++){
                            var child = childActivities[i];
                            temp.push({
                                title:"子活动",
                                list:[
                                    {
                                        key:"",
                                        value:child.serialActivityName
                                    },
                                    {
                                        key:"",
                                        isImg:true,
                                        value:child.referImage1
                                    },
                                ],
                                childId:(child.activityAuditStatus != 1)?child.kid:null,
                                lastOne:child.lastOne,
                                stateName:child.activityAuditStatus == 1?"已交付":child.activityAuditStatus == 0?"未交付":child.activityAuditStatus == 2?"已通过":"未通过",
                                state:child.activityAuditStatus == 1 || child.activityAuditStatus == 2?1:0,
                                doIt: child.doIt,
                            });
                        }
                        console.log(temp)
                    }


                    if(this.result.activityForm == 0){

                        var statusName = "未提交";
                        if(result.activityStatus == 1){
                            statusName = "待审核";
                        }else if(result.activityStatus == 2 || result.activityStatus == 4){
                            statusName = "已通过";
                        }else if(result.activityStatus == 3){
                            statusName = "未通过";
                        }
                        temp.push({
                            title:"审核",
                            list:[
                                {
                                    key:"审核时间：",
                                    value:result.auditTime
                                },
                                {
                                    key:"审核状态：",
                                    value:statusName
                                },
                                {
                                    key:"审核信息：",
                                    value:result.userActivityAuditMemo
                                }
                            ],
                            stateName:statusName,
                            state:result.activityStatus==4||result.activityStatus==2?1:0,
                        });
                    }

                    //领钱时间
                    temp.push({
                        title:"领钱",
                        list:[
                            {
                                key:"领钱时间：",
                                value:result.receiveTime
                            },
                            {
                                key:"奖励金额：",
                                value:result.rewardAmount.toFixed(2)+' 元',
                            }
                        ],
                        stateName:result.receiveTime?"已领取":"未领取",
                        state:result.receiveTime?1:0,
                    });

                    if(result.cancelType == 0 ||result.cancelType == 1 || result.cancelType == 2){
                        var cancelTypeName = "主动取消";
                        if(result.cancelType == 1){
                            cancelTypeName = "系统自动取消";
                        }else if(result.cancelType == 2){
                            cancelTypeName = "活动邀请人取消了对你的活动邀请";
                        }

                        var cancelFlow = {
                            title:"取消",
                            list:[
                                {
                                    key:"取消时间：",
                                    value:result.closeTime
                                },
                               /* {
                                    key:"取消原因：",
                                    value:"暂无"
                                }*/
                            ],
                            stateName:"已取消",
                            state:1
                        };

                        for(var i = temp.length-1;i > 0;i--){
                            var d1 = new Date((cancelFlow.list[0].value+"").replace(/\-/g, "\/"));
                            var d2 = null;
                            if(temp[i].list[0].value){
                                new Date((temp[i].list[0].value+"").replace(/\-/g, "\/"));
                            }

                            if(!d2){
                                temp =  temp.slice(0,i);
                            }
                            else if(d1>d2){
                                temp = temp.slice(0,i);
                            }
                        }

                        temp.push(cancelFlow);
                    };

                    self.flow = temp;
                    console.log(self.flow);
                    self.leftTime = result.leftTime;
                    setInterval(()=>{
                        if(self.leftTime>0){
                            self.leftTime--;
                        }else{
                            clearInterval(this);
                        }

                    },1000)


                    this.$nextTick(function () {
                        var points = this.$refs.point;

                        if(!points || points.length == 0){
                            return;
                        }

                        var startPoint = points[0];
                        var endPoint = points[points.length-1];

                        var getTop = function (e) {
                            var offset=e.offsetTop;
                            if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
                            return offset;
                        }
                        var getLineHeght = function (el1,el2) {
                            return getTop(el2) - getTop(el1);
                        }

                        var insertLine = function (el1,el2,color) {
                            var defaultLine = document.createElement("div");
                            defaultLine.style.position = "absolute";
                            defaultLine.style.top = (el1.offsetTop) + "px";
                            defaultLine.style.left = (el1.offsetLeft + 5) + "px";
                            defaultLine.style.height = getLineHeght(el1,el2) + "px";
                            defaultLine.style.width = "2px";
                            defaultLine.style.background = color;

                            el1.parentNode.insertBefore(defaultLine,el1)
                        }

                        insertLine(startPoint,endPoint,"#e9e9e9");
                        for(var i = 1; i < self.flow.length; i ++ ){
                            if(self.flow[i].state == 1){
                                insertLine(points[i-1],points[i],"#FBC873");
                            }
                        }
                    })
                });
            }
        },
        computed:{
          coutDownTime(){
              var tmp = this.leftTime;
              if(tmp<0) tmp = 0;
              var hours = parseInt(tmp/(60*60));
              var minutes = parseInt((tmp-(hours*60*60))/60);
              var seconds = parseInt(tmp-hours*60*60-minutes*60);

              return {
                  hours,minutes,seconds
              };
          },
            ...mapState({
                updateStatus: state => state.activityModule.updateStatus
            })
        },
        watch:{
            "result.activityStatus":{
                handler: function (newVal,oldVal) {
                    this.initTimeLine();
                },
                deep: false
            },
            "updateStatus":{
                handler: function (newVal,oldVal) {
                    this.initTimeLine();
                },
                deep: false
            },
        },
        mounted(){
            this.initTimeLine();
            
            this.$nextTick(() => {
                console.log(this.$refs['flowBox'].clientHeight)
            })
        }
    }
</script>