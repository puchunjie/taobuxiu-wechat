import Vue from 'vue'
import Router from 'vue-router'
const index = resolve => require(['@/pages/index/index.vue'], resolve);
const special = resolve => require(['@/pages/special/index.vue'], resolve);
const specialDetail = resolve => require(['@/pages/special/detail.vue'], resolve);
const purchase = resolve => require(['@/pages/purchase/index.vue'], resolve);
const logistics = resolve => require(['@/pages/logistics/index.vue'], resolve);
const goodsInStock = resolve => require(['@/pages/goodsInStock/index.vue'], resolve);
const informationCenter = resolve => require(['@/pages/informationCenter/index.vue'], resolve);
const informationDetail = resolve => require(['@/pages/informationCenter/detail.vue'], resolve);
const processingInformation = resolve => require(['@/pages/processingInformation/index.vue'], resolve);

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
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
    ]
})