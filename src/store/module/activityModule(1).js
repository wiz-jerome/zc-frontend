//活动状态管理
import * as types from '../types'
const state = {
    activityStatus: null,
    join:0,
    picture:{
        picture:null,
        code:"-1",
    },
    updateStatus:0,
    getMoney:false,
    activityAuditStatus: true,
    videoContinue: { },
    getMoneyBtn: false,
    questionStatus: '',
    isShowVideoMask:false,
};

const getters = {}
const actions = {}

const mutations = {
    [types.UPDATE_VIDEOMASK](state,payload) {//更新视频活动弹窗是否显示
        state.isShowVideoMask = payload.isShowVideoMask
        // console.log(state.isShowVideoMask);
    },
    [types.UPDATE_ACTIVITY_STATUS](state,payload) {//更新用户参加活动状态
        state.activityStatus = payload.activityStatus
        // console.log(state.activityStatus);
    },
    [types.UPDATE_JOIN](state,payload) {//更新用户是否参加的动态
        state.join = payload.join
    },
    [types.OFFLINE_IMG](state,payload) {//线下活动传图片
        state.picture = payload
    },
    [types.UPDATE_STATUS](state,payload) {//更新状态
        state.updateStatus++;
    },
    [types.GET_MONEY](state,payload) {//领钱
        state.getMoney = payload;
    },
    [types.UPDATE_ACTIVITY_AUDIT_STATUS](state,payload) {//子活动状态
        state.activityAuditStatus = payload.activityAuditStatus;
    },
    [types.VIDEO_TIME](state,payload) {//从app获取播放时间
        state.videoContinue = payload;
    },
    [types.GET_MONEY_BTN](state,payload) {//是否显示领钱按钮
        state.getMoneyBtn = payload;
    },
    [types.QUESTION_STATUS](state,payload) {//是否显示领钱按钮
        state.questionStatus = payload;
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}