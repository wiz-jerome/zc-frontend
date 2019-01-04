//页面切换等状态管理
import * as types from '../types'
const state = {
    token: null,
    position:{
        x:116.403,
        y:39.940693
    },
    uuid: null,
};

const getters = {}
const actions = {}

const mutations = {
    [types.USER_TOKEN](state,payload) {
        state.token = payload.token
    },
    [types.DEVICE_UUID](state,payload) {
        state.uuid = payload.uuid
    },
    [types.USER_POSITION](state,payload) {
        try{
            state.position = payload
        }catch (e){
            alert(e);
        }

    },
};

export default {
    state,
    getters,
    mutations,
    actions
}
