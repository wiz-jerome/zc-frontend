<template>
    <div class="activityTitle">
        <div class="name">{{name}}</div>
    </div>
</template>
<style lang="less">
.activityTitle{
    .name{
        font-size: 36/50rem;
        padding: 40/50rem 0 0 24/50rem;
    }

}
</style>
<script>
    export default {
        name:"activityTitle",
        props:["name"],
        data() {
            return {
                
            }
        }
            
    }
</script>