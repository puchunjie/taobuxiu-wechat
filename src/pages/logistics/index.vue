<template>
    <div class="container">
        <section class="head-img">
            <img src="https://img.alicdn.com/imgextra/i1/111/TB2iqvGystnpuFjSZFKXXalFFXa_!!111-0-luban.jpg_q50.jpg">
        </section>

        <section class="goods-info">
            <div class="group">
                <span class="iconfont icon-qidian left-icon"></span> 
                <div class="cell vux-1px-b"><input placeholder="请输入装点（必填）" :value="apiData.startPointTest"></div>
                <div class="cell-cover" @click="showAD('start')"></div>
            </div>
            <div class="group">
                <span class="iconfont icon-zhongdian left-icon"></span> 
                <div class="cell vux-1px-b"><input placeholder="请输入卸点（必填）" :value="apiData.endPointTest"></div>
                <div class="cell-cover" @click="showAD('end')"></div>
            </div>
            <div class="group">
                <span class="iconfont icon-package left-icon"></span> 
                <div class="cell"><input placeholder="请选择货物和重量（必填）"></div>
                <span class="iconfont icon-tianjia right-icon"></span>
            </div>
        </section>
        <address-picker :showChose="adShow" @on-seleted="selectedAdress"></address-picker>
        <bottom-menu></bottom-menu>
    </div>
</template>

<script>
    import bottomMenu from '@/components/business/bottomMenu'
    import addressPicker from '@/components/basics/addressPicker.vue'
    export default {
        components: {
            bottomMenu,
            addressPicker
        },
        data () {
            return {
                adShow:{
                    show:false
                },
                adressKey:'',
                apiData:{
                    startPointTest:'',
                    startPoint:'',
                    endPointTest:'',
                    endPoint:'',
                    goods1:'钢材 金属粉末',
                    goods1Count:20,
                    sepcCommand:'含税|垫出库费',
                    comment:'asdsad',
                    tel:13972837621
                }
            }
        },
        methods: {
            showAD(key){
                this.adShow.show = true;
                this.adressKey = key;
            },
            selectedAdress(data){
                this.apiData[this.adressKey+'PointTest'] = data.str;
                this.apiData[this.adressKey+'Point'] = data.id;
            }
        }
    }
</script>

<style lang="less" scoped>
    .head-img {
        width: 100%;
        height: 1.6rem;
        margin-bottom: .1rem;
        img{
            width: 100%;
            height: 100%;
        }
    }

    .goods-info {
        width: 100%;
        background-color: #fff;
        margin-bottom: .1rem;
        .group{
            position: relative;
            width: 3.6rem;
            height: .48rem;
            margin: 0 auto;
            .left-icon{
                position: absolute;
                font-size: .3rem;
                left: 0;
                top: 0;
                color: #08d808;
            }
            .cell{
                position: absolute;
                width: 3rem;
                height: .48rem;
                left: .4rem;
                input{
                    width: 100%;
                    height: .3rem;
                    margin-top: .06rem;
                    font-size: .13rem;
                }
            }
            .cell-cover{
                position: absolute;
                left:0;
                top:0;
                width: 100%;
                height: 100%;
            }
            .right-icon{
                position: absolute;
                font-size: .24rem;
                right: .2rem;
                top: .02rem;
                color: #666
            }
        }
    }
</style>
