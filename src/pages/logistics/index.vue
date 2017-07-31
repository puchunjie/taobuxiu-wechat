<template>
    <div style="height:100%">
        <view-box body-padding-bottom="53px">
        <div class="container">
            <section class="head-img">
                <swiper :list="swiperImgs" height="1.6rem" auto></swiper>
            </section>

            <section class="goods-info">
                <div class="group">
                    <span class="iconfont icon-qidian left-icon"></span> 
                    <div class="cell vux-1px-b"><input placeholder="请输入装点（必填）" :value="apiData.startPointTest"></div>
                    <div class="cell-cover" @click="showAD('start')"></div>
                </div>
                <div class="group">
                    <span class="iconfont icon-zhongdian left-icon"></span> 
                    <div class="cell vux-1px-b"><input placeholder="请输入卸点（必填）" :value="apiData.endPointTest"></div>
                    <div class="cell-cover" @click="showAD('end')"></div>
                </div>
                <div class="group" v-for="(el,index) in goodNumber" :key="index">
                    <span class="iconfont icon-package left-icon"></span> 
                    <div class="cell" :class="{'vux-1px-b':(index+1)<goodNumber}">
                        <input placeholder="请选择货物和重量（必填)" 
                        :value="strs[index] === ' ' ? '' : strs[index] + '吨'">
                    </div>
                    <span class="iconfont icon-tianjia right-icon add" @click="addNew"></span>
                    <span class="iconfont icon-lajixiang right-icon delete" 
                    v-if="index>0" @click="remove(index)"></span>
                    <div class="cell-cover" @click="showGood(index+1)"></div>
                </div>
            </section>

            <section class="remarks-container">
                <div class="add-demand">
                    <div class="add-btn" @click="showDemand" v-if="demandArr.length === 0">
                        <span class="iconfont icon-tianjia"></span>添加额外需求
                    </div>
                    <div class="show">
                        {{ mergeCommad }}
                        <span class="iconfont icon-bianji" @click="showDemand"></span>
                    </div>
                </div>
                <div class="desc">
                    <group :gutter="0">
                        <x-textarea style="font-size:.14rem" :max="35" :placeholder="'请填写找车需求的详细备注'" v-model="apiData.comment"></x-textarea>
                    </group>
                </div>
            </section>

            <section class="tel">
                <x-input placeholder="请输入您的联系方式（必填）" v-model="apiData.tel">
                    <img slot="label" class="label-img" :src="phoneImg">
                </x-input>
            </section>

            <section class="action-btns">
                <a class="btn goods" href="tel:0510-81812186">
                    <span class="iconfont icon-dianhua"></span>
                    电话找货
                </a>
                <a class="btn vehicle" @click="checkComfim">
                    <span class="iconfont icon-bangwozhao"></span>
                    帮我找车
                </a>
            </section>
            </div>
            <bottom-menu slot="bottom"></bottom-menu>
        </view-box>
        <!--选择地址组件-->
        <address-picker :showChose="adShow" @on-seleted="selectedAdress"></address-picker>
        <!--选择货物组件-->
        <goods-picker :showChose="goodsShow" @on-seleted="selectedGoods"></goods-picker>
        <demand-picker :showChose="demandShow" @on-selected="selectedDmand"></demand-picker>
        <confirm v-model="confirmShow" title="请确认" @on-confirm="onConfirm">
            <p style="text-align:center;">是否确认提交找物流申请？</p>
        </confirm>
    </div>
</template>

