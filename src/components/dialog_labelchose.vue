<!--标签选择弹窗-->
<template>
    <div class="dialogBox">
        <div class="topContent"> 
            <div class="title">请选择适合你的标签</div>            
            <div class="labelWrapper" ref="labelWrapper">
                <ul class="content" ref="content">
                    <li v-for="(item,index) in labelArr" :class="item.isChosed?'chosedli':''" :key="index" @click="choseLabel(index)">
                        <span class="txt">{{item.name}}</span>
                        <img v-if="item.isChosed" class="iconChosed" src="../assets/image/labelChosed.png">
                        <img v-else class="iconChosed" src="../assets/image/labelChose.png">
                        <!-- <span class="idot idotActive" v-if="item.isChosed"></span> -->
                    </li>
                </ul>
            </div>
        </div>
        <div class="line1px"></div>
        <div class="btnBox">
            <div class="btn cancelBtn" @click="cancel">取消</div>
            <div class="btn sureBtn" @click="submitChoseLabel">确定</div>
        </div>
    </div>
</template>
<style lang="less">
@main-color:rgb(255, 215, 149);
@border-color:rgb(251, 200, 115);
@border-color0:rgb(151, 151, 151);
    .dialogBox{
        background:#fff;
        border-radius: .06*4rem;
        .topContent{
            padding: 40/50rem 40/50rem 0 40/50rem;
            .title{
                font-size:18px;
                color: #444;
                text-align: center;
                font-weight: 600;
                line-height:56/50rem;
                margin-bottom: 40/50rem;
            }
            .labelWrapper{
                max-height:40vh;
                overflow: hidden;
                .content{
                    overflow: hidden;
                    >li{
                        display: flex;
                        align-items: center;
                        padding:7.5/50rem 20/50rem;
                        float: left;
                        border: 1px solid #CACACA;
                        margin:0 40/50rem 40/50rem 0;
                        border-radius: 8px;
                        .iconChosed{
                            width: 24/50rem;
                            height: 24/50rem;
                            margin: 0 0 0 18/50rem;
                        }
                        .idotActive{
                            border: 1px solid @border-color;
                            background: @main-color;
                        }
                        .txt{
                            font-size:28/50rem;
                            color: #cacaca;
                        }
                    }
                    .chosedli{
                        border:2/50rem solid #FFB433;
                        .txt{
                            color:#1B1B1B;
                        }
                    }
                }
            }
        }
        .btnBox{
            display: flex;
            justify-content: space-between;
            padding: 40/50rem 40/50rem 60/50rem 40/50rem;
            .btn{
                width: 240/50rem;
                height: 80/50rem;
                line-height: 80/50rem;
                border-radius: 80/50rem;
                border:1px solid #1B1B1B;
                font-size: 36/50rem;
                color:#1B1B1B;
                text-align: center;
                &.sureBtn{
                    color: #fff;
                    background: #1B1B1B;
                }
            }
        }
    }
</style>
<script>
    import {Scroller} from 'vux'
    import http from '@/axios'
    import Vue from 'vue'
	//better-scroll 弹力滑动
	import BScroll from 'better-scroll'
    export default {
        name:"activity-labelchose",
        props:['labels'],
        data(){
            return {
                labelArr:[],
            }
        },
        components:{
            Scroller
        },
        mounted(){
            // console.log(this.labels)
            for(let i=0;i<this.labels.length;i++){
                var labelObj=JSON.parse(this.labels[i])
                labelObj.isChosed = false
                this.labelArr.push(labelObj)
            }
            // console.log("标签数组",this.labelArr)
        	//数据加载完成之后获取容器content高度
			this.$nextTick(() => { 
//				setTimeout(() => {
					this.scroll = new BScroll(this.$refs.labelWrapper,{
						click:true,//允许点击子元素
					})
//				},20)
			})
        },
        methods:{
            choseLabel(index){
                this.labelArr[index].isChosed=!this.labelArr[index].isChosed
            },
            submitChoseLabel(){
                // 提交给父组件所选结果
                this.$emit("to-parent",this.labelArr)
            },
            cancel(){
                // 取消
                this.$emit("to-parent","cancel")
            }
        },
    }
</script>