import * as LOGLEVEL from './loglevel.js'

export const LOG_LEVEL = LOGLEVEL.DEBUG;
export const PRODUCTION_ENV = baseEnv;    //0是在原生上运行 1 是在手机浏览器上运行  2 是在电脑端浏览器上使用
//获取浏览器类
const ua = navigator.userAgent;
export const isAndroid =PRODUCTION_ENV== 0 && (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1);
export const isIOS = PRODUCTION_ENV== 0 && (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));

//高德地图key
export const GAODE_MAP_KEY = "16d95a2f157db464a9aa3f3d3a7aa61e";



const isNewInfoPage = location.search.indexOf('type=3') >= 0;


//接口地址
var tmp = "";
if(isProduction == 1){          //生产
    tmp =  "https://m.zhaocaiapp.cn/api";
}else if(isProduction == 2){    //预生产
    tmp =  "https://m-pre.zhaocaiapp.cn/api";
}else{                          //(本地调试只在此更改)
    // tmp = "https://m.zhaocaiapp.cn/api";//生产 
//  tmp = "https://m-pre.zhaocaiapp.cn/api";//预生产
//  tmp = "https://appapi-pre.zhaocaiapp.cn/"
    tmp = "http://m.zhaocaiapp.local/api";//开发
    // tmp = "http://appapi.zhaocaiapp.local/"
    // tmp ='http://192.168.1.138:9090/';//后台
}

export const API_BASE_URL = tmp;


export const ANDROID_AWAKEN_SCHEMA = isNewInfoPage?"com.zc.zhaocaiapp://":"com.zc.zcapp://";
export const IOS_AWAKEN_SCHEMA = isNewInfoPage?"com.zc.zhaocaiapp://":"com.zc.zcapp://";


export const ANDROID_DOWNLOAD_URL = "https://imtt.dd.qq.com/16891/C9FD3FFB9C1ED63834E220922FD5C119.apk?fsname=cn.zhaocaiapp.zc_app_android_1.1.6_14.apk&csr=1bbd";
export const IOS_DOWNLOAD_URL = "https://itunes.apple.com/cn/app/id1354242868";