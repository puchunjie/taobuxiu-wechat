<template>
    <view-box>
        <com-header>账户登录</com-header>
        <group gutter="0">
            <x-input ref="account" placeholder="请输入正确的手机号码" is-type="china-mobile" type="text" v-model="account" required></x-input>
            <x-input ref="password" placeholder="请输入登录密码" :type="inputType" v-model="password" required>
                <span slot="right" class="pwd-icon iconfont" :class="eyes" @click="hidePwd = !hidePwd"></span>
            </x-input>
        </group>
        <div class="login-btn" @click="login">登录</div>
        <div class="login-register">
            <flexbox>
                <flexbox-item>
                    <router-link :to="{name:'register'}" tag="span">快速注册</router-link>
                </flexbox-item>
                <flexbox-item>
                    <router-link class="r" :to="{name:'retrieval'}" tag="span">忘记密码?</router-link>
                </flexbox-item>
            </flexbox>
        </div>

        <div class="contact">
            服务咨询热线：<a href="tel:0510-81812186">0510-81812186</a>
            <span class="about-us" @click="aboutShow = true">关于我们</span>
        </div>
        <bottom-menu slot="bottom"></bottom-menu>

        <popup v-model="aboutShow" position="left" width="100%" class="popup-content">
            <about-us @on-back="aboutShow = false"></about-us>
        </popup>
    </view-box>
</template>


<script>
    import { ViewBox, XInput, Group, Flexbox, FlexboxItem, Popup } from 'vux'
    import comHeader from '@/components/business/commonHead'
    import bottomMenu from '@/components/business/bottomMenu'
    import aboutUs from '@/components/basics/aboutUs'
    export default {
        components: {
            ViewBox,
            bottomMenu,
            comHeader,
            XInput, 
            Group,
            Flexbox, 
            FlexboxItem,
            Popup,
            aboutUs
        },
        data () {
            return {
                aboutShow: false,
                hidePwd: true,
                account: '',
                password: ''
            }
        },
        computed: {
            inputType(){
                return this.hidePwd ? 'password' : 'text'
            },
            eyes(){
                return this.hidePwd ? 'icon-mima-yanjing-guanbi' : 'icon-xiugaimimayanjinghongse'
            }
        },
        methods: {
            login(){
                if(this.$refs.account.valid && this.$refs.password.valid){
                    //登录
                    this.$http.post(this.api.login,{
                        mobile: this.account,
                        password: this.password
                    }).then(res => {
                        //跳转到个人中心
                        if(res.status === 0){
                            this.$router.push({name:'userIndex'})
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
                        text: '请输入正确的账号密码',
                        type: 'warn',
                        width: '2rem'
                    });
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    .pwd-icon{
        font-size: .17rem;
    }

    .login-btn{
        width: 3.6rem;
        height: .44rem;
        line-height: .44rem;
        font-size: .16rem;
        margin: .2rem auto;
        border-radius: .05rem;
        background-color: #007de4;
        color: #fff;
        text-align: center;
    }

    .login-register{
        width: 3.6rem;
        margin: 0 auto;
        color: #999;
        .r{
            float: right;
        }
    }

    .contact{
        position: absolute;
        bottom: 1rem;
        width: 100%;
        height: .44rem;
        line-height: .44rem;
        padding: 0 .1rem;
        background-color: #fff;
        .about-us{
            width: .8rem;
            height: .38rem;
            line-height: .38rem;
            text-align: center;
            float: right;
            margin-top: .04rem;
            background-color: #ff8d00;
            color: #fff;
            border-radius: .03rem;
        }
    }
</style>
