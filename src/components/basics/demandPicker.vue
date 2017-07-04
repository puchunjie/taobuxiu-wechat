<template>
    <section class="demand-container" v-show="showChose.show">
        <div>
            <div class="header">
                添加额外需求
                <span class="right iconfont icon-close1" @click="close"></span>
             </div>
            <div class="contnet">
                <checklist :options="list" label-position="left" v-model="value"></checklist>
            </div>
            <div class="footer-btn" @click="doSelect">确认</div>
        </div>
    </section>
</template>

<script>
    import { Checklist } from 'vux'
    export default {
        components: {
            Checklist
        },
        props:{
            showChose:{
                show:false
            }
        },
        data () {
            return {
                list: [ '含税', '自卸车', '垫出库费' ],
                value: []
            }
        },
        methods: {
            close(){
                this.showChose.show = false;
            },
            doSelect(){
                this.$emit('on-selected',this.value);
                this.close();
            }
        }
    }
</script>


<style lang="less">
    .demand-container{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: #efeff4; 
        .header{
            position: relative;
            width: 100%;
            height: .46rem;
            line-height: .46rem;
            background-color: #007de4;
            font-size: .16rem;
            color: #fff;
            text-align: center;
            .right{
                position: absolute;
                width: .5rem;
                height: 100%;
                right: .05rem;
                top: 0;
            }
            .iconfont{
                font-size: .2rem
            }
        }

        .contnet{
            width: 100%;
            height: calc(~"100% - .46rem");
            font-size: .14rem;
        }

        .footer-btn{
            position: fixed;
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            bottom: 0;
            text-align: center;
            background-color: #007de4;
            color: #fff;
        }
    }
</style>
