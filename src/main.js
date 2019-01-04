// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import {AlertPlugin,ToastPlugin,LoadingPlugin,ConfirmPlugin} from 'vux'
import FastClick from 'fastclick'
import router from './router'
import Native from './native'
import Directive from './directive'
import Filter from './filter'
import store from './store'
import * as constant from './constant'
import Loading from './loading/index'

　　　
Vue.use(Vuex);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(Loading)

new Vue({
  el: '#app',
  router,store,
  template: '<App/>',
  components: { App }
})

FastClick.attach(document.body);

if(constant.PRODUCTION_ENV == 2){
    require('es6-promise').polyfill();
}
//调用原生方法判断访问的页面
if(constant.PRODUCTION_ENV == 0){
    
    var time = 0
    if(constant.isIOS) time = 50;
    setTimeout( () => {
        Native.method("getPage",function (response) {
            response = JSON.parse(response);
            console.log(response)
            //deviceUUID
            if(response.type == 0){
                var tmp = {path:"/activity/detail",query:{
                        id:response.id,
                        userType:response.userType
                    }}
                if(response.code){
                    tmp.query.code = response.code;
                }
                router.push(tmp);

                store.commit("DEVICE_UUID",{uuid:response.deviceUUID})

                store.commit("USER_TOKEN",{token:response.token})
                store.commit("USER_POSITION",{
                    x:response.longitude,
                    y:response.latitude,
                })
            }else if(response.type == 1){
                router.push({path:"/agreement/user"});
            }else if(response.type == 2){
                router.push({path:"/agreement/privacy"});
            }else if(response.type == 3){
                var tmp = {path:"/newInfomation",query:{
                        id:response.id
                    }}
                if(response.code){
                    tmp.query.code = response.code;
                }
                router.push(tmp);

                store.commit("DEVICE_UUID",{uuid:response.deviceUUID})

                store.commit("USER_TOKEN",{token:response.token})
                store.commit("USER_POSITION",{
                    x:response.longitude,
                    y:response.latitude,
                })
            }else if(response.type == 4){
                var tmp = {path:"/my/income",query:{income:response.income}};
                router.push(tmp);
            }else if(response.type == 5){
                var tmp = {path:"/invite/user",query:{code:response.code}};
                router.push(tmp);
            }else{
                alert("type为空");
            }

        })
    },time)
}
//、、本地测试保留，（预）生产环境删除
else{
    // store.commit("USER_TOKEN",{token:'6d6a39551bd1b12921180fc229681ba2'})
    // store.commit("USER_TOKEN",{token:'0ca071813deb73cb085541d8e1f3786c'})
    // store.commit("USER_POSITION",{
    //     x:"121.499908",
    //     y:"31.235321",
    // })
}

/*import http from "./axios"
http.getUser(function (result) {
    store.commit('USER_TOKEN', {token: result.data.token})
})*/



