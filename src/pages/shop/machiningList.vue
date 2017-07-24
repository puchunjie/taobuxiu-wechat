<template>
    <div class="container">
        <com-header>店铺加工资源</com-header>
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

        <div class="detail-container" v-show="detailShow.do">
            <detail-part v-if="detailHandingId != ''" :handingId="detailHandingId" :show="detailShow"></detail-part>
        </div>
    </div>
</template>

<script>
    import comHeader from '@/components/business/commonHead'
    import scrollList from '@/components/business/scrollList'
    import detailPart from '@/pages/processingInformation/detail.vue'
    export default {
        components: {
            comHeader,
            scrollList,
            detailPart
        },
        data () {
            return {
                apiData:{
                    currentPage:0,
                    pageCount:12,
                    service:true,
                    order:'service',
                    sellerId: '',
                    keyword:''
                },
                maxCount: 0,
                list: [],    
                detailHandingId:'',
                detailShow: {
                    do: false
                }  
            }
        },
        computed: {
            sellerId(){
                return this.$route.params.sellerId
            },
            max(){
                return Math.ceil(this.maxCount/this.apiData.pageCount)// 计算总页数
            }   
        },
        methods: {
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
            showDetail(id){
                this.detailHandingId = id;
                this.detailShow.do = true;
            }
        },
        created () {
            this.apiData.sellerId = this.sellerId;
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


