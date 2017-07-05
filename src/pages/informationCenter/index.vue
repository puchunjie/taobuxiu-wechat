<template>
    <view-box style="background-color:#fff">
        <com-header>淘不锈_资讯中心</com-header>
        <tab active-color="#007de4" v-model="activeTab">
            <tab-item v-for="(tab,index) in tabs" :key="index" @on-item-click="switchKey">
                {{ tab.title }}
            </tab-item>
        </tab>
        <div class="tab-swiper">
            <scrollList ref="sScroller" @on-pull-down="reflash" @on-pull-up="loadMore" :height="'-55'" backShow>
                <div class="item vux-1px-b" v-for="(item,index) in list" :key="item.id" @click="jumpToDetail(item.id)">
                    <template v-if="activeTab != 2">
                        <p class="tit">{{ item.title }}</p>
                    </template>
                    <template v-else>
                        <p class="tit">{{ item.companyName }}</p>
                        <p class="time">{{ item.position }}</p>
                    </template>
                    <p class="time">{{ formateDate(item.pushTime) }}</p>
                </div>
            </scrollList>  
        </div>
    </view-box>
</template>


<script>
    import { ViewBox, Tab, TabItem, dateFormat } from 'vux'
    import scrollList from '@/components/business/scrollList'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            ViewBox, 
            comHeader,
            Tab, 
            TabItem,
            scrollList
        },
        data () {
            return {
                tabs:[
                    {title:'平台资讯',key:'innerNews'},
                    {title:'行业新闻',key:'allNews'},
                    {title:'招聘资讯',key:'recruits'}
                ],
                activeTab: 0,
                list: [],
                apiData:{
                    currentPage: 0,
                    pageCount: 15   
                },
                maxCount: 0
            }
        },
        computed: {
            max(){
                return Math.ceil(this.maxCount/this.apiData.pageCount)// 计算总页数
            },
            activeKey(){
                return this.tabs[this.activeTab].key
            }
        },
        methods: {
            formateDate(time){
                return dateFormat(new Date(time*1), 'YYYY-MM-DD')
            },
            switchKey(index){
                console.log(index);
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
            getData(callback){
                let responseKey = this.activeKey === 'recruits' ? 'recruits' : 'news';
                this.$http.get(this.api[this.activeKey],{
                    params: this.apiData
                }).then(res => {
                    if(this.apiData.currentPage === 0){
                        this.list = res.data[responseKey];
                    }else{
                        this.list.push(...res.data[responseKey]);
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
            jumpToDetail(id){
                let apiKey = '';
                switch (this.activeTab) {
                    case 0:
                        apiKey = 'innerNewsDetail'
                        break;
                    case 1:
                        apiKey = 'allNewsDetail'
                        break;
                    case 2:
                        apiKey = 'recruitDetail'
                        break;        
                    default:
                        break;
                } 
                this.$router.push({ name: 'informationDetail', params: { id: id ,apiKey: apiKey}})
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
    .tab-swiper{
        width: 100%;
        .item{
            position: relative;
            width: 100%;
            padding: .1rem;
            .tit{
                font-size: .14rem;
                line-height: .3rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .time{
                font-size: .14rem;
                color: #999;
                line-height: .24rem;
            }
        }
    }
</style>
