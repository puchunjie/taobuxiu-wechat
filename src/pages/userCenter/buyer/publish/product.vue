<template>
    <view-box>
        <com-header>现货求购管理</com-header>
        <group>
            <popup-picker v-for="(val,key) in picterList" :key="key" value-text-align="left"
            :title="val.title" :data="val.arr" v-model="val.value" placeholder="请选择(必填)"></popup-picker>
            <x-input v-for="(val,key) in whl" :key="key" type="text" required
            label-width="1.05rem" :title="val.title" placeholder="请输入(必填)" v-model="val.value">
                <span slot="right">mm</span>
            </x-input>
            <x-input label-width="1.05rem" placeholder="请输入(必填)" title="数量">
                <div slot="right" class="unit vux-1px-l">
                    <popup-picker value-text-align="left" :data="units" v-model="unit"></popup-picker>
                </div>
            </x-input>
        </group>
    </view-box>
</template>

<script>
    import { sironTypes, ssurfaces, smaterials, sproPlaces, units } from '@/assets/resouseData.js'
    import { ViewBox, PopupPicker, Group, Cell, XInput, XNumber } from 'vux'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            ViewBox,
            comHeader,
            PopupPicker, 
            Group, 
            Cell,
            XInput,
            XNumber
        },
        data () {
            return {
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
                apiData:{
                    ironType: '',//品类
                    surface: '',//表面
                    material: '',//材质
                    proPlace: '',//产地
                    height: "",//厚度
                    width: "",//宽度
                    length: "",//长度
                    toleranceFrom: 0,//公差1
                    toleranceTo: 0,//公差2
                    numbers: 0,//数量
                    unit: '',//单位
                    locationCityId:'',
                    message: '',//备注
                    timeLimit: 0,//报价期限
                    day: 1,
                    hour: 0,
                    minute: 0
                }
            }
        },
        computed: {
            id(){
                return this.$route.params.id
            }
        },
        methods: {
            getDetail(){
                this.$http.get(this.api.myBuyDetail,{
                    params:{
                        ironId: this.id
                    }
                }).then(res => {

                })
            }  
        },
        created () {
            if(this.id){
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
</style>
