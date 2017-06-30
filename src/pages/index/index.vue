<template>
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
        <bottom-menu></bottom-menu>
    </div>
</template>

<script>
    import { Swiper, SwiperItem, Grid, GridItem } from 'vux'
    import bottomMenu from '@/components/business/bottomMenu'
    export default {
        components: {
            Swiper,
            SwiperItem,
            bottomMenu,
            Grid,
            GridItem
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
                    {label:"现货市场",link:"",icon:"icon-yishouhuo"},
                    {label:"特价资源",link:"",icon:"icon-tejiashangpin"},
                    {label:"加工定制",link:"",icon:"icon-jiagonghuanjie"},
                    {label:"上门质检",link:"",icon:"icon-zhijianfuwu"},
                    {label:"货运物流",link:"",icon:"icon-shouyewuliu"},
                    {label:"采购报价",link:"",icon:"icon-cai"}
                    ]
            }
        },
        methods: {

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
                font-size: .4rem;
                color: #d60101;
            }
            .weui-grid__icon {
                width: .4rem!important;
                height: .4rem!important;
                margin: 0 auto .15rem!important;
            }
        }
    }
</style>

