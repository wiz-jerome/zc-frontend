<!-- 提交线下活动 -->
<template>
    <div style="width:100%;position: relative;height: 100vh;overflow: auto;">
        <div class="font-28 f-8f tit" style="padding:0 8px;">
            活动示意图
        </div>
        <div>
            <img v-loading-img :src="img" style="width: 14.04rem;display:block;margin:0 auto;">
        </div>
        <div class="font-28 f-8f tit" style="padding:0 8px;">
            上传活动照片
        </div>
        <div>
            <div v-if="!picture.picture" @click="takePhoto" class="tc" style="width: 14.04rem;height: 7.92rem;border: 1px dashed black;border-radius: 8px;margin:0 auto;display:flex;justify-content:center;align-items:center;">
                <img src="../assets/image/add-picture.png" style="width: 30px;height: 30px;"/>
            </div>
            <!-- 点击图片再次调摄像头上传图片 -->
            <img v-if="picture.picture" v-loading-img :src="picture.picture" style="width: 14.04rem;display:block;margin:0 auto;" @click="takePhoto">
            <!-- <a  v-if="picture.picture"  @click="deleteImg"  class="font-12 mg-t5" style="display: block;padding: 3px 0vh;text-align: center;width: 23vw;border-radius: 12px;color: #979797;background: #FFFFFF;border: 1px solid #979797;">删除</a> -->
        </div>
        <div class="mg-t15" v-if="!$route.query.childId"  style="width: 100%;text-align: center;">
            <a @click="commitActivity" class="subBtn">提交</a>
        </div>

        <div class="mg-t15" v-if="$route.query.childId"  style="width: 100%;text-align: center;">
            <a @click="commitChildActivity" class="subBtn">提交</a>
        </div>

        <!-- 弹窗问卷  -->
        <!-- <div v-transfer-dom>
            <x-dialog v-model="dialogShow"  hide-on-blur :dialog-style="{ width: '93%','max-width': '100%','height':'100%','background-color': 'transparent'}">
                <dialog-questionnaire :result="result" :questionRequest="questionRequest" :callback="$route.query.childId?commitChildActivity2:commitActivity2"  v-if="result.kid"  @closeDialog="closeDialog"></dialog-questionnaire>
            </x-dialog>
        </div> -->
<!-- 问卷弹窗 -->
        <div class="dialogQuestion" v-if="dialogShow">
            <div class="box">
                <dialog-questionnaire :result="result" :questionRequest="questionRequest" :callback="$route.query.childId?commitChildActivity2:commitActivity2"  v-if="result.kid" @closeDialog="closeDialog"></dialog-questionnaire>
            </div>
        </div>   
    </div>
</template>
<style lang="less" scoped>
.dialogQuestion{
	width: 100%;
	height: 100%;
	z-index: 998;
	background: rgba(0,0,0,.6);
	position: fixed;
	top: 0;
	left: 0;
	margin: 0 auto;
    .box{
    	position: fixed;
    	z-index: 999;
        width: 682/50rem;	
    	top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
    }
}
.tit{
    margin:40/50rem 0 20/50rem;
}
.subBtn{
    display:block;
    margin: 90/50rem auto;
    width: 702/50rem;
    height: 80/50rem;
    background: #000000;
    color: #ffffff;
    border-radius:8px;
    font-size:36/50rem;
    line-height: 80/50rem;
}
</style>

