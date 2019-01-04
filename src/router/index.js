import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as constant from '@/constant'

import page404 from '@/views/404'
import welcomeToApp from '../views/welcome_to_app'
// import newInfomation from '../views/NewInfomation.vue'

Vue.use(Router)

window.vueHistory = 0;
window.vueHistoryLength = 0;

const mode = constant.PRODUCTION_ENV == 0 ?'hash':'history'

const router = new Router({
    mode: mode,
    routes: [
        {
            path: '*',
            component: function (resolve) {
                require(['@/views/404.vue'], resolve)
            }
        },
        {
            //空
            path: '/',
            name: 'blank',
            component: function (resolve) {
                require(['@/views/blank.vue'], resolve)
            }
        },
        {
            //活动详情（old）
            path: '/activity/detailOld',
            name: 'activity',
            component: function (resolve) {
                require(['@/views/activity.vue'], resolve)
            }
        },
        {
            //活动详情
            path: '/activity/detail',
            name: 'activity',
            component: function (resolve) {
                require(['@/views/newActivity.vue'], resolve)
            }
        },
        {
            //参加活动人列表
            path: '/activity/joinmembers',
            name: 'join_activity_member_list',
            component: function (resolve) {
                require(['@/views/join_activity_member_list.vue'], resolve)
            }
        },
        {
            //线下活动提交
            path: '/activity/commitoffline',
            name: 'commit_offline_activity',
            component: function (resolve) {
                require(['@/views/commit_offline_activity.vue'], resolve)
            }
        },
        {
            //地图
            path: '/map/gaode',
            name: 'gaodeMap',
            component: function (resolve) {
                require(['@/components/GaoDeMap.vue'], resolve)
            }
        },
        {
            //邀请好友
            path: '/invite/user',
            name: 'inviteUser',
            component: function (resolve) {
                require(['@/views/invite_user.vue'], resolve)
            }
        },
        {
            //收入
            path: '/my/income',
            name: 'myIncome',
            component: function (resolve) {
                require(['@/views/my_income.vue'], resolve)
            }
        },
        {
            //下载页
            path: '/download',
            name: 'welcomeToApp',
            component: welcomeToApp
        },
        {
            //资讯类
            path: '/newInfomation',
            name: 'newInfomation',
            component: function (resolve) {
                require(['@/views/NewInfomationNew.vue'], resolve)
            }
        }
    ]
})

const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

router.beforeEach((to, from, next) => {
    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);

    if (toIndex) {
        if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
            store.commit('UPDATE_DIRECTION', {direction: 'forward'})
        } else {
            store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
        }
    } else {
        ++historyCount;
        history.setItem('count', historyCount);
        to.path !== '/' && history.setItem(to.path, historyCount);
        store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    }
    next()
})

router.afterEach((to, from, next) => {
    if(to.name == 'blank') {
        store.commit("HREF", {href: 'blank'})
    }
    window.routerTo = to.name;
    store.commit("HISTORY", {num: 1});
})

export default router
