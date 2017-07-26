<template>
    <view-box>
        <com-header hideRight>企业资料管理</com-header>
        <p class="tips">当前手机版本暂不支持此页面编辑功能，如需修改企业资料，请前往电脑端修改保存</p>
        <div class="group">
            <div class="item vux-1px-b">
                <label>公司全称</label>
                <p>{{ info.companyName }}</p>
            </div>
            <div class="item vux-1px-b">
                <label>注册资金</label>
                <p>{{ info.regMoney }}万元</p>
            </div>
        </div>
        <div class="group">
            <div class="item vux-1px-b">
                <label>联系人</label>
                <p>{{ info.contact }}</p>
            </div>
            <div class="item vux-1px-b">
                <label>联系电话</label>
                <p>{{ info.cantactTel }}</p>
            </div>
            <div class="item vux-1px-b">
                <label>传真</label>
                <p>{{ info.fax }}</p>
            </div>
            <div class="item vux-1px-b">
                <label>办公地址</label>
                <p>{{ info.officeAddress }}</p>
            </div>
            <div class="item vux-1px-b">
                <label>QQ</label>
                <p>{{ info.qq }}</p>
            </div>
        </div>
        <div class="group">
            <div class="item vux-1px-b">
                <label>企业封面</label> <img class="pic" :src="info.cover">
            </div>
        </div>

        <div class="group">
            <div class="item vux-1px-b">
                <label>企业简介</label> 
                <p>{{ info.shopProfile }}</p>
            </div>
        </div>
    </view-box>
</template>

<script>
    import { ViewBox } from 'vux'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            ViewBox,
            comHeader
        },
        data () {
            return {
                info:{
                    allCer: '',
                    applyTime: '',
                    businessLic: '',
                    cantactTel: '',
                    cityId: '',
                    codeLic: '',
                    companyName: '',
                    contact: '',
                    cover: '',
                    fax: '',
                    financeLic: '',
                    handingTypeDesc: '',
                    id: '',
                    ironTypeDesc: '',
                    officeAddress: '',
                    qq: '',
                    regMoney: '',
                    shopProfile: '',
                    userId: ''
                }
            }
        },
        methods: {
            getInfo(){
                this.$http.get(this.api.sprofile).then(res => {
                    if(res.status === 0){
                        this.info = res.data;
                    }
                })
            }
        },
        created () {
            this.getInfo();
        }
    }
</script>

<style lang="less" scoped>
    .gray{
        color: #bababa;
    }
    .tips{
        padding: .05rem .1rem;
        .gray
    }
    .group{
        width: 100%;
        background-color: #fff;
        padding: 0 .1rem;
        margin-bottom: .1rem;
        .item{
            width: 100%;
            padding: .1rem 0;
            .pic{
                display: inline-block;
                width: .7rem;
                height: .7rem;
                margin-left: .2rem;
            }
            p{
                .gray
            }
        }
    }
</style>
