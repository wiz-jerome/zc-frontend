//活动状态管理
import * as types from '../types'
const state = {
    httpLoading : false,
    timerType :{}   //loading框定时器的销毁
};

const getters = {}
const actions = {}

const mutations = {
    [types.HTTP_LOADING](state,payload) {
        state.httpLoading = payload.httpLoading
    },
    [types.LOADING_CLEARTIMER](state,payload) {
        state.timerType = payload
    },
};

export default {
    state,
    getters,
    mutations,
    actions
}