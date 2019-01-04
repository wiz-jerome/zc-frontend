<!-- 参与活动人列表 -->
<template>
    <!-- <div> -->
        <!-- <scroller class="contain" lock-x :scrollbar-y="false" ref="scroller" v-model="scrollerStatus"
                :use-pulldown=true :use-pullup="hasMore"


                :pulldown-config="{
                    downContent: '下拉刷新',
                    upContent: '释放后更新'}"
                :pullup-config="{
                    upContent: '上拉加载更多',
                    downContent: '释放后加载'}"
                @on-pulldown-loading="pageNo = 1;getArticleList()"
                @on-pullup-loading="pageNo++;getArticleList()">
            <div class="top">
                
            </div>
            <div style="box-sizing: border-box" class="list">
                <div v-for="(member,index) in memberList" :key="index" v-if="memberList.length != 0">
                    <div class="con">
                        <div class="userInfo">
                            <img v-loading-head :src="member.avatar" class="join-member-img"/>
                            <span class="username">{{member.name}}</span>
                        </div>
                        <span class="amount">活动金额 {{member.amount}}</span>
                    </div>
                    <div class="line1px"></div>
                </div>
                <img src="../assets/image/no-data.png" style="width: 100%;margin-top: 100px;" v-if="memberList.length == 0"/>
            </div>
        </scroller> -->
    <!-- </div> -->
    <div>
        <div class="topBg">
            <div class="top">
                活动总金额<span>{{totalAmount}}</span>元
            </div>    
        </div>
        <div ref="wrapper" class="wrapper">
            <ul class="content">
                <li class="topLoading">
                    <div class="pullDown">
                        <img v-if="!isReleased" src='../assets/image/down.png' />
                        <img v-if="isReleased" class="loading" src="../assets/image/loading.png" />
                        <span>释放刷新</span>
                    </div>
                    <!-- <img src="../assets/image/loading.png" /> -->
                </li>
                <li v-for="(member,index) in memberList" :key="index" v-if="memberList.length != 0" style="overflow:hidden;">
                    <div class="con">
                        <div class="userInfo">
                            <img v-loading-head :src="member.avatar" class="join-member-img"/>
                            <span class="username">{{member.name}}</span>
                        </div>
                        <span class="amount">活动金额 {{member.amount}}</span>
                    </div>
                    <div class="line1px" style="transform:scale(1, 0.5) translateX(2rem)"></div>
                </li>
                <li class="botLoading">
                    <div class="pullUp" v-if="isPullup&&isMore">
                        <img class="loading" src="../assets/image/loading.png"/>
                        <span>加载更多</span>
                    </div>
                    <div class="pullUp" v-if="!isMore">没有更多数据了</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
.topLoading{
    .pullDown{
        display:flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100/50rem;
        font-size:28/50rem;
        color:#bfbfbf;
        >img{
            width: 50/50rem;
            height: 50/50rem;
            margin-right: .3rem;
        }
    }
}
.loading{
    animation: loading 1.5s linear infinite ;
}
.botLoading{
    .pullUp{
        font-size:28/50rem;
        color:#bfbfbf;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80/50rem;
        >img{
            width:1rem;
            height: 1rem; 
            margin-right: .3rem;
        }
    }
}
@keyframes loading{
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
}
@-webkit-keyframes loading {
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
}
@-o-keyframes loading {
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
}
@-ms-keyframes loading {
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
}
@-moz-keyframes loading {
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
}
.contain{
    width: 100vw;
}
.topBg{
    position:fixed;
    padding:0 25/50rem;
    height: 100/50rem;
    margin:0 auto;
    z-index:999;
    background: #fff;
    .top{
        width: 702/50rem;
        height: 100/50rem;
        background: url(../assets/image/joinListTopBg.png) no-repeat center;
        background-size: 100% 100%;
        font-size:32/50rem;
        color:#1B1B1B;
        text-align:center;
        font-weight: 600;
        line-height: 100/50rem;
        letter-spacing: 6/50rem;
        >span{
            color: #F34A32;
            font-size:42/50rem;
        }
    }
}
    // .xs-plugin-pulldown-container,.xs-plugin-pulldown-loading,.xs-plugin-pullup-container,.xs-plugin-pullup-loading {
    //     font-size: 12px;
    // }
    .wrapper{
        height: 100vh;
        // margin-top: 100/50rem;
        .content{
            padding: 0 54/50rem;
            width: 100vw;
            box-sizing: border-box;
            .con{
                box-sizing:border-box;
                padding: 30/50rem 34/50rem 30/50rem 24/50rem;
                display:flex;
                justify-content: space-between;
                align-items:center;
                .userInfo{
                    display: flex;
                    align-items: center;
                    >img{
                        width: 60/50rem;
                        height: 60/50rem;
                        display:block;
                        border-radius: 50%;
                        margin-right: 20/50rem;
                    }

                    .username{
                        font-size:28/50rem;
                        color: #030303;
                        line-height: 40/50rem;
                        width: 300/50rem;
                        overflow: hidden;
                        white-space: no-wrap;
                        text-overflow: ellipsis;
                    }
                }
                .amount{
                    font-size: 24/50rem;
                    color: #FFB433;
                }
            }

        }
    }
    
