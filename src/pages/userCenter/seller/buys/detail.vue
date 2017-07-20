<template>
    <view-box>
        <x-header slot="header" :left-options="{showBack:false}">
            {{ offerShow ? '抢单' : '报价细节' }}
            <span class="iconfont icon-fanhui" slot="left" @click="onBack"></span>
        </x-header>

        <div class="panel">
            <div class="title">
                求购信息
                <clocker v-if="offerShow || buy.status === 3" style="float:right;margin-right:.1rem;color:#007de4" :time="buy.pushTime + buy.timeLimit">
                    <template v-if="dayShow(buy.pushTime + buy.timeLimit)">
                        <span class="day">%_D1%_D2</span>天
                    </template>
                    <span class="day">%_H1%_H2</span>时
                    <span class="day">%_M1%_M2</span>分
                    <span class="day">%_S1%_S2</span>秒
                </clocker>
                <span v-else style="float:right;margin-right:.1rem;">
                    {{ formateDate(buy.pushTime)}}
                </span>
            </div>
            <div class="content">
                <h3 class="tit">
                {{ `${ buy.ironType } | ${ buy.material } | ${ buy.surface } | ${ buy.proPlace }` }}
                </h3>
                <p>{{ `${ buy.height }*${ buy.width }*${ buy.length } | 公差：${ buy.tolerance } | ${ buy.numbers }${ buy.unit }` }}</p>
                <p>{{ buy.sourceCity }}</p>
                <p class="remark">备注：{{ buy.message }}</p>
            </div>
        </div>    

        <div class="panel">
            <div class="title">采购客户</div>
            <div class="content">
                <div class="group">
                    <label>历史总采购：</label>
                    <span>采购{{ userBuyInfo.buyTimes }}次</span>
                </div>
                <div class="group">
                    <label>采购成功率：</label>
                    <span class="blue">{{ successRate }}</span>
                </div>
                <template v-if="buy.status === 4">
                    <div class="group">
                        <label>采购公司名：</label>
                        <span>{{ buyerSeller.companyName }}</span>
                    </div>
                    <div class="group">
                        <label>采购联系人：</label>
                        <span>{{ buyerSeller.contact }}</span>
                        <a class="contact" :href="'tel:'+ buyerMobile">联系对方</a>
                    </div>
                </template>
            </div>
        </div> 
        <p class="suggest" v-if="offerShow">建议报出低价，提高抢单成功率</p>

        <div class="offer-container fix-bottom" v-if="offerShow">
            <div class="left">
                <group gutter="0">
                    <x-input placeholder="请输入您的报价" v-model="price" required ref="price">
                        <span slot="right">元/{{ buy.unit }}</span>
                    </x-input>
                </group>
                <group gutter=".05rem">
                    <x-textarea placeholder="请输入您的供货备注" ref="msg" v-model="msg" :rows="2" :max="35"></x-textarea>
                </group>
            </div>
            <div class="right">
                <a class="btn ignore" @click="showIgnore = true">忽&nbsp;略</a>
                <a class="btn offer" @click="offer">立&nbsp;即报&nbsp;价</a>
            </div>
        </div>

        <div class="panel fix-bottom" v-else>
            <div class="title">
                我的报价
                <span class="status-icon iconfont" :class="statusIcon"></span> 
            </div>
            <div class="content">
                <div class="group">
                    <label>报价：</label>
                    <span>&yen;{{ myOffer.price }}/{{ myOffer.unit }}</span>
                </div>
                <div class="group">
                    <label>备注：</label>
                    <span>{{ myOffer.supplyMsg }}</span>
                </div>
                <div class="group" v-if="buy.status === 4">
                    <label>总额：</label>
                    <span style="color:green">&yen;{{ accMul(buy.numbers,myOffer.price) }}</span>
                </div>
            </div>
        </div>

        <confirm v-model="showIgnore"
            title="确定要忽略此单么？"
            @on-confirm="ignore">
        </confirm>
    </view-box>  
</template>


