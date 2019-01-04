import router from '../router'
import store from '@/store'
import Native from "./index";

export default [
    {
        name:"goBack",
        methodAndroid:function () {
            history.back();
            if(window.location.href.indexOf('/activity/detail') >=0) {
                return false;
            }
            // var tmp = (store.state.routerModule.history-1) > 0;
            //
            // if(tmp){
            //     if((store.state.routerModule.history-1) == 1){
            //         router.back(-2);
            //         store.commit("HISTORY",{num:-3});
            //     }else{
            //         router.back(-1);
            //         store.commit("HISTORY",{num:-2});
            //     }
            //
            // }
            return tmp;
        },
        methodIOS:function (data, responseCallback) {
            history.back();

            if(window.location.href.indexOf('/activity/detail') >=0) {
                responseCallback(false);
            }
            // var tmp = (store.state.routerModule.history-1) > 1;
            //
            // if(tmp){
            //     router.back(-1);
            //     store.commit("HISTORY",{num:-2});
            // }
            responseCallback(tmp);
        }
    },
    {
        name:"getPicture",
        methodAndroid:function (data) {
            try {
                data = JSON.parse(data);
                store.commit("OFFLINE_IMG",{picture:data.pictureUrl,code:data.qrCode});
                store.commit("OFFLINE_CODE",data.qrCode);
                return true;
            }catch(e){
                alert(e.toString());
            }
        },
        methodIOS:function (data, responseCallback) {
            try {
                data = JSON.parse(data);
                store.commit("OFFLINE_IMG",{picture:data.pictureUrl,code:data.qrCode});
                responseCallback(true);
            }catch(e){
                alert(e.toString());
            }

        }
    },
    {
        name:"getVideoInfo",
        methodAndroid:function (data) {
            try {
                data = JSON.parse(data);
                // store.commit("OFFLINE_IMG",{picture:data.pictureUrl,code:data.qrCode});
                store.commit("VIDEO_TIME",data);
                return true;
            }catch(e){
                alert(e.toString());
            }
        },
        methodIOS:function (data, responseCallback) {
            try {
                data = JSON.parse(data);
                store.commit("VIDEO_TIME",data);
                responseCallback(true);
            }catch(e){
                alert(e.toString());
            }

        }
    },
    {
        name:"getHadLogin",
        methodAndroid:function (data) {
            try {
                
                return true;
            }catch(e){
                alert(e.toString());
            }
        },
        methodIOS:function (data, responseCallback) {
            try {
                location.reload(true);
                responseCallback(true);
            }catch(e){
                alert(e.toString());
            }

        }
    }
]

