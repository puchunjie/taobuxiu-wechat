<template>
    <view-box>
        <div class="container">
            <section class="swiper-container">
                <swiper :list="swiperImgs" height="1.75rem" auto></swiper>
            </section>

            <section class="cell-container">
                <grid>
                    <grid-item :link="option.link" :label="option.label" v-for="(option,index) in cellOptions" :key="index">
                        <span slot="icon" class="cell-icon iconfont" :class="option.icon"></span>
                    </grid-item>
                </grid>
            </section>

            <article-part :list="newsList" title="淘不锈资讯" :icon="'icon-comiiszixun'" :moreLink="{name:'informationCenter'}"></article-part>

            <article-part :list="buysList" title="最新采购" 
            :icon="'icon-caigou'" showTime :moreLink="{name:'purchase'}"></article-part>
        </div>
        <bottom-menu slot="bottom"></bottom-menu>
    </view-box>
</template>

<script>
    import { ViewBox, Swiper, Grid, GridItem } from 'vux'
    import bottomMenu from '@/components/business/bottomMenu'
    import articlePart from '@/components/business/article'
    export default {
        components: {
            ViewBox,
            Swiper,
            bottomMenu,
            Grid,
            GridItem,
            articlePart
        },
        data () {
            return {
                test:{show:true},
                swiperImgs:[{
                        img: 'http://wap.gangg.cn/system/templates/default12/images/bn12121-1.jpg?4',
                    }, {
                        img: 'http://wap.gangg.cn/system/templates/default12/images/bn12121-1.jpg?4'
                    }, {
                        img: 'http://wap.gangg.cn/system/templates/default12/images/bn12121-1.jpg?4',
                    }],
                cellOptions:[
                    {label:"现货市场",link:"goodsInStock",icon:"icon-yishouhuo"},
                    {label:"特价资源",link:"special",icon:"icon-shaixuantubiaogaozhuanqu19"},
                    {label:"加工定制",link:"processingInformation",icon:"icon-dingzhi"},
                    {label:"上门质检",link:"",icon:"icon-zhijianfuwu"},
                    {label:"货运物流",link:"logistics",icon:"icon-shouyewuliu"},
                    {label:"采购报价",link:"purchase",icon:"icon-cai"}
                    ],
                newsList:[],
                buysList: []
            }
        },
        methods: {
            //新闻列表
            getNews(){
                return this.$http.get(this.api.news)
            },
            //最新采购列表
            getBuys(){
                return this.$http.get(this.api.indexBuy)
            }
        },
        created () {
            this.$http.all([this.getNews(),this.getBuys()]).then(this.$http.spread((news,buys) =>{
                this.newsList = news.data.slice(0, 3);
                this.buysList = buys.data;
            }));
        }
    }
</script>

<style lang="less">
    .container{
        width: 100%;
        .swiper-container{
            width: 100%;
            height: 1.75rem;
            margin-bottom: .1rem;
        }

        .cell-container {
            width: 100%;
            color: #333;
            margin-bottom: .1rem;
            background-color: #fff;
            .cell-icon {
                display: block;
                font-size: .5rem;
                color: #007de4;
            }
            .weui-grid__icon {
                width: .5rem!important;
                height: .5rem!important;
                margin: 0 auto .2rem!important;
            }
            .weui-grid{
                padding: .1rem;
            }
        }
    }
</style>

