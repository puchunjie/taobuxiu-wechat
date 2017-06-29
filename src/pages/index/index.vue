<template>
    <div class="container">
        <section class="swiper-container">
            
        </section>
        <address-picker :showChose="test"></address-picker>
    </div>
</template>

<script>
    import { Swiper,SwiperItem } from 'vux'
    import addressPicker from '@/components/basics/addressPicker'
    export default {
        components: {
            Swiper,
            SwiperItem,
            addressPicker
        },
        data () {
            return {
                test:{show:true},
                swiperImgs:[
                    'http://wap.gangg.cn/system/templates/default12/images/bn12121-1.jpg?4',
                    'http://wap.gangg.cn/system/templates/default12/images/bn12121-1.jpg?4',
                    'http://wap.gangg.cn/system/templates/default12/images/bn12121-1.jpg?4'
                ]
            }
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        .swiper-container{
            width: 100%;
            height: 1.75rem;
            margin-bottom: .1rem;
        }
    }
</style>

