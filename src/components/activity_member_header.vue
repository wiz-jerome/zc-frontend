<template>
    <div class="row header" style="width: 100vw">
        <div class="left" @click="goMemberDetail">
            <img v-loading-head :src="result.memberImg">
            <span class="f-black font-14" style="display: inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{result.memberName}}</span>
        </div>
        <a v-if="!isH5" class=" fr mg-t-4" :class="{'orange-mark':!result.memberFollow,'gray-mark':result.memberFollow}"  @click="followMember">{{follow}}</a>
    </div>
</template>
<style scoped lang="less">
    .orange-mark {
        background: #fbc873;
    }
    .header {
        // line-height: normal;
        // margin: 18/50rem 0 14/50rem 0;
        // position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15/50rem;
        padding-bottom: 20/50rem;
        .left{
            display: flex;
            align-items: center;
            width: 60%;
            img  {
                width: 60/50rem;
                height: 60/50rem;
                // position: absolute;
                // left: 50%;
                // top: 50%;
                // transform: translate(-50%,-50%);
                border-radius: 50%;
            }
            span {
                font-size: 28/50rem;
                width:350/50rem;
                text-indent: 16/50rem;
            }
        }
        a {
        
            width: 112/50rem;
            height: 44/50rem;
            font-size: 24/50rem;
            border-radius: 44/50rem;
            line-height: 44/50rem;
            padding: 0;
            color: #FFB433;
            background: #ffffff;
        }
        .gray-mark{
            color:#CACACA;
        }
    }
</style>
<script>
    import http from '../axios'
    import * as constant from '@/constant'
    import native from "@/native"
    export default {
        name:"activity_member_header",
        props:['result'],
        data(){
            return{
                isH5:constant.PRODUCTION_ENV!=0,//原生 != 0 调试==0
            }
        },
        computed:{
            follow(){
                return this.result.memberFollow == true? '已关注':'+ 关注'
            }
        },
        methods:{
            goMemberDetail(){
                console.log('转到商家详情')
                // 调用原生方法转到商家详情页
                native.method("toMemberDetail",function (result) { 
                    console.log("调用成功");
                },this.result.memberId)
            },
            followMember(){
                http.followMember(this.result.memberId,{follow:this.result.memberFollow?0:1},()=>{
                    if(this.result.memberFollow == true){
                        this.result.memberFollow = false
                    }else{
                        this.result.memberFollow = true
                    }
                })
            }
        }
    }
</script>