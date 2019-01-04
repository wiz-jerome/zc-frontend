<template>
    <div style="width:100%;">
        <animate-get-money v-if="getMoney"></animate-get-money>
        <div ref="wrapper" class="wrapper" style="width:100%;height:90vh;">
        <!-- <div class="wrapper" style="width:100%;"> -->
            <ul class="content">
                <div class="videoBox" ref="video">
                    <activity-picture :result="result"  v-if="result.kid&&result.activityForm!=1"></activity-picture>
                    <activity-video ref='videoComponent' :result="result" :commitActivityAuto='commitActivityAuto'  v-if="result.kid&&result.activityForm==1" @listenToChildEvent="playEndState"></activity-video>
                    <!-- 活动名 -->
                    <activity-title :name="result.name"></activity-title>
                    <!-- 发布者 商户端1不显示-->
                    <activity-member-header :result="result"  v-if="result.kid && userType!=1"></activity-member-header>
                </div>
                <div class="tabs" ref='tabs' @touchstart.stop.prevent="getTab">
                    <div class="tabItem" v-for="(Titem,index) in tabList" :class="{'current':currentIndex===index}" :key="index" :data-index="index">
                        <div :data-index="index">{{Titem.name}}</div>
                        <div :data-index="index" class="botLine" v-if="currentIndex===index"></div>
                    </div>
                </div>
                <li v-for="(item,index) in tabList" :key="index" ref = "contentGroup">
                    <!-- <activity-flow :result = "result" v-if="item.name=='活动进展'"></activity-flow> -->
                    <activity-introduce :result="result" v-if="item.name=='活动介绍'"></activity-introduce>
                    <!-- <activity-state :result = "result" v-if="item.name=='活动状态'"></activity-state> -->
                    <!-- 参与情况/活动状态 -->
                    <activity-join :result="result" :finishUser = "finishUser" :userType='userType' v-if="item.name=='活动状态'"></activity-join>

                    <activity-common-require :result = "result" v-if="item.name=='活动要求' || item.name == '竞猜规则'"></activity-common-require>
                    <activity-require :result = "result" v-if="item.name=='子任务'"></activity-require>
                    <activity-questionnaire :result = "result" v-if="item.name=='调查问卷' || item.name == '竞猜答题'"></activity-questionnaire>
                    <!-- 视频活动的活动要求下有线 -->
                    <div class="line1px" v-if="result.activityForm===1&&index===0"></div>
                </li>
                <!-- 标签 -->
                <activity-tags :labels="result.activityLabel" :type='1'></activity-tags>
            </ul>
            <!-- <div class="btn">
                <activity-btn :result="result"></activity-btn>
            </div> -->
            <!-- 固定顶部tab栏 -->
            <div class="tabs tabFixed" v-if="-scrollY >= listHeight[0]"  @touchstart.stop.prevent="getTab">
                <div class="tabItem" v-for="(Titem,index) in tabList" :class="{'current':currentIndex===index}" :key="index" :data-index="index">
                    <div :data-index="index">{{Titem.name}}</div>
                    <div :data-index="index" class="botLine" v-if="currentIndex===index"></div>
                </div>
            </div>
            <awaken-app v-if="awakenApp&&result.kid" :result="result"></awaken-app>
        </div>
         <!-- 按钮 商户端不显示-->
        <activity-bottom-btn v-if="userType!=1" ref="bottomBtn" :result="result" @startPlayVideo = 'startPlay'></activity-bottom-btn>
        
    </div>
</template>

<style scoped lang="less">
.tagBox {
    list-style: none;
    margin-top: 1rem;
    overflow: hidden;
    padding: 20/50rem 0.48rem 42/50rem 2rem;
    .li {
        float: left;
        font-size: 24/50rem;
        padding: 0 20/50rem;
        height: 40/50rem;
        line-height: 40/50rem;
        border: 1px solid #979797;
        border-radius: 8/50rem;
        margin-right: 20/50rem;
        margin-top: 0.2rem;
    }
}
.btn{
    position: fixed;
    bottom: 1rem;
}
.boxRem{
    height: 1rem;
}
.tabFixed{
    position: fixed;
    top:0;
    width: 100%;
}
    .video{
        width: 100%;
        height: 10rem;
        background: skyblue;
    }
    .tabs{
        height: 50/50rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #ffffff;
        padding-top: 20/50rem;
        border-bottom: 2/50rem solid #D8D8D8;
        .tabItem{
            font-size:28/50rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items:center;
            .botLine{
                height: 4/50rem;
                width: 40/50rem;
                background: #FFB433;
            }
        }
        .current{
            color: #FFB433;
        }
    }
    .content0{
        height: auto;
    }
    .content1{
        background: burlywood;
    }
    .content3{
        background: peru;
    }
