<template>
    <view-box body-padding-bottom="1rem">
        <x-header slot="header" :left-options="{showBack:false}">
            <router-link slot="right" :to="{name:'index'}">
                <span class="iconfont icon-shouye"></span>
            </router-link>
            {{ pageTitle }}
            <span class="iconfont icon-fanhui" slot="left" @click="onBack"></span>
        </x-header>
        <section class="head-img">
            <swiper :height="'3.75rem'">
                <swiper-item v-for="(el,index) in swiperImgs" :key="index">
                    <img class="full" :src="'http://www.itaobuxiu.com/'+el">
                </swiper-item>
            </swiper>
        </section>

        <section class="base-info">
            <h3>{{ baseInfo.title }}</h3>
            <p class="price">&yen;{{ baseInfo.price }}<span>/{{ baseInfo.unit }}</span></p>
            <p class="stock"  v-if="baseInfo.numbers">库存：{{ baseInfo.numbers }}{{ baseInfo.unit }}</p>
            <span class="place">{{ baseInfo.place }}</span>
        </section>
        
        <section class="detail-info">
            <p class="item" v-for="(el,index) in detailInfo" :key="index">
                <label>{{ el.label }}:</label>
                {{ el.value }}
            </p>
        </section>

        <section class="detail-info">
            <p class="item">
                <label>运费:</label>
                请进入本平台物流板块询价或委托
            </p>
            <p class="item">
                <label>服务:</label>
                本平台可提供上门视频质检服务
            </p>
        </section>    

        <section class="shop clearfix">
            <img class="shop-img" :src="'http://www.itaobuxiu.com/'+shopInfo.cover">
            <div class="info">
                <h3>{{ shopInfo.name }}</h3>
                <p>主营：{{ shopInfo.desc }}</p>
            </div>
            <div class="adress">{{ shopInfo.adress }}</div>

             <router-link :to="{name:'shop',params:{sellerId:shopInfo.sellerId}}" class="btn">进入店铺</router-link>
        </section>    
        
        <div class="btns" slot="bottom">
            <a class="add-cart">加入购物车</a>
            <a class="buy-now">立即购买</a>
        </div>
    </view-box>
</template>

<script>
    import { ViewBox, Swiper, SwiperItem, XHeader } from 'vux'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            ViewBox,
            Swiper,
            SwiperItem,
            comHeader,
            XHeader
        },
        props:{
            pageTitle:{
                type:String,
                default:'详情页'
            },
            shopInfo:{
                type:Object,
                default:function(){
                    return {
                        cover: '',
                        name: '公司名称',
                        desc: '主营业务描述',
                        adress: '公司地址'
                    }
                }
            },
            swiperImgs:{
                type:Array,
                default:function(){
                    return []
                }
            },
            baseInfo:{
                type:Object,
                default:function(){
                    return {
                        title: '标题',
                        price: '999',
                        unit: 'kg',
                        numbers: '9999',
                        place: '江苏 无锡'
                    }
                }
            },
            detailInfo:{
                type:Array,
                default:function(){
                    return [
                        {
                            label:'品类',
                            value: '不锈钢管'
                        },
                        {
                            label:'材质',
                            value: '304'
                        },
                        {
                            label:'表面',
                            value: '2B'
                        },
                        {
                            label:'产地',
                            value: '太钢'
                        },
                        {
                            label:'规格',
                            value: '1000*90*10'
                        },
                        {
                            label:'地点',
                            value: '江苏 无锡'
                        }
                    ] 
                }
            }
        },
        methods: {
            onBack(){
                this.$emit('on-back')
            }
        }
    }
</script>

<style lang="less" scoped>
    .head-img{
        width: 100%;
        .full{
            width: 100%;
            height: 100%;
        }
    }

    .base-section{
        width: 100%;
        padding: .05rem .1rem;
        background-color: #fff;
        margin-bottom: .1rem;
    }

    .over-space{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .title-h3{
        font-size: .18rem;
        font-weight: 500;
        .over-space
    }

    .base-info{
        position: relative;
        line-height: .3rem;
        h3{
            .title-h3
        }
        .price{
            font-size: .24rem;
            color: red;
            span{
                font-size: .16rem;
            }
        }
        .stock{
            color: #999;
            font-size: .14rem;
        }
        .place{
            position: absolute;
            right: .1rem;
            bottom: 0;
            color: #999;
        }
        .base-section
    }

    .detail-info{
        .item{
            line-height: .4rem;
            label{
                display: inline-block;
                width: .4rem;
                color: #999;
            }
        }
        .base-section
    }

    .shop{
        position: relative;
        .shop-img{
            display: block;
            width: .6rem;
            height: .6rem;
            float: left;
        }
        .info{
            width: 2.95rem;
            height: .6rem;
            float: left;
            padding-left: .1rem;
            h3{
                .title-h3
            }
            p{
                color: #999;
                .over-space
            }
        }
        .adress{
            float: left;
            width: 2.4rem;
            line-height: .4rem;
            .over-space
        }
        .btn{
            position: absolute;
            display: block;
            width: 1rem;
            height: .3rem;
            line-height: .3rem;
            right: .1rem;
            bottom: .1rem;
            text-align: center;
            color: #007de4;
            border: 1px solid #007de4;
            border-radius: .05rem;
        }

        .base-section
    }

    .btns{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: .5rem;
        background: #fff;
        text-align: center;
        line-height: .5rem;
        font-size: .16rem;
        a{
            display: block;
            float: left;
            width: 50%;
            height: 100%;
            color: #fff;
        }
        .add-cart {
            background-color: #ff7600;
        }
        .buy-now {
            background-color: #007de4;
        }
    }
</style>
