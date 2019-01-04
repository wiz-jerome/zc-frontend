<template>
    <div class="share_money">
        <img :src="bg_img" alt="">
        <div class="box">
            <img :src="bg_card" alt="">
            <p class="money">当前总收入<span>123</span>元</p>
            <img :src="erweima" alt="">
            <div>
                <p>扫描二维码下载</p>
                <p>或</p>
                <p>APPStore搜索找财</p>
            </div>
        </div>
        <div class="btn">点击下载</div>
    </div>
</template>

<script>
    import bg_img from '../assets/image/shareMoney_bg.png'
    import bg_card from '../assets/image/shareMoney_card.png'
    import erweima from '../assets/image/erweima.png'
    export default {
        name: "share_money",
        data() {
            return {
                bg_img: bg_img,
                bg_card: bg_card,
                erweima:erweima
            }
        },
    }
</script>

<style scoped lang="less">
    .share_money {
        img {
            width: 100%;
        }
        .box {
            position: relative;
            font-size: .6rem;
            img:first-of-type {
                width: 351*2/50rem;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                box-shadow:0px 0px 20px #ededed
            }
            img:last-of-type {
                width: 2.7rem;
                position: absolute;
                top: 3rem;
                left: 1.7rem;
            }
            .money {
                position: absolute;
                top: 0;
                z-index: 1;
                font-size: .7rem;
                left: 50%;
                transform: translateX(-50%);
                top: .3rem;
                display: flex;
                align-items: center;
                span {
                    font-size: .9rem;
                    color: orange;
                }
            }
            div {
                position: absolute;
                top: 3rem;
                left: 5rem;
            }
        }
        .btn {
            width: 90%;
            height: 2rem;
            background: orange;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            line-height: 2rem;
            border-radius: 1rem;
            color: white;
            font-size: .8rem;
            margin-bottom: .3rem;
        }
    }
</style>