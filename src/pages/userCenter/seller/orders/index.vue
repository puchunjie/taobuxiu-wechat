<template>
    <div class="container">
        <com-header hideRight>卖家_订单管理</com-header>
         <tab active-color="#007de4" v-model="activeTab">
            <tab-item v-for="(tab,index) in tabs" :key="index" @on-item-click="switchKey">
                {{ tab.title }}({{ tab.count }})
            </tab-item>
        </tab>
         <div class="tab-swiper">
            <scrollList ref="sScroller" style="background-color:#efeff4" @on-pull-down="reflash" @on-pull-up="loadMore" :height="'-55'" backShow>
                <div class="item" v-for="(item,index) in list" :key="item.id">
                    <div class="order-number vux-1px-b">
                         订单号：{{ item.id }}
                         <span :style="{color:statusColor(item.status)}">{{ statusStr(item.status) }}</span>
                    </div>
                    <div class="content">
                        <img class="pro-img" :src="'http://www.itaobuxiu.com'+item.cover">
                        <h3>{{ item.desc }}</h3>
                        <p>{{ item.city }}<span>x{{ item.count }}</span></p>
                        <span class="unit">&yen;{{ item.price }}/{{ item.unit }}</span>
                    </div>
                    <div class="time-status vux-1px-b">
                        {{ formateDate(item.sellTime) }}
                        <div class="right-show">
                            <template v-if="item.status === 0">
                                <clocker :time="item.sellTime + item.timeLimit" slot="value" style="color:#007de4">
                                    <template v-if="dayShow(item.sellTime + item.timeLimit)">
                                        <span class="day">%_D1%_D2</span>天
                                    </template>
                                    <span class="day">%_H1%_H2</span>时
                                    <span class="day">%_M1%_M2</span>分
                                    <span class="day">%_S1%_S2</span>秒
                                </clocker>
                            </template>
                            <template v-else-if="item.status === 1">
                                 买家暂未评价 
                            </template>
                            <template v-else-if="item.status === 2">
                                 <a class="contant" @click="showRate(item.score)">查看评分</a> 
                            </template>
                        </div>
                    </div>
                    <div class="totle">
                        合计:<span>&yen;{{ accMul(item.price,item.count) }}</span>
                        <div class="btns">
                            <a v-if="item.message" @click="showDesc(item.message)">查看备注</a>
                            <template v-if="item.status === 0">
                                <a class="blue" @click="doConfim(item.id,index)">确认订单</a>
                                <a @click="confimDelete(item.id,true)">取消订单</a>
                            </template>
                            <template v-else-if="item.status === 1 || item.status === 2">
                                <a class="blue" :href="'tel:'+item.buyerMobile">联系买家</a>
                                <a @click="confimDelete(item.id)">删除订单</a>
                            </template>
                        </div>
                    </div>
                </div>
            </scrollList>  
        </div> 

         <x-dialog v-model="rateShow" class="dialog-demo" :scroll="false">
            <div class="rate-box">
                <h3>评分：{{ rate }}分</h3>
                <stars v-model="rate" disable></stars>
                <span class="iconfont icon-closecircled" @click="rateShow = false"></span>
            </div>
        </x-dialog> 
    </div>
</template>


