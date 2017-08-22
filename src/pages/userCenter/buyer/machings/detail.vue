<template>
    <view-box>
        <x-header slot="header" :left-options="{showBack:false}">
            <a slot="right" :href="'tel:'+salesManPhone">
                <span class="iconfont icon-kefu"></span>
            </a>
            报价状态({{ statusStr }})
            <span class="iconfont icon-fanhui" slot="left" @click="onBack"></span>
        </x-header>
        <div class="info">
            <div class="number vux-1px-b">
                求购单号：{{ buy.id }}
                <span class="iconfont icon-bianji2" v-if="buy.editStatus === 0" @click="jumpToPublish(buy.id)"></span>
                <span class="iconfont" :class="statusIcon" @click="deletConfirm"></span>
            </div>
            <div class="item">
                <h3 class="tit">
                {{ buy.handingType }}
                </h3>
                <p class="vux-1px-b">备注：{{ buy.message }}</p>
            </div>
            <div class="time">
                <p v-if="buy.status === 0 || buy.status === 3" :class="statusColor">
                    <clocker :time="buy.pushTime + buy.timeLimit" slot="value">
                        <template v-if="dayShow(buy.pushTime + buy.timeLimit)">
                            <span class="day">%_D1%_D2</span>天
                        </template>
                        <span class="day">%_H1%_H2</span>时
                        <span class="day">%_M1%_M2</span>分
                        <span class="day">%_S1%_S2</span>秒
                    </clocker>
                </p>
                <p v-else :class="statusColor">{{ formateDate(buy.pushTime)}}</p> 
                <span class="city">{{ buy.sourceCity }}</span>
            </div>
        </div>

        <div class="detail">
            <div class="tit vux-1px-b">
                <span class="l">{{ supplies.length }}家有效报价</span>
                报价细节
            </div>
            <div class="list">
                <div class="company vux-1px-b" v-for="(item,index) in supplies" :key="index">
                    <h3 class="name">{{ item.companyName }}</h3>
                    <p class="price">&yen;{{ item.supplyPrice }}/{{ item.unit }}</p>
                    <p class="">备注：{{ item.supplyMsg }}</p>
                    <p class="">抢单成功：{{ item.winningTimes }}次    联系人：{{ item.contact }}</p>
                    <a v-if="buy.status === 0" @click="showComf(item.sellerId)" class="btna select">选他中标</a>
                    <a class="btna contact" :href="'tel:'+ item.mobile">联系对方</a>
                    <span v-if="item.isWinner" class="iconfont icon-zhongbiao win"></span>
                </div>
            </div>
        </div>
        <confirm v-model="showSelect"
            title="选择此家中标？"
            @on-confirm="select">
        </confirm>
    </view-box>
</template>

