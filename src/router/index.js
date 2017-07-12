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


// 用户中心
const userCenter = resolve => require(['@/pages/userCenter/index.vue'], resolve);
const userIndex = resolve => require(['@/pages/userCenter/index/index.vue'], resolve);
const bindingOfficer = resolve => require(['@/pages/userCenter/index/children/bindingOfficer.vue'], resolve);
const userInfo = resolve => require(['@/pages/userCenter/index/children/userInfo.vue'], resolve);

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
            ],
            component: userCenter
        },

    ]
})