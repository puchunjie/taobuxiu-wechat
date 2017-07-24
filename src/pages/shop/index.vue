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
        <div class="link-btns">
            <router-link :to="{name:'shopProduct',params:{sellerId:sellerId}}" class="vux-1px-r">现货资源</router-link>
            <router-link :to="{name:'shopMachining',params:{sellerId:sellerId}}">加工定制</router-link>
        </div>
        <div class="tab-swiper">
            <h3 class="vux-1px-b">公司简介</h3>
            <p class="desc" v-if="activeTab === 0">{{ shopInfo.shopProfile }}</p>
        </div>
    </div>
</template>

<script>
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            comHeader
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

        .link-btns{
            width: 100%;
            background-color: #fff;
            border-bottom: .2rem solid #efeff4;
            overflow: hidden;
            padding: .05rem 0;
            a{
                display: block;
                width: 50%;
                height: .3rem;
                float: left;
                line-height: .3rem;
                text-align: center;
                color: #333;
            }
        }

        .tab-swiper{
            width: 100%;
            border-top: .05rem solid #efeff4;
            padding: 0 .15rem;
            h3{
                text-align: center;
                font-size: .18rem;
                font-weight: 500;
                margin-bottom: .1rem;
            }
            .desc{
                font-size: .16rem;
                line-height: .24rem;
                text-indent: .1rem;
            }
        }
    }
    .vux-header{
        padding: 0;
    }
</style>
