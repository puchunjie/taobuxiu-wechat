<template>
    <section class="filter-bar-container" :class="itemsShow ? 'filter-fixed' : ''">
        <div class="filter-item-container vux-1px-b">
            <div class="filter-item" v-for="(item,index) in filterItems" :key="index">
                <div class="item-rb" 
                @click="showItems(index)"
                :class="{'vux-1px-r': index != filterItems.length,active: index === activeIndex && itemsShow}">
                    <span class="title">{{ item.active === '' ? item.title : item.active }}</span>
                    <span class="iconfont icon-xiajiantou"></span>
                </div>
            </div>
        </div>
        
        <div class="sub-list" v-show="itemsShow">
            <scroller lock-x height="2.8rem" ref="scrollerEvent" :bounce="false" :scrollbarY="true">
                <div class="scroll-content">
                    <div class="sub-itme" 
                    :class="item === filterItems[activeIndex].active ? 'active' : ''"
                    @click="selectItem(item)"
                    v-for="(item,index) in filterItems[activeIndex].subs" :key="index">
                        <a class="vux-1px-b">
                            {{ item === '' ? '不限' : item }}
                        </a>
                    </div>
                </div>
            </scroller>
        </div>
        
        <div class="mask"  v-show="itemsShow" @click="hide"></div>
    </section>
</template>

<script>
    import { ironTypes, surfaces, materials, proPlaces } from '../../assets/resouseData.js'
    import { Scroller } from 'vux'
    export default {
        components: {
            Scroller
        },
        props:{
            screen:{
                type: Array
            }
        },
        data () {
            return {
                filterItems: [
                    {
                        title: '品类',
                        subs: ironTypes,
                        active: ''
                    },
                    {
                        title: '表面',
                        subs: surfaces,
                        active: ''
                    },
                    {
                        title: '材质',
                        subs: materials,
                        active: ''
                    },
                    {
                        title: '产地',
                        subs: proPlaces,
                        active: ''
                    }
                ],
                itemsShow: false,
                activeIndex:0
            }
        },
        methods: {
            showItems(index){
                if(this.itemsShow && index === this.activeIndex){
                    this.itemsShow = false;
                }else{
                    this.itemsShow = true;
                    this.activeIndex = index;
                    this.$nextTick(() =>{
                        this.$refs.scrollerEvent.reset({top:0})
                    })
                }
            },
            hide(){
                this.itemsShow = false;
            },
            // 点击筛选选项
            selectItem(item){
                this.filterItems[this.activeIndex].active = item;
                this.itemsShow = false;
                let request = {
                    ironType: this.filterItems[0].active,
                    surface: this.filterItems[1].active,
                    material: this.filterItems[2].active,
                    proPlace: this.filterItems[3].active
                }
                this.$emit('on-selected',request)
            },
            reset(){
                this.filterItems.map((el,index) => {
                    el.active = this.screen[index]
                });
            }
        },
        mounted () {
            this.reset();
        },
        watch: {
            'screen':function(){
                this.reset();
            }
        }
    }
</script>

<style lang="less" scoped>
    .filter-bar-container{
        width: 100%;
        height: .44rem;
        .filter-item-container{
            width: 100%;
            height: .44rem;
            background-color: #fff;
            z-index: 999;
        }
        .filter-item{
            width: 25%;
            height: 100%;
            line-height: .44rem;
            float: left;
            text-align: center;
            font-size: .14rem;
        }
        .active{
            color: #ff552e;
        }
        .item-rb{
            position: relative;
            width: 100%;
            height: .3rem;
            margin-top: .06rem;
            line-height: .3rem;
            .title{
                display: inline-block;
                width: 74%;
                height: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .iconfont{
                position: absolute;
                right: .05rem;
                top: 0;
                font-size: .1rem;
            }
        }
        .sub-list{
            position: fixed;
            width: 100%;
            z-index: 999;
            .scroll-content{
                background-color: #fff;
            }
            .sub-itme {
                padding: 0 .14rem;
                height: .44rem;
                line-height: .44rem;
                font-size: .14rem;
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: #333;
                }
            }
            .sub-itme.active{
                background-color: #ff552e;
                a{
                    color: #fff;
                }
            }
        }

        .mask{
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 998;
            top: 0;
            left: 0;
            background: #000;
            opacity: 0.7;
        }
    }
    .filter-fixed{
        position: fixed;
        z-index: 1000;
        top: 0;
    }
</style>
