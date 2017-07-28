<template>
    <view-box>
        <com-header hideRight>购物车({{ maxCount }})</com-header>
         <checker class="list-content" v-model="checkList" type="checkbox" selected-item-class="checked">
            <div class="cart-item clearfix" v-for="(item,index) in cartListData" :key="item.carId">
                <checker-item :value="item.carId">
                     <span class="check-box iconfont"></span> 
                </checker-item>
                <img class="product-pic" :src="'http://www.itaobuxiu.com'+item.cover">
                <div class="right">
                    <h3>{{ item.desc }}</h3>
                    <p class="ad">{{ item.sourceCity }}</p>
                    <div class="price-count">
                        &yen;{{ item.price }}/{{ item.unit }}
                        <span style="float: right;color: #333;">{{ item.unit }}</span>
                    </div>
                    <div class="count-r">
                        <count v-model="item.count"></count>
                    </div>
                    <span class="delete iconfont icon-lajixiang" @click="confDelete(item.carId,index)"></span>
                </div>
            </div>
        </checker> 
        <div class="bottom-bar vux-1px-t" slot="bottom">
            <div class="cover">
                <span class="check-all iconfont icon-checknormal" @click="checkAll" v-if="!isCheckAll"></span>
                <span class="check-all iconfont icon-checked" @click="clearAll" v-else></span>
                全选
                <div class="price">
                    <p class="p">合计：<span>&yen;{{ totlePrice }}</span></p>
                    <p class="c">共{{ checkList.length }}件</p>
                </div>
                <a class="action-btn" @click="confirmOrder">去下单</a>
            </div>
        </div>
    </view-box>
</template>

<script>
    import { mapActions } from 'vuex'
    import { ViewBox, Checker, CheckerItem } from 'vux'
    import comHeader from '@/components/business/commonHead'
    import count from '@/components/basics/count'
    export default {
        components: {
            ViewBox,
            comHeader,
            Checker, 
            CheckerItem,
            count
        },
        data () {
            return {
                cartListData: [],
                maxCount: 0,
                checkList: []
                // totlePrice: 0
            }
        },
        methods: {
            ...mapActions(['setOrderData']),
            getCarts(){
                this.$http.get(this.api.myCarts,{
                    params:{
                        currentPage: 0,
                        pageCount:100
                    }
                }).then(res => {
                    let data = res.data;
                    if(res.status === 0){
                        // 处理数据，加上数量统计，方便计算
                        data.cars.map(el => {
                            el.count = 1;
                        });
                        this.cartListData = data.cars;
                        this.maxCount = data.maxCount;
                    }
                })
            },
            checkAll(){
                this.checkList = [];
                this.cartListData.forEach(el => {
                    this.checkList.push(el.carId)
                })
            },
            clearAll(){
                this.checkList = [];
            },
            deleteCart(carId,index){
                this.$http.post(this.api.deleteCart,{
                    carId: carId
                }).then(res => {
                    if(res.status === 0){
                        this.getCarts();
                        this.checkList.forEach((el,i) => {
                            if(el === carId){
                                this.checkList.splice(i,1)
                                return false
                            }
                        })
                    }else{
                        this.$vux.toast.show({
                            text: res.errorMsg,
                            type: 'warn',
                            width: '2rem'
                        });
                    }
                })
            },
            confDelete(carId,index){
                let _this = this;
                this.$vux.confirm.show({
                    title:'确定要删除此商品么？',
                    content:'此宝贝删除后，将无法撤回。',
                    confirmText:'删除',
                    onConfirm () {
                        _this.deleteCart(carId,index)
                    }
                })
            },
            confirmOrder(){
                if(this.checkList.length > 0){
                    this.setOrderData(this.checkItem);
                    this.$router.push({name:'confirmOrder'})
                }else{
                    this.$vux.toast.show({
                        text: '请选择商品!',
                        type: 'warn',
                        width: '2rem'
                    });
                }
            }
        },
        computed: {
            // 是否全选了,如果在checkList中有所有的产品就是全选
            isCheckAll(){
                return this.checkList.length === this.maxCount
            },
            totlePrice(){
                let totle = 0;
                this.checkList.forEach(el => {
                    let checkItem = {};
                    this.cartListData.forEach(subel => {
                        if(subel.carId === el){
                            checkItem = subel;
                        }
                    })
                    totle += checkItem.price * checkItem.count;
                })
                return totle
            },
            checkItem(){
                let arr = [];
                this.checkList.forEach(el => {
                    let checkItem = {};
                    this.cartListData.forEach(subel => {
                        if(subel.carId === el){
                            checkItem = subel;
                        }
                    })
                    arr.push(checkItem)
                })
                return arr
            }
        },
        created () {
            this.getCarts();
        }
    }
</script>

<style lang="less" scoped>
    .vux-checker-item{
        display: block;
    }

    .list-content{
        width: 100%;
        padding-bottom: .1rem;
        .cart-item{
            position: relative;
            width: 100%;
            background-color: #fff;
            margin-top: .1rem;
            padding: .1rem .05rem;
            .check-box{
                position: absolute;
                font-size: .24rem;
                top: .35rem;
                color: #999;
            }
            .check-box::before{
                content: "\e68a"
            }
            .checked .check-box{
                color: #007de4;
            }
            .checked .check-box::before{
                content: "\e614"
            }
            .product-pic{
                display: block;
                width: .85rem;
                height: .85rem;
                margin: 0 .1rem 0 .3rem;
                float: left;
            }
            .right{
                width: 2.3rem;
                float: left;
                font-size: .13rem;
                h3{
                    width: 2.2rem;
                    color: #333;
                    line-height: .2rem;
                    height: .4rem;
                }
                .ad{
                    color: #999;
                    line-height: .24rem;
                    text-align: right;
                }
                .delete{
                    position: absolute;
                    top: .05rem;
                    right: .1rem;
                    color: #999;
                    font-size: .2rem;
                }
                .price-count{
                    color: red;
                    font-size: .15rem;
                }
                .count-r{
                    position: absolute;
                    bottom: .05rem;
                    right: .65rem;
                }
            }
        }
    }

    .bottom-bar{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: .5rem;
        background-color: #fff;
        line-height: .5rem;
        .cover{
            position: relative;
            width: 100%;
            height: 100%;
            text-indent: .35rem;
            font-size: .16rem;
            font-weight: 500;
            .check-all{
                position: absolute;
                left: .05rem;
                text-indent: 0;
                font-size: .24rem;
                color: #999;
            }
            .icon-checked{
                color: #007de4;
            }
        }
        .action-btn{
            position: absolute;
            display: block;
            right: 0;
            top: 0;
            text-indent: 0;
            width: 1rem;
            height: .5rem;
            background-color: #ff8d00;
            color: #fff;
            font-size: .16rem;
            text-align: center;
            line-height: .5rem;
        }
        .price{
            position: absolute;
            width: 1.7rem;
            height: .4rem;
            text-indent: 0;
            left: .8rem;
            top: .05rem;;
            p{
                line-height: .2rem;
                font-size: .12rem;
                color: #999;
                span{
                    color: red;
                    font-size: .18rem;
                }
            }
        }
    }
</style>
