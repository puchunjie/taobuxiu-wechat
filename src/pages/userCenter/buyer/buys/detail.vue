<template>
    <view-box>
        <com-header>报价状态({{ statusStr }})</com-header>
        <div class="info">
            <div class="number vux-1px-b">
                求购单号：{{ buy.id }}
                <span class="iconfont" :class="statusIcon"></span>
            </div>
            <div class="item">
                <h3 class="tit">
                {{ `${ buy.ironType } | ${ buy.material } | ${ buy.surface } | ${ buy.proPlace } (${ buy.sourceCity })` }}
                </h3>
                <p>{{ `${ buy.height }*${ buy.width }*${ buy.length } | 公差：${ buy.tolerance } | ${ buy.numbers }${ buy.unit }` }}</p>
                <p class="vux-1px-b">备注：{{ buy.message }}</p>
            </div>
            <div class="time">
                <p v-if="buy.status === 0 || buy.status === 3">
                    <clocker :time="buy.pushTime + buy.timeLimit" slot="value">
                        <template v-if="dayShow(buy.pushTime + buy.timeLimit)">
                            <span class="day">%_D1%_D2</span>天
                        </template>
                        <span class="day">%_H1%_H2</span>时
                        <span class="day">%_M1%_M2</span>分
                        <span class="day">%_S1%_S2</span>秒
                    </clocker>
                </p>
                <p v-else>{{ formateDate(buy.pushTime)}}</p> 
                <span class="city">{{ buy.sourceCity }}</span>
            </div>
        </div>

        <div class="detail">
            <div class="tit vux-1px-b">
                <span class="l">{{ missSupplies.length }}家遗憾错过</span>
                报价细节
                <span class="r">{{ supplies.length }}家有效报价</span>
            </div>
            <p class="totle vux-1px-b" v-if="buy.status === 1">
                总成交额：&yen;
            </p>
            <div class="list">
                <div class="company vux-1px-b" v-for="(item,index) in supplies" :key="index">
                    <h3 class="name">{{ item.companyName }}</h3>
                    <p class="price">&yen;{{ item.supplyPrice }}/{{ item.unit }}</p>
                    <p class="">备注：{{ item.supplyMsg }}</p>
                    <p class="">抢单成功：{{ item.winningTimes }}次    联系人：{{ item.contact }}</p>
                    <a class="contact" :style="{top: item.isWinner ? '.6rem' : '.4rem' }" :href="'tel:'+ item.mobile">联系对方</a>
                    <span v-if="item.isWinner" class="iconfont icon-zhongbiao win"></span>
                </div>
                <div class="company vux-1px-b" v-for="(item,index) in missSupplies" :key="index">
                    <h3 class="name">{{ item.companyName }}</h3>
                    <p class="price">忽略（无计划或无货）</p>
                </div>
            </div>
        </div>
    </view-box>
</template>

<script>
    import { ViewBox, dateFormat, Clocker } from 'vux'
    import comHeader from '@/components/business/commonHead'

    export default {
        components: {
            ViewBox,
            comHeader,
            dateFormat, 
            Clocker
        },
        data () {
            return {
                buy:{},
                missSupplies: [],
                supplies: []    
            }
        },
        computed: {
            ironId(){
                return this.$route.params.ironId
            },
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
            statusIcon(){
                switch (this.buy.status) {
                    case 0:
                        return 'icon-lajixiang status0'
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
                this.$http.get(this.api.myBuyDetail,{
                    params:{
                        ironId: this.ironId
                    }
                }).then(res => {
                    if(res.status === 0){
                        this.buy = res.data.buy;
                        this.supplies = res.data.supplies;
                        this.missSupplies = res.data.missSupplies;
                    }
                })
            },
        },
        created () {
            this.getDetail()
        }
    }
</script>


<style lang="less" scoped>
    .same{
        width: 3rem;
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
                right:.1rem;
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
                padding-bottom: .1rem;
                p{
                    line-height: .24rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .name{
                    line-height: .4rem;
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
                    position: absolute;
                    display: block;
                    right: 0;
                    width: .8rem;
                    height: .3rem;
                    line-height: .3rem;
                    text-align: center;
                    background-color: #007de4;
                    color: #fff;
                }
                .win{
                    position: absolute;
                    right: .3rem;
                    top: .1rem;
                    color: green;
                    font-size: .4rem;
                }
            }
        }
    }
</style>