<script>
    import { ViewBox, dateFormat, Clocker, XInput, Group, XTextarea, Confirm, XHeader } from 'vux'
    export default {
        components: {
            ViewBox,
            Clocker,
            XHeader,
            XInput, 
            Group,
            XTextarea,
            Confirm
        },
         props:{
            ironId:{
                type: String
            },
            show:{
                type: Object,
                default:{
                    do:false
                }
            }
        },
        data () {
            return {
                buy:{},
                buyerSeller:{},
                myOffer: {},
                userBuyInfo: {
                    buySuccessRate: 0
                },
                buyerMobile: '',
                price: '',
                msg: '',
                showIgnore: false,
                   
            }
        },
        computed: {
            statusIcon(){
                switch (this.buy.status) {
                    case 3:
                        return 'icon-yibaojia-'
                        break;
                    case 4:
                        return 'icon-yichengjiao1'
                        break;
                    case 6:
                        return 'icon-yiguoqi1'
                        break;
                    default:
                        break;
                }
            },
            // 是否显示报价窗口
            offerShow(){
                return this.buy.status === 0
            },
            successRate(){
                return this.accMul(this.userBuyInfo.buySuccessRate,100) + '%'
            } 
        },
        methods: {
            formateDate(time){
                return dateFormat(new Date(time*1), 'YYYY-MM-DD hh:mm')
            },
            // 是否显示天数
            dayShow(time){
                return (time - new Date().getTime()) > 86400000
            },
            getDetail(){
                this.$http.get(this.api.sMyBuyDetail,{
                    params:{
                        ironId: this.ironId
                    }
                }).then(res => {
                    let data = res.data;
                    if(res.status === 0){
                        this.buy = data.buy;
                        this.buyerSeller = data.buyerSeller;
                        this.myOffer = data.myOffer;
                        this.userBuyInfo = data.userBuyInfo;
                        this.buyerMobile = data.buyerMobile;
                    }
                })
            },
             // js浮点运算乘法
            accMul(arg1,arg2) { 
                let m=0; 
                let s1=arg1.toString();
                let s2=arg2.toString();
                try{
                    m+=s1.split(".")[1].length
                }catch(e){} 
                try{
                    m+=s2.split(".")[1].length
                }catch(e){} 

                return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
            },
            // 忽略
            ignore(){
                let _this = this;
                this.$http.post(this.api.missIronBuyOffer,{
                    ironId: this.ironId
                }).then(res =>{
                    if(res.status === 0){
                        this.$vux.alert.show({
                            title: '忽略成功！',
                            content: '点击确定跳转到列表页',
                            onHide () {
                                _this.$router.go(-1)
                            }
                        })
                    }else{
                        this.$vux.toast.show({
                            text: res.errorMsg,
                            type: 'warn',
                            width: '2rem'
                        });
                    }
                })
            },
            //报价
            offer(){
                if(this.price != '' && this.msg != ''){
                    this.$vux.loading.show({
                        text: '报价中...'
                    });
                    this.$http.post(this.api.offerIronBuy,{
                        ironId: this.ironId,
                        price: this.price,
                        unit: this.buy.unit,
                        msg: this.msg
                    }).then(res => {
                        if(res.status === 0){
                            this.getDetail();
                            this.$vux.alert.show({
                                title: '报价成功！',
                                content: '您已成功报价。'
                            })
                        }else{
                             this.$vux.toast.show({
                                text: res.errorMsg,
                                type: 'warn',
                                width: '2rem'
                            });
                        }
                        this.$vux.loading.hide()
                    });
                }else{
                    console.log(222)
                }
            },
            onBack(){
                this.$emit('on-back')
            }
        },
        created () {
            this.getDetail()
        },
        watch: {
            'ironId': function(){
                this.getDetail()
            }
        }
    }
</script>

<style lang="less" scoped>
    .same{
        line-height: .3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .panel{
        width: 100%;
        .title{
            position: relative;
            line-height: .3rem;
            color: #999;
            text-indent: .1rem;
            .status-icon{
                position: absolute;
                right: .1rem;
                bottom: -.1rem;
                font-size: .46rem;
            }
        }
        .content{
            width: 100%;
            background: #fff;
            padding: 0 .1rem;
            color: #333;
            .tit{
                font-weight: 500;
                .same
            }
            p{
                .same
            }
            .remark{
                color: #999;
            }

            .group{
                position: relative;
                width: 100%;
                line-height: .3rem;
                label{
                    width: 1rem;
                    color: #999;
                }
                .blue{
                    color: #007de4;
                }
                .contact{
                    position: absolute;
                    display: block;
                    width: .6rem;
                    height: .24rem;
                    color: #007de4;
                    border: 1px solid #007de4;
                    text-align: center;
                    line-height: .24rem;
                    font-size: .12rem;
                    right: 0;
                    top: .03rem;
                }
            }
        }
    }
    .fix-bottom{
        position: absolute;
        bottom: 0;
    }

    .icon-yibaojia-{
        color: #007de4;
    }

    .icon-yichengjiao1{
        color: green;
    }

    .icon-yiguoqi1{
        color: red;
    }

    .offer-container{
        width: 100%;
        padding: .05rem;
        background-color: #ccc;
        .left{
            float: left;
            width: 3rem;
        }
        .right{
            float: right;
            width: .6rem;
            .btn{
                display: block;
                width: .6rem;
                text-align: center;
                line-height: .3rem;
                padding: 0 .1rem;
            }
            .offer{
                background-color: #ff8d00;
                color: #fff;
                margin-top: .05rem;
                height: .69rem;
                line-height: .35rem;
            }
            .ignore{
                margin-top: .01rem;
                background-color: #ececec;
                color: #848484;
                height: .32rem;
                line-height: .32rem;
            }
        }
    }

    .suggest{
        line-height: .3rem;
        color: #999;
        text-indent: .1rem;
    }

    .weui-cell{
        padding: .06rem!important;
        font-size: .14rem;
    }
</style>
