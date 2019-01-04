<template>
    <div :class="{'ov-h':!awakenApp}">
        <awaken-app v-if="awakenApp&&result.kid" :result="result"></awaken-app>
        <animate-get-money v-if="getMoney"></animate-get-money>
        <div class="activity-header-box">
            <activity-member-header :result="result"  v-if="result.kid"></activity-member-header>
            <!--图片组件-->
            <activity-picture :result="result"  v-if="result.kid&&result.activityForm!=1"></activity-picture>
            <!--视频组件-->
            <activity-video :result="result"  v-if="result.kid&&result.activityForm==1" @listenToChildEvent="playEndState"></activity-video>
            <!--tab栏及对应详情 组件-->
            <activity-tab :result="result"  v-if="result.kid"></activity-tab>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .activity-header-box {
        padding-top: 0;
        font-size: 1px;
    }
</style>
<script>
    import http from '../axios';
    import store from '../store'
    import { mapState } from 'vuex'
    import * as constant  from '@/constant'

    import activityMemberHeader from '../components/activity_member_header'
    import activityPicture from '../components/activity_picture'
    import activityVideo from '../components/activity_video'

    import activityTab from '../components/activity_tab'
    import awakenApp from '../components/awaken_app'
    import animateGetMoney from '../components/animate_getmoney'

    export default {
        name : "activity",
        data(){
            return {
                result:{},
                activityId:this.$route.query.id,
                awakenApp:constant.PRODUCTION_ENV!=0,
            }
        },
        computed:{
            ...mapState({
                activityStatus: state => state.activityModule.activityStatus,
                join: state => state.activityModule.join,
                getMoney: state => state.activityModule.getMoney
            })
        },
        components:{
            activityMemberHeader,activityPicture,activityTab,activityVideo,awakenApp,animateGetMoney
        },
        methods:{
            playEndState(data){
                this.result.hasPlay = data;
            },

            closeDialog(){
                this.dialogShow = false;
            }
        },
        
        watch:{
            activityStatus:{
                handler: function (newVal,oldVal) {
                    // console.log(newVal);
                    this.result.activityStatus = newVal;
                },
                deep: true
            },
            join:{
                handler: function (newVal,oldVal) {
                    this.result.join = newVal;
                },
                deep: false
            }
        },
        
        created(){
            // alert(JSON.stringify(this.$route.query));
            // alert(window.location.href);
            this.$nextTick(function () {
                var self = this;
                http.activityDetail(this.activityId,function(response) {
                    self.result = response.data;
                    // console.log(self.result)
                    document.title = self.result.name;
                    store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus: response.data.cancelType&&response.data.cancelType===2?5:response.data.activityStatus});//如果被踢了(2)，则返回活动状态为5(关闭状态)
                    store.commit('UPDATE_JOIN', {join: response.data.join})
                    store.commit('QUESTION_STATUS', response.data.questionStatus);

                    http.getMoneyUserList({
                        id:self.activityId,
                        currentResult:0,
                        pageSize:5
                    }, function (response) {
                        self.result.finishUser = response.data;
                    })
                })
            })
        }
    }
</script>