</style>
<script>
    import Scroller from "vux/src/components/scroller/index";
    import http from "@/axios"
    import BScroll from 'better-scroll'
    import { Store } from 'vuex';
    import store from '../store'
    export default {
        components: {Scroller},
        name:"join_activity_member_list",
        props:['result'],
        data(){
            return{
                activityId:this.$route.query.id,
                memberList:[],
                hasMore:true,
                pageNo:1,
                scrollerStatus: {
                    pullupStatus: 'default'
                },
                totalAmount:0,//总金额
                total:0,//总人数
                isReleased:false,//下拉刷新是否释放
                isPullup:false,//是否处于上拉加载状态
                isMore:true,//是否有更多数据
                // upobj: {
                //     content: '请上拉刷新数据',
                //     pullUpHeight: 60,
                //     height: 40,
                //     autoRefresh: false,
                //     downContent: '请上拉刷新数据',
                //     upContent: '请上拉刷新数据',
                //     loadingContent: '<span style="color: red">加载中...</span>',
                //     clsPrefix: 'xs-plugin-pullup-'
                // },
            }
        },
        mounted(){
            this.getArticleList();
            this.$nextTick(() => { 
                this.scroll = new BScroll(this.$refs.wrapper,{
                    click:true,//允许点击子元素
                    probeType: 3,
                    pullDownRefresh: {
                        threshold: 50,
                        stop: 40
                    },
                    pullUpLoad: {
                        threshold: 0
                    }
                })
                this.scroll.on('pullingDown',()=>{
                    console.log('下拉刷新')
                    this.isReleased = true
                    this.pageNo =1
                    this.getArticleList()

                })

                this.scroll.on('pullingUp',()=>{
                    console.log('上拉加载')
                    this.isPullup = true
                    if(this.memberList.length === this.total){
                        this.isMore = false
                    }
                    console.log(this.memberList.length,this.totalAmount,this.isMore)
                    this.pageNo += 1
                    this.getArticleList()
                })
            })
        },
        methods:{
            getArticleList(){
                var current = (this.pageNo - 1) * 15;
                var self = this;
                http.getMoneyUserList({
                    id:this.activityId,
                    currentResult:current,
                    pageSize:15
                },function (response) {
                    if(current==0){
                        self.totalAmount = response.total * response.data[0].amount
                        self.total = response.total
                    }
                    if(response.total > (current + 15)){
                        self.scrollerStatus.pullupStatus = 'default'
                        self.hasMore = true;
                    }else{
                        self.scrollerStatus.pullupStatus = 'disabled'
                        self.hasMore = false;
                    }

                    if(self.pageNo == 1){
                        self.memberList = [];
                    }
                    self.memberList = self.memberList.concat(response.data);
                    self.$nextTick(function () {
                        self.scroll.refresh();
                        self.scroll.finishPullUp()
                        self.scroll.finishPullDown()
                        // self.$refs.scroller.donePulldown()
                        self.isReleased = false
                        self.isPullup = false
                    })
                    store.commit('HTTP_LOADING', {httpLoading:false})
                })
            }
        },
        
    }
</script>