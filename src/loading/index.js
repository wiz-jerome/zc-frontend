
import store from '../store'
export default{
    install(Vue){
        Vue.prototype.$loading = {}
        let Loading = null;
        let tpl;
        function show () {
            var Loading = Vue.extend(require('./src/loading.vue').default);
            tpl = new Loading().$mount().$el;  // 创建实例，挂载到文档以后的地方
            document.body.appendChild(tpl);

            return tpl;
        }
        function hide(){
            // 全局loading框中定时器的销毁
            let timer = store.state.axiosModule.timerType;
            window.clearInterval(timer)

            document.body.removeChild(tpl)
        }
        let $load = {
            show(obj){
                show(obj)
            },
            hide(obj){
                hide(obj)
            }
        }
        Object.assign($load,Loading)
        Vue.prototype.$loading = $load
    }
}