<script>
    import http from "@/axios"
    import store from "@/store"
    import { mapState } from 'vuex'
    import Vue from "vue"
    import native from "@/native"
    import {XDialog,TransferDomDirective as TransferDom} from 'vux'
    import dialogQuestionnaire from '../components/dialog_questionnaire'

    export default {
        name:"commit_offline_activity",
        data(){
            return{
                dialogShow:false,
                result:{},
                activityCode:null,
                img: '',
                questionRequest:''
            }
        },
        computed:{
            ...mapState({
                picture: (state) => {
                    if(state.activityModule.picture){
                        return {
                            picture:state.activityModule.picture.picture,
                            code:state.activityModule.picture.code,
                        }
                    }else{
                        return {}
                    }

                },
                uuid: (state) => state.userModule.uuid,
                questionStatus: state => state.activityModule.questionStatus,
            })
        },
        methods:{
            takePhoto(){
                var activityCode = this.result.activityCode?this.result.activityCode:"-1";
                if(this.result.ifCheck === 0) {
                    activityCode = '-1';
                }
                try {
                    native.method("takePhoto",function (result) {
                        console.log("调用成功");


                    },activityCode)
                }catch (e){
                    alert(e);
                }

            },
            deleteImg(){
                store.commit("OFFLINE_IMG",{picture:null,code:'-1'});
            },
            commitChildActivity(){
                if(!this.picture.picture){
                    Vue.$vux.toast.show({text:"请上传活动图片",type:"text"});
                    return;
                }
                if(this.$route.query.lastOne == 1 && this.$route.query.questionStatus ===0) {
                    this.dialogShow = true;
                }else {
                    this.commitChildActivity2(0);
                }
            },
            commitChildActivity2(result){
                var self = this;
                var temp = {
                    uicode:self.uuid,
                    seriesId:this.$route.query.childId,
                    deliverImage1 :this.picture.picture,
                    questionStatus :result ,
                    lastOne:this.$route.query.lastOne,
                }
                if(this.picture.code != -1 && this.picture.code != "-1"){
                    temp.activityCode = this.picture.code;
                }
                http.commitChildActivity(this.$route.query.id,temp,(response)=>{
                    store.commit('HTTP_LOADING', {httpLoading:false})
                    Vue.$vux.toast.show({text:"提交成功"});
                    store.commit("OFFLINE_IMG",{picture:null,code:'-1'});
                    self.$router.go(-1);
                    if(this.$route.query.lastOne==1){
                        store.commit('UPDATE_STATUS');
                        store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus:1})
                    }else{
                        store.commit('UPDATE_STATUS');
                        // store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus:1})
                    }
                })
            },
            commitActivity(){
                var self = this;
                if(!this.picture.picture){
                    Vue.$vux.toast.show({text:"请上传活动图片",type:"text"});
                    return;
                }
                http.activityDetail(self.$route.query.id,function(response) {
                    store.commit('HTTP_LOADING', {httpLoading:false})
                    if(response.data.questionStatus == 0){
                        self.dialogShow = true;
                    }else{
                        self.commitActivity2();
                    }
                })
            },
            commitActivity2(result){
                var self = this;
                var temp = {
                    uicode:self.uuid,
                    activityForm :0,
                    deliverImage1 :this.picture.picture,
                    questionStatus :result,
                }

                if(this.picture.code != -1 && this.picture.code != "-1"){

                    temp.activityCode = this.picture.code;
                }

                http.submitActivity(this.$route.query.id,temp,function (response) {
                    store.commit('HTTP_LOADING', {httpLoading:false})
                    Vue.$vux.toast.show({text:"提交成功"});
                    store.commit("OFFLINE_IMG",{picture:''});
                    store.commit("OFFLINE_CODE",'');
                    self.$router.go(-1);
                    store.commit('UPDATE_ACTIVITY_STATUS', {activityStatus:1})
                });
            },
            closeDialog(){
                this.dialogShow = false;
            }
        },
        directives: {
            TransferDom
        },
        components:{
            XDialog,dialogQuestionnaire
        },
        created(){
            var self = this;
            if (this.$route.query.childId) {
                http.activityDetail(self.$route.query.id,function(response1) {
                    store.commit('HTTP_LOADING', {httpLoading:false})
                    self.questionRequest = response1.data.questionRequest;
                    http.getChildActivityDetail(self.$route.query.id,self.$route.query.childId,function(response2) {
                        store.commit('HTTP_LOADING', {httpLoading:false})
                        self.result = response2.data;

                        if(response2.data.ifCheck === 1) {
                            Vue.$vux.toast.show({text:"上传图片前需要先进行识别二维码操作"});
                        }

                        self.$set(self.result,'questionId',self.$route.query.questionId);
                        http.getActivityChildImage(self.$route.query.childId,response1.data.activityType,function(response3) {
                            store.commit('HTTP_LOADING', {httpLoading:false})
                            self.img = response3.data;
                        })
                    });
                })
                return
            }

            http.activityDetail(this.$route.query.id,function(response) {
                store.commit('HTTP_LOADING', {httpLoading:false})
                self.result = response.data;
                if(response.data.ifCheck === 1) {
                    Vue.$vux.toast.show({text:"上传图片前需要先进行识别二维码操作"});
                }
                self.questionRequest = response.data.questionRequest;
                http.getActivityChildImage(self.$route.query.id,response.data.activityType,function(response) {
                    store.commit('HTTP_LOADING', {httpLoading:false})
                    self.img = response.data;
                })
            })
        }
    }
</script>