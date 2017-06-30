<template>
    <div class="container">
        <search
        v-model="apiData.key"
        position="static"
        :placeholder="'请输入关键字搜索相关资源'"
        @on-submit="onSearch"
        @on-cancel="reflash"
        ref="search"></search>
        <filter-bar @on-selected="selected" :screen="screen"></filter-bar>
        <scrollList ref="sScroller" @on-pull-down="reflash" @on-pull-up="loadMore">
            <div class="list-item vux-1px-b" v-for="(el,index) in list" :key="index" @click="toDetail(el.offerId,$event)">
                 <img :src="'/'+el.cover">
                <div class="content">
                    <h4 class="title">{{ el.title }}</h4>
                    <div class="price">
                        <em>{{ isNaN(el.price*1) ? '面议' : `${ el.price }元/${ el.unit }` }}</em>
                        <span>{{ el.province }}&nbsp;|&nbsp;{{ el.city }}</span>
                    </div>
                </div>
            </div>
        </scrollList>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="banner" v-show="bannerShow">
                <span class="iconfont icon-close1" @click="closeBanner"></span>
                <i></i><img src="http://www.itaobuxiu.com/files/ads/ads_mobile/gangletou_ads.png" @click="linkTo">
            </div>
        </transition>    
    </div>
</template>


<script>
    import { Search, debounce } from 'vux'
    import filterBar from '@/components/business/filterBar'
    import scrollList from '@/components/business/scrollList'

    export default {
        components: {
            Search,
            filterBar,
            scrollList
        },
        localStorage: {
            bannerShowTime:{
                type: Number,
                default: 0
            },
            specialCacheData: {
                type: Object,
                default: {
                        apiData:{
                        key:'',
                        currentPage: 0,
                        pageCount: 10,
                        type: '',
                        material: '',
                        surface: '',
                        proPlace: ''
                    }, 
                    maxCount: 0,
                    list: []
                }
            }
        },
        data () {
            return {
                bannerShow:true,
                apiData:{
                    key:'',
                    currentPage: 0,
                    pageCount: 15,
                    type: '',
                    material: '',
                    surface: '',
                    proPlace: ''
                },
                maxCount: 0,
                list: [],
                shouldLoad: false
            }
        },
        computed: {
            max(){
                return Math.ceil(this.maxCount/this.apiData.pageCount)// 计算总页数
            },
            screen(){
                return [this.apiData.type,this.apiData.surface,this.apiData.material,this.apiData.proPlace]
            }
        },
        methods: {
            // 筛选选择完毕事件
            selected(request){
                this.apiData.type = request.ironType;
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
            // 搜索事件
            onSearch(){
                this.apiData.currentPage = 0;
                this.getData(() => {
                    this.$refs.sScroller.reset(0);
                });
            },
            // 获取特价资源列表
            getData(callback){
                this.$http.get(this.api.specoffers,{
                    params: this.apiData
                }).then(res => {
                    if(res.data.status === 0){
                        if(this.apiData.currentPage === 0){
                            this.list = res.data.data.specOffers;
                        }else{
                            this.list.push(...res.data.data.specOffers);
                        }
                        this.maxCount = res.data.data.maxCount;
                        callback();
                    }
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
            // 跳转到详情页
            toDetail(offerId,event){
                this.$router.push({ name: 'specialDetail', params: { offerId: offerId}})
            },
            // 关闭广告图
            closeBanner(){
                this.bannerShow = false;
                this.$localStorage.set('bannerShowTime',new Date().getTime());
            },
            linkTo(){
                location.href = 'http://mp.weixin.qq.com/s/Jqw3uW4DvrsrXVW_YSeKoA'
            }
        },
        created () {
            let cacheData = this.$localStorage.get('specialCacheData');
            // 是否满24小时
            let startTime = this.$localStorage.get('bannerShowTime');
            let nowTime = new Date().getTime();
            let willShow = (nowTime - startTime) > 86400000;
            this.bannerShow = willShow
            if(cacheData.shouldLoad){
                this.apiData = cacheData.apiData;
                this.maxCount = cacheData.maxCount;
                this.list = cacheData.list;
                this.$nextTick(()=>{
                    this.$refs.sScroller.reset(cacheData.top);
                })
            }else{
                this.getData(()=>{
                    this.$refs.sScroller.reset();
                })
            }
        },
        beforeDestroy () {
            // 在离开页面之前存入位置信息
            let scrollerInfo = document.getElementsByClassName('xs-container')[1].style.transform.split(" ");
            let top = 0;
            scrollerInfo.forEach((el) => {
                if(el.indexOf("translateY") != -1){
                    top = el.replace(/[^0-9]/ig,"");
                    return false
                }
            });
            // 跳转时记录当前页面状态和数据
            let cache = {
                apiData:this.apiData,
                maxCount: this.maxCount,
                list: this.list,
                top: top,
                shouldLoad:true
            }
            this.$localStorage.set('specialCacheData',cache);
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        .vux-search-box{
            z-index: 10001;
        }

        .list-item{
            position: relative;
            overflow: hidden;
            height: 1rem;
            color: #000;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            padding: .15rem;
            img{
                display: block;
                width: 1.04rem;
                height: .78rem;
                margin-right: .1rem;
                float: left;
            }
            .content{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                min-width: 0;

                .title{
                    line-height: 1.4;
                    font-weight: 700;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .price{
                    margin-top: .1rem;
                    color: red;
                    em{
                        font-style: normal;
                    }
                    span{
                        float: right;
                        font-size: .12rem;
                        margin-top: .03rem;
                        color: #b8b8b8;
                    }
                }
            }
        }
        .banner{
            position: fixed;
            display: table-cell;
            vertical-align:middle;
            text-align:center;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1001;
            top: 0;
            left: 0;
            img{
                width: 80%; 
                vertical-align:middle;
                border-radius: .05rem;
            }
            i {
                display:inline-block;
                height:100%;
                vertical-align:middle
            }
            .iconfont{
                position: absolute;
                right: .1rem;
                top: .3rem;
                font-size: .3rem;
                color: #fff;
            }
        }
    }
</style>
