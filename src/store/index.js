/**
 * Created by Administrator on 2017/6/5.
 */
import Vue from 'vue';
import  Vuex from 'vuex';

Vue.use(Vuex);
import routerModule from './module/routerModule'
import userModule from './module/userModule'
import activityModule from './module/activityModule'
import axiosModule from './module/axiosModule'

export default new Vuex.Store({
  modules:{
      routerModule,activityModule,axiosModule,
      userModule
  },
});