<script>
    import { Swiper, Group, XTextarea, XInput, ViewBox, Confirm } from 'vux'
    import bottomMenu from '@/components/business/bottomMenu'
    import addressPicker from '@/components/basics/addressPicker.vue'
    import goodsPicker from '@/components/basics/goodsPicker.vue'
    import demandPicker from '@/components/basics/demandPicker.vue'
    import phone from '@/assets/Phone.png'
    export default {
        components: {
            Swiper,
            ViewBox,
            bottomMenu,
            addressPicker,
            goodsPicker,
            demandPicker,
            XTextarea,
            XInput,
            Group,
            Confirm
        },
        data () {
            return {
                swiperImgs:[{
                        img: 'http://wap.gangg.cn/system/templates/default12/images/bn12121-1.jpg?4',
                    }, {
                        img: 'http://wap.gangg.cn/system/templates/default12/images/bn12121-1.jpg?4'
                    }],
                confirmShow: false,
                phoneImg: phone,
                // 地址选择显示/隐藏
                adShow:{
                    show:false
                },
                goodsShow:{
                    show:false
                },
                demandShow:{
                    show:false
                },
                adressKey:'',
                goodsIndex:1,
                goodNumber:1,
                apiData:{
                    startPointTest:'',
                    startPoint:'',
                    endPointTest:'',
                    endPoint:'',
                    goods1:'',
                    goods1Count:'',
                    sepcCommand:'',
                    comment:'',
                    tel:''
                },
                demandArr:[],
            }
        },
        computed: {
            strs(){
                return [
                    `${ this.apiData.goods1 } ${ this.apiData.goods1Count }`,
                    `${ this.apiData.goods2 } ${ this.apiData.goods2Count }`,
                    `${ this.apiData.goods3 } ${ this.apiData.goods3Count }`
                ]
            },
            mergeCommad(){
                let str = ''
                let length = this.demandArr.length - 1;
                this.demandArr.forEach((item,index) =>{
                    let add = index === length ? '' : '|'
                    str += item + add
                })
                return str
            }
        },
        methods: {
            showAD(key){
                this.adShow.show = true;
                this.adressKey = key;
            },
            showGood(key){
                this.goodsShow.show = true;
                this.goodsIndex = key;
            },
            selectedAdress(data){
                this.apiData[this.adressKey+'PointTest'] = data.str;
                this.apiData[this.adressKey+'Point'] = data.id;
            },
            selectedGoods(data){
                this.apiData['goods' + this.goodsIndex] = data.goods;
                this.apiData['goods' + this.goodsIndex + 'Count'] = data.count;
            },
            addNew(){
                if(this.goodNumber<3){
                    this.goodNumber++ 
                    let key1 = 'goods' + this.goodNumber;
                    let key2 = 'goods' + this.goodNumber + 'Count';
                    this.$set(this.apiData,key1,'');
                    this.$set(this.apiData,key2,'');
                }else{
                    this.$vux.alert.show({
                        title: '最多添加三件货物！',
                        content: '您已经添加三件货物，不能再继续添加了！'
                    })
                }
            },
            remove(index){
                // 如果有三个且删除的是中间的那个,对调2，3数据 删除3
                if(this.goodNumber === 3 && index === 1){
                    let str = this.apiData.goods3;
                    let count = this.apiData.goods3Count;
                    // 删除第三个
                    this.$delete(this.apiData,'goods3');
                    this.$delete(this.apiData,'goods3Count');
                    this.apiData.goods2 = str;
                    this.apiData.goods2Count = count
                }else{
                    let key1 = 'goods'+(index+1)
                    let key2 = 'goods' + (index+1) + 'Count';
                    this.$delete(this.apiData,key1);
                    this.$delete(this.apiData,key2);
                }
                this.goodNumber--
            },
            showDemand(){
                this.demandShow.show = true;
            },
            selectedDmand(arr){
                this.demandArr = arr;
                this.apiData.sepcCommand = this.mergeCommad;
            },
            checkComfim(){
                let isOk = true;
                for(const key in this.apiData){
                    if(this.apiData[key] === '' && key != 'comment' && key != 'sepcCommand'){
                        isOk = false;
                    }
                }
                if(isOk){
                    this.confirmShow = true;
                }else{
                    this.$vux.toast.show({
                        text: '请将必填资料填写完整！',
                        type: 'warn',
                        width: '2rem'
                    })
                }
            },
            onConfirm(){
                this.$http.post(this.api.logistics,this.apiData).then(res => {
                    if(res.status === 0){
                        this.$vux.alert.show({
                            title: '提交成功！',
                            content: '物流专员会尽快与您联系'
                        })
                        this.resetParmas();
                    }else{
                        this.$vux.toast.show({
                            text: res.errorMsg,
                            type: 'warn',
                            width: '2rem'
                        });
                    }
                })
            },
            resetParmas(){
                for(const key in this.apiData){
                    this.apiData[key] = ''
                }
                this.goodNumber = 1;
                this.goodsIndex = 1;
                this.adressKey = '';
                this.demandArr = [];
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
    }
    .head-img {
        width: 100%;
        height: 1.6rem;
        margin-bottom: .1rem;
        img{
            width: 100%;
        }
    }

    .goods-info {
        width: 100%;
        background-color: #fff;
        margin-bottom: .1rem;
        .group{
            position: relative;
            width: 3.6rem;
            height: .48rem;
            margin: 0 auto;
            .left-icon{
                position: absolute;
                font-size: .3rem;
                left: 0;
                top: 0;
                color: #08d808;
            }
            .cell{
                position: absolute;
                width: 3.1rem;
                height: .48rem;
                left: .4rem;
                input{
                    width: 100%;
                    height: .3rem;
                    margin-top: .06rem;
                    font-size: .13rem;
                    border: none;
                }
            }
            .cell-cover{
                position: absolute;
                width: 2.8rem;
                height: 100%;
                left:0;
                top:0;
            }
            .right-icon{
                position: absolute;
                font-size: .24rem;
                top: .05rem;
                color: #666
            }
            .add{
                right: .3rem;
            }
            .delete{
                right: 0;
            }
        }
    }

    .remarks-container{
        width: 100%;
        background-color: #fff;
        margin-bottom: .1rem;
        .add-demand{
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            text-align: center;
            font-size: .16rem;
            color: #007de4;
            .show{
                position: relative;
                text-align: left;
                font-size: .14rem;
                text-indent: .2rem;
                .iconfont{
                    position: absolute;
                    right: .2rem;
                    font-size: .2rem;
                }
            }
        }
        .desc{
            width: 100%;
        }
    }

    .tel{
        width: 100%;
        background-color: #fff;
        margin-bottom: .1rem;
        .label-img{
            display: block;
            width: .24rem;
            height: .24rem;
            margin-right: .1rem;
        }
    }

    .action-btns{
        width: 100%;
        height: .6rem;
        text-align: center;
        font-size: .14rem;
        .btn{
            position: relative;
            display: inline-block;
            margin: .1rem .05rem 0 .05rem;
            width: 1.5rem;
            height: .4rem;
            line-height: .4rem;
            border-radius: .05rem;
            color: #fff;
            text-indent: .1rem;
            .iconfont{
                position: absolute;
                font-size: .24rem;
                left: .18rem;
                top: 0
            }
        }
        .goods{
            background-color: #ff3b00;
        }
        .vehicle{
            background-color: #007de4;
        }
    }
    
    
</style>
