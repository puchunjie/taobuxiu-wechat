<template>
    <view-box>
        <section class="header-part">
            <header>
                <span class="back iconfont icon-fanhui" @click.self="$router.go(-1)"></span>
                我的淘不锈
                <a class="phone" :href="'tel:'+ userInfo.salesMan.tel" v-if="userInfo.salesMan.name != ''">
                    <span class="iconfont icon-kefu"></span>
                </a>
                <a class="phone" v-else @click.self="bindingShow = true"><span class="iconfont icon-kefu"></span></a>
            </header>
            <div class="content" @click="$router.push({name:'userInfo'})">
                <img class="head-pic" :src="'http://118.178.17.15:9090/' + userInfo.avator">
                <div class="panel">
                    <h3>{{ userInfo.name }}</h3>
                    <p><span class="iconfont icon-zhongqingdianxinicon15"></span>{{ userInfo.mobile }}</p>
                </div>
                <span class="more iconfont icon-arrow-right"></span>
            </div>
        </section>

        <user-panel :data="buyer"></user-panel>

        <user-panel v-if="userInfo.becomeStatus === 2" :data="seller"></user-panel>
        
        <div v-else class="authentication">
            您暂未认证企业账号
            <a class="go-atc">去认证</a>
        </div>

        <bottom-menu slot="bottom"></bottom-menu>

        <transition enter-active-class="animated fadeIn">
            <confirm v-model="bindingShow"
            show-input
            title="暂未绑定专属客服，现在是否需要立即绑定？"
            @on-confirm="bOnConfirm">
            </confirm>
        </transition>
    </view-box>
</template>

<script>
    import { mapGetters } from 'vuex'
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
                            name: '待处理订单'
                        },
                        integral:{
                            count: 0,
                            name: '积分'
                        },
                        buys: {
                            count: 0,
                            name: '待处理求购'
                        }
                    },
                    links:[
                        {
                            title:'购物车',
                            icon:'icon-icon',
                            color: '#06bb06',
                            link: ''
                        },
                        {
                            title:'订单',
                            icon:'icon-dingdan',
                            color: '#ff3c3c',
                            link: ''
                        },
                        {
                            title:'积分',
                            icon:'icon-jifen',
                            color: '#fb893f',
                            link: ''
                        },
                        {
                            title:'发布求购',
                            icon:'icon-fabu',
                            color: '#007de4',
                            link: ''
                        },
                        {
                            title:'现货求购',
                            icon:'icon-qiugou',
                            color: '#fb893f',
                            link: ''
                        },
                        {
                            title:'加工求购',
                            icon:'icon-qiugou',
                            color: '#06bb06',
                            link: ''
                        }
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
                            name: '待确认订单'
                        },
                        integral:{
                            count: 0,
                            name: '积分'
                        },
                        buys: {
                            count: 0,
                            name: '待报价求购'
                        }
                    },
                    links:[
                        {
                            title:'现货资源',
                            icon:'icon-package',
                            color: '#06bb06',
                            link: ''
                        },
                        {
                            title:'订单',
                            icon:'icon-dingdan',
                            color: '#ff3c3c',
                            link: ''
                        },
                        {
                            title:'积分',
                            icon:'icon-jifen',
                            color: '#fb893f',
                            link: ''
                        },
                        {
                            title:'上架货源',
                            icon:'icon-fabu',
                            color: '#007de4',
                            link: ''
                        },
                        {
                            title:'加工资源',
                            icon:'icon-jiagongfuwu-',
                            color: '#fb893f',
                            link: ''
                        },
                        {
                            title:'企业资料',
                            icon:'icon-dianpu',
                            color: '#06bb06',
                            link: ''
                        },
                        {
                            title:'现货报价',
                            icon:'icon-canyujingbiaotubiao',
                            color: '#007de4',
                            link: ''
                        },
                        {
                            title:'加工报价',
                            icon:'icon-canyujingbiaotubiao',
                            color: '#ff3c3c',
                            link: ''
                        }
                    ]
                }     
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ])
        },
        methods: {
            bOnConfirm(){
                this.$router.push({name:'bindingOfficer'})
            }
        },
        created () {
            this.buyer.info.orders.count = this.userInfo.userData.orders;
            this.buyer.info.integral.count = this.userInfo.userData.integral;
            this.buyer.info.buys.count = this.userInfo.userData.buys;
            this.seller.info.orders.count = this.userInfo.sellerData.orders;
            this.seller.info.integral.count = this.userInfo.sellerData.integral;
            this.seller.info.buys.count = this.userInfo.sellerData.buys;
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
            width: .7rem;
            height: .3rem;
            line-height: .3rem;
            text-align: center;
            color: #007de4;
            border: 1px solid #007de4;
            border-radius: .03rem;
            right: .1rem;
            top: .05rem;
            text-indent: 0;
        }
    }
</style>
