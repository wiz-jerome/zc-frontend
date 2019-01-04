<template>
    <!-- 协同任务协同人 -->
    <div class="activity-box mg-b15 pd-10" >
        <div class="row mg-b10" style="padding: 0;width: 100%">
            <span class="font-14 f-black">协同好友</span>
            <span class="fr activity-part-btn">{{teamLength >= count?"已集齐":"未集齐"}}</span>
        </div>
        <div>
            <scroller class="join-person-scroller-box" lock-y :scrollbar-x="false">
                <div class="person-scroller-box">
                    <div v-for="(teamer,index) in team.cooperUser" :key="index"  class="person-item-scroller-box" style="vertical-align: super;">
                        <div class="first-box">
                            <img src="../assets/image/close.png" v-if="teamer.coopRoleType==1&&team.coopRoleType==0" @click="openDeleteMark(index,teamer.kid)"/>
                        </div>
                        <div class="tc width-100per p-relative">
                            <img src="../assets/image/leader.png" class="join-leader" v-if="teamer.coopRoleType==0"/>
                            <img v-loading-head :src="teamer.avatar" class="join-user-img"/>
                        </div>
                        <div class="font-12 f-light tc width-100per">
                            {{teamer.activityStatus|activityFlowName}}
                        </div>
                    </div>
                    <div class="person-item-scroller-box" @click="addTeamer" style="height: 83px;vertical-align: top;" v-if="teamLength < count">
                        <img src="../assets/image/add-teamer.png" style="margin-left: 3px;margin-top: 10px;">
                    </div>
                </div>
            </scroller>
        </div>
        <div class="sureMarkBox" v-if="sureMakeShow">
            <div class="sureMark">
                <p>踢出好友</p>
                <p>是否踢出该协同好友?他将被认定为自动取消受到惩罚!</p>
                <div class="deleteBtn">
                    <div @click="noDelete">取消</div>
                    <div @click="sureDelete()">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .person-item-scroller-box {
        height: 83px;
    }
    .sureMarkBox {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
        z-index: 11;
    }
    .sureMark {
        border-radius: 8px;
        position: absolute;

        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 11;
        background: #ffffff;
        width: 255/50*2rem;
        height: 130/50*2rem;
        padding: 60/50rem;
        p:first-of-type {
            text-align: center;
            font-size: 36/50rem;
            color: black;
        }
        p:last-of-type {
            font-size: 28/50rem;
        }
        .deleteBtn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 30/50rem;
            div {
                font-size: 36/50rem;
                text-align: center;
                border: 1px solid #fbc974;
                height: 80/50rem;
                width: 220/50rem;
                line-height: 80/50rem;
                border-radius: 80/50rem;
            }
            div:first-of-type {
                color: #fbc974;
            }
            div:last-of-type {
                background: #fbc974;
                color: #ffffff;
            }
        }
    }
    .join-person-scroller-box{
        overflow: hidden;
        width: 88vw;
        .person-scroller-box{
            display: inline-block;
            white-space:nowrap;
            height:90px;
            min-width: 88vw;
            .person-item-scroller-box{
                display: inline-block;
                box-sizing: border-box;
                width: 60px;
                background: #FFF;
                border-radius: 4px;
                padding: 2px;
                margin-right: 10px;
                .join-leader{
                    position: absolute;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    right: 8px;
                    bottom: 3px;
                }
                .join-user-img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .first-box{
                    width: 100%;
                    text-align: right;
                    height: 15px;
                    img{
                        display: inline-block;
                        width: 25px;
                        height: 25px;
                    }
                }
            }
        }
    }
</style>

<script>
    import {Scroller} from 'vux'
    import http from '@/axios'
    import Native from '@/native'

    export default {
        name:'activity_flow_team',
        components:{Scroller},
        props:["count"],
        data(){
            return{
                team:[],
                teamLength:0,
                sureMakeShow: false,
                chooseDelete: {},
            }
        },
        methods:{
            openDeleteMark(i,id) {
                this.sureMakeShow = true;
                this.chooseDelete = {
                    index: i,
                    id: id,
                }
            },
            sureDelete(){
                var userActivityId  = this.team.cooperUser[0].userActivityId;
                self = this;
                http.removeTeamerFromSynergetic(userActivityId,this.chooseDelete.id,(response)=>{
                    self.team.cooperUser.splice(this.chooseDelete.index,1);
                    this.sureMakeShow = false;
                    this.$vux.toast.show({
                        text: '成功踢出该好友！'
                    })
                })
            },
            noDelete() {
                this.sureMakeShow = false;
            },
            addTeamer(){
                try {
                   /* window.native.inviteFriend(this.team.coopInviteCode);*/
                    Native.method("inviteFriend",function (result) {

                    },this.team.coopInviteCode)
                }catch (e){
                    alert(e.toString());
                }

            }
        },
        created(){
            var param = {};
            var self = this;
            http.getSynergeticActivityTeam(this.$route.query.id,param,(response)=>{
                self.team = response.data;
                console.log(self.team)
                self.teamLength = response.data.cooperUser.length;
            });
        }
    }
</script>