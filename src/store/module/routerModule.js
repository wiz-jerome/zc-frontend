//页面切换等状态管理
import * as types from '../types'
const state = {
    direction: 'forward',
    history:0,
    href: ''
};

const getters = {}
const actions = {}

const mutations = {
    [types.UPDATE_DIRECTION](state,payload) {
        state.direction = payload.direction
    },
    [types.HISTORY](state,payload) {
        state.history = state.history + payload.num
    },
    [types.HREF](state,payload) {
        state.href = payload.href;
    },

};

export default {
    state,
    getters,
    mutations,
    actions
}
