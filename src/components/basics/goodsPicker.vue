<template>
    <section class="goods-container" v-show="showChose.show">
        <div class="header">
            选择货物
            <span class="left iconfont icon-fanhui" v-show="countShow" @click="back"></span>
            <span class="right iconfont icon-close1" @click="close"></span>
        </div>
        <div class="content">
            <div class="select-goods" v-show="!countShow">
                <ul class="type">
                    <li v-for="(item,index) in logistics" :key="item.key" 
                    @click="select(index)"
                    :class="{'active':activeIndex === index}">{{ item.name }}</li>
                </ul>
                <ul class="sub">
                    <transition-group enter-active-class="animated fadeInRight fast">
                        <li class="vux-1px-b" 
                        @click="selected(index)"
                        v-for="(sub,index) in logistics[activeIndex].sub" :key="sub.key">{{ sub.name }}</li>
                    </transition-group>
                </ul>
            </div>
            
            <div class="set-count" v-show="countShow">
                <group :gutter="0">
                    <x-input :title="selectStr" v-model="count" :placeholder="'请输入吨位'">
                        <span slot="right">吨</span>
                    </x-input>
                </group>
                <flexbox class="btns">
                    <flexbox-item>
                        <div class="action-btn cancel" @click="close">取消</div>
                    </flexbox-item>
                    <flexbox-item>
                        <div class="action-btn determine" @click="setDone">确定</div>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
    </section>
</template>

<script>
    import { XInput, Group, Flexbox, FlexboxItem, XButton } from 'vux'
    import { logistics } from '../../assets/resouseData.js'
    export default {
        components: {
            XInput, 
            Group, 
            Flexbox, 
            FlexboxItem,
            XButton  
        },
        props:{
            showChose: {
                show:false
            },
            title:{
                type:String,
                default:'地址选择'
            }
        },
        computed: {
            height(){
                return document.documentElement.clientHeight - 46
            },
            selectStr(){
                return `${ this.logistics[this.activeIndex].name } ${ this.logistics[this.activeIndex].sub[this.subIndex].name }`
            }
        },
        data () {
            return {
                logistics: logistics,
                activeIndex: 0,
                subIndex: 0,
                countShow: false,
                count:''
            }
        },
        methods: {
            select(index){
                this.activeIndex = index;
            },
            selected(index){
                this.subIndex = index;
                this.countShow = true;
            },
            close(){
                this.showChose.show = false;
                this.activeIndex = 0;
                this.subIndex = 0;
                this.count = 0;
                this.countShow = false;
            },
            back(){
                this.countShow = false;
            },
            setDone(){
                let re = /^[0-9]+.?[0-9]*$/; 
                if(re.test(this.count) && this.count>0){
                    this.$emit('on-seleted',{
                        goods: this.logistics[this.activeIndex].sub[this.subIndex].name,
                        count: this.count
                    })
                    this.close();
                }else{
                    this.count = '';
                    this.$vux.toast.show({
                        text: '请输入数字！',
                        type: 'warn',
                        width: '2rem'
                    })
                }
                
            }
        }
    }
</script>

<style lang="less">
    .goods-container{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 501;
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
            .left{
                position: absolute;
                width: .5rem;
                height: 100%;
                left: .05rem;
                top: 0;
            }
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
        .content{
            width: 100%;
            height: calc(~"100% - .46rem");
            font-size: .14rem;
            .select-goods{
                width: 100%;
                height: 100%;
                .type{
                    width: 50%;
                    float: left;
                    height: 100%;
                    li{
                        width: 100%;
                        height: .4rem;
                        line-height: .4rem;
                        text-indent: .2rem;
                    }
                    .active{
                        background-color: #fff;
                    }
                }

                .sub{
                    background-color: #fff;
                    width: 50%;
                    height: 100%;
                    float: left;
                    padding: 0 .1rem;
                    overflow-x: hidden;
                    li{
                        width: 100%;
                        height: .4rem;
                        line-height: .4rem;
                        text-indent: .2rem;
                    }
                }
            }

            .set-count{
                width: 100%;
                .btns{
                    margin-top: .2rem;
                }
                .action-btn{
                    width: 1.4rem;
                    height: .4rem;
                    margin: 0 auto;
                    text-align: center;
                    line-height: .36rem;
                    font-size: .16rem;
                    border-radius: .03rem;
                }
                .cancel{
                    border: 2px solid #007de4;
                    color: #007de4;
                }
                .determine{
                    background-color: #007de4;
                    color: #fff;
                }
            }
        }
    }
</style>
