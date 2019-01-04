<!-- 串联活动要求 -->
<template>
    <!--<scroller lock-x :scrollbar-y="false" ref="scroller"  class="animated fadeInRight height-55vh">-->
        <keep-alive>
            <component :is="tabName" :result="result" :query="query"  v-if="result.kid"></component>
        </keep-alive>
    <!--</scroller>-->
</template>
<style lang="less">
</style>
<script>
    import {Scroller} from 'vux'
    import activityChildList from './active_child_list'
    import activityChildDetail from './active_child_detail'

    import http from '../axios'

    export default {
        name:"activity-require",
        components:{Scroller,activityChildList,activityChildDetail},
        props:['result'],
        data(){
            return{
                childrenList:[],
                tabName:"activity-child-list",
                query:{},
            }
        },
    }
</script>