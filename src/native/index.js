
import * as constant from '../constant'

import hybrid from './hybrid'

if(constant.isIOS){
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }

    //native调用js
    setupWebViewJavascriptBridge(function(bridge) {

        for(var i = 0;i<hybrid.length;i++){
            var item = hybrid[i];
            bridge.registerHandler(item.name, item.methodIOS)
        }

    })
}else{
    for(var i = 0;i<hybrid.length;i++){
        var item = hybrid[i];
        window[item.name] = item.methodAndroid;
    }
}


export default {
    // 调用原生方法
    method(methodName,fun,fields,fields1){
        if(constant.isAndroid) {
            if(fields && (fields1 || fields1 == 0)){
                fun(window.native[methodName](fields,fields1))
            } else if (fields) {
                fun(window.native[methodName](fields))
            } else{
                fun(window.native[methodName]());
            }

        }else if (constant.isIOS){
            var data = null;
            if(fields1 || fields1 == 0) {
                data = {
                    src:fields,
                    currentTime: fields1
                };
            } else {
                data = fields;
            }

            try {
                WebViewJavascriptBridge.callHandler(methodName, data, fun);
            }catch (e) {
                alert(e);
            }

        }
    }
}
