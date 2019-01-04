<template>
    <div class="loading_container">
        <div class="spinner">
            <img :src="site" alt="">
        </div>

    </div>
</template>
<script type="text/javascript">
import img1 from "../../assets/img/2_00000.png"
import img2 from "../../assets/img/2_00001.png"
import img3 from "../../assets/img/2_00002.png"
import img4 from "../../assets/img/2_00003.png"
import img5 from "../../assets/img/2_00004.png"
import img6 from "../../assets/img/2_00005.png"
import img7 from "../../assets/img/2_00006.png"
import img8 from "../../assets/img/2_00007.png"
import img9 from "../../assets/img/2_00008.png"
import img10 from "../../assets/img/2_00009.png"
import img11 from "../../assets/img/2_00010.png"
import img12 from "../../assets/img/2_00011.png"
import img13 from "../../assets/img/2_00012.png"
import img14 from "../../assets/img/2_00013.png"
import img15 from "../../assets/img/2_00014.png"
import img16 from "../../assets/img/2_00015.png"
import img17 from "../../assets/img/2_00016.png"
import img18 from "../../assets/img/2_00017.png"
import img19 from "../../assets/img/2_00018.png"
import img20 from "../../assets/img/2_00019.png"
import img21 from "../../assets/img/2_00020.png"
import img22 from "../../assets/img/2_00021.png"
import { mapState } from 'vuex'
import store from '../../store'



export default {
    name: "loading",
    data(){
        return {
            list:[img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,img21,img22],
            site:img1,
            index:0,
            timer:null

        }
    },
    mounted(){
        this.$nextTick(function () {
            //实时刷新时间单位为毫秒
            this.timer = setInterval(this.refreshQuery, 30);
            
            store.commit('LOADING_CLEARTIMER', this.timer);

        })
    },
    methods:{
        refreshQuery(){         
            if (this.index >= 21) {
                this.index = 0
            }
            this.site = this.list[this.index++]
            // console.log(this.list)
            console.log('LOADING')
        }
    },
    props:{
        loadingText:{
            type:String,
            default:"加载中..." 
        }

    }
}
</script>
<style type="text/css" lang="less" scoped>
.loading_container{
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    height:100%;
    text-align:center;
    >span{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
}
.spinner {
    width: 60px;
    height: 60px;
    position: relative;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
}
</style>