<template>
    <div class="scroll-list-container">
        <scroller lock-x  ref="scroller" 
        :height="'-44'"
        :use-pulldown="true"
        :use-pullup="true"
        :pulldown-config="pulldown"
        :pullup-config="pullup"
        @on-pulldown-loading="onPullDown"
        @on-pullup-loading="onPullUp"
        :scrollbarY="true">
            <div>
                <slot>
                    <img class="no-data" :src="notFound">
                </slot>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { Scroller } from 'vux'
    import notFound from '@/assets/not-found.00ba998.png'
    export default {
        components: {
            Scroller
        },
        data () {
            return {
                notFound:notFound,
                pulldown: {
                    content: '下拉刷新列表',
                    height: 60,
                    autoRefresh: false,
                    downContent: '下拉刷新列表',
                    upContent: '释放刷新列表',
                    loadingContent: '正在刷新...',
                    clsPrefix: 'xs-plugin-pulldown-'
                },
                pullup: {
                    content: '上拉加载更多数据',
                    pullUpHeight: 60,
                    height: 40,
                    autoRefresh: false,
                    downContent: '释放获取数据',
                    upContent: '上拉加载更多数据',
                    loadingContent: '加载中...',
                    clsPrefix: 'xs-plugin-pullup-'
                }
            }
        },
        methods: {
            onPullDown(){
                this.$emit('on-pull-down');
            },
            onPullUp(){
                this.$emit('on-pull-up');
            },
            donePd(){
                ;
                this.$nextTick(() => {
                    this.$refs.scroller.reset();
                    this.$refs.scroller.donePulldown()
                })
            },
            donePu(){
                
                this.$nextTick(() => {
                    this.$refs.scroller.reset();
                    this.$refs.scroller.donePullup();
                })
            },
            reset(top){
                this.$nextTick(() => {
                    if(top === undefined){
                        this.$refs.scroller.reset();   
                    }else{
                        this.$refs.scroller.reset({top:top});
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .scroll-list-container{
        width: 100%;
        background-color: #fff;
        .no-data{
            display: block;
            width: 80%;
            margin: 0 auto;
            padding-bottom: 4rem;
        }
    }
</style>

