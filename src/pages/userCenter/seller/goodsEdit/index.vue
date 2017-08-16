<template>
    <div class="container">
        <com-header hideRight>现货资源</com-header>
         <div class="tab-swiper">
            <scrollList ref="sScroller" style="background-color:#efeff4" @on-pull-down="reflash" @on-pull-up="loadMore" :height="'-55'" backShow>
                <div class="item" v-for="(item,index) in list" :key="item.id">
                    <div class="order-number vux-1px-b">
                         {{`${ item.ironType } | ${ item.material } | ${ item.surface } | ${ item.proPlace }`}}
                    </div>
                    <div class="content">
                        <img class="pro-img" :src="'http://www.itaobuxiu.com'+item.cover">
                        <textarea v-if="index === activeIndex && type" v-model="updateApi.title"></textarea>
                        <h3 v-else>{{`${ item.title }`}}</h3>
                        <p>{{ item.sourceCity }}</p>
                    </div>
                    <div class="price-count">
                        <template v-if="index === activeIndex && type">
                            &yen;<count v-model="updateApi.price"></count>/{{ item.unit }}
                            <span><count v-model="updateApi.numbers"></count>{{ item.unit }}</span>
                        </template>
                        <template v-else>
                            &yen;{{ item.price }}/{{ item.unit }}
                            <span>{{ item.numbers + item.unit }}</span>
                        </template>
                    </div>
                    <div class="action-btns vux-1px-t">
                        <a @click="edit(item,index)" 
                        :class="{'bulue-btn':index === activeIndex && type}">
                            {{ index === activeIndex && type ? '完成' : '编辑' }}
                        </a>
                        <a @click="del(item,index)">{{ index === activeIndex && type ? '取消' : '删除' }}</a>
                    </div>
                </div>
            </scrollList>  
        </div>
    </div>
</template>

<script>
    import scrollList from '@/components/business/scrollList'
    import comHeader from '@/components/business/commonHead'
    import count from '@/components/basics/count'
    export default {
        components: {
            comHeader,
            scrollList,
            count
        },
        data () {
            return {
                type: false,//是否为编辑模式
                activeIndex:0,//选择编辑的商品序列
                list: [],
                apiData:{
                    currentPage: 0,
                    pageCount: 15
                },
                updateApi:{
                    ironId:'',
                    price:13.3,
                    title:'',
                    numbers:999
                },
                maxCount: 0
            }
        },
        computed: {
            max(){
                return Math.ceil(this.maxCount/this.apiData.pageCount)// 计算总页数
            }
        },
        methods: {
            resetList(){
                this.maxCount = 0;
                this.apiData.currentPage = 0;
                this.getData(()=>{
                    this.$refs.sScroller.reset({top:0});
                })
            },
            getData(callback,count){
                this.$http.get(this.api.shopProducts,{
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
            // 点击编辑、完成按钮
            edit(item,index){
                if(index === this.activeIndex && this.type){
                    this.saveEdit(index);
                }else{
                    this.beEdit(item,index);
                }
            },
            //删除，取消
            del(item,index){
                let _this = this;
                if(index === this.activeIndex && this.type){
                    this.type = false;
                }else{
                    this.$vux.confirm.show({
                        content:'此操作不可撤销，是否继续？',
                        onConfirm () {
                            _this.delProd(item,index)
                        }
                    })
                }
            },
            // 开启编辑模式
            beEdit(item,index){
                this.updateApi.ironId = item.proId;
                this.updateApi.numbers = item.numbers;
                this.updateApi.price = item.price;
                this.updateApi.title = item.title;
                this.type = true;
                this.activeIndex = index;
            },
            // 保存编辑
            saveEdit(index){
                this.$http.post(this.api.updateProduct,this.updateApi).then(res => {
                    if(res.status === 0){
                        this.type = false;
                        let item = this.list[this.activeIndex];
                        item.numbers = this.updateApi.numbers;
                        item.price = this.updateApi.price;
                        item.title = this.updateApi.title;
                        this.$vux.alert.show({
                            content: '修改成功！'
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
            // 删除商品
            delProd(item,index){
                this.$http.post(this.api.deleteProduct,{
                    ironId: item.proId
                }).then(res => {
                    if(res.status === 0){
                        this.$vux.alert.show({
                            content: '已删除！'
                        });
                        this.list.splice(index,1);
                    }else{
                        this.$vux.toast.show({
                            text: res.errorMsg,
                            type: 'warn',
                            width: '2rem'
                        });
                    }
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
        width: 100%;
        margin-top: .1rem;
        color: #999;
        background-color: #fff;
        .order-number{
            position: relative;
            width: 100%;
            height: .34rem;
            line-height: .34rem;
            text-indent: .1rem;
            span{
                position: absolute;
                right:.1rem;
            }
        }
        .content{
            position: relative;
            width: 100%;
            height: 1rem;
            overflow: hidden;
            background-color: #efeff4;
            .pro-img{
                display: block;
                float: left;
                width: .75rem;
                height: .75rem;
                margin: .125rem 0 0 .1rem;
            }
            h3,textarea{
                width: 2.4rem;
                float: left;
                color: #333;
                font-size: .14rem;
                line-height: .2rem;
                height: .5rem;
                margin: .1rem 0 0 .05rem;
            }
            textarea{
                border: 0;
                width: 2.85rem;
                resize: none;
            }
            p{
                width: 2.7rem;
                float: left;
                margin: .1rem 0 0 .05rem;
            }
        }
        .price-count{
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            text-indent: .1rem;
            background-color: #fff;
            color: #333;
            font-size: .16rem;
            span{
                float: right;
                margin-right: .1rem;
                color: #999;
            }
            .count-container{
                position: relative;
                top: .07rem;
                margin: 0 .05rem;
            }

        }
        .action-btns{
            width: 100%;
            height: .45rem;
            line-height: .45rem;
            background-color: #fff;
            text-align: right;
            a{
                display: inline-block;
                padding: 0 .12rem;
                text-align: center;
                line-height: .22rem;
                border: 1px solid #333;
                color: #333;
                margin-right: .1rem;
            }
            .bulue-btn{
                color: #007de4;
                border-color: #007de4;
            }
        }
    }
</style>
