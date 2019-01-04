<!-- 活动进展 倒计时  -->
<!--6.28 lhm if(hour==0 && munite==0 && second==0){活动已结束}-->
<template>
	<div class="activity-tab-header activityOver" v-if="newTime.hours==0 && newTime.minutes==0 && newTime.seconds==0">
		活动已结束
	</div>
    <div class="activity-tab-header" v-else>
        交付倒计时
        <div class="actvity-count-down-num-box">
           {{newTime.hours}}
        </div>
        :
        <div class="actvity-count-down-num-box">
            {{newTime.minutes}}
        </div>
        :
        <div class="actvity-count-down-num-box">
            {{newTime.seconds}}
        </div>
    </div>
</template>
<style lang="less" scoped>
    .activity-tab-header {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .actvity-count-down-num-box{
        display: inline-block;
        min-width: 1rem;
        padding: 0 .1rem;
        height: 1rem;
        border-radius: 4px;
        box-shadow: 0 6px 12px 0 #D8D8D8;
        text-align: center;
        line-height: 1rem;
    }
</style>
<script>
    export default {
        name:"activity-flow_count_down",
        props:['time'],
        computed:{
            newTime() {
                return {hours:this.addZero(this.time.hours),minutes:this.addZero(this.time.minutes),seconds:this.addZero(this.time.seconds)}
            }
        },
        methods: {
            addZero(num) {
                var aa = num.toString();
                if(aa.length === 1) {
                    return '0'+aa;
                }else {
                    return aa;
                }
            }
        },
    }
</script>