<script>
    import { ViewBox, Tab, TabItem, dateFormat, Clocker, XDialog } from 'vux'
    import scrollList from '@/components/business/scrollList'
    import comHeader from '@/components/business/commonHead'
    import stars from '@/components/basics/stars.vue'
    export default {
        components: {
            ViewBox, 
            comHeader,
            Tab, 
            TabItem,
            scrollList,
            Clocker,
            stars,
            XDialog
        },
        data () {
            return {
                tabs:[
                    {title:'全部',count:0},
                    {title:'待确认',count:0},
                    {title:'待评分',count:0},
                    {title:'已评分',count:0}
                ],
                activeTab: 0,
                list: [],
                apiData:{
                    currentPage: 0,
                    pageCount: 15,
                    status: -1
                },
                maxCount: 0,
                rateShow: false,
                rate:0
            }
        },
        computed: {
            max(){
                return Math.ceil(this.maxCount/this.apiData.pageCount)// 计算总页数
            },
            activeStatus(){
                return this.tabs[this.activeTab].status
            }
        },
        methods: {
            // 状态文字
            statusStr(status){
                switch (status) {
                    case 0:
                        return '等待我确认'
                        break;
                    case 1:
                        return '交易成功'
                        break;
                    case 2:
                        return '交易成功'
                        break;
                    case 3:
                        return '已取消'
                        break;
                    default:
                        break;
                }
            },
            statusColor(status){
                switch (status) {
                    case 0:
                        return '#007de4'
                        break;
                    case 1:
                        return 'green'
                        break;
                    case 2:
                        return 'green'
                        break;
                    case 3:
                        return ''
                        break;
                    default:
                        break;
                }
            },
            formateDate(time){
                return dateFormat(new Date(time*1), 'YYYY-MM-DD hh:mm')
            },
            switchKey(index){
                switch (index) {
                    case 0:
                        this.apiData.status = -1;
                        break;
                    case 1:
                        this.apiData.status = 0;
                        break;
                    case 2:
                        this.apiData.status = 1;
                        break;
                    case 3:
                        this.apiData.status = 2;
                        break;
                    default:
                        this.apiData.status = -1;
                        break;
                }
                this.activeTab = index;
                this.resetList();
            },
            resetList(){
                this.maxCount = 0;
                this.apiData.currentPage = 0;
                this.getData(()=>{
                    this.$refs.sScroller.reset({top:0});
                })
            },
            getData(callback,count){
                this.$http.get(this.api.commingOrders,{
                    params: this.apiData
                }).then(res => {
                    let data = res.data;
                    if(this.apiData.currentPage === 0){
                        this.list = data.orders;
                    }else{
                        this.list.push(...data.orders);
                    }
                    this.tabs[0].count = data.allCounts;
                    this.tabs[1].count = data.waitForConfirm;
                    this.tabs[2].count = data.waitEvaluate;
                    this.tabs[3].count = data.hasEvaluate;
                    this.maxCount = data.maxCount;
                    callback();
                })
            },
            // 刷新列表
            reflash(){
                this.apiData.currentPage = 0;
                this.getData(()=>{
                    this.$refs.sScroller.donePd();
                    this.$refs.sScroller.reset(0);
                })
            },
            // 加载更多
            loadMore(){
                if(this.apiData.currentPage+1 < this.max){
                    this.apiData.currentPage++
                    this.getData(()=>{
                        this.$refs.sScroller.reset();
                    })
                }
                this.$refs.sScroller.donePu();
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
            // 是否显示天数
            dayShow(time){
                return (time - new Date().getTime()) > 86400000
            },
            //接单确认
            doConfim(id,index){
                let _this = this;
                this.$vux.confirm.show({
                    title:'删除接单？',
                    content:'此操作不可撤销，是否继续？',
                    onConfirm () {
                        _this.doOrder(id,index)
                    }
                })
            },
            doOrder(id,index){
                let _this = this;
                this.$http.post(this.api.sconfOrder,{
                    orderId: id
                }).then(res => {
                    if(res.status === 0){
                       this.$vux.alert.show({
                            title: '接单成功！',
                            content: '您已成功接下此单。',
                            onHide () {
                                _this.getData(()=>{
                                    _this.$refs.sScroller.reset();
                                })
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
            //删除订单确认
            confimDelete(id,type){
                let _this = this;
                this.$vux.confirm.show({
                    title:'删除确认',
                    content:'此操作不可撤销，是否继续？',
                    onConfirm () {
                        _this.deleteOrder(id,type)
                    }
                })
            },
            //删除订单
            deleteOrder(id,type){
                let deleteUrl = type ? this.api.scelOrder : this.api.sdelOrder;
                this.$http.post(deleteUrl,{
                    orderId: id
                }).then(res => {
                    if(res.status === 0){
                        this.getData(()=>{
                            this.$refs.sScroller.reset();
                        })
                    }else{
                        this.$vux.toast.show({
                            text: res.errorMsg,
                            type: 'warn',
                            width: '2rem'
                        });
                    }
                });
            },
            // 查看评分
            showRate(val){
                this.rateShow = true;
                this.rate = val;
            },
            // 查看备注
            showDesc(text){
                this.$vux.alert.show({
                    title: '用户备注',
                    content: text
                })
            }
        },
        created () {
            let tabIndex = this.$route.params.status;
            this.switchKey(tabIndex);
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .item{
        width: 100%;
        margin-top: .1rem;
        color: #999;
        background-color: #fff;
        .order-number{
            position: relative;
            width: 100%;
            height: .34rem;
            line-height: .34rem;
            text-indent: .1rem;
            span{
                position: absolute;
                right:.1rem;
            }
        }
        .content{
            position: relative;
            width: 100%;
            height: 1rem;
            overflow: hidden;
            background-color: #efeff4;
            .pro-img{
                display: block;
                float: left;
                width: .75rem;
                height: .75rem;
                margin: .125rem 0 0 .1rem;
            }
            h3{
                width: 2.4rem;
                float: left;
                color: #333;
                font-size: .14rem;
                line-height: .2rem;
                height: .5rem;
                margin: .1rem 0 0 .05rem;
            }
            p{
                position: relative;
                width: 2.7rem;
                float: left;
                margin: .1rem 0 0 .05rem;
                span{
                    position: absolute;
                    right: 0;
                }
            }

            .unit{
                position: absolute;
                right: .1rem;
                bottom: .3rem;
                font-size: .16rem;
                color: #333;
                font-weight: 500;
            }
        }

        .time-status{
            position: relative;
            width: 100%;
            height: .34rem;
            line-height: .34rem;
            text-indent: .1rem;
            .right-show{
                position: absolute;
                top: .05rem;
                right: .1rem;
                .contant{
                    display: block;
                    text-align: center;
                    height: .24rem;
                    line-height: .24rem;
                    text-indent: 0;
                    padding: 0 .03rem;
                    border: 1px solid #333;
                    color: #333;
                    font-size: .12rem;
                }
            }
        }

        .totle{
            position: relative;
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            text-indent: .1rem;
            
            span{
                margin-left: .1rem;
                font-size: .16rem;
                color: #333;
                font-weight: 500;
            }
            .btns{
                position: absolute;
                right: .05rem;
                top: .08rem;
                a{
                    display: block;
                    float: left;
                    text-align: center;
                    height: .24rem;
                    line-height: .24rem;
                    text-indent: 0;
                    padding: 0 .03rem;
                    border: 1px solid #333;
                    color: #333;
                    margin-right: .05rem;
                    font-size: .12rem;
                }
                .blue{
                    color: #007de4;
                    border-color: #007de4;
                }
            }
        }
    }


    .detail-container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background-color: #efeff4;
    }

    .rate-box{
        position: relative;
        padding: .1rem;
        background-color: #fff;
        h3{
            font-size: .15rem;
            font-weight: 500;
        }
        .icon-closecircled{
            position: absolute;
            right: .05rem;
            top: 0;
            font-size: .2rem;
        }
        .btn{
            display: block;
            width: 90%;
            height: .3rem;
            background-color: #007de4;
            margin: .05rem auto;
            color: #fff;
            line-height: .3rem;
        }
    }
</style>
