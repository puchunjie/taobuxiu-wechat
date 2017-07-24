<template>
    <div class="container">
        <com-header>店铺现货资源</com-header>
        <scrollList ref="sScroller" @on-pull-down="reflash" @on-pull-up="loadMore" backShow>
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

        <div class="detail-container" v-show="detailShow.do">
            <detail-part v-if="detailIronId != ''" :ironId="detailIronId" :show="detailShow"></detail-part>
        </div>
    </div>
</template>

<script>
    import comHeader from '@/components/business/commonHead'
    import scrollList from '@/components/business/scrollList'
    import detailPart from '@/pages/goodsInStock/detail.vue'
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
                    product:true,
                    order:'product',
                    sellerId: '',
                    keyword:'',
                },
                maxCount: 0,
                list: [],    
                detailIronId:'',
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
            showDetail(id){
                this.detailIronId = id;
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


