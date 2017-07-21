<template>
    <view-box>
        <com-header hideRight>确认订单</com-header>
        <group>
            <popup-picker @on-change="syncTime" :display-format="format" :data="time" v-model="pickerTime" placeholder="请选择（必填)">
                <div slot="title" class="cell-title">
                    <span class="iconfont icon-bianji1"></span>
                    <span style="vertical-align:middle;">有限期限</span>
                </div>
            </popup-picker>
        </group>

        <div style="padding-bottom:.1rem">
            <div class="order-item clearfix" v-for="(el,index) in orderConfirmData" :key="el.catId">
                <div class="info vux-1px-b">
                    <h3>{{ el.desc }}</h3>
                    <span class="price">&yen;{{ el.price }}/{{ el.unit }}</span>
                </div>
                <div class="adress">
                    {{ el.sourceCity }} 
                    <span class="totle">共计：{{ el.count }}{{ el.unit }}</span>
                    <span class="price">&yen;{{ el.count * el.price }}</span>
                </div>
            </div>
        </div>

        <div class="bottom-bar vux-1px-t" slot="bottom">
            <div class="cover">
                <div class="price">
                    <p class="p">合计：<span>&yen;{{ totlePrice }}</span></p>
                    <p class="c">共{{ orderConfirmData.length }}件 (不含运费)</p>
                </div>
                <a class="action-btn" @click="confirmOrder">提交订单</a>
            </div>
        </div>
    </view-box>
</template>

<script>
    import { ViewBox, PopupPicker, Group } from 'vux'
    import { mapGetters, mapActions } from 'vuex'
    import { days, hours, minutes } from '@/assets/resouseData.js'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            ViewBox,
            comHeader,
            PopupPicker, 
            Group
        },
        computed: {
            ...mapGetters(['orderConfirmData']),
            totlePrice(){
                let price = 0;
                this.orderConfirmData.forEach(el => {
                    price += el.price *el.count
                })
                return price
            },
            apiOrder(){
                let arr = [];
                this.orderConfirmData.forEach(el => {
                    let item = {}
                    item.productType = el.productType;
                    item.productId = el.proId;
                    item.count = el.count;
                    arr.push(item) 
                })
                return arr
            }
        },
        data () {
            return {
                time:[days,hours,minutes],  
                pickerTime:['1','0','0'],  
                timeLimit: 86400000,
            }
        },
        methods: {
            ...mapActions(['resetOrderData']),
            format: function (value, name) {
                return `${value[0]}天${value[1]}时${value[2]}分`
            },
            syncTime(value){
                let limit = (value[0]*24*3600 + value[1]*3600 + value[2]*60) * 1000;
                this.timeLimit = limit;
            },
            confirmOrder(){
                let _this = this;
                this.$vux.confirm.show({
                    title:'确定提交此订单？',
                    content:'一旦提交，将无法撤回。',
                    confirmText:'提交',
                    onConfirm () {
                        _this.doOrder();
                    }
                })
            },
            doOrder(){
                this.$http.post(this.api.translateAllCart,{
                    timeLimit: this.timeLimit,
                    orders: JSON.stringify(this.apiOrder),
                    isFromCar: true
                }).then(res => {
                    let _this = this;
                    if(res.status === 0){
                        this.resetOrderData();
                        this.$vux.alert.show({
                            title: '订单提交成功！',
                            content: '您已成功下单。',
                            onHide () {
                                // _this.$router.push({})
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
            }
        }
    }
</script>

<style lang="less" scoped>
    .vux-cell-box{
        font-size: .14rem;
    }

    .cell-title{
        position: relative;
        text-indent: .3rem;
        .iconfont{
            position: absolute;
            font-size: .3rem;
            top: -.1rem;
            left: 0;
            text-indent: 0;
            color: #999;
        }
    }

    .order-item{
        width: 100%;
        margin-top: .1rem;
        background-color: #fff;
        color: #999;
        .info{
            padding: .1rem;
            h3{
                display: inline-block;
                width: 2.8rem;
                color: #333;
            }
            .price{
                display: inline-block;
                width: .7rem;
                text-align: right;
            }
        }
        .adress{
            position: relative;
            width: 100%;
            padding: .05rem .1rem;
            span{
                position: absolute;
                right: .1rem;
            }
            .price{
                color: #333;
                font-size: .16rem;
                font-weight: 500;
            }
            .totle{
                right: .8rem;
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
            height: .4rem;
            text-indent: 0;
            right: 1.2rem;
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
