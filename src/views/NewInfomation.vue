<template>
    <div :class="{'ov-h':!awakenApp}" class="box" style="overflow: scroll;height: auto;min-height:100vh;position: relative;" v-show="isShowAll">
        <awaken-app v-if="awakenApp&&result.kid" :result="result"></awaken-app>
        <animate-get-money v-if="getMoney"></animate-get-money>
		<activity-title :name="result.name"></activity-title>
        <activity-member-header :result="result"  v-if="result.kid"></activity-member-header>
        <div class="newsContent" v-html="result.contentRich"></div>
        <div class="line750"></div>
		<!-- 问卷 -->
        <div style="margin-bottom: .2rem;background: #FFFFFF" class="question_box">
            <div>
                <div v-for="(item,i) in question" :key="i">
                    <p class="font-20 f-black mg-b10">
                        <span class="f-base" v-if="item.questionType == 0">单选</span>
                        <span class="f-base" v-if="item.questionType == 1 || item.questionType == 2">多选</span>
                        <span class="f-base" v-if="item.questionType == 3">竞猜</span>
                        <!--<span class="f-base" v-if="item.questionType == 4">问卷</span>-->
                        <span style="font-weight: bold;word-wrap:break-word;word-break:break-all;">{{item.name}}</span></p>
					<!-- 单选 -->
                    <div class="font-14 f-dark mg-b10" v-for="(answer,j) in item.answerList" :key="j" @click="checkAnswer(i,j)" v-if="item.questionType == 0 || item.questionType == 3">
                        <div class="selectIdot"  v-if="j != item.checking"></div>
                        <div class="selectIdot chosed" v-if="j == item.checking"></div>
                        <span>{{answer.name}}</span>
                    </div>
					<!-- 多选 -->
                    <div class="font-14 f-dark mg-b10" v-for="(answer,j) in item.answerList" :key="j" @click="checkMultiselect(i,j+'')" v-if="item.questionType == 1 || item.questionType == 2 || item.questionType == 4">
                        <div class="checkIdot" v-if="item.checking.indexOf('n'+j+'n')==-1"></div>
                        <div class="checkIdot chosed" v-if="item.checking&&item.checking.indexOf('n'+j+'n')!=-1"></div>
                        <span>{{answer.name}}</span>
                    </div>
                    
                    <!-- questionType==4 没有正确答案-->
                    <!--<div class="font-14 f-dark mg-b10" v-for="(answer,j) in item.answerList" @click="checkMultiselect(i,j+'')" v-if="item.questionType == 4">
                        <div style="display: inline-block;width: 14px;height: 14px;border: 1px solid #979797;border-radius: 4px ;vertical-align: sub;" v-if="item.checking.indexOf('n'+j+'n')==-1"></div>
                        <div style="display: inline-block;width: 14px;height: 14px;border: 1px solid #FBC873;background: #FFD795;border-radius: 4px ;vertical-align: sub;" v-if="item.checking&&item.checking.indexOf('n'+j+'n')!=-1"></div>
                        <span>{{answer.name}}</span>
                    </div>                    -->
					<div class="line650" style="transform:translate(.48rem,0)"><div class="line"></div></div>
                </div>
            </div>
        </div>
		<!-- 参与情况 -->
		<activity-join :result="result" :finishUser="finishUser" :userType="userType"></activity-join>
		<!-- 标签 -->
		<activity-tags :result="result"></activity-tags>
		<!-- 底部按钮 -->
		<activity-bottom-btn @sureQuestionBtn="sureQuestionBtn" :result="result"></activity-bottom-btn>
        <!--点击确定，弹出的标签选择-->
        <div class="maskBox" v-if="isChoselabelShow" @touchmove.prevent>
        	<div class="box">
        		<dialog-labelchose @to-parent="dialogBtn" :labels="result.activityLabel"></dialog-labelchose>
        	</div>
        </div>
    </div>
</template>
<style lang="less">

