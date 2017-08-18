<template>
    <view-box>
        <com-header>上架现货资源</com-header>

        <template v-if="step === 1">
            <group gutter=".1rem" style="position: relative">
                <popup-picker v-for="(val,key) in picterList" :key="key" @on-hide="syncValue(key)"
                :title="val.title" :data="val.arr" v-model="val.value" placeholder="请选择(必填)"></popup-picker>

                <cell title="地点" is-link @click.native="adShow.show = true" :value="location"></cell>

                <cell title="单价" value-align="left">
                    <div class="number">
                        <div class="item" style="width:2rem;">
                            <x-input placeholder="请输入(必填)" v-model="apiData.price" required placeholder-align="right" text-align="right">
                                <span slot="right" style="color:#000">元/</span>
                            </x-input>
                        </div>
                        <div class="item2 unit vux-1px-l" style="width:1rem;">
                            <popup-picker @on-change="syncUnit" value-text-align="left" :data="units" v-model="unit"></popup-picker>
                        </div>
                    </div>
                </cell>

                <x-input title="库存" placeholder="请输入(必填)" v-model="apiData.numbers" required placeholder-align="right" text-align="right">
                    <span slot="right">{{ apiData.unit }}</span>
                </x-input>

                <x-textarea title="规格" max="35" rows="2" :show-counter="false" placeholder="请输入规格及公差等参数，如12*1500*6000，11.45-11.5" v-model="apiData.title"></x-textarea>
            </group>

            <group gutter=".1rem">
                <x-switch title="是否为特价" v-model="apiData.isSpec"></x-switch>
            </group>

            <a class="submit-btn" @click="next">下一步</a>
        </template>

        <template v-else>
            <div class="wrap clearfix">
                <div class="img-contnet">
                    <p><span style="color:red">*</span>封面资源</p>
                    <label class="upload" for="cover">
                        <span class="iconfont icon-shangchuantupian" v-if="cover === ''"></span>
                        <template v-else>
                            <img :src="cover">
                            <span class="del iconfont icon-closecircled" @click.stop="clearImg('cover')"></span>
                        </template>
                     </label>
                    <input id="cover" type="file" accept="image" ref="cover" @change="showImg('cover')">
                </div>
                <div class="img-contnet">
                    <p>图片1</p>
                    <label class="upload" for="image1">
                        <span class="iconfont icon-shangchuantupian" v-if="image1 === ''"></span>
                        <template v-else>
                            <img :src="image1">
                            <span class="del iconfont icon-closecircled" @click.stop="clearImg('image1')"></span>
                        </template>
                     </label>
                    <input id="image1" type="file" accept="image" ref="image1" @change="showImg('image1')">
                </div>
                <div class="img-contnet">
                    <p>图片2</p>
                    <label class="upload" for="image2">
                        <span class="iconfont icon-shangchuantupian" v-if="image2 === ''"></span>
                        <template v-else>
                            <img :src="image2">
                            <span class="del iconfont icon-closecircled" @click.stop="clearImg('image2')"></span>
                        </template>
                     </label>
                    <input id="image2" type="file" accept="image" ref="image2" @change="showImg('image2')">
                </div>
                <div class="img-contnet">
                    <p>图片3</p>
                    <label class="upload" for="image3">
                        <span class="iconfont icon-shangchuantupian" v-if="image3 === ''"></span>
                        <template v-else>
                            <img :src="image3">
                            <span class="del iconfont icon-closecircled" @click.stop="clearImg('image3')"></span>
                        </template>
                     </label>
                    <input id="image3" type="file" accept="image" ref="image3" @change="showImg('image3')">
                </div>
            </div>

            <a class="submit-btn" style="bottom:.6rem" @click="step = 1">上一步</a>
            <a class="submit-btn" @click="publish">提交</a>
        </template>
        

        <!--选择地址组件-->
        <address-picker :showChose="adShow" @on-seleted="selectedAdress"></address-picker>
    </view-box>
</template>

