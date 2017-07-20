<template>
    <div class="container">
        <header slot="header" class="header">
            <a class="back" @click="goBack"><span class="iconfont icon-fanhui"></span></a>
            <input ref="search" class="search-input" placeholder="请输入要查找的现货关键字" v-model="apiData.keyword">
            <a class="search-btn" @click="search">搜索</a>
        </header>
        <filter-bar @on-selected="selected" :screen="screen"></filter-bar>
        <section class="sort-bar vux-1px-b">
            <a v-for="(sort,index) in sorts" :key="index"
            @click="doSort(sort,index)" 
            :class="{'active':index === sortActive}">
                {{ sort.title }}
            </a>
            <a @click="reset">重置</a>
        </section>

        <scrollList ref="sScroller" @on-pull-down="reflash" @on-pull-up="loadMore" :height="'-143'" backShow>
            <div class="item vux-1px-b" v-for="(item,index) in list" :key="index">
                <div class="tit">
                    <span>{{ item.ironType }}</span>
                    {{ item.material }} {{ item.surface }}
                    <span class="price">&yen;{{ item.price }}/{{ item.unit }}</span>
                </div>
                <p>{{ item.title }}</p>
                <p>{{ item.sourceCity }}</p>
                <a class="show-detail" @click="showDetail(item.proId)">查看</a>
            </div>
        </scrollList>

        <bottom-menu slot="bottom"></bottom-menu>

        <div class="detail-container" v-show="detailShow.do">
            <detail-part v-if="detailIronId != ''" :ironId="detailIronId" :show="detailShow"></detail-part>
        </div>
    </div>
</template>

<script>
    import { XDialog } from 'vux'
    import filterBar from '@/components/business/filterBar.vue'
    import bottomMenu from '@/components/business/bottomMenu'
    import scrollList from '@/components/business/scrollList'
    import detailPart from './detail.vue'
    export default {
        components: {
            XDialog,
            bottomMenu,
            filterBar,
            scrollList,
            detailPart
        },
        data () {
            return {
                apiData:{
                    currentPage: 0,
                    pageCount: 10,
                    ironType: '',
                    material: '',
                    surface: '',
                    proPlace: '',
                    keyword:'',
                    default:true,
                    order:'default'
                },
                sorts:[
                    {
                        title:'综合',
                        sortKey: 'score'
                    },
                    {
                        title:'价格',
                        sortKey: 'price'
                    },
                    {
                        title:'月销量',
                        sortKey: 'monthSellCount'
                    }
                ],
                sortActive:NaN,
                maxCount: 0,
                list: [],
                detailIronId:'',
                detailShow: {
                    do: false
                }
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
            goBack(){
                this.$router.go(-1);
            },
            // 筛选选择完毕事件
            selected(request){
                this.apiData.ironType = request.ironType;
                this.apiData.material = request.material;
                this.apiData.surface = request.surface;
                this.apiData.proPlace = request.proPlace;
                this.reloadList();
            },
            getData(callback){
                this.$http.get(this.api.irons,{
                    params: this.apiData
                }).then(res => {
                    if(this.apiData.currentPage === 0){
                        this.list = res.data.irons;
                    }else{
                        this.list.push(...res.data.irons);
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
            reloadList(){
                this.apiData.currentPage = 0;
                this.getData(() => {
                    this.$nextTick(()=>{
                        this.$refs.sScroller.reset(0);
                    })
                });
            },
            search(){
                if(this.apiData.keyword === ''){
                    this.$vux.toast.show({
                        text: '请输入搜索关键词',
                        type: 'warn',
                        width: '2rem'
                    })
                    this.$refs.search.focus();
                }else{
                    this.reloadList();
                } 
            },
            resetSort(){
                this.$delete(this.apiData,'default');
                this.$delete(this.apiData,'price');
                this.$delete(this.apiData,'score');
                this.$delete(this.apiData,'monthSellCount');
                this.apiData.order = '';
            },
            doSort(sort,index){
                // 判断一下是否选中，避免多次重复请求
                if(this.sortActive != index){
                    this.sortActive = index;
                    this.resetSort();
                    this.$set(this.apiData,sort.sortKey,true);
                    this.apiData.order = sort.sortKey;
                    this.reloadList();
                } 
            },
            reset(){
                this.resetSort();
                this.$set(this.apiData,'default',true);
                this.apiData.order = 'default';
                this.apiData.ironType = '';
                this.apiData.material = '';
                this.apiData.surface = '';
                this.apiData.proPlace = '';
                this.apiData.keyword = '';
                this.sortActive = NaN;
                this.reloadList();
            },
            showDetail(id){
                // this.$router.push({ name: 'goodsInStockDetail', params: { ironId: id } })
                this.detailIronId = id;
                this.detailShow.do = true;
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
    .header{
        position: relative;
        width: 100%;
        height: .46rem;
        background-color: #007de4;
        color: #fff;
        font-size: .14rem;
        .back{
            display: inline-block;
            width: .3rem;
            height: 100%;
            line-height: .46rem;
            span{
                color: #fff;
                font-size: .28rem;
            }
        }
        .search-input{
            position: absolute;
            display: inline-block;
            border-radius: .03rem;
            border: 0;
            background-color: #fff;
            width: 2.8rem;
            height: .3rem;
            left: .4rem;
            top: .08rem;
            text-indent: .1rem;
            color:#000;
        }

        .search-btn{
            position: absolute;
            display: inline-block;
            color: #fff;
            width: .5rem;
            height: 100%;
            line-height: .46rem;
            text-align: center;
            right: 0;
        }
    }

    .item{
        position: relative;
        width: 100%;
        padding: .1rem;
        color: #999;
        .tit{
            font-size: .14rem;
            line-height: .24rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span{
                color: #000;
                font-weight: 500;
                margin-right: .1rem;
            }
            .price{
                float: right;
            }
        }
        p{
            line-height: .24rem; 
        }
        .show-detail{
            position: absolute;
            display: black;
            width: .8rem;
            height: .3rem;
            right: .1rem;
            bottom: .1rem;
            border: 1px solid #007de4;
            color: #007de4;
            text-align: center;
            line-height: .28rem;
        }
    }

    .sort-bar{
        width: 100%;
        height: .4rem;
        background-color: #fff;
        a{
            display: inline-block;
            margin-right: -3px;
            width: 25%;
            text-align: center;
            line-height: .4rem;
            color: #333;
        }
        .active{
            color: #007de4;
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
</style>
