import Vue from 'vue'
import Router from 'vue-router'
const index = resolve => require(['@/pages/index/index.vue'], resolve);
const special = resolve => require(['@/pages/special/index.vue'], resolve);
const specialDetail = resolve => require(['@/pages/special/detail.vue'], resolve);
const purchase = resolve => require(['@/pages/purchase/index.vue'], resolve);
const logistics = resolve => require(['@/pages/logistics/index.vue'], resolve);
const goodsInStock = resolve => require(['@/pages/goodsInStock/index.vue'], resolve);
const goodsInStockDetail = resolve => require(['@/pages/goodsInStock/detail.vue'], resolve);
const informationCenter = resolve => require(['@/pages/informationCenter/index.vue'], resolve);
const informationDetail = resolve => require(['@/pages/informationCenter/detail.vue'], resolve);
const processingInformation = resolve => require(['@/pages/processingInformation/index.vue'], resolve);
const processingInformationDetail = resolve => require(['@/pages/processingInformation/detail.vue'], resolve);
const login = resolve => require(['@/pages/login/index.vue'], resolve);
const register = resolve => require(['@/pages/register/index.vue'], resolve);
const retrieval = resolve => require(['@/pages/register/retrieval.vue'], resolve);


// 用户中心
const userCenter = resolve => require(['@/pages/userCenter/index.vue'], resolve);
const userIndex = resolve => require(['@/pages/userCenter/index/index.vue'], resolve);
const bindingOfficer = resolve => require(['@/pages/userCenter/index/children/bindingOfficer.vue'], resolve);
const userInfo = resolve => require(['@/pages/userCenter/index/children/userInfo.vue'], resolve);
const buyerBuys = resolve => require(['@/pages/userCenter/buyer/buys/index.vue'], resolve);
const buyerBuysDetail = resolve => require(['@/pages/userCenter/buyer/buys/detail.vue'], resolve);
const bPublishProduct = resolve => require(['@/pages/userCenter/buyer/publish/product.vue'], resolve);

const sellerBuys = resolve => require(['@/pages/userCenter/seller/buys/index.vue'], resolve);

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/retrieval',
            name: 'retrieval',
            component: retrieval
        },
        {
            path: '/special',
            name: 'special',
            component: special
        },
        {
            path: '/specialDetail-:offerId',
            name: 'specialDetail',
            component: specialDetail
        },
        {
            path: '/purchase',
            name: 'purchase',
            component: purchase
        },
        {
            path: '/logistics',
            name: 'logistics',
            component: logistics
        },
        {
            path: '/goodsInStock',
            name: 'goodsInStock',
            component: goodsInStock
        },
        {
            path: '/goodsInStockDetail-:ironId',
            name: 'goodsInStockDetail',
            component: goodsInStockDetail
        },
        {
            path: '/informationCenter',
            name: 'informationCenter',
            component: informationCenter
        },
        {
            path: '/informationDetail-:id-:apiKey',
            name: 'informationDetail',
            component: informationDetail
        },
        {
            path: '/processingInformation',
            name: 'processingInformation',
            component: processingInformation
        },
        {
            path: '/processingInformationDetail-:handingId',
            name: 'processingInformationDetail',
            component: processingInformationDetail
        },
        {
            path: '/userCenter',
            name: 'userCenter',
            children: [{
                    path: '',
                    name: 'userIndex',
                    component: userIndex
                }, {
                    path: 'bindingOfficer',
                    name: 'bindingOfficer',
                    component: bindingOfficer
                },
                {
                    path: 'userInfo',
                    name: 'userInfo',
                    component: userInfo
                },
                {
                    path: 'buyer/buys',
                    name: 'buyerBuys',
                    component: buyerBuys
                },
                {
                    path: 'buyer/buysDetail-:ironId',
                    name: 'buyerBuysDetail',
                    component: buyerBuysDetail
                },
                {
                    path: 'buyer/publishProduct-:id',
                    name: 'bPublishProduct',
                    component: bPublishProduct
                },
                {
                    path: 'seller/buys',
                    name: 'sellerBuys',
                    component: sellerBuys
                },
            ],
            component: userCenter
        },

    ]
})