import axios from 'axios'
import Vue from 'vue';
import * as constant from '../constant'
import Native from "../native";
import store from "../store"
import router from '../router';
let data  = new Date().getTime();
const instance = axios.create({
    baseURL:constant.API_BASE_URL,
    timeout:15000,   //5S超时哈
    headers: {'x-requested-with': 'XMLHttpRequest'},
    params: {
        _t: data
    }
})

instance.interceptors.request.use(function (config) {

    var token = store.state.userModule.token;
    if(!token){
        Native.method('getUser',(res)=>{
            res = JSON.parse(res);
            store.commit('USER_TOKEN', {token:res.token});
            token = res.token;
        });
    }

    if(token){
        if(config.url.indexOf("?")!=-1){
            config.url = config.url + `&token=${token}`;
        }else{
            config.url = config.url + `?token=${token}`;
        }
    }
    store.commit('HTTP_LOADING', {httpLoading:true})
    return config;
}, function (error) {
    store.commit('HTTP_LOADING', {httpLoading:false})
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    store.commit('HTTP_LOADING', {httpLoading:false})
    if(response.data.code == -3){
        console.log('未登录,调用原生方法',Native.method)
        Native.method("goLogin",()=>{});
       return;
    }
    return response;
}, function (error) {
    store.commit('HTTP_LOADING', {httpLoading:false});

    error.response.data = {
        code: -1
    };

    switch (error.response.status) {
        case 400:
            error.response.data.desc = '请求参数有误'
            break
        case 404:
            error.response.data.desc = `接口地址未找到: ${error.response.config.url}`
            break
        case 408:
            error.response.data.desc = '请求超时'
            break
        case 502:
            error.response.data.desc = '服务器系统错误'
    }
    error.response.status = 200;

    return error.response;
});

export default {
    GET:"GET",
    POST:"POST",
    PUT:"PUT",
    DELETE:"DELETE",
    api(param) {
        if (!param.err) {
            param.err = (response) => {
                Vue.$vux.toast.text(response.desc);
            }
        }

        var data = {
            method: param.method,
            url: param.url,
        }
        if(param.data){
            data.data = param.data;
        }

        if(constant.isIOS){
            store.commit('HTTP_LOADING', {httpLoading:true})
            var token = store.state.userModule.token;
            if(!token){
                Native.method('getUser',(res)=>{
                    res = JSON.parse(res);
                    store.commit('USER_TOKEN', {token:res.token});
                    token = res.token;
                    ios(token);
                });
            }
            ios(token);
            function ios(token) {
                if(token){
                    if(data.url.indexOf("?")!=-1){
                        data.url = data.url + `&token=${token}`;
                    }else{
                        data.url = data.url + `?token=${token}`;
                    }
                }
                Native.method("jsHttp",function (response) {
                    store.commit('HTTP_LOADING', {httpLoading:false});
                    if(response.status!=200){
                        response.result = {
                            code : -1,
                            desc : "error 305"
                        };
                    }

                    var result = response.result;

                    if(result.code == 0){
                        param.success(result);
                    }else if(result.code == -3){
                        Native.method("goLogin",()=>{});
                    }else if(result.code ==6001) {
                        param.success(result);
                    }else if(result.code ==3040) {
                        param.err(result);
                        param.success(result);
                    }
                    else if (result.code){
                        param.err(result);
                    }else{
                        Vue.$vux.toast.show({text:"系统错误",type:"warn"});
                    }
                },data);
            }
        }else{
            instance(data).then((response) => {
                var result = response.data;

                if(result.code == 0){
                    param.success(result);
                }else if(result.code == 6001) {
                    param.success(result);
                }else if(result.code ==3040) {
                    param.err(result);
                    param.success(result);
                }else if (result.code){
                    param.err(result);
                }else{
                    Vue.$vux.toast.show({text:"系统错误",type:"warn"});
                }
            }).catch((error) => {
                // Vue.$vux.toast.show({text:"哈哈",type:"warn"});
                router.push({path:"*"});
                console.error(error);
            })
        }

    }
}
