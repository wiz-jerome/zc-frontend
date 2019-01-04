<template>
    <div>
        <tab class="row" v-model="tabIndex" prevent-default >
            <tab-item  v-for="(tab,index) in tabList" :key="index"><span @click="switchTab(tab.key,index)" class="full-box">{{tab.name}}</span></tab-item>
        </tab>
        <div class="tab_box" ref="tabBox" style="overflow: scroll;position: absolute; left: 0;
    overflow-x: hidden;">
            <!--<p v-if="isOver" class="over">活动已结束</p>-->
            <component :is="tabName" :result="result" v-if="result.kid" class="activity-child"></component>
            <div style="width: 2px;height: 34px;" v-if="isIphoneX"></div>
        </div>
    </div>
</template>
<style lang="less">
    .over {
        text-align: center;
        margin-top: 5rem;
        font-size: 1rem;
    }
    .vux-tab .vux-tab-item.vux-tab-selected{
        color: #FBC873 !important;
        border-bottom: 3px solid #FBC873 !important;
    }
    .vux-tab-ink-bar{
        background: #FBC873 !important;
    }
    .full-box{
        display: inline-block;
        width: 100%;
        height: 100%;
    }
    .tab_box {
        width: 100%;
        /*padding-bottom: 34px;*/
    }
</style>
<script>
    import {Tab, TabItem} from 'vux'
    import { mapState } from 'vuex'

    import activityFlow from '../components/activity_flow'
    import activityIntroduce from '../components/activity_introduce'
    import activityState from '../components/active_state'

    import activityRequire from '../components/activity_require'
    import activityCommonRequire from '../components/activity_common_require'
    import activityQuestionnaire from '../components/activity_questionnaire'

    export default {
        name:"activity_tab",
        props:["result"],
        mounted() {
            // console.log(this.$refs.aaa.getBoundingClientRect());
            let bodyH = document.body.offsetHeight;
            // console.log(bodyH);
            this.$refs.tabBox.style.height = bodyH - this.$refs.tabBox.getBoundingClientRect().top + 'px'
        },
        data(){
            return{
                tabList:[],
                tabName: this.result.join  ? 'activity-flow':(this.result.activityType == 1?'activity-require':(this.result.activityForm == 2 || this.result.activityForm == 4?'activity-introduce':'activity-common-require')),
                tabIndex:this.result.join  ? 0:(this.result.activityForm == 2 || this.result.activityForm == 4?0:1)
            }
        },
        computed:{
            ...mapState({
                activityStatus: state => state.activityModule.activityStatus
            }),
            isIphoneX(){
                return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
            },
            // isOver() {
            //     return new Date().getTime()-new Date(this.result.endTime).getTime()>=0
            // }
        },
        components:{ Tab,TabItem,
                     activityFlow,activityIntroduce,activityState,
                     activityRequire,activityCommonRequire,activityQuestionnaire
                    },
        methods:{
            switchTab (name,index) {
                this.tabName = name;
                this.tabIndex = index;
            },
            initTab(join){
                this.tabList = [];
                // console.log(join);
                if(join){
                    this.tabList.push({
                        name:"活动进展",
                        key:"activity-flow"
                    });
                }
                // console.log(this.tabList);
                this.tabList.push({
                    name:"活动介绍",
                    key:"activity-introduce"
                })

                if(this.result.activityType == 1) {
                    this.tabList.push({
                        name: "子任务",
                        key: "activity-require"
                    })/**/
                }else if (this.result.activityForm == 2){
                    this.tabList.push({
                        name: "调查问卷",
                        key: "activity-questionnaire"
                    })
                }else if (this.result.activityForm == 4){
                    this.tabList.push({
                        name:"竞猜规则",
                        key:"activity-common-require"
                     })
                    this.tabList.push({
                        name: "竞猜答题",
                        key: "activity-questionnaire"
                    })
                }
                else{
                    this.tabList.push({
                        name:"活动要求",
                        key:"activity-common-require"
                    })
                }


                this.tabList.push({
                    name:"活动状态",
                    key:"activity-state"
                })
            }
        },
        watch:{
            "result.join":{
                handler: function (newVal,oldVal) {
                  if(newVal === false) {
                    this.tabIndex = 1;
                    this.initTab(newVal);
                    this.tabName = "activity-common-require";
                    return;
                  }
                  if(this.result.activityForm ===4) {
                    this.tabIndex = 3;
                    this.initTab(newVal);
                    this.tabName = "activity-questionnaire";
                  }else {
                    this.tabIndex = 0;
                    this.initTab(newVal);
                    this.tabName = "activity-flow";
                  }
                },
                deep: true
            },
            "activityStatus":{
                handler: function (newVal,oldVal) {
                  if(this.result.activityForm ===4) {
                    this.tabIndex = 3;
                    this.initTab(this.result.join);
                    this.tabName = "activity-questionnaire";
                  }else {
                    this.tabIndex = 0;
                    this.initTab(this.result.join);
                    this.tabName = "activity-flow";
                  }
                },
                deep: true
            },
            'result.activityStatus':{
                handler: function (newVal,oldVal) {
                    // console.log(newVal);
                },
                deep: true
            },
        },
        created(){
            this.initTab(this.result.join);
        }
    }
</script>