<script>
    import { sironTypes, ssurfaces, smaterials, sproPlaces, units } from '@/assets/resouseData.js'
    import { ViewBox, PopupPicker, Group, Cell, XInput, XTextarea, XSwitch } from 'vux'
    import comHeader from '@/components/business/commonHead'
    import addressPicker from '@/components/basics/addressPicker.vue'
    export default {
        components: {
            ViewBox,
            comHeader,
            addressPicker,
            PopupPicker, 
            Group, 
            Cell,
            XInput,
            XTextarea,
            XSwitch
        },
        data () {
            return {
                step: 2,
                adShow: {show:false},
                picterList:{
                    ironType:{
                        title: '品类',
                        arr: [sironTypes],
                        value: ['不锈钢卷'] 
                    },
                    surface:{
                        title: '表面',
                        arr: [ssurfaces],
                        value: ['No.1']
                    },
                    material:{
                        title: '材质',
                        arr: [smaterials],
                        value: ['201(L1,L2)']  
                    },
                    proPlace:{
                        title: '产地',
                        arr: [sproPlaces],
                        value: ['太钢'] 
                    }
                },
                apiData:{
                    ironType: '不锈钢卷',//品类
                    surface: 'No.1',//表面
                    material: '201(L1,L2)',//材质
                    proPlace: '太钢',//产地
                    numbers: '',//数量
                    sourceCityId: '',
                    unit: 'kg',//单位
                    price: '',//价格
                    title: '',//规格
                    isSpec:false //是否是低价资源
                },
                cover: '',//封面
                image1: '',
                image2: '',
                image3: '',
                location: '请选择货源所在地（必填)',
                unit:['kg'],
                units: [units],
            }
        },
        computed: {
        },
        methods: {
            syncValue(key){
                this.apiData[key] = this.picterList[key].value[0]
            },
            syncUnit(value){
                this.apiData.unit = value[0];
            },
            selectedAdress(data){
                this.location = data.str;
                this.apiData.sourceCityId = data.id;
            },
            // 取消上传
            clearImg(ref){
                this[ref] = '';
            },
            // 图片预览
            showImg(ref){
                let _this = this;
                let input = this.$refs[ref] ;
                let reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload=function(e){
                    _this[ref] = this.result;
                }
            },
            checkStep1(){
                let ok = true;
                for (var key in this.apiData) {
                    if(this.apiData[key] === ''){
                        ok = false;
                        return false
                    }
                }
                return ok
            },
            // 下一步
            next(){
                if(this.checkStep1()){
                    this.step = 2;
                }else{
                    this.$vux.toast.show({
                        text: '请将信息填写完整',
                        type: 'warn',
                        width: '2rem'
                    });
                }
            },
            // 创建fromData
            createFormData(){
                let data = new FormData();
                for (var key in this.apiData) {
                    data.append(key, this.apiData[key])
                }
                let cover = this.$refs.cover.files || this.$refs.cover.files;
                data.append('cover', cover[0]);
                let image1 = this.$refs.image1.files || this.$refs.image1.files;
                let image2 = this.$refs.image2.files || this.$refs.image2.files;
                let image3 = this.$refs.image3.files || this.$refs.image3.files;
                if(this.image1 != '')
                    data.append('image1', image1[0]);
                if(this.image2 != '')
                    data.append('image1', image2[0]);
                if(this.image3 != '')
                    data.append('image1', image3[0]);
                return data
            },
            publish(){
                if(this.cover != ''){
                    this.$vux.loading.show({
                        text: '发布中。。。'
                    })
                    let sbumitData = this.createFormData();
                    this.$http.post(this.api.ironPush,sbumitData,{
                        headers: { 'Content-Type': 'multipart/form-data' },
                        pic: true
                    }).then(res => {
                        let _this = this;
                        this.$vux.loading.hide()
                        if(res.status === 0){
                            this.$vux.alert.show({
                                content: '上架成功.',
                                onHide () {
                                    _this.$router.push({name: 'goodsEdit'})
                                }
                            })
                        }else{
                            this.$vux.toast.show({
                                text: res.errorMsg,
                                type: 'warn',
                                width: '2rem'
                            });
                        }
                    })
                }else{
                    this.$vux.toast.show({
                        text: '请上传封面!',
                        type: 'warn',
                        width: '2rem'
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .unit{
        width: 1rem;
        .vux-cell-box:before{
            content:none
        }
    }
    .pad{
        padding: .12rem .15rem;
    }

    .publish{
        width: 90%;
        margin: .1rem auto;
    }
    .weui-btn_primary{
        background-color: #007de4;
    }
    .weui-btn_loading.weui-btn_primary{
        background-color: #007de4;
    }

    .number{
        .item{
            float: left;
        }
        .item2{
            float: right;
        }
    }

    .submit-btn{
        position: absolute;
        bottom: .1rem;
        right: 5%;
        display: block;
        width: 90%;
        height: .4rem;
        line-height: .4rem;
        background-color: #007de4;
        color: #fff;
        border-radius: .05rem;
        text-align: center;
    }

    .wrap{
        width: 100%;
        background-color: #fff;
        padding: .1rem .2rem;
    }
    .img-contnet{
                width: 50%;
                float: left;
                p{
                    line-height: .3rem;
                    text-indent: .1rem;
                }
                .upload{
                    position: relative;
                    display: block;
                    height: 1.7rem;
                    line-height: 1.7rem;
                    padding: .1rem;
                    text-align: center;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                        pointer-events:none;
                    }
                    .del{
                        position: absolute;
                        right: -.08rem;
                        top: -.03rem;
                        font-size: .3rem;
                        line-height: .3rem;
                        color: red;
                    }
                }
                .icon-shangchuantupian{
                    font-size: 1.5rem;
                    pointer-events:none;
                }
                input {
                    display: none;
                }
            }
</style>
