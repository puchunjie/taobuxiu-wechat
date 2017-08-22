<template>
    <view-box>
        <com-header>上架加工资源</com-header>

        <group gutter=".1rem" style="position: relative">
            <popup-picker @on-hide="syncType"
                :title="machiningTypes.title" :data="machiningTypes.arr" v-model="machiningTypes.value" placeholder="请选择(必填)"></popup-picker>

            <cell title="地点" is-link @click.native="adShow.show = true" :value="location"></cell>
            <x-textarea title="备注" :max="35" :rows="2" :show-counter="false" placeholder="请填写该加工的专业说明（必填），将被显示为该加工资源的标题" v-model="apiData.message"></x-textarea>

            <popup-picker @on-change="syncTime" title="有效期" :display-format="format" :data="time" v-model="pickerTime" placeholder="请选择（必填)"></popup-picker>

            <x-button class="publish" @click.native="publish" :type="isOk? 'primary' : 'default'">{{ isOk ? isEdit ? '确认修改' : '确认发布' : '请按要求填写完表格' }}</x-button>
        </group>
        <!--选择地址组件-->
        <address-picker :showChose="adShow" @on-seleted="selectedAdress"></address-picker>
    </view-box>
</template>

<script>
    import {  smachiningTypes, days, hours, minutes } from '@/assets/resouseData.js'
    import { ViewBox, PopupPicker, Group, Cell, XInput, XTextarea, XButton } from 'vux'
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
            XButton
        },
        data () {
            return {
                adShow: {show:false},
                machiningTypes:{
                    title: '种类',
                    arr: [smachiningTypes],
                    value: ['整卷油磨'] 
                },
                apiData:{
                    handingType:'整卷油磨',
                    souCityId: '',
                    message:'',
                    timeLimit: 86400000//报价期限
                },
                location: '请选择加工地点（必填)',
                time:[days,hours,minutes],
                pickerTime:['1','0','0'],
            }
        },
        computed: {
            id(){
                return this.$route.params.id
            },
            //表格是否正确填写完成？
            isOk(){
                for( let key in this.apiData){
                    if(this.apiData[key] === ''){
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
            //同步品类
            syncType(){
                this.apiData.handingType = this.machiningTypes.value[0];
            },
            //同步地址
            selectedAdress(data){
                this.location = data.str;
                this.apiData.souCityId = data.id;
            },
            //同步时间
            syncTime(value){
                let limit = (value[0]*24*3600 + value[1]*3600 + value[2]*60) * 1000;
                this.apiData.timeLimit = limit;
            },
            //日期转换
            format: function (value, name) {
                return `${value[0]}天${value[1]}时${value[2]}分`
            },
            // 获取求购信息
            getDetail(){
                this.$http.get(this.api.bmyHandingBuyDetail,{
                    params:{
                        handingId: this.id
                    }
                }).then(res => {
                    if(res.status === 0){
                        let data = res.data.buy;
                        this.apiData.handingType = data.handingType;
                        this.apiData.souCityId = data.souCityId;
                        this.location = data.sourceCity;
                        this.apiData.message = data.message;
                        this.apiData.timeLimit = data.timeLimit;
                        // 同步时间
                        let allTime = data.timeLimit/86400000; 
                        let day = parseInt(allTime) + '';
                        let hour = parseInt(data.timeLimit%86400000/1000/3600) + '';
                        let minute = data.timeLimit%86400000%3600000/1000/60 + '';
                        this.pickerTime = [day,hour,minute];
                    }
                })
            },
            publish(){
                this.$vux.loading.show({
                    text: '发布中。。。'
                })
                this.$http.post(this.api.publishHanding,this.apiData,{
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(res => {
                    let _this = this;
                    this.$vux.loading.hide()
                    if(res.status === 0){
                        this.$vux.alert.show({
                            content: '上架成功.',
                            onHide () {
                                _this.$router.push({name: 'buyerMachining'})
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
