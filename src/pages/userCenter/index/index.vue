<template>
    <view-box>
        <section class="header-part">
            <header>
                <span class="back iconfont icon-fanhui" @click.self="$router.go(-1)"></span>
                我的淘不锈
                <a class="phone" :href="'tel:'+ userInfo.salesMan.tel" v-if="userInfo.salesMan.name != ''">
                    <span class="iconfont icon-kefu"></span>
                </a>
                <a class="phone" v-else @click="bindingShow = true"><span class="iconfont icon-kefu"></span></a>
            </header>
            <div class="content" @click="$router.push({name:'userInfo'})">
                <img class="head-pic" :src="userInfo.avator">
                <div class="panel">
                    <h3>{{ userInfo.name }}</h3>
                    <p><span class="iconfont icon-zhongqingdianxinicon15"></span>{{ userInfo.mobile }}</p>
                </div>
                <span class="more iconfont icon-arrow-right"></span>
            </div>
        </section>

        <user-panel :data="buyer"></user-panel>

        <user-panel v-if="isSeller" :data="seller"></user-panel>
        
        <div v-else class="authentication">
            您暂未认证企业账号
             <a style="float:right;margin-right:.1rem" v-show="userInfo.becomeStatus === 1">等待审核中</a> 
            <router-link class="go-atc" :to="{name:'authenticate'}"  v-show="userInfo.becomeStatus === 0">{{ '去认证' }}</router-link>
        </div>

        <bottom-menu slot="bottom"></bottom-menu>

        <transition enter-active-class="animated fadeIn">
            <confirm v-model="bindingShow"
            show-input
            title="暂未绑定专属客服，现在是否需要立即绑定？"
            @on-confirm="bOnConfirm">
            </confirm>
        </transition>

        <transition enter-active-class="animated fadeIn">
            <confirm v-model="confirmShow"
            show-input
            title="您还没有登录，是否前往登录？"
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
            </confirm>
        </transition>
    </view-box>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { ViewBox, Confirm } from 'vux'
    import bottomMenu from '@/components/business/bottomMenu'
    import userPanel from '@/components/business/userPanel'
    export default {
        components: {
            ViewBox,
            bottomMenu,
            userPanel,
            Confirm
        },
        data () {
            return {
                confirmShow: false, 
                bindingShow: false,
                buyer: {
                    title:{
                        name:'买家中心',
                        icon:'icon-maijia2',
                        color: '#007de4'
                    },
                    info:{
                        orders:{
                            count: 0,
                            name: '待处理订单',
                            link: { name: 'buyerOrder',params: { status: 1 } }
                        },
                        integral:{
                            count: 0,
                            name: '积分',
                            link: { name: 'integral' }
                        },
                        buys: {
                            count: 0,
                            name: '待处理求购',
                            link: { name: 'buyerBuys' }
                        }
                    },
                    links:[
                        {
                            count: 0,
                            title:'购物车',
                            icon:'icon-icon',
                            color: '#06bb06',
                            link: {
                                name: 'shopCart'
                            }
                        },
                        {
                            count: 0,
                            title:'订单',
                            icon:'icon-dingdan',
                            color: '#ff3c3c',
                            link: {
                                name: 'buyerOrder',params: { status: 0 }
                            }
                        },
                        {
                            title:'积分',
                            icon:'icon-jifen',
                            color: '#fb893f',
                            link: { name: 'integral' }
                        },
                        {
                            title:'发布求购',
                            icon:'icon-fabu',
                            color: '#007de4',
                            link: {
                                name: 'bPublishProduct',
                                params:{
                                    id: 'false',
                                    isEdit: 0
                                }
                            }
                        },
                        {
                            count: 0,
                            title:'现货求购',
                            icon:'icon-qiugou',
                            color: '#fb893f',
                            link: {
                                name: 'buyerBuys'
                            }
                        },
                        // {
                        //     title:'加工求购',
                        //     icon:'icon-qiugou',
                        //     color: '#06bb06',
                        //     link: ''
                        // }
                    ]
                },
                seller: {
                    title:{
                        name:'卖家中心',
                        icon:'icon-maijia',
                        color: 'red'
                    },
                    info:{
                        orders:{
                            count: 0,
                            name: '待确认订单',
                            link: {
                                name: 'sellerOrder',
                                params: { status: 1 }
                            }
                        },
                        integral:{
                            count: 0,
                            name: '积分',
                            link: { name: 'integral' }
                        },
                        buys: {
                            count: 0,
                            name: '待报价求购',
                            link: { name: 'sellerBuys' }
                        }
                    },
                    links:[
                        {
                            title:'现货资源',
                            icon:'icon-package',
                            color: '#06bb06',
                            link: { name: 'goodsEdit' }
                        },
                        {
                            count: 0,
                            title:'订单',
                            icon:'icon-dingdan',
                            color: '#ff3c3c',
                            link: {
                                name: 'sellerOrder',
                                params: { status: 0 }
                            }
                        },
                        {
                            title:'积分',
                            icon:'icon-jifen',
                            color: '#fb893f',
                            link: { name: 'integral' }
                        },
                        // {
                        //     title:'上架货源',
                        //     icon:'icon-fabu',
                        //     color: '#007de4',
                        //     link: ''
                        // },
                        {
                            title:'加工资源',
                            icon:'icon-jiagongfuwu-',
                            color: '#007de4',
                            link: { name: 'machiningEdit' }
                        },
                        {
                            title:'企业资料',
                            icon:'icon-dianpu',
                            color: '#06bb06',
                            link: { name: 'enterpriseInfo' }
                        },
                        {
                            count: 0,
                            title:'现货报价',
                            icon:'icon-canyujingbiaotubiao',
                            color: '#007de4',
                            link: {
                                name: 'sellerBuys'
                            }
                        },
                        {
                            title:'我的关注',
                            icon: 'icon-guanzhu1',
                            color: '#ff3c3c',
                            link: { name: 'follow' }
                        },
                        {
                            title:'上架现货',
                            icon:'icon-ziyuanshangchuan',
                            color: '#ff3c3c',
                            link: { name: 'publishProduct' }
                        },
                        {
                            title:'上架加工',
                            icon:'icon-ziyuanshangchuan',
                            color: '#007de4',
                            link: { name: 'publishMachining' }
                        }
                    ]
                }     
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
            //是否是卖家
            isSeller(){
                return this.userInfo.becomeStatus === 2
            }
        },
        methods: {
            ...mapActions([
                'setUserInfo'
            ]),
            getUserData(){
                this.$http.get(this.api.userInfo).then(res => {
                    // 判断是否登录 
                    if(res.status === 0){
                        this.setUserInfo(res.data)
                        this.buyer.info.orders.count = this.userInfo.userData.orders;
                        this.buyer.links[1].count = this.userInfo.userData.orders;
                        this.buyer.info.integral.count = this.userInfo.userData.integral;
                        this.buyer.info.buys.count = this.userInfo.userData.buys;
                        this.buyer.links[4].count = this.userInfo.userData.buys;
                        this.seller.info.orders.count = this.userInfo.sellerData.orders;
                        this.seller.links[1].count = this.userInfo.sellerData.orders;
                        this.seller.info.integral.count = this.userInfo.sellerData.integral;
                        this.seller.info.buys.count = this.userInfo.sellerData.supplyPendingCount;
                        this.seller.links[5].count = this.userInfo.sellerData.supplyPendingCount;
                        this.getCartData();//暂时处理获取购物车数量^_^
                    }else{
                        this.confirmShow = true
                    }
                }) 
            },
            getCartData(){
                this.$http.get(this.api.myCarts,{
                    params:{
                        currentPage: 0,
                        pageCount:0
                    }
                }).then(res => {
                    let data = res.data;
                    if(res.status === 0){
                        this.buyer.links[0].count = data.maxCount;
                    }
                })
            },
            onCancel(){
                this.$router.push({name:'index'})
            },
            onConfirm(){
                this.$router.push({name:'login'})
            },
            bOnConfirm(){
                this.$router.push({name:'bindingOfficer'})
            },
            // 认证
            authenticate(){
                this.$vux.alert.show({
                    content: '当前手机版本暂不支持商户认证，请前往电脑端填写材料认证商家身份'
                })
            }
        },
        created () {
            this.getUserData();
        }
    }
</script>


<style lang="less" scoped>
    .header-part{
        width: 100%;
        height: 1.7rem;
        background-color: #007de4;
        header{
            position: relative;
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            text-align: center;
            color: #fff;
            font-size: .16rem;
            .back{
                position: absolute;
                left: .1rem;
                font-size: .22rem;
            }
            .phone{
                position: absolute;
                right: .1rem;
                color: #fff;
                span{
                    font-size: .22rem;
                }
            }
        }
        .content{
            position: relative;
            width: 100%;
            height: 1.3rem;
            .head-pic{
                float: left;
                width: .8rem;
                height: .8rem;
                margin: .2rem .1rem;
                border-radius: 50%;
            }
            .panel{
                width: 2.3rem;
                height: 1rem;
                line-height: .4rem;
                margin-top: .3rem;
                float: left;
                text-indent: .1rem;
                color: #fff;
                h3{
                    text-indent: .15rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .iconfont{
                    font-size: .24rem;
                }
            }
            .more{
                position: absolute;
                right: .1rem;;
                top: .3rem;
                color: #fff;
                font-size: .24rem;
            }
        }
    }

    .authentication{
        position: relative;
        width: 100%;
        height: .4rem;
        line-height: .4rem;
        text-indent: .2rem;
        background-color: #fff;
        margin-top: .1rem;
        color: red;
        .go-atc{
            position: absolute;
            display: block;
            height: .3rem;
            line-height: .3rem;
            text-align: center;
            color: #007de4;
            border: 1px solid #007de4;
            border-radius: .03rem;
            right: .1rem;
            top: .05rem;
            text-indent: 0;
            padding: 0 .05rem;
        }
    }
</style>
