<template>
    <div class="container">
        <com-header>逛店铺</com-header>
        <div class="main-info">
             <img class="pic" :src="shopInfo.cover"> 
             <div class="panel">
                 <h3>{{ shopInfo.companyName }}</h3>
                 <p>{{ shopInfo.officeAddress }}</p>
             </div>
        </div>
        <tab active-color="#007de4" v-model="activeTab">
            <tab-item v-for="(tab,index) in tabs" :key="index">
                {{ tab.title }}
            </tab-item>
        </tab>
        <div class="tab-swiper">
            <p class="desc" v-if="activeTab === 0">{{ shopInfo.shopProfile }}</p>
            <template v-else>
                    ssss
            </template>
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem, dateFormat } from 'vux'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            comHeader,
            Tab, 
            TabItem
        },
        computed: {
            sellerId(){
                return this.$route.params.sellerId
            }
        },
        data () {
            return {
                tabs:[
                    {title:'公司简介'},
                    {title:'现货资源'},
                    {title:'加工定制'}
                ],
                activeTab: 0,
                shopInfo:{}      
            }
        },
        methods: {
            getShopInfo(){
                this.$http.get(this.api.shopDetail,{
                    params:{
                        sellerId: this.sellerId
                    }
                }).then(res => {
                    let data = res.data;
                    if(res.status === 0){
                        this.shopInfo = data
                    }
                })
            }
        },
        created () {
            this.getShopInfo();
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
        background-color: #fff;
        .main-info{
            position: relative;
            width: 100%;
            height: 1.3rem;
            background-color: #007de4;
            color: #fff;
            .pic{
                float: left;
                width: .8rem;
                height: .8rem;
                margin: .2rem .1rem;
                border-radius: 50%;
            }
            .panel{
                width: 2.7rem;
                height: 1rem;
                line-height: .4rem;
                margin-top: .3rem;
                float: left;
                color: #fff;
                h3,p{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        .tab-swiper{
            width: 100%;
            border-top: .05rem solid #efeff4;
            padding: .1rem;
            .desc{
                line-height: .24rem;
                text-indent: .1rem;
            }
        }
    }

    .item{
        position: relative;
        width: 100%;
        padding: .1rem;
        color: #999;
        .tit{
            font-size: .14rem;
            line-height: .24rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span{
                color: #000;
                font-weight: 500;
                margin-right: .1rem;
            }
            .price{
                float: right;
            }
        }
        p{
            line-height: .24rem; 
        }
        .show-detail{
            position: absolute;
            display: black;
            width: .8rem;
            height: .3rem;
            right: .1rem;
            bottom: .1rem;
            border: 1px solid #007de4;
            color: #007de4;
            text-align: center;
            line-height: .28rem;
        }
    }

    .vux-header{
        padding: 0;
    }
</style>
