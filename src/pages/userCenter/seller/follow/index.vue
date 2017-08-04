<template>
    <view-box style="background-color:#fff">
        <com-header hideRight>我的关注</com-header>
        <tab active-color="#007de4" v-model="index">
            <tab-item class="vux-center"  v-for="(item, index) in tabs" :key="index">{{item}}</tab-item>
        </tab>
        <div class="tab-swiper clearfix">
            <checker type="checkbox" v-model="value" default-item-class="checkbox" selected-item-class="active">
                <checker-item v-for="(el,index) in list[index]" :key="index" :value="el === '' ? '不限' : el">
                    {{ el === '' ? '不限' : el  }}
                    <span class="iconfont icon-gouxuanjiaobiao"></span>
                </checker-item>
            </checker>
        </div>
        <a slot="bottom" class="save-btn" @click="save">保存</a>
    </view-box>
</template>


<script>
    import { ViewBox, Checker, CheckerItem, Tab, TabItem } from 'vux'
    import comHeader from '@/components/business/commonHead'
    import { sironTypes, ssurfaces, smaterials, sproPlaces } from '@/assets/resouseData.js'
    export default {
        components: {
            ViewBox,
            comHeader,
            Checker, 
            CheckerItem,
            Tab, 
            TabItem
        },
        data () {
            return {
                tabs:['品类','表面','材质','产地'],
                index: 0,
                list:[sironTypes, ssurfaces, smaterials, sproPlaces],
                value0:[],
                value1: [],
                value2: [],
                value3: [],
                value: []
            }
        },
        methods: {
            clearValue(){
                this.value = [];
                this.value = this['value'+this.index];
            },
            getFollows(){
                this.$http.get(this.api.followList).then(res => {
                    if(res.status === 0){
                        let data = res.data;
                        this.value0 = data.types || [];
                        this.value1 = data.surfaces || [];
                        this.value2 = data.materials || [];
                        this.value3 = data.proPlaces || [];
                        this.value = data.types || [];
                    }
                })
            },
            // 保存
            save(){
                this.$http.post(this.api.saveFollow,{
                    type: this.value0,
                    surfaces: this.value1,
                    materials: this.value2,
                    proPlaces: this.value3
                }).then(res => {

                })
            }
        },
        watch: {
            //监听tab来处理一些事
            index(a,b){
                this['value'+b] = this.value;
                this.value = [];
                this.value = this['value'+a];
            }  
        },
        created () {
            this.getFollows()
        }
    }
</script>


<style lang="less" scoped>
    .checkbox{
        position: relative;
        display: block;
        float: left;
        padding: .03rem .13rem;
        margin: .05rem;
        background-color: #fff;
        text-align: center;
        line-height: .2rem;
        border: 1px solid #999; 
        border-radius: .02rem;  
        color: #999;
        font-size: .13rem;
    }
    .iconfont{
        position: absolute;
        display: none;
        right: -1px;
        bottom: -1px;
    }
    .active{
        border-color: #007de4;
        color: #007de4;
        .iconfont{
            display: block;
        }
    }

    .save-btn{
        position: absolute;
        display: block;
        width: 100%;
        height: .4rem;
        bottom: 0;
        text-align: center;
        line-height: .4rem;
        color: #fff;
        background-color: #007de4;
    }
</style>
