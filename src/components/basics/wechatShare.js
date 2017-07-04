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
                            imgUrl: "http://www.itaobuxiu.com/files/2017/5/15/4NPzgZ5bASPn.png",
                            link: window.location.href,
                            title: "钢乐透 | 淘不锈旗下不锈钢特卖专区",
                            type: "link",
                            success: function() {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function() {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        this.$wechat.onMenuShareAppMessage({
                            desc: "钢乐透”专注于最低价、最靠谱、最新鲜、最全面的不锈钢特价资源。价格打折、品质不打折，专业的质检服务为您保驾护航！",
                            imgUrl: "http://www.itaobuxiu.com/files/2017/5/15/4NPzgZ5bASPn.png",
                            link: window.location.href,
                            title: "钢乐透 | 淘不锈旗下不锈钢特卖专区",
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