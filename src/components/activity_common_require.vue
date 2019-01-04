<!-- 普通活动要求 -->
<template>
    <!--<scroller lock-x :scrollbar-y="false" ref="scroller"   class="animated fadeInRight height-55vh">-->
        <div class="commonRequireBox">
            <!-- <div class="activity-tab-header">{{result.activityForm == 4?'竞猜规则':'活动要求'}}</div> -->
            <div class="contentRich">
                <div v-html="result.contentRich" class="html-box" style="word-wrap:break-word; word-break:break-all;">
                </div>
            </div>
            
            <div class="cankaoBox" v-if="result.activityForm == 0" style="overflow: hidden">
                <div class="cankaoImg-title">
                    活动示意图
                </div>
                <div class="cankaoImgBox">
                    <img v-loading-img class="cankaoImg" :src="result.referImage1"/>
                </div>

                <!--<div class="font-18 f-black activity-header">参考图片</div>-->
                <!--<div class="require-row">-->
                    <!--<img v-loading-img :src="result.referImage1" class="require-img">-->
                <!--</div>-->
            </div>
           <!-- <activity-btn :result="result"></activity-btn> -->
           
        </div>
    <!--</scroller>-->
</template>
<style lang="less">
    .commonRequireBox{
        padding: 20/50rem 24/50rem;
        .contentRich{
            font-size:28/50rem;
            line-height: 56/50rem;
            .html-box{
                img{
                    max-width: 100%;
                }
            }
        }
    }
    .goMap {
        margin: .5rem .4rem;
        color: #39393A;
        font-size: 28/50rem;
        line-height: 40/50rem;
    }
    .cankaoBox{
        .cankaoImg-title {
            display: flex;
            justify-content: center;
            align-items:center;
            font-size:28/50rem;
            color:#8F8F8F;
            margin-top:20/50rem;
            &::before{
                content: '';
                width: 40/50rem;
                height: 40/50rem;
                display: block;
                background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEtUlEQVRYR92YWSitbRTHl3lKxI3iCsWJzDPFDSHzcAwhRVyQIRQ3ZqeTg2OeXXBlSsYiEheKMnVKSCJDJ1IuzI7h9H/q3e3Pxtnv3m/n6Fs3e7f3+zzPr/Ws9V9rvQrPz8/P9IFN4X8LODIyQl1dXbSzs0MPDw9S34GhoSH5+/tTVlYWqaqq/nGdTB5sbGykr1+//nHz9x6wtramnp4e0tfXf3cf3oArKysUGhpKT09PpKurS15eXqSsrCw17NLSEh0eHrLn3dzcqLe3lxQVFd9czwvw9vaWvL29aW9vj1RUVGhsbIwsLS2lhsOD9/f3lJycTLOzs2xdYWEhpaSkCANYUlJCHR0dbLOcnBzKzs7mBcc9fHFxQZ6ennR6ekp6enq0uLhImpqar+4ltQfFr9bCwoImJiZ4Xe3L09va2qisrIz9XF9fT2FhYbID3t3dkY+PD+3u7jIowAFSHru+viYbGxvCZ0BAALW2tsoOWFFRQS0tLWyDzMxMysvLk4dNtDYoKIhWV1fJxMSE5ufnZQNcX1+n4OBgenx8JDMzM5qcnGQJIoQhjvv6+khLS4u2t7f5A/769Yt8fX3ZYiUlJRodHSXol1BWXFxMnZ2dLGz29/f5A1ZWVrIAhqWlpVFBQYFQbGwfuQC3traY91DGTE1NaWpqitTU1D4OIBcfUPnh4WGys7NjcNCwzc1NcnR0JAUFBbmA5fIgAH7+/MkKe3t7uwgkKiqKFhYWKD8/n9LT0/89IOpuQ0MDAzk6OiIXFxf2PTAwUCQ9slLK5cGMjAwaGhpikgJvQZhra2tZWfoQgBsbGxQSEkI3NzevOkhWDx4fHxN6QrmzGBsg1tBYIhY5Q2JgShAHvLq6ovj4eNLQ0KDu7u43a/SXL1+oubmZ7ZmbmyufzHBAaI9QjgBha2tLfn5+BC+IA6J1SkhIYEvGx8dZjT04OCAklIODgyiGUZHQdLi6utLAwIAwgC/vF0mCZMFhTU1N7O+ZmRlKTExk31FtIEkYB4qKithvCBcdHR225q8Bime3OCA0E16DNJWWljLAHz9+sL7vJSD6SXhSW1ubaetrJnU/yC3mPIj+jSuD4oDIfCcnp1cB0Vah+cAVo/HFuHB2dkb29vaEIUxQwPDwcKqrq5O44sHBQaaVr3kQICcnJ6wCoWxihIBhAIuLixMG0NnZmSVJREQE08WXMYj2yd3dXZQAXFxCCVJTUyUgUKnQXb9VNnlfMQcYGRlJ379/lwCEJzBYofu5vLyUAFJXV6fPnz8zqcJUBzV4z3gDcjH4FuB7h6HxwEyNTlpakxkQXqipqZHwIHcwrgxZCi8hiRBz8Ja5ubm0bOw5mQEhwtXV1RKAaNOMjY1ZZhoZGfGCETSLo6OjqaqqSgIQbwo8PDzkBhPdBN+3W1wMxsTE0Ldv3z4uYGxsLGFmeSkz/9yDCHo0AuIexLySlJTEYDkdFOqOeScJdG5ubo7NyNPT0+zNVHl5uejNwPLyMhkYGAjFxz+LMceiVYdZWVmx5hPDPIT306dPDFpI4+1BvGFAp722tvYfDlSI/v5+0fQnFCRvQByMl0mQGMTe+fk50zwM9bh2oU0mQKEhBK3FfxMOZ/0GmVkMtgwbvCgAAAAASUVORK5CYII=) no-repeat center;
                // background: url(../assets/image/pointDown.png) no-repeat center;//jekins不成功
                background-size: 100% 100%;
            }
        }
        .cankaoImgBox{
            padding-top: 20/50rem;
            .cankaoImg {
                width: 702/50rem;
                height: 396/50rem;
                display: block;
            }
        }

    }
</style>
<script>
    import {Scroller} from 'vux'
    import activityBtn from './activity_btn'

    export default {
        name:"activity-introduce",
        components:{Scroller,activityBtn},
        props:['result'],
    }
</script>