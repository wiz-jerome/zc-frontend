<!-- 活动状态 -->
<template>
    <div>
        <!-- 参与情况 -->
        <div class="introduce-row tc no-border" style="padding:0.48rem 0 0 2rem;">
            <div class="detail-box" style="padding:0 0.48rem 0.48rem 0;">
                <div class="zc-introduce-box">
                    <p class="detail">
                        <!-- <img src="../assets/image/person.png"> -->
                        <span class="number">{{result.actualUser}}</span>
                        <span class="f-dark font-14">参与人数</span>
                    </p>
                </div>
                <div class="zc-introduce-box">
                    <p class="detail">
                        <!-- <img src="../assets/image/person.png"> -->
                        <span class="number">{{result.maxUser}}</span>
                        <span class="f-dark font-14">总人数</span>
                    </p>
                    <!-- <p class="f-dark font-14 mg-l5">总人数</p> -->
                </div>
                <div class="zc-introduce-box">
                    <p class="detail">
                        <!-- <img src="../assets/image/money.png"> -->
                        <span class="number">￥{{result.rewardAmount|keepTwoNumber}}</span><span class="yuan"></span>
                        <span class="f-dark font-14">奖励 元／人</span>
                    </p>
                </div>
            </div>
            <div class="line1px"></div>
        </div>
        <!-- 参与人员列表，只有商户查看详情才显示 -->
        <div class="joinBox" v-if="userType==1 && finishUser.length!== 0">
            <router-link :to="{path:'/activity/joinmembers',query:{id:result.kid}}" class="joinList">
                <img v-loading-head class="user-img" v-if="finishUser" :src="user.avatar" v-for="(user,index) in finishUser?finishUser.slice(0,5):[]" :key="index">
            </router-link>
            <div class="line1px"></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.joinBox{
    padding-left: 100/50rem;
    .joinList{
        display: flex;
        align-items: center;
        padding: 20/50rem 24/50rem 20/50rem;
        .user-img{
            width: 60/50rem;
            height: 60/50rem;
            border-radius: 50%;
            margin-right: 12/50rem;
        }
    }
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
            flex-direction: column;
            justify-content: center;
            align-items: center;
            >span{
                flex-shrink: 0;
            }
            img {
                margin-top: 1px;
                width: .6rem;
            }
            .number {
                font-size:48/50rem;
                color:#1B1B1B;
                line-height: normal;
                font-weight: bold;
                transform: scale(.6,1)
            }
            .yuan {
                margin-top: 2px;
                font-size: 18/50rem;
                color: #39393A;
            }
        }
    }
}
</style>
<script>

    export default {
        name:"activityJoin",
        props:['result','finishUser','userType'],
        data(){
            return {
                joinList:[]
            }
        },
        created() {
            this.$nextTick(function(){
                this.joinList = this.result.finishUser
                // console.log(this.result,this.result.finishCount,this.result.finishUser,this.finishUser)
            }) 
        },
        watch:{
            // 无效的监听？ 
            'result':{
                handler: function(newVal,oldVal) {
                    // console.log(newVal.finishUser)
                },
                deep: true
                // this.joinList = newVal
            },
            'finishUser':function(n,o){
                // console.log(n)
            }
        },
        methods:{
            resultChange(){
                // console.log(this.joinList)
            }
        }
    }
</script>