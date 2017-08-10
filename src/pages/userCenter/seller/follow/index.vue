<template>
    <view-box style="background-color:#fff">
        <com-header hideRight>我的关注</com-header>
        <tab active-color="#007de4" v-model="index">
            <tab-item class="vux-center"  v-for="(item, index) in tabs" :key="index">{{item}}</tab-item>
        </tab>
        <div class="tab-swiper clearfix">
            <checker type="checkbox" v-model="value" default-item-class="checkbox" selected-item-class="active">
                <checker-item v-for="(el,i) in list[index]" :key="i" 
                :value="el === '' ? '不限' : el"
                @click.native="asyncValue(index)">
                    {{ el === '' ? '不限' : el  }}
                    <span class="iconfont icon-gouxuanjiaobiao"></span>
                </checker-item>
            </checker>
        </div>
        <div slot="bottom" class="save-btn">
            <a style="broder-right:1px solid #fff" :class="{'all': isAll}" @click="selectAll">{{ isAll ? '全不选' : '全选'}}</a>
            <a @click="save">保存</a>
        </div>
    </view-box>
</template>


<script>
    import { ViewBox, Checker, CheckerItem, Tab, TabItem } from 'vux'
    import comHeader from '@/components/business/commonHead'
    var sironTypes= ["不锈钢卷","不锈钢板","不锈钢管","矩形管","角钢","扁钢","钢带","弯头","法兰","焊条","钢丝","六角棒","阀门","方钢","槽钢","复合板","铸件","锻件","圆钢(光圆)","圆钢(毛圆)","“工”字钢","封头(管帽)","螺丝/螺母等配件","管件(三通、四通、变径、大小头、接头)","精密管","其他"]

    var ssurfaces= ["不限","No.1","2B","BA","2D","彩色","卫生级","装饰","酸白","冷拉","2BB","其他"]

    var smaterials= ["不限","201(L1,L2)","202(L3,L4)","304J1","304(30408)","304L(30403)","321(32168)","316L(31603)","2205(S22053)","309S","310S","409L","430","410S","444","301","2507","443","439","420J1","420J2","436L","2520","317","其他"]

    var sproPlaces= ["不限","太钢","天管","酒钢","泰山钢铁","宝钢","东特","广青","福欣","张浦","联众","诚德","鼎信","飞达","上克","青浦","宝新","甬金","压延","金汇","新行健","建恒","山东澳星","戴南","远东","江苏","浙江","广东","昆山大庚","广汉天成","其他"]

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
        computed: {
            // 当前是否全选
            isAll(){
                return this.list[this.index].length === this.value.length
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
            //同步数据
            asyncValue(num){
                this['value'+num] = this.value;
            },
            // 全选、全不选
            selectAll(){
                if(this.isAll){
                    this.value = [];
                    this['value'+this.index] = [];
                }else{
                    this.value = this.list[this.index];
                    this['value'+this.index] = this.list[this.index];
                }
            },
            // 保存
            save(){
                this.$vux.loading.show({
                    text: '保存中...'
                })
                this.$http.post(this.api.saveFollow,{
                    types: JSON.stringify(this.value0),
                    surfaces: JSON.stringify(this.value1),
                    materials: JSON.stringify(this.value2),
                    proPlaces: JSON.stringify(this.value3)
                }).then(res => {
                    this.$vux.loading.hide();
                     if(res.status === 0){
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
            }
        },
        watch: {
            //监听tab来处理一些事
            index(a,b){
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
        a{
            display: block;
            float: left;
            width: 50%;
            height: .4rem;
            line-height: .4rem;
            text-align: center;
            color: #fff;
            background-color: #007de4;
        }
        .all{
            background-color: red;
        }
    }
</style>