<script>
    import { ViewBox, dateFormat, Clocker, Confirm, XHeader } from 'vux'

    export default {
        components: {
            ViewBox,
            dateFormat, 
            Clocker,
            Confirm,
            XHeader
        },
        props:{
            ironId:{
                type: String
            }
        },
        data () {
            return {
                buy:{},
                supplies: [],
                showSelect: false,
                salesManPhone: '',
                supplyId: ''    
            }
        },
        computed: {
            statusStr(){
                switch (this.buy.status) {
                    case 0:
                        return '进行中'
                        break;
                    case 1:
                        return '已成交'
                        break;
                    case 2:
                        return '已失效'
                        break;    
                    default:
                        break;
                }
            },
            statusColor(){
                switch (this.buy.status) {
                    case 0:
                        return 'ing'
                        break;
                    case 1:
                        return 'completed'
                        break;
                    case 2:
                        return 'expired'
                        break;    
                    default:
                        break;
                }
            },
            statusIcon(){
                switch (this.buy.status) {
                    case 0:
                        return 'icon-lajitong status0'
                        break;
                    case 1:
                        return 'icon-yichengjiao status1'
                        break;
                    case 2:
                        return 'icon-jiufuqianbaoicon10 status2'
                        break;    
                    default:
                        break;
                }
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
                this.$http.get(this.api.bmyHandingBuyDetail,{
                    params:{
                        handingId: this.ironId
                    }
                }).then(res => {
                    if(res.status === 0){
                        this.buy = res.data.buy;
                        this.supplies = res.data.supplies;
                        this.salesManPhone = res.data.salesManPhone;
                    }
                })
            },
            showComf(supplyId){
                this.showSelect = true;
                this.supplyId = supplyId;
            },
            select(){
                this.$http.post(this.api.selectSupply,{
                    ironBuyId: this.ironId,
                    supplyId: this.supplyId
                }).then(res => {
                    if(res.status === 0){
                        this.getDetail();
                        this.$vux.alert.show({
                            title: '恭喜成交！',
                            content: '交易成功！'
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
            onBack(){
                this.$emit('on-back')
            },
            //删除求购确认
            deletConfirm(){
                let _this = this;
                if(this.buy.status === 0){
                    this.$vux.confirm.show({
                        title:'确定取消求购？',
                        content: '此操作无法撤销，确定请继续！',
                        onConfirm () {
                            _this.deleteIron();
                        }
                    })
                }   
            },
            deleteIron(){
                let _this = this;
                this.$http.post(this.api.deleteIronBuy,{
                    ironId: this.ironId
                }).then(res => {
                    if(res.status === 0){
                        this.$vux.alert.show({
                            title: '取消成功！',
                            content: '您已成功取消次求购！',
                            onHide () {
                                _this.$emit('on-delete-buy')
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
            jumpToPublish(id){
                this.$router.push({ name: 'bPublishProduct', params: { id: id , isEdit: 1 }})
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

    .info{
        width: 100%;
        padding: 0 .1rem;
        background-color: #fff;
        margin-top: .1rem;
        color: #999;
        
        .number{
            position: relative;
            line-height: .4rem;
            color: #333;
            .iconfont{
                position: absolute;
                font-size: .4rem;
                right: 0;
            }
            .icon-bianji2{
                color: #999;
                right: .3rem;
            }
        }

        .item{
            width: 100%;
            .tit{
                color: #333;
                font-weight: 500;
                .same
            }
            p{
                .same
            }
        }

        .time{
            position: relative;
            p{
                line-height: .4rem;
            }
            .city{
                position: absolute;
                right: 0;
                top: .05rem;
                font-size: .14rem;
                line-height: .3rem;
            }
        }


        .status0{
            color: #999; 
        }
        .status1{
            color: green; 
        }
        .status2{
            color: red; 
        }
    }

    .btna{
        position: absolute;
        display: block;
        right: 0;
        width: .7rem;
        height: .26rem;
        line-height: .26rem;
        text-align: center;
        font-size: .13rem;
        color: #fff;
    }

    .detail{
        width: 100%;
        background-color: #fff;
        padding: 0 .1rem;
        margin-top: .1rem;
        .tit{
            position: relative;
            line-height: .4rem;
            text-align: center;
            span{
                position: absolute;
                font-size: .12rem;
                color: #007de4;
            }
            .l{
                left: 0;
            }
            .r{
                right: 0;
            }
        }
        .totle{
            line-height: .4rem;
            text-align: center;
            color: green;
        }
        .list{
            width: 100%;
            .company{
                position: relative;
                width: 100%;
                color: #999;
                padding: .1rem 0;
                line-height: .24rem;
                p{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .name{
                    color: #333;
                    font-weight: 500;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .price{
                    color: red;
                }
                .contact{
                    bottom: .1rem;
                    background-color: #007de4;
                    .btna
                }
                .select{
                    top: .1rem;
                    background-color: #ff8d00;
                    .btna
                }
                .win{
                    position: absolute;
                    right: .15rem;
                    top: .2rem;
                    color: green;
                    font-size: .4rem;
                }
            }
        }
    }

     .ing{
        color: #ff8d00
    }
    .completed{
        color: #007de4
    }
    .expired{
        color: red
    }
</style>
