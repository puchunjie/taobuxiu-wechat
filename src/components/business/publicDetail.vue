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
            <p class="stock"  v-if="isGoods">库存：{{ baseInfo.numbers }}{{ baseInfo.unit }}</p>
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

             <router-link :to="{name:'shop',params:{sellerId: shopInfo.sellerId}}" class="btn">进入店铺</router-link>
        </section>    
        
        <div class="btns" slot="bottom">
            <a class="add-cart" @click="showPop(false)">加入购物车</a>
            <a class="buy-now" @click="showPop(true)">立即购买</a>
        </div>

        <popup v-model="addCartShow" :showMask="false">
            <div class="pop-contnet vux-1px-t">
                <span class="close iconfont icon-closecircled" @click="hidePop"></span>
                <div class="b-info">
                    <h3>&yen;{{ baseInfo.price }}/{{ baseInfo.unit }}<span>(不含运费)</span></h3>
                    <p v-if="isGoods">库存：{{ baseInfo.numbers }}{{ baseInfo.unit }}</p>
                    <p>{{ baseInfo.place }}</p>
                </div>
                <div class="detail vux-1px-t">
                    <label>数量</label>
                    <p><count v-model="count"></count><span style="font-size:.2rem;margin-left:.1rem">{{ baseInfo.unit }}</span></p>
                    <template v-if="modelType">
                        <label>备注</label>
                        <group :gutter="0" class="texta">
                            <x-textarea style="font-size:.14rem;" v-model="message" :max="35" placeholder="请输入下单备注(选填)"></x-textarea>
                        </group>
                    </template>
                </div>
                <div class="time vux-1px-t" v-if="modelType">
                    <label>有效期限</label>
                    <div class="label-content">
                        <span :class="{'active': activeTime === index}" v-for="(el,index) in pickeTime" :key="index" @click="pick(index)">
                            {{ el < 1 ? el*60 + '分钟' : el + '小时' }}
                        </span>
                    </div>
                </div>
                <a class="do-btn" @click="action" :class="{'orange':!modelType}">{{ modelType ? '提交订单' : '确认添加' }}</a>
            </div>
        </popup>
        <div class="mask" v-show="addCartShow" @click="hidePop"></div>
    </view-box>
</template>

<script>
    import { ViewBox, Swiper, SwiperItem, XHeader, Popup, Group, XTextarea } from 'vux'
    import comHeader from '@/components/business/commonHead'
    import count from '@/components/basics/count'
    export default {
        components: {
            ViewBox,
            Swiper,
            SwiperItem,
            comHeader,
            XHeader,
            Popup,
            count,
            Group,
            XTextarea
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
                        adress: '公司地址',
                        sellerId: ''
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
        data () {
            return {
                addCartShow: false,
                count: 1,
                message: '',
                modelType: false ,//模式，true购买false添加购物车  
                pickeTime:[.5,1,2,4,8,24,48],
                activeTime: 5
            }
        },
        computed: {
            // 通过商品有没有数量来判断是不是加工
            productType(){
                return this.baseInfo.numbers != undefined ? 0 : 1
            },
            isGoods(){
                return this.baseInfo.numbers != undefined
            },
            timeLimit(){
                return this.pickeTime[this.activeTime]*3600000
            }
        },
        methods: {
            onBack(){
                this.$emit('on-back')
            },
            showPop(type){
                this.modelType = type;
                this.addCartShow = true;
            },
            hidePop(){
                this.addCartShow = false;
                this.count = 1;
                this.message = '';
            },
            //选择有效期
            pick(index){
                this.activeTime = index;
            },
            //提交、加入购物车
            action(){
                let _this = this;
                this.$vux.confirm.show({
                    content: this.modelType ? '确认提交订单？' : '确认加入购物车？',
                    onConfirm () {
                        if(_this.modelType){
                            _this.submitGoods()
                        }else{
                            _this.addToCart()
                        }
                        _this.$vux.loading.show({
                            text: _this.modelType ? '下单中...' : '正在加入...'
                        })
                    }
                })
            },
            // 加入购物车
            addToCart(){
                let _this = this;
                this.$http.post(this.api.addCart,{
                    productType: this.productType,
                    proId: this.baseInfo.id
                }).then(res => {
                    if(res.status === 0){
                        this.$vux.alert.show({
                            content: '成功加入购物车',
                            onHide () {
                                _this.hidePop();
                            }
                        })
                    }else{
                        this.$vux.toast.show({
                            text: res.errorMsg,
                            type: 'warn',
                            width: '2rem'
                        });
                    }
                    this.$vux.loading.hide()
                })
            },
            // 下单
            submitGoods(){
                let _this = this;
                this.$http.post(this.api.doOrder,{
                    timeLimit: this.timeLimit,
                    productType: this.productType,
                    productId: this.baseInfo.id,
                    count: this.count,
                    message: this.message,
                    isFromCar:false,
                }).then(res => {
                    if(res.status === 0){
                        this.$vux.alert.show({
                            content: '下单成功！',
                            onHide () {
                                _this.hidePop();
                                _this.$router.push({name: 'buyerOrder'});
                            }
                        })
                    }else{
                        this.$vux.toast.show({
                            text: res.errorMsg,
                            type: 'warn',
                            width: '2rem'
                        });
                    }
                    this.$vux.loading.hide()
                })
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

    .vux-popup-dialog{
        z-index: 1002;
    }

    .pop-contnet{
        position: relative;
        width: 100%;
        background-color: #fff;
        .close{
            position: absolute;
            right: .1rem;
            top: 0;
            font-size: .3rem;
        }
        .b-info{
            width: 100%;
            padding: .1rem;
            h3{
                font-size: .24rem;
                color: red;
                line-height: .3rem;
                span{
                    color: #333;
                    font-size: .14rem;
                }
            }
        }
        .detail{
            width: 100%;
            padding: .1rem;
            label{
                color: #999;
                line-height: .3rem;
            }
            .texta{
                border: 1px solid #999;
            }
            .texta:before{
                border: 0!important;
            }
        }

        .time{
            width: 100%;
            font-size: .14rem;
            overflow: hidden;
            padding: .1rem;
            label{
                color: #999;
                line-height: .3rem;
            }
            .label-content{
                width: 100%;
                span{
                    display: inline-block;
                    padding: 0 .05rem;
                    color: #999;
                    border: 1px solid #999;
                    border-radius: .05rem;
                    margin: .05rem .1rem .05rem 0;
                    font-size: .12rem;
                }
                .active{
                    background-color: #007de4;
                    color: #fff;
                    border-color: #007de4;
                }
            }
        }

        .do-btn{
            display: block;
            width: 100%;
            text-align: center;
            color: #fff;
            height: .4rem;
            line-height: .4rem;
            font-size: .16rem;
            background-color: #007de4;
        }
        .orange{
            background-color: #ff7600;
        }
    }
    .mask{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>
