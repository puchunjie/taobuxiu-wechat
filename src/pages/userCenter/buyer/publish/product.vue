<template>
    <view-box>
        <com-header>现货求购管理</com-header>
        <group>
            <popup-picker v-for="(val,key) in picterList" :key="key" @on-hide="syncValue(key)"
            :title="val.title" :data="val.arr" v-model="val.value" placeholder="请选择(必填)"></popup-picker>
            <x-input v-for="(val,key) in whl" class="pad" :key="key" type="text" required placeholder-align="right" text-align="right"
            label-width="1.05rem" :title="val.title" placeholder="请输入(必填)" v-model="val.value"
            @on-change="syncValue2(key)">
                <span slot="right">mm</span>
            </x-input>
            <cell title="数量" value-align="left">
                <div class="number">
                    <div class="item" style="width:1.56rem;">
                        <x-input placeholder="请输入(必填)" v-model="apiData.numbers" required placeholder-align="right" text-align="right"></x-input>
                    </div>
                    <div class="item2 unit vux-1px-l" style="width:1rem;">
                        <popup-picker @on-change="syncUnit" value-text-align="left" :data="units" v-model="unit"></popup-picker>
                    </div>
                </div>
            </cell>
            <cell title="公差" value-align="left">
                <div class="tolerance">
                    <div class="item">
                        <x-input v-model="apiData.toleranceTo" placeholder="请输入(必填)" required placeholder-align="right" text-align="right"></x-input>
                    </div>
                    <span class="to">~</span>
                    <div class="item">
                        <x-input v-model="apiData.toleranceFrom" placeholder="请输入(必填)" required placeholder-align="right" text-align="right"></x-input>
                    </div>
                </div>
            </cell>
            <cell title="收货地" is-link @click.native="adShow.show = true" :value="location"></cell>
            <x-textarea title="备注" :max="35" placeholder="请输入备注，35个字以内（选填）" v-model="apiData.message"></x-textarea>
            <popup-picker @on-change="syncTime" title="有效期" :display-format="format" :data="time" v-model="pickerTime" placeholder="请选择（必填)"></popup-picker>
        </group>

        <x-button class="publish" @click.native="publish" :show-loading="loading" :type="isOk? 'primary' : 'default'">{{ isOk ? '确认发布' : '请按要求填写完表格' }}</x-button>
        <!--选择地址组件-->
        <address-picker :showChose="adShow" @on-seleted="selectedAdress"></address-picker>
    </view-box>
</template>

<script>
    import { sironTypes, ssurfaces, smaterials, sproPlaces, units } from '@/assets/resouseData.js'
    import { ViewBox, PopupPicker, Group, Cell, XInput, XNumber, XTextarea, XButton } from 'vux'
    import comHeader from '@/components/business/commonHead'
    import addressPicker from '@/components/basics/addressPicker.vue'
    let days = [0,1,2,3,4,5,6,7,8,9,10],
        hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    export default {
        components: {
            ViewBox,
            comHeader,
            addressPicker,
            PopupPicker, 
            Group, 
            Cell,
            XInput,
            XNumber,
            XTextarea,
            XButton
        },
        data () {
            return {
                loading: false,
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
                whl:{
                    height: {
                        title: '厚度',
                        value: 0
                    },
                    width: {
                        title: '宽度',
                        value: 0
                    },
                    length: {
                        title: '长度',
                        value: 0
                    }
                },
                unit:['kg'],
                units: [units],
                location:'请选择（必填)',
                time:[days,hours,minutes],
                pickerTime:[[1],[0],[0]],
                apiData:{
                    ironType: '不锈钢卷',//品类
                    surface: 'No.1',//表面
                    material: '201(L1,L2)',//材质
                    proPlace: '太钢',//产地
                    height: "",//厚度
                    width: "",//宽度
                    length: "",//长度
                    toleranceFrom: "",//公差1
                    toleranceTo: "",//公差2
                    numbers: "",//数量
                    unit: 'kg',//单位
                    locationCityId:'',
                    message: '',//备注
                    timeLimit: 86400000,//报价期限
                }
            }
        },
        computed: {
            id(){
                return this.$route.params.id
            },
            //表格是否正确填写完成？
            isOk(){
                for( let key in this.apiData){
                    if(this.apiData[key] === '' && key != 'message'){
                        return false
                    }
                }
                return true
            }
        },
        methods: {
            getDetail(){
                this.$http.get(this.api.myBuyDetail,{
                    params:{
                        ironId: this.id
                    }
                }).then(res => {
                    let data = res.data.buy;
                    this.picterList.ironType.value = [data.ironType];
                    this.picterList.surface.value = [data.surface];
                    this.picterList.material.value = [data.material];
                    this.picterList.proPlace.value = [data.proPlace];
                    this.whl.height.value = data.height;
                    this.whl.width.value = data.width;
                    this.whl.length.value = data.length;
                    this.unit = [data.unit];
                    this.location = data.sourceCity;
                    // 同步时间
                    let allTime = data.timeLimit/86400000; 
                    let day = parseInt(allTime);
                    let hour = parseInt(data.timeLimit%86400000/1000/3600);
                    let minute = data.timeLimit%86400000%3600000/1000/60;
                    this.pickerTime = [[day],[hour],[minute]];
                    this.apiData = {
                        ironType: data.ironType,
                        surface: data.surface,
                        material: data.material,
                        proPlace: data.proPlace,
                        height: data.height,
                        width: data.width,
                        length: data.length,
                        toleranceFrom: data.tolerance.split("-")[0],
                        toleranceTo: data.tolerance.split("-")[1],
                        numbers: data.numbers,
                        unit: data.unit,
                        locationCityId:data.locationCityId,
                        message: data.message,
                        timeLimit: data.timeLimit,
                    }
                })
            },
            selectedAdress(data){
                this.apiData.locationCityId = data.id;
                this.location = data.str;
            },
            format: function (value, name) {
                return `${value[0]}天${value[1]}时${value[2]}分`
            },
            syncValue(key){
                console.log(this.picterList[key].value[0]);
                this.apiData[key] = this.picterList[key].value[0]
            },
            syncValue2(key){
                this.apiData[key] = this.whl[key].value;
            },
            syncUnit(value){
                this.apiData.unit = value[0];
            },
            syncTime(value){
                let limit = (value[0]*24*3600 + value[1]*3600 + value[2]*60) * 1000;
                this.apiData.timeLimit = limit;
            },
            publish(){
                let _this = this;
                if(this.isOk){
                    this.loading = true;
                    this.$http.post(this.api.publishIron,this.apiData,{
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(res => {
                        if(res.status === 0){
                            this.$vux.alert.show({
                                title: '发布成功！',
                                content: '恭喜您成功发布了信息。',
                                onHide () {
                                    _this.$router.push({name:'buyerBuys'})
                                }
                            })
                        }else{
                            this.$vux.toast.show({
                                text: res.errorMsg,
                                type: 'warn',
                                width: '2rem'
                            })
                        }
                        this.loading = true;
                    })
                }else{
                    this.$vux.toast.show({
                        text: '请将发布信息正确填写完整！',
                        type: 'warn',
                        width: '2rem'
                    })
                }
            }
        },
        created () {
            if(this.id != 'false'){
                this.getDetail();
            }else{
               
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

    .tolerance{
        position: relative;
        .item{
            width: 1.55rem;
            float: right;
        }
        .to{
            position: absolute;
            left: 1.6rem;
            top: .1rem
        }
    }
</style>
