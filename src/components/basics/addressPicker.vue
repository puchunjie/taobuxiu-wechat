<template>
    <section class="showChose" v-show="showChose.show">
      <section class="address">
        <section class="title head">
          <h4>{{ title }}</h4>
          <span class="iconfont icon-close" @click.stop="closed"></span>
        </section>
        <section class="title vux-1px-b">
            <div class="area"
            @click="setLevel(1)" 
            :class="{'active':step === 1}">
                {{ citys[activeIndex1] ? citys[activeIndex1].name : '请选择' }}
            </div>
            <div class="area"
            @click="setLevel(2)"
            v-if="!isNaN(activeIndex1)" 
            :class="{'active':step === 2}">
                {{ level2 ? level2.name : '请选择' }}
            </div>
            <div class="area"
            @click="setLevel(3)" 
            v-if="!isNaN(activeIndex1) && !isNaN(activeIndex2) && level2.subs" 
            :class="{'active':step === 3}">
                {{ level3 ? level3.name : '请选择' }}
            </div>
        </section>
        <div class="ul">
            <template v-if="step === 1">
                <div class="addList"
                :class="{'active': activeIndex1 === index}" 
                @click="selectItem1(index)" 
                v-for="(item,index) in citys" :key="index">
                    {{item.name}}
                    <span class="iconfont icon-gouxuan"></span>
                </div>
            </template>
            <template v-if="step === 2 && level1">
                <div class="addList"
                :class="{'active': activeIndex2 === index}" 
                @click="selectItem2(index)" 
                v-for="(item,index) in level1.subs" :key="index">{{item.name}}</div>
            </template>
            <template v-if="step === 3 && level2">
                <div class="addList"
                :class="{'active': activeIndex3 === index}" 
                @click="selectItem3(index)" 
                v-for="(item,index) in level2.subs" :key="index">{{item.name}}</div>
            </template>
        </div>
      </section>
    </section>
</template>

<script>
    import { citys } from '../../assets/resouseData.js'
    export default {
        props:{
            showChose: {
                show:false
            },
            title:{
                type:String,
                default:'地址选择'
            }
        },
        data () {
            return {
                citys: citys,
                step: 1,
                activeIndex1: NaN,
                activeIndex2: NaN,
                activeIndex3: NaN,
                requestData:{
                    str:'',
                    id:''
                }
            }
        },
        computed: {
            level1(){
                return this.citys[this.activeIndex1]
            },
            level2(){
                return this.citys[this.activeIndex1].subs[this.activeIndex2]
            },
            level3(){
                return this.citys[this.activeIndex1].subs[this.activeIndex2].subs[this.activeIndex3]
            }
        },
        methods: {
            selectItem1(index){
                this.activeIndex1 = index;
                this.activeIndex2 = NaN;
                this.activeIndex3 = NaN;
                this.step = 2;
                this.requestData.str += this.level1.name;
            },
            selectItem2(index){
                this.activeIndex2 = index;
                this.activeIndex3 = NaN;
                // 判断是否还有下一层
                if(this.level2.subs){
                    this.step = 3;
                }else{
                    this.requestData.str = this.level1.name + this.level2.name;
                    this.requestData.id = this.level2.id;
                    this.showChose.show = false;
                    this.$emit('on-seleted',this.requestData);
                }
            },
            selectItem3(index){
                this.activeIndex3 = index;
                this.requestData.str = this.level1.name + this.level2.name + this.level3.name;
                this.requestData.id = this.level3.id;
                this.showChose.show = false;
                this.$emit('on-seleted',this.requestData);
            },
            setLevel(i){
                this.step = i;
            },
            closed(){
                this.showChose.show = false;
            }
        }
    }
</script>


<style lang="less" scoped>
    .font-s{
        font-size: 0.12rem;
        color: #333;
        line-height: 0.3rem;
    }

    .myAddress{
        width: 100%;
        background-color: white;
        border-top: 4px solid rgba(245,245,245,1);
        color:#333;
        .cont{
            border-bottom: 1px solid rgba(245,245,245,0.8);
            span{
                display: inline-block;
                margin-left: .12rem;
                .font-s
            }
            section{
                float:left;
            }
            p{
                display: inline-block;
                margin-left: .5rem;
                .font-s
            }
            p.text{
                margin-left: .3rem;
            }
            .pic2{
                float: right;
                width: .12rem;
                height: .12rem;
                margin: .16rem .16rem .16rem 0;
            }
        }
    }


    .showChose{
        width:100%;
        height:100%;
        position:fixed;
        top:0;
        left:0;
        z-index:1000;
        background:rgba(77,82,113,0.8);
    }
    .address{
        position:absolute;
        bottom:0;
        left:0;
        z-index:121;
        background:#fff;
        width:100%;
        .head{
            height: .4rem;
            line-height: .4rem;
            background-color: #f3f2f8;
            color:#333;
        }
        .title{
            position: relative;
            h4{
                display:inline-block;
                text-indent: .1rem;
                font-size:0.12rem;
                font-weight:normal;
            }
            span{
                position: absolute;
                right: .1rem;
                font-size:.24rem;
                color:#333;
            }
            .area{
                display:inline-block;
                font-size:.14rem;
                line-height:0.42rem;
                margin-left: .1rem;
                color:#333;
            }
        } 
    }
    
    
    
    .addList{
        position: relative;
        width:100%;
        text-indent: .1rem;
        font-size:.14rem;
        line-height:.42rem;
        color:#333;
        .iconfont {
            position: absolute;
            right: .1rem;
            display: none;
            top: 0;
        }
    }
        /* 修改的格式 */
        .address .ul{
            width:100%;
            height:3rem;
            max-height: 4.4rem;
            overflow:auto;
        }

        .address .title .active{
            color:#0071B8;
            border-bottom:0.02rem solid #0071B8;
        }
    .address .ul .active{
        color:#0071B8;
        .iconfont {
            display: block;
        }
    }
</style>