</style>

<script>
    import http from '../axios';
    import store from '../store'
    import * as constant  from '@/constant'
    import { mapState } from 'vuex'
    import BScroll from 'better-scroll'

    import activityPicture from '../components/activity_picture'
    import activityVideo from '../components/activity_video'
    // import activityFlow from '../components/activity_flow'//活动流程（舍弃）
    import activityIntroduce from '../components/activity_introduce'
    import activityState from '../components/active_state' 
    import activityRequire from '../components/activity_require'
    import activityCommonRequire from '../components/activity_common_require'
    import activityQuestionnaire from '../components/activity_questionnaire'
    import awakenApp from '../components/awaken_app'
    // import activityBtn from '../components/activity_btn'//底部参与按钮
    import activityJoin from "../components/activityJoin"
    import animateGetMoney from '../components/animate_getmoney'
    import activityTags from '../components/activityTags'
    import activityMemberHeader from '../components/activity_member_header'
    import activityTitle from '../components/activityTitle'
    import activityBottomBtn from '../components/activityBottomBtn'
    import { setTimeout } from 'timers';
    
    export default {
        name : "activity",
        data(){
            return {
                awakenApp:constant.PRODUCTION_ENV!=0,
                tabList:[],
                activityId:this.$route.query.id,
                result:{},
                finishUser:[],
                listHeight:[],
                scrollY:-1,
                currentIndex:0,
                tagList:[],
                dialogShow:true,//是否显示问卷弹窗
                userType:this.$route.query.userType,//用户类型1商家，0普通用户
            }
        },
        computed:{
            ...mapState({
                activityStatus: state => state.activityModule.activityStatus,
                join: state => state.activityModule.join,
                getMoney: state => state.activityModule.getMoney
            }),
           
        },
        components:{
            BScroll,
            // activityFlow,
            activityIntroduce,activityState,activityRequire,
            activityCommonRequire,activityQuestionnaire,activityVideo,activityPicture,
            awakenApp,
            // activityBtn,
            activityMemberHeader,activityTitle,activityJoin,
            activityBottomBtn,animateGetMoney,activityTags
        },
        created(){
            // this.$vux.loading.show({
            //     text: 'Loading'
            // })
            
            store.commit('HTTP_LOADING', {httpLoading:true})

            // alert(window.location.href);
            // alert(JSON.stringify(this.$route.query));
        },
        mounted () {
            // window.addEventListener('scroll', this.handleScroll)
            // betterScroll
            this.$nextTick(() => {
                // store.commit('HTTP_LOADING', {httpLoading:false})
                this.scroll = new BScroll(this.$refs.wrapper,{
                    click:true,//允许点击子元素
                    probeType: 3,
                })
                // console.log('改变')
                
                this.scroll.on('scroll', (pos) => {
                    // 滚动
                    this.scrollY = pos.y
                    // console.log(pos.y,this.scrollY)
                })  
            })
            setTimeout(() => {
                // store.commit('HTTP_LOADING', {httpLoading:false})
            }, 20);
            
            var _this = this
            http.activityDetail(this.activityId,function(response) {
                // console.log(response)
                _this.result = response.data;
                _this.tagList = JSON.parse(_this.result.activityLabel)
                // console.log(_this.tagList)
                // console.log(_this.result)
                switch(_this.result.activityForm){
                    case 0:
                        document.title = '线下活动'
                        break;
                    case 1:
                        document.title = '视频活动'
                        break;
                    case 2:
                        document.title = '问卷活动'
                        break;
                    case 3:
                        document.title = '资讯活动'
                        break;
                    case 4:
                        document.title = '竞猜活动'
                        break;
                    default:
                        document.title = _this.result.name;
                }
                store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus: response.data.cancelType&&response.data.cancelType===2?5:response.data.activityStatus});//如果被踢了(2)，则返回活动状态为5(关闭状态)
                store.commit('UPDATE_JOIN', {join: response.data.join})
                store.commit('QUESTION_STATUS', response.data.questionStatus);
            })
            // 用户为商户 才能看到参与人员列表
            if(_this.userType==1){
                // 获取参与人员列表
                http.getMoneyUserList({
                    id:_this.activityId,
                    currentResult:0,
                    pageSize:5
                }, function (response) {
                    _this.finishUser = response.data;
                    // console.log(_this.result)
                    store.commit('HTTP_LOADING', {httpLoading:false})
                })

            }
        },
        updated() {
            
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
        methods:{
            // 播放视频
            startPlay(){
                // console.log(this.$refs.videoComponent)
                // 播放视频
                this.$refs.videoComponent.clickPlayBtn()
            },
            commitActivityAuto(){
                this.$refs.bottomBtn.commitActivity()
            },           
            // 滚动
            handleScroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                // console.log(scrollTop)
                this.scrollY = -scrollTop
            },
            getTab(e){
                // console.log(e.target)
                let heightIndex = parseInt(e.target.dataset.index)
                this.scrollY = -this.listHeight[heightIndex]
                // 原生滚动
                // document.body.scrollTop = this.listHeight[heightIndex];
                // window.pageYOffset = this.listHeight[heightIndex]
                // document.documentElement.scrollTop = this.listHeight[heightIndex]

                // betterScroll滚动
                this.scroll.scrollTo(0,-this.listHeight[heightIndex],0)
            },
            // 视频播放 结束
            playEndState(data){
                this.result.hasPlay = data;
                
                // console.log("自动提交任务")

            },
            _calculateHeight() {
                this.listHeight = []
                let height = 0
                // console.log(this.$refs)
                for(let index in this.$refs){
                    if(index!=='wrapper'){
                        if(index!=='contentGroup' && index!=='tabs' && index !== 'bottomBtn' && index !== 'videoComponent'){
                            let item = this.$refs[index]
                            height += item.clientHeight
                            this.listHeight.push(height)
                        }else if(index=='contentGroup'){
                            for(let i in this.$refs.contentGroup){
                                let item1 = this.$refs.contentGroup[i]
                                height += item1.clientHeight
                                // console.log(item1.clientHeight)
                                this.listHeight.push(height)
                            }
                        }
                        // console.log("ref",this.$refs[index])
                    }
                }
                // console.log(this.listHeight)
                store.commit('HTTP_LOADING', {httpLoading:false})
            },
            initTab(join){
                this.tabList = [];
                // tab不显示活动进展
                
                // console.log(join);
                // if(join){
                //     this.tabList.push({
                //         name:"活动进展",
                //         key:"activity-flow"
                //     });
                // }
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

                // console.log(this.tabList);
                this.tabList.push({
                    name:"活动介绍",
                    key:"activity-introduce"
                })
                
                this.tabList.push({
                    name:"活动状态",
                    key:"activity-state"
                })
            }
        },
        
        watch:{
            // 根据滚动高度改变tab的currentIndex
            'scrollY':function(newY,oldVal) {
                const listHeight = this.listHeight
                // 当滚动到顶部，newY>0
                if (-newY < listHeight[0]) {
                    this.currentIndex = 0
                    return
                }
                // 在中间部分滚动
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i]
                    let height2 = listHeight[i + 1]
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i
                        return
                    }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 1
            },
            result() {
                this.$nextTick(()=>{
                    this._calculateHeight()
                    // console.log(this.data)
                })
                setTimeout(() => {
                    this._calculateHeight()
                    // console.log(this.data)
                }, 20)
                // this.tagList = JSON.parse(this.result.activityLabel)
            },
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
            },
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
            'result.finishUser':{
                handler: function (newVal,oldVal) {
                    this.result.finishUser = newVal
                },
                deep: true
            }
        }
    }
</script>