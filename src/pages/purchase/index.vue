<template>
    <div>
        <com-header>采购报价</com-header>
        <filter-bar @on-selected="selected" :screen="screen"></filter-bar>

        <scrollList ref="sScroller" @on-pull-down="reflash" @on-pull-up="loadMore" :height="'-110'" backShow>
            <div class="item vux-1px-b" v-for="(item,index) in list" :key="index">
                <p class="title">
                    {{ `${ item.ironType } | ${ item.material } | ${ item.surface } | ${ item.proPlace } (${ item.sourceCity })` }}
                </p> 
                <p class="desc">
                    {{ `${ item.height }*${ item.width }*${ item.length } | 公差：${ item.tolerance } | ${ item.numbers }${ item.unit }` }}
                </p> 
                <p class="message">
                    备注：{{ item.message }}
                </p> 
                <p class="dead-time">
                    报价期限：
                    <clocker :time="item.pushTime + item.timeLimit" v-if="item.status === 0" slot="value">
                        <template v-if="dayShow(item.pushTime + item.timeLimit)">
                            <span class="day">%_D1%_D2</span>天
                        </template>
                        <span class="day">%_H1%_H2</span>时
                        <span class="day">%_M1%_M2</span>分
                        <span class="day">%_S1%_S2</span>秒
                    </clocker>
                    <template v-else>已结束</template>
                </p> 
                <a class="action-btn" :class="{'gray':item.status != 0}">我要供货</a>
            </div>
        </scrollList>

        <bottom-menu  slot="bottom"></bottom-menu>
    </div>
</template>

<script>
    import { Clocker }  from 'vux'
    import filterBar from '@/components/business/filterBar.vue'
    import bottomMenu from '@/components/business/bottomMenu'
    import scrollList from '@/components/business/scrollList'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            bottomMenu,
            comHeader,
            filterBar,
            scrollList,
            Clocker
        },
        data () {
            return {
                apiData:{
                    currentPage: 0,
                    pageCount: 10,
                    ironType: '',
                    material: '',
                    surface: '',
                    proPlace: ''
                },
                maxCount: 0,
                list: []
            }
        },
        computed: {
            max(){
                return Math.ceil(this.maxCount/this.apiData.pageCount)// 计算总页数
            },
            screen(){
                return [this.apiData.ironType,this.apiData.surface,this.apiData.material,this.apiData.proPlace]
            }
        },
        methods: {
            // 是否过期
            timeOver(time){
                return time > new Date().getTime();
            },
            // 是否显示天数
            dayShow(time){
                return (time - new Date().getTime()) > 86400000
            },
            // 筛选选择完毕事件
            selected(request){
                this.apiData.ironType = request.ironType;
                this.apiData.material = request.material;
                this.apiData.surface = request.surface;
                this.apiData.proPlace = request.proPlace;
                this.apiData.currentPage = 0;
                this.getData(() => {
                    this.$nextTick(()=>{
                        this.$refs.sScroller.reset(0);
                    })
                });
            },
            getData(callback){
                this.$http.get(this.api.ironBuy,{
                    params: this.apiData
                }).then(res => {
                    if(this.apiData.currentPage === 0){
                        this.list = res.data.buys;
                    }else{
                        this.list.push(...res.data.buys);
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
    .item {
        position: relative;
        width: 100%;
        padding: .1rem;
        .title{
            color: #007de4;
            font-weight: 400;
            font-size: .15rem;
            height: .24rem;
            line-height: .24rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .desc,.message{
            font-size: .14rem;
            color: #999;
            line-height: .24rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .dead-time {
            color: red;
            line-height: .24rem;
        }
        .action-btn {
            display: block;
            position: absolute;
            width: 1rem;
            height: .3rem;
            bottom: .05rem;
            right: 0;
            text-align: center;
            color: #fff;
            font-size: .14rem;
            line-height: .3rem;
            background-color: #FF6537;
        }
        .gray{
            background-color: #bababa!important;
        }
    }
</style>

