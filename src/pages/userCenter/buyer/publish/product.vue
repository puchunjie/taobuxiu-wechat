<template>
    <view-box>
        <com-header>{{ isEdit ? '修改现货需求' : '发布现货需求' }}</com-header>
        <group style="position: relative">
            <popup-picker v-for="(val,key) in picterList" :key="key" @on-hide="syncValue(key)"
            :title="val.title" :data="val.arr" v-model="val.value" placeholder="请选择(必填)"></popup-picker>
            <x-input v-for="(val,key) in whl" class="pad" :key="key" type="text" required placeholder-align="right" text-align="right"
            label-width="1.05rem" :title="val.title" placeholder="请输入(必填)" v-model="val.value"
            @on-focus="showTip(key)"
            @on-blur="hideTip(key)"
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
            <x-textarea title="备注" :max="35" placeholder="请输入备注,35个字以内（选填）" v-model="apiData.message"></x-textarea>
            <popup-picker @on-change="syncTime" title="有效期" :display-format="format" :data="time" v-model="pickerTime" placeholder="请选择（必填)"></popup-picker>

            <ul class="tip-content" ref="popTip">
                <li v-for="(item,index) in tipList" :key="index" class="vux-1px-b" @click="fillData(item)">
                    宽度：{{ item.split('*')[0] }} 长度：{{ item.split('*')[1] }}
                </li> 
            </ul>
        </group>

        <x-button class="publish" @click.native="publish" :show-loading="loading" :type="isOk? 'primary' : 'default'">{{ isOk ? isEdit ? '确认修改' : '确认发布' : '请按要求填写完表格' }}</x-button>
        <!--选择地址组件-->
        <address-picker :showChose="adShow" @on-seleted="selectedAdress"></address-picker>
    </view-box>
</template>

<script>
    import { sironTypes, ssurfaces, smaterials, sproPlaces, units, days, hours, minutes } from '@/assets/resouseData.js'
    import { ViewBox, PopupPicker, Group, Cell, XInput, XNumber, XTextarea, XButton, Popup } from 'vux'
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
            XNumber,
            XTextarea,
            XButton,
            Popup
        },
        data () {
            return {
                tipList: [],
                editStatus: NaN,
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
                pickerTime:['1','0','0'],
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
            },
            // 是否为编辑
            isEdit(){
                return this.$route.params.isEdit == '1';
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
                    this.editStatus = data.editStatus;
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
                    let day = parseInt(allTime) + '';
                    let hour = parseInt(data.timeLimit%86400000/1000/3600) + '';
                    let minute = data.timeLimit%86400000%3600000/1000/60 + '';
                    this.pickerTime = [day,hour,minute];
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
            //显示提示
            showTip(key){
                // 如果是长度宽度,要输入的时候就给出提示
                if(key != 'height'){
                    if(this.apiData.ironType === '不锈钢板' && this.apiData.surface === '2B'){
                        this.tipList = ['1000*2000','1219*2438','1500*3000','1800*3000','2000*3000'];
                        this.$refs.popTip.style.top = key === 'width' ? '.25rem' : '.73rem';
                        this.$refs.popTip.style.height = '2rem';
                    }else if(this.apiData.ironType === '不锈钢板' && this.apiData.surface === 'No.1'){
                        this.tipList = ['1500*6000','1800*6000','2000*6000','1240*6000','2500*6000'];
                        this.$refs.popTip.style.top = key === 'width' ? '.25rem' : '.73rem';
                        this.$refs.popTip.style.height = '2rem';
                    }else if(this.apiData.ironType === '不锈钢卷' && this.apiData.surface === '2B'){
                        this.tipList = ['1000*C','1219*C','1500*C','1800*C','2000*C'];
                        this.$refs.popTip.style.top = key === 'width' ? '.25rem' : '.73rem';
                        this.$refs.popTip.style.height = '2rem';
                    }else if(this.apiData.ironType === '不锈钢卷' && this.apiData.surface === 'No.1'){
                        this.tipList = ['1500*C，毛边' , '1800*C，毛边', '2000*C，毛边' , '1240*C，毛边'];
                        this.$refs.popTip.style.top = key === 'width' ? '.65rem' : '1.13rem';
                        this.$refs.popTip.style.height = '1.6rem';
                    }
                }
            },
            hideTip(key){
                if(key != 'height'){
                    this.$refs.popTip.style.height = '0';
                }
            },
            //填充提示数据
            fillData(item){
                let data = item.split("*");
                let width = data[0];
                let length = data[1];
                this.whl.width.value = width;
                this.whl.length.value = length;
                this.apiData.width = width;
                this.apiData.length = length;
                this.hideTip();
            },
            publish(){
                let _this = this;
                if(this.isOk){
                    this.loading = true;
                    // 编辑、发布判断
                    let apiUrl = '';
                    if(this.isEdit){
                        apiUrl = this.api.editPublish;
                        this.$set(this.apiData,'ironId',this.id);
                    }else{
                        apiUrl = this.api.publishIron;
                    }
                    this.$http.post(apiUrl,this.apiData,{
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(res => {
                        if(res.status === 0){
                            this.$vux.alert.show({
                                content: this.isEdit ? '修改成功' : '发布成功！',
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
            // 如果是求购列表点击再发一次过来的就获取数据进行填充
            if(this.id != 'false'){
                this.getDetail();
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

    .tip-content{
        position: absolute;
        top: 2.25rem;
        right: .2rem;
        width: 2rem;
        color: #fff;
        background-color:#007de4;
        height: 0;
        transition: all .3s;
        margin:0 auto;
        border-radius:.05rem;
        font-size: .14rem;
        overflow: hidden;
        li{
            text-indent: .1rem;
            line-height: .4rem;
        }
    }
</style>
