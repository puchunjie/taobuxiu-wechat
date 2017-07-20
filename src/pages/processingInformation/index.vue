<template>
    <div class="container">
        <header class="header">
            <a class="back" @click="goBack"><span class="iconfont icon-fanhui"></span></a>
            <input ref="search" class="search-input" placeholder="请输入要查找的现货关键字" v-model="apiData.keyword">
            <a class="search-btn" @click="search">搜索</a>
        </header>

        <div class="inner-filter vux-1px-b">
            <div class="filter-item vux-1px-r">
                <filter-bar @on-selected="selected" :screen="screen" isMach onBorder icon="icon-xia"></filter-bar>
            </div>
            <div class="filter-item" @click="adShow.show = true">
                {{ place === '' ? '加工所在地' : place }}<span class="iconfont icon-xia"></span>
            </div>
        </div>

        

        <section class="sort-bar vux-1px-b">
            <a v-for="(sort,index) in sorts" :key="index"
            @click="doSort(sort,index)" 
            :class="{'active':index === sortActive}">
                {{ sort.title }}
            </a>
            <a @click="reset">重置</a>
        </section>

        <scrollList ref="sScroller" @on-pull-down="reflash" @on-pull-up="loadMore" :height="'-143'" backShow>
            <div class="item vux-1px" v-for="(item,index) in list" :key="index"  @click="showDetail(item.id)">
                <div class="img">
                    <img :src="'http://www.itaobuxiu.com/'+item.cover">
                </div>
                <h3 class="tit">{{ item.title != '' ? item.title : '未知标题' }}</h3>
                <p class="price">
                    &yen;{{ item.price }}
                    <span>/{{ item.unit }}</span>
                </p>
                <p class="type">
                    {{ item.type }}
                    <span class="ad">{{ item.sourceCity }}</span>
                </p>
            </div>
        </scrollList>

        <bottom-menu slot="bottom"></bottom-menu>
        <address-picker :showChose="adShow" @on-seleted="selectedAdress"></address-picker>

        <div class="detail-container" v-show="detailShow.do">
            <detail-part v-if="detailHandingId != ''" :handingId="detailHandingId" :show="detailShow"></detail-part>
        </div>
    </div>
</template>

<script>
    import filterBar from '@/components/business/filterBar.vue'
    import bottomMenu from '@/components/business/bottomMenu'
    import scrollList from '@/components/business/scrollList'
    import addressPicker from '@/components/basics/addressPicker.vue'
    import detailPart from './detail.vue'
    export default {
        components: {
            bottomMenu,
            scrollList,
            filterBar,
            addressPicker,
            detailPart
        },
        data () {
            return {
                adShow:{show:false},
                apiData:{
                    currentPage: 0,
                    pageCount: 10,
                    keyword:'',
                    cityId: '',
                    cityLevel1Id: '',
                    cityLevel2Id: '',
                    handingType: '',
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
                place: '',
                sortActive:NaN,
                maxCount: 0,
                list: [],
                detailHandingId:'',
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
                return [this.apiData.handingType]
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
            // 筛选选择完毕事件
            selected(request){
                this.apiData.handingType = request.handingType;
                this.reloadList();
            },
            getData(callback){
                this.$http.get(this.api.handings,{
                    params: this.apiData
                }).then(res => {
                    if(this.apiData.currentPage === 0){
                        this.list = res.data.handingProducts;
                    }else{
                        this.list.push(...res.data.handingProducts);
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
                this.apiData.handingType = '';
                this.apiData.cityId = '';
                this.place = '';
                this.apiData.cityLevel1Id = '';
                this.apiData.cityLevel2Id = '';
                this.apiData.keyword = '';
                this.sortActive = NaN;
                this.reloadList();
            },
            selectedAdress(data){
                this.place = data.str;
                this.apiData.cityId = data.id2;
                this.apiData.cityLevel1Id = data.id1;
                this.apiData.cityLevel2Id = data.id2;
                this.reloadList();
            },
            showDetail(id){
                this.detailHandingId = id;
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

    .inner-filter{
        width: 100%;
        background-color: #fff;
        height: .44rem;
        text-align: center;
        overflow: hidden;
        .filter-item{
            position: relative;
            width: 50%;
            height: .44rem;
            line-height: .44rem;
            float: left;
            .iconfont{
                position: absolute;
                right: .05rem;
                top: 0;
                font-size: .1rem;
            }
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

    .item{
        width: 1.85rem;
        margin-bottom: .05rem;
        background: #fff;
        float: left;
        margin: 0.0125rem;
        .img{
            width: 100%;
            height: 1.85rem;
            overflow: hidden;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .tit{
            font-size: .14rem;
            line-height: .24rem;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-indent: .05rem;
        }
        .price{
            color: red;
            font-size: .15rem;
            line-height: .3rem;
            text-indent: .05rem;
            span{
                color: #333;
                font-size: .12rem;
                margin-left: -3px;
            }
        }
        .type{
            position: relative;
            font-size: .12rem;
            line-height: .24rem;
            text-indent: .05rem;
            color: #999;
            .ad{
                position: absolute;
                right: .05rem;
                top: 0;
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
</style>
