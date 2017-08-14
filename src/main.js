// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store'
import router from './router/index'
import axios from 'axios'
import qs from 'qs'
import * as api from './api'
import VueLocalStorage from 'vue-localstorage'

import { AlertPlugin, ToastPlugin, WechatPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'

Vue.use(VueLocalStorage)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

// axios配置
Vue.prototype.$http = axios; //把axios挂载到this.$http上
Vue.prototype.api = api; //所有接口列表挂载
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = 'http://192.168.0.251'; //本地
axios.defaults.baseURL = 'http://118.178.17.15:9090'; //测试服
// axios.defaults.baseURL = 'http://www.itaobuxiu.com';
axios.defaults.withCredentials = true;

// post传参序列化
axios.interceptors.request.use((config) => {
    // Vue.$vux.loading.show({
    //     text: 'Loading'
    // });
    //发送请求前处理
    if (config.method === 'post' && !config.pic) {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    // Vue.$vux.loading.hide()
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    // Vue.$vux.loading.hide()
    return response.data;
    // if (response.data.status === 0) {
    //     
    // } else {
    //     Vue.$vux.toast.show({
    //         text: response.data.errorMsg,
    //         type: 'warn',
    //         width: '2rem'
    //     });
    //     return Promise.reject(response.data.errorMsg)
    // }
}, (error) => {
    // Vue.$vux.loading.hide()
    console.log("服务器异常")
    return Promise.reject(error)
});


/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')