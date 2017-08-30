export default {
    data() {
        return {
            wxconfig: {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。  
                appId: '', // 必填，公众号的唯一标识  
                timestamp: '', // 必填，生成签名的时间戳  
                nonceStr: '', // 必填，生成签名的随机串  
                signature: '', // 必填，签名，见附录1  
                jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
            }
        }
    },
    methods: {
        getWXinfo() {
            this.$http.get(this.api.wxConfig, {
                params: {
                    url: window.location.href
                }
            }).then(res => {
                let data = res.data;
                if (res.data.status === 0) {
                    this.wxconfig.appId = data.appid;
                    this.wxconfig.nonceStr = data.nonceStr;
                    this.wxconfig.timestamp = data.timestamp;
                    this.wxconfig.signature = data.signature;
                    this.$wechat.config(this.wxconfig);
                    this.$wechat.ready(() => {
                        this.$wechat.onMenuShareTimeline({
                            imgUrl: "http://www.itaobuxiu.com/files/ads/ads_mobile/taobuxiu_logo.png",
                            link: window.location.href,
                            title: "淘不锈 | 不锈钢全产业链绿色服务平台",
                            type: "link",
                            success: function() {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function() {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        this.$wechat.onMenuShareAppMessage({
                            desc: "全国首家提供上门质检的不锈钢集采、加工、物流、金融一站式绿色服务平台！",
                            imgUrl: "http://www.itaobuxiu.com/files/ads/ads_mobile/taobuxiu_logo.png",
                            link: window.location.href,
                            title: "淘不锈 | 不锈钢全产业链绿色服务平台",
                            success: function() {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function() {
                                // 用户取消分享后执行的回调函数
                            }
                        })
                    })
                }
            })
        }
    }
}