// 弹出标签选择框
.maskBox{
    position: fixed;
    z-index:999;
    width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, .5);
	.box{
		width:682/50rem;
		position:absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
}
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
    	width: 93%;	
    	top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
    }
}

    .newInfomation_tips {
        font-size: .6rem;
        font-weight: bold;
        padding: 0 .48rem;
        color: #FBC873;
        text-align: center;
    }

    .box {
        -webkit-overflow-scrolling: touch;
        // overflow-scrolling: touch
    }

    .video {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
    }
    .video iframe,
    .video object,
    .video video,
    .video embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .zc-introduce-box{
        min-width: 33%;
        max-width: 40%;
        text-align: left;
        display: inline-block;
    }

    .zc-introduce-box1{
        display: inline-block;
    }
    .question_box {
		padding: 0 24/50rem 0 100/50rem;
		.font-20{
			font-size:40/50rem;
			line-height: 56/50rem;
			margin-bottom: 20/50rem;
		}
        .font-14 {
			line-height: 40/50rem;
			font-size:28/50rem;
        }
        .f-dark {
            line-height: normal;
            margin-bottom: .4rem;
        }
        .f-black {
            margin-bottom: .2rem;
		}
		

    }
    .commitBtn {
        width: 622/50rem;
        height: 80/50rem;
        line-height: 80/50rem;
        text-align: center;
        background: #FBC873;
        font-size: 37/50rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        border-radius: 80/50rem;
        margin: 1rem 0;
    }
    .newsContent {
        line-height: 1rem;
        word-wrap:break-word;
        word-break:break-all;
		padding: 0 .48rem;
		margin-top: 20/50rem;
        font-size: 28/50rem;
        img {
			max-width: 100%;
        }
    }
    .shoucang  {
        width: 90/50rem;
        margin-top: 20/50rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    
</style>
<script>
import http from '../axios';

import Vue from 'vue'
import store from '../store'
import { mapState } from 'vuex'
import * as constant from '@/constant'
import {XDialog} from 'vux'
import awakenApp from '../components/awaken_app'
import animateGetMoney from '../components/animate_getmoney'
import activityTitle from '../components/activityTitle'
import activityMemberHeader from '../components/activity_member_header'
import activityTags from '../components/activityTags'
import activityBottomBtn from '../components/activityBottomBtn'
import activityJoin from '../components/activityJoin'

import videoMark from '../assets/image/videoMark.png'

import dialogLabelchose from '../components/dialog_labelchose'

import Native from "@/native"

export default {
	name: "new-infomation",
	data() {
		return {
			result: {},
			finishUser:[],
			activityId: this.$route.query.id,
			awakenApp: constant.PRODUCTION_ENV != 0,
			question: null,
			info: {},
			videoMark: videoMark,
			isShowAll: false,
			isChoselabelShow:true,//是否显示标签选择
			submitParam:null,//提交的答案
			userType:this.$route.query.userType
		}
	},
	computed: {
		...mapState({
			// activityStatus: state => state.activityModule.activityStatus,
			// join: state => state.activityModule.join,
			getMoney: state => state.activityModule.getMoney
		})
	},
	components: {
		awakenApp,
		animateGetMoney,
		activityMemberHeader,
		dialogLabelchose,
		XDialog,
		activityTitle,
		activityBottomBtn,
		activityJoin,
		activityTags
	},
	created() {
		this.$nextTick(function() {
			var self = this;
			http.activityDetail(this.activityId, function(response) {
				self.result = response.data;
				// console.log('资讯活动详情：', response)
				document.title = self.result.name; //修改标题为活动名
				store.commit('UPDATE_ACTIVITY_STATUS', {
					activityStatus: response.data.cancelType && response.data.cancelType === 2 ? 5 : response.data.activityStatus
				}); //如果被踢了(2)，则返回活动状态为5(关闭状态)
				store.commit('UPDATE_JOIN', {
					join: response.data.join
				})
				store.commit('QUESTION_STATUS', response.data.questionStatus);
				self.result.contentRich = self.result.contentRich.replace(new RegExp('embed class="video"', 'g'), "video  x-webkit-airplay='true' webkit-playsinline playsinline controls poster='" + self.videoMark + "'");
// console.log(self.result.contentRich)
				if(self.result.activityLabel === '[]') {
					self.result.activityLabel = ''
				} else {
					self.result.activityLabel = self.result.activityLabel.substring(1, self.result.activityLabel.length - 1).replace(new RegExp('},{', 'g'), '}p{').split('p');
				}
				
				// 如果活动有关联问卷，则请求
				if(response.data.questionId){
					http.getQuestionList(response.data.questionId, (response1) => {
						for(var i = 0; i < response1.data.questionList.length; i++) {
							response1.data.questionList[i].checking = "t";
						}
						// console.log(response1.data)
						self.question = response1.data.questionList;
						self.info = {
							name: response1.data.name,
							content: response1.data.content,
							kid: response1.data.kid
						};
					})
					return;
				}
			})
			// 获取领取成功人员列表
			http.getMoneyUserList({
				id: self.activityId,
				currentResult: 0,
				pageSize: 5
			}, function(response) {
				console.log("领取人员",response)
				self.finishUser = response.data;
			})
		})
	},
	beforeUpdate() {
		this.$nextTick(function() {
			this.isShowAll = true;
		});
	},
	methods: {
		// 接受弹框组件的传值
		dialogBtn(value){
			// console.log('子组件传值',value)
			if(value=='cancel'){
				this.isChoselabelShow=false
			}else{
				// console.log('点击确认：')
				var tags = []//所选标签id数组
				for(let i=0;i<value.length;i++){
					if(value[i].isChosed){
						tags.push(value[i].key)
					}
				}
				// 添加标签字段到param
				if(this.result.activityForm !== 4){//竞猜活动提交接口不添加tagIds字段
					this.submitParam.unshift({
						'tagIds':tags.join()
					})
				}
				//提交给后台
				this.$options.methods.commitQuestion.bind(this)(this.submitParam);
				this.isChoselabelShow = false//隐藏标签选择弹窗
			}
		},

		checkAnswer(i, j) {
			this.question[i].checking = j;
		},
		checkMultiselect(i, j) {
			if(this.question[i].checking.indexOf('n' + j + 'n') == -1) {
				this.question[i].checking += ',n' + j + 'n';
			} else {
				this.question[i].checking = this.question[i].checking.replace(new RegExp(',n' + j + 'n', 'g'), '');
			}
		},
		// 提交答案
		commitQuestion(param){
			// console.log('提交答案给后台,参数',param)
			if(this.result.activityForm === 4) { //竞猜活动提交接口
				http.submitCompetitionInfoQuestion(this.$route.query.id, {
					userQuestionnaireRefDtos: param
				}, res => {
					// console.log(res)
					this.animateGetMoney();
					this.result.activityStatus = 4;
					this.result.join = true;
					if(res.code) {
						return
					}
					Vue.$vux.toast.show({
						text: "提交成功"
					});
				});
				return
			}

			http.submitInfoQuestion(this.$route.query.id, param, (response) => { //资讯活动提交接口
				// console.log('提交问卷（activity!=4）：', response)
				this.result.activityStatus = 4;
				this.result.join = true;
				if(response.code) {
					return
				}
				this.animateGetMoney();
				this.result.informationQuestionStatus = 1;
				if(this.result.questionType===4){
                 	Vue.$vux.toast.show({
						text: "您已成功参与"
					});
				}else{
                    Vue.$vux.toast.show({
					    text: "回答正确"
				    });
				}
			})
		},

		// 点击题目下的确定按钮
		sureQuestionBtn() {
			if(new Date().getTime() - new Date(this.result.endTime).getTime() >= 0) {
				Vue.$vux.toast.show({
					text: "活动已结束",
					type: "cancel"
				});
				return
			}

			if(this.result.actualUser >= this.result.maxUser) {
				Vue.$vux.toast.show({
					text: "参与人数已达上限",
					type: "cancel"
				});
				return;
			}

			if(this.result.activityStatus === 4) {
				Vue.$vux.toast.show({
					text: "您已提交过此问卷",
					type: "cancel"
				});
				return;
			}

			var param = [];//提交的数据
			for(var i = 0; i < this.question.length; i++) {
				var question = this.question[i];
				if(question.checking == "t") {
					Vue.$vux.toast.show({
						text: "请填写完所有问题再提交",
						type: "cancel"
					});
					return;
				}
				var index = question.checking;
				// console.log(question.questionType)
				if(question.questionType == 0 || question.questionType == 3) {
					var tmp = {
						questionId: question.kid,
						questionName: question.name,
						questionType: question.questionType,
						answerId: question.answerList[index].kid,
						answerName: question.answerList[index].name,
						answerType: question.answerList[index].type,
						questionnaireName: this.info.name,
						questionnaireId: this.info.kid
					};
					param.push(tmp);
				} else {
					var arr = index.split(",");
					for(var k = 1; k < arr.length; k++) {
						var tmpIndex = arr[k].slice(1, arr[k].length - 1);
						var tmp = {
							questionId: question.kid,
							questionName: question.name,
							questionType: question.questionType,
							answerId: question.answerList[tmpIndex].kid,
							answerName: question.answerList[tmpIndex].name,
							answerType: question.answerList[tmpIndex].type,
							questionnaireName: this.info.name,
							questionnaireId: this.info.kid
						};
						param.push(tmp);
					} 
				}	
			}
			this.submitParam = param
			if(this.result.activityLabel){
				// console.log('有标签，显示标签选择弹框')
				this.isChoselabelShow=!this.isChoselabelShow
			}else{
				// 提交选择的逻辑
				// console.log('无标签，直接提交，param：',this.submitParam)
				// 提交问卷答案
				this.$options.methods.commitQuestion.bind(this)(this.submitParam);
			}
			
		},
		// 领钱动画
		animateGetMoney() {
			store.commit('GET_MONEY', true);
			setTimeout(() => {
				store.commit('GET_MONEY', false)
			}, 2000)
		},
	},
}
</script>