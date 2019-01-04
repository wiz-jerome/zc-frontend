<!-- 活动状态 -->
<template>
    <div>
        <ul class="tagBox">
            <li v-for="(item,index) in tagsList" :key="index">{{item.name}}</li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
.tagBox {
    list-style: none;
    margin-top: 20/50rem;
    overflow: hidden;
    padding: 20/50rem 0.48rem 42/50rem 2rem;
    li {
        float: left;
        font-size: 24/50rem;
        padding: 0 20/50rem;
        height: 40/50rem;
        line-height: 40/50rem;
        border: 1px solid #8f8f8f;
        border-radius: 8/50rem;
        margin-right: 20/50rem;
        margin-top: 0.2rem;
        color: #8f8f8f;
    }
}
</style>
<script>
export default {
    name: "activityTags",
    props: ["labels","type"],
    data(){
        return {
              tagsList:[]
        }
    },
    mounted() {
        // console.log('活动标签',this.labels,this.type)  
    },
    watch:{
        "labels":function(newVal,oldVal){
            // console.log('活动标签',newVal)
            if(this.type==1){//线下或者视频活动（labels是JSON字符串）
                this.tagsList = JSON.parse(newVal)
            }else{
                var tagList = []
                for(let i = 0;i<newVal.length;i++){
                    tagList.push(JSON.parse(newVal[i]))
                }
                this.tagsList = tagList
            }
            // console.log('活动标签',this.tagsList)
        }
    }
};
</script>