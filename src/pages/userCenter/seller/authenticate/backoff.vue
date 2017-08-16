<template>
    <div style="height:100%;">
        <header slot="header">
            <span class="back iconfont icon-fanhui" @click.self="$router.go(-1)"></span>
            填写入驻资料
            <a class="phone"  :href="'tel:'+ userInfo.salesMan.tel" v-if="userInfo.salesMan.name != ''"><span class="iconfont icon-kefu"></span></a>
             <a class="phone" v-else @click="bindingShow"><span class="iconfont icon-kefu"></span></a> 
        </header>
        <!-- 表单进度条 -->
        <!-- <flow>
            <flow-state state="1" title="公司" is-done></flow-state>
            <flow-line :tip="company>0?'进行中':''" :process-span="company" :is-done="companyDone"></flow-line>
            <flow-state state="2" title="联系人" :is-done="companyDone"></flow-state>
            <flow-line :tip="companyDone && contacts>0 ? '进行中':'' " :process-span="contacts" :is-done="contactsDone"></flow-line>
            <flow-state state="3" title="封面" :is-done="contactsDone"></flow-state>
            <flow-line :tip="contactsDone && cover>0 ? '进行中':'' " :process-span="cover" :is-done="coverDone"></flow-line>
            <flow-state state="4" title="简介" :is-done="coverDone"></flow-state>
            <flow-line :tip="coverDone && info>0 ? '进行中':'' " :process-span="info" :is-done="infoDone"></flow-line>
            <flow-state state="5" title="证书" :is-done="infoDone"></flow-state>
        </flow> -->

        <!-- 表单步骤区域 -->
        <section class="step-content">
            <div class="warp">
                <div class="group vux-1px-b">
                    <label>公司全称</label>
                    <input placeholder="请输入公司全称（必填）">
                </div>
                <div class="group">
                    <label>注册资金</label>
                    <input placeholder="请输入注册资金（必填）">
                    <span class="unit">万元</span>
                </div>
            </div>

            <div class="warp">
                <div class="group vux-1px-b">
                    <label>联系人</label>
                    <input placeholder="请输入联系人（必填）">
                </div>
                <div class="group vux-1px-b">
                    <label>联系电话</label>
                    <input placeholder="请输入联系电话（必填）">
                </div>
                <div class="group vux-1px-b">
                    <label>传真</label>
                    <input placeholder="请输入传真（必填）">
                </div>
                <div class="group vux-1px-b">
                    <label>办公地址</label>
                    <input placeholder="请输入办公地址（必填）">
                </div>
                <div class="group vux-1px-b">
                    <label>详细地址</label>
                    <input placeholder="请输入详细地址（必填）">
                </div>
                <div class="group">
                    <label>QQ</label>
                    <input placeholder="请输入QQ（选填）">
                </div>
            </div>

            <group gutter=".1rem">
                <cell style="font-size:.14rem;" title="企业封面" value="请选择您的企业封面图片" is-link></cell>
            </group>
            
            <div class="warp">
                <div class="group vux-1px-b">
                    <label>企业简介</label>
                    <group gutter="0">
                        <x-textarea style="font-size:.14rem;padding:.05rem 0;text-indent: .05rem;" :max="150" placeholder="请输入您的公司简介（限150字）"></x-textarea>
                    </group>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { Flow, FlowState, FlowLine, Group, Cell, XTextarea } from 'vux'
    export default {
        components: {
            Flow, 
            FlowState, 
            FlowLine,
            Group,
            Cell,
            XTextarea
        },
        data () {
            return {
                company: 1,
                contacts: 0,
                cover: 0,
                info: 0,
                certificate: 0
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
            companyDone(){
                return this.company === 100
            },
            contactsDone(){
                return this.contacts === 100
            },
            coverDone(){
                return this.cover === 100
            },
            infoDone(){
                return this.info === 100
            },
            certificateDone(){
                return this.certificate === 100
            }
        },
        methods: {
            bindingShow(){
                let _this = this;
                this.$vux.confirm.show({
                    content: '暂未绑定专属客服，现在是否需要立即绑定？',
                    onConfirm () {
                        _this.$router.push({name:'bindingOfficer'})
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    header {
        position: relative;
        width: 100%;
        background-color: #007de4;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        color: #fff;
        font-size: .16rem;
        .back {
            position: absolute;
            left: .1rem;
            font-size: .22rem;
        }
        .phone {
            position: absolute;
            right: .1rem;
            color: #fff;
            span {
                font-size: .22rem;
            }
        }
    }

    .step-content{
        width: 100%;
        padding-bottom: .1rem;
        .warp{
            width: 100%;
            padding: 0 .1rem;
            margin-top: .1rem;
            background:#fff;
            label{
                display: block;
                width: 100%;
                line-height: .3rem;
                text-indent: .05rem;
            }
            input{
                width: 80%;
                line-height: .3rem;
                text-indent: .05rem;
                border:none; 
                outline:none;
            }
            .unit{
                float: right;
            }
        }
    }
</style>
