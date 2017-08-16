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
const shop = resolve => require(['@/pages/shop/index.vue'], resolve);
const shopCart = resolve => require(['@/pages/shopCart/index.vue'], resolve);
const confirmOrder = resolve => require(['@/pages/shopCart/confirmOrder.vue'], resolve);
const shopProduct = resolve => require(['@/pages/shop/productList.vue'], resolve);
const shopMachining = resolve => require(['@/pages/shop/machiningList.vue'], resolve);
const qualityTesting = resolve => require(['@/pages/qualityTesting/index.vue'], resolve);


// 用户中心
const userIndex = resolve => require(['@/pages/userCenter/index/index.vue'], resolve); //用户中心首页
const bindingOfficer = resolve => require(['@/pages/userCenter/index/children/bindingOfficer.vue'], resolve); //绑定专员
const userInfo = resolve => require(['@/pages/userCenter/index/children/userInfo.vue'], resolve); //用户信息
const integral = resolve => require(['@/pages/userCenter/common/integral/index.vue'], resolve); //用户积分

const buyerBuys = resolve => require(['@/pages/userCenter/buyer/buys/index.vue'], resolve);
const buyerBuysDetail = resolve => require(['@/pages/userCenter/buyer/buys/detail.vue'], resolve);
const bPublishProduct = resolve => require(['@/pages/userCenter/buyer/publish/product.vue'], resolve);
const buyerOrder = resolve => require(['@/pages/userCenter/buyer/orders/index.vue'], resolve);

const sellerBuys = resolve => require(['@/pages/userCenter/seller/buys/index.vue'], resolve);
const sellerBuysDetail = resolve => require(['@/pages/userCenter/seller/buys/detail.vue'], resolve);
const sellerOrder = resolve => require(['@/pages/userCenter/seller/orders/index.vue'], resolve);
const enterpriseInfo = resolve => require(['@/pages/userCenter/seller/enterpriseInfo/index.vue'], resolve);
const goodsEdit = resolve => require(['@/pages/userCenter/seller/goodsEdit/index.vue'], resolve);
const machiningEdit = resolve => require(['@/pages/userCenter/seller/machiningEdit/index.vue'], resolve);
const follow = resolve => require(['@/pages/userCenter/seller/follow/index.vue'], resolve);
const authenticate = resolve => require(['@/pages/userCenter/seller/authenticate/index.vue'], resolve);
const authenticate2 = resolve => require(['@/pages/userCenter/seller/authenticate/step.vue'], resolve);

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
            path: '/shop-:sellerId',
            name: 'shop',
            component: shop
        },
        {
            path: '/shopProduct-:sellerId',
            name: 'shopProduct',
            component: shopProduct
        },
        {
            path: '/shopMachining-:sellerId',
            name: 'shopMachining',
            component: shopMachining
        },
        {
            path: '/shopCart',
            name: 'shopCart',
            component: shopCart
        },
        {
            path: '/confirmOrder',
            name: 'confirmOrder',
            component: confirmOrder
        },
        {
            path: '/qualityTesting',
            name: 'qualityTesting',
            component: qualityTesting
        },
        {
            path: '/userCenter',
            name: 'userIndex',
            component: userIndex
        }, {
            path: '/userCenter/bindingOfficer',
            name: 'bindingOfficer',
            component: bindingOfficer
        },
        {
            path: '/userCenter/userInfo',
            name: 'userInfo',
            component: userInfo
        },
        {
            path: '/userCenter/integral',
            name: 'integral',
            component: integral
        },
        {
            path: '/userCenter/buyer/buys',
            name: 'buyerBuys',
            component: buyerBuys
        },
        {
            path: '/userCenter/buyer/buysDetail-:ironId',
            name: 'buyerBuysDetail',
            component: buyerBuysDetail
        },
        {
            path: '/userCenter/buyer/publishProduct-:id-:isEdit',
            name: 'bPublishProduct',
            component: bPublishProduct
        },
        {
            path: '/userCenter/seller/buys',
            name: 'sellerBuys',
            component: sellerBuys
        },
        {
            path: '/userCenter/seller/buysDetail-:ironId',
            name: 'sellerBuysDetail',
            component: sellerBuysDetail
        },
        {
            path: '/userCenter/buyer/buyerOrder-:status',
            name: 'buyerOrder',
            component: buyerOrder
        },
        {
            path: '/userCenter/seller/sellerOrder-:status',
            name: 'sellerOrder',
            component: sellerOrder
        },
        {
            path: '/userCenter/seller/enterpriseInfo',
            name: 'enterpriseInfo',
            component: enterpriseInfo
        },
        {
            path: '/userCenter/seller/goodsEdit',
            name: 'goodsEdit',
            component: goodsEdit
        },
        {
            path: '/userCenter/seller/machiningEdit',
            name: 'machiningEdit',
            component: machiningEdit
        },
        {
            path: '/userCenter/seller/follow',
            name: 'follow',
            component: follow
        },
        {
            path: '/userCenter/seller/authenticate',
            name: 'authenticate',
            component: authenticate
        },
        {
            path: '/userCenter/seller/authenticate2',
            name: 'authenticate2',
            component: authenticate2
        }
    ]
})