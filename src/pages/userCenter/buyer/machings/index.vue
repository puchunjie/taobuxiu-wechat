<template>
    <div class="container">
        <com-header hideRight>加工求购管理</com-header>
        <tab :active-color="statusColor" v-model="activeTab">
            <tab-item v-for="(tab,index) in tabs" :key="index" @on-item-click="switchKey">
                {{ tab.title }}
            </tab-item>
        </tab>
         <div class="tab-swiper">
            <scrollList ref="sScroller" style="background-color:#efeff4" @on-pull-down="reflash" @on-pull-up="loadMore" :height="'-55'" backShow>
                <div class="item" v-for="(item,index) in list" :key="item.id">
                    <div class="info vux-1px-b">
                        <h3 class="tit">
                            {{ `${ item.handingType }(${ item.sourceCity })` }}
                        </h3>
                        <p>备注：{{ item.message }}</p>
                    </div>
                    <div class="time">
                        <p v-if="activeStatus === 0" :class="statusClass">
                            <clocker :time="item.pushTime + item.timeLimit" slot="value">
                                <template v-if="dayShow(item.pushTime + item.timeLimit)">
                                    <span class="day">%_D1%_D2</span>天
                                </template>
                                <span class="day">%_H1%_H2</span>时
                                <span class="day">%_M1%_M2</span>分
                                <span class="day">%_S1%_S2</span>秒
                            </clocker>
                        </p>
                         <p v-else>{{ formateDate(item.pushTime)}}</p> 
                        <a @click="jumpToPublish(item.id)" :style="{backgroundColor:statusColor}">再发一次</a>
                    </div>
                    <div class="count" :class="statusClass" @click="showDetail(item.id)">
                        （{{ item.supplyCount }}）<span class="iconfont icon-arrow-right"></span>
                    </div>
                </div>
            </scrollList>  
        </div>

         <popup v-model="detailShow" position="right" width="100%" style="z-index:1000">
            <detail-part @on-back="detailHide" v-if="detailIronId != ''" :ironId="detailIronId" @on-delete-buy="onDeleteBuy"></detail-part>
        </popup> 
    </div>
</template>

<script>
    import { ViewBox, Tab, TabItem, dateFormat, Clocker, Popup } from 'vux'
    import scrollList from '@/components/business/scrollList'
    import comHeader from '@/components/business/commonHead'
    import detailPart from './detail.vue'
    export default {
        components: {
            ViewBox, 
            comHeader,
            Tab, 
            TabItem,
            scrollList,
            Clocker,
            detailPart,
            Popup
        },
        data () {
            return {
                tabs:[
                    {title:'进行中',status:0},
                    {title:'已完成',status:1},
                    {title:'已失效',status:2}
                ],
                activeTab: 0,
                list: [],
                apiData:{
                    status: 0,
                    currentPage: 0,
                    pageCount: 15
                },
                maxCount: 0,
                detailIronId:'',
                detailShow: false
            }
        },
        computed: {
            max(){
                return Math.ceil(this.maxCount/this.apiData.pageCount)// 计算总页数
            },
            activeStatus(){
                return this.tabs[this.activeTab].status
            },
            statusColor(){
                let status = this.tabs[this.activeTab].status;
                switch (status) {
                    case 0:
                        return '#ff8d00'
                        break;
                    case 1:
                        return '#007de4'
                        break;
                    case 2:
                        return 'red'
                        break;
                    default:
                        break;
                }
            },
            statusClass(){
                let status = this.tabs[this.activeTab].status;
                switch (status) {
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
            }
        },
        methods: {
            formateDate(time){
                return dateFormat(new Date(time*1), 'YYYY-MM-DD hh:mm')
            },
            switchKey(index){
                this.activeTab = index;
                this.apiData.status = this.activeStatus;
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
                this.$http.get(this.api.bmyHandingBuys,{
                    params: this.apiData
                }).then(res => {
                    if(this.apiData.currentPage === 0){
                        this.list = res.data.handings;
                    }else{
                        this.list.push(...res.data.handings);
                    }
                    this.maxCount = res.data.maxCount;
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
            jumpToPublish(id){
                this.$router.push({ name: 'bPublishMaching', params: { id: id , isEdit: 0 }})
            },
            showDetail(ironId){
                this.detailIronId = ironId;
                this.detailShow = true;
            },
            detailHide(){
                this.detailShow = false;
                this.detailIronId = '';
            },
            // 是否显示天数
            dayShow(time){
                return (time - new Date().getTime()) > 86400000
            },
            // 删除进行中求购后钩子
            onDeleteBuy(){
                this.detailHide();
                this.getData(()=>{
                    this.$refs.sScroller.reset();
                })
            }
        },
        created () {
            this.getData(()=>{
                this.$refs.sScroller.reset();
            })
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
    }
    .same{
        width: 3rem;
        line-height: .3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .item{
        position: relative;
        width: 100%;
        background-color: #fff;
        margin: .1rem 0;
        padding: .05rem .1rem 0;
        color: #999;
        .tit{
            color: #333;
            font-weight: 500;
            .same
        }
        p{
            .same
        }

        .count{
            position: absolute;
            right: .1rem;
            top: .25rem;
            font-weight: 500;
            .iconfont{
                color: #999;
            }
        }   

        .time{
            position: relative;
            p{
                line-height: .4rem;
            }
            a{
                display: block;
                position: absolute;
                width: 1rem;
                height: .3rem;
                right: 0;
                top: .05rem;
                bottom: .1rem;
                text-align: center;
                color: #fff;
                font-size: .14rem;
                line-height: .3rem;
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
