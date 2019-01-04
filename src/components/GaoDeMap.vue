<!-- 高德地图 -->
<template>
    <iframe style="position: absolute;top: 0;bottom: 0;width: 100%;height: 100%;overflow: hidden" ref="gaodeMap" v-bind:src="url">
    </iframe>
</template>
<style>

</style>
<script>
    import * as constant from '../constant'
    import store from '@/store'

    var  remoteLoad = function (src) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        document.body.appendChild(script);
    }

    export default {
        name:"gaoDeMap",
        data(){
            var MapKey = constant.GAODE_MAP_KEY;
            return{
                url:`http://m.amap.com/navi/?start=${store.state.userModule.position.x},${store.state.userModule.position.y}&dest=${this.$route.query.x},${this.$route.query.y}&destName=阜通西&naviBy=car&key=${MapKey}`
            }
        }
    }
</script>