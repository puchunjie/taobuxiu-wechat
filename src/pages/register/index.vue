<template>
<view-box>
        <com-header>用户注册</com-header>
        <group gutter="0">
            <x-input ref="mobile" v-model="mobile" placeholder="请输入您的手机号码" is-type="china-mobile" type="text" required></x-input>
            <x-input ref="pin" v-model="pin" placeholder="请输入短信验证码" required>
                <span slot="right" style="font-size:.14rem;" >
                    <a v-show="pinShow" @click="getPin">获取验证码</a>
                    <span v-show="!pinShow" style="color:red">
                        <countdown slot="value" v-model="time" :start="!pinShow" @on-finish="finish"></countdown>s后重新获取
                    </span>
                </span>
            </x-input>
            <x-input ref="password" v-model="password" placeholder="请输入您的密码" required></x-input>
        </group>
        <div class="agree">继续操作即视为同意 <a>《淘不锈用户注册协议》</a></div>
        <div class="register-btn" @click="register">注册</div>
        <div class="login-register">
            <flexbox>
                <flexbox-item>
                    <router-link class="r" :to="{name:'login'}" tag="span">去登录</router-link>
                </flexbox-item>
            </flexbox>
        </div>
        
        <div class="contact">
            服务咨询热线：<a href="tel:0510-81812186">0510-81812186</a>
            <span class="about-us">关于我们</span>
        </div>
        <bottom-menu slot="bottom"></bottom-menu>
    </view-box>
</template>

<script>
    import { ViewBox, XInput, Group, Flexbox, FlexboxItem, Countdown, CheckIcon } from 'vux'
    import comHeader from '@/components/business/commonHead'
    import bottomMenu from '@/components/business/bottomMenu'
    export default {
        components: {
            ViewBox,
            bottomMenu,
            comHeader,
            XInput, 
            Group,
            Flexbox, 
            FlexboxItem,
            Countdown,
            CheckIcon
        },
        data () {
            return {
                pinShow: true,
                time: 60,
                agree: true,
                mobile:'',
                pin:'',
                password:''
            }
        },
        methods: {
            finish(){
                this.pinShow = !this.pinShow;
                this.time = 60;
            },
            getPin(){
                if(this.$refs.mobile.valid){
                    this.pinShow = !this.pinShow;
                    this.$http.get(this.api.msgCode,{
                        params: {
                            mobile: this.mobile
                        }
                    }).then(res => {
                        this.$vux.toast.show({
                            text: '发送成功！',
                            type: 'success',
                            width: '2rem'
                        })
                    })
                }else{
                    this.$vux.toast.show({
                        text: '请输入正确的手机号',
                        type: 'warn',
                        width: '2rem'
                    })
                    this.$refs.mobile.focus();
                }
            },
            register(){
                if(this.$refs.mobile.valid && this.$refs.pin.valid && this.$refs.password.valid){
                    //注册
                    this.$http.post(this.api.register,{
                        mobile: this.mobile,
                        password: this.password,
                        passwordConfirm: this.password,
                        msgCode: this.pin * 1
                    }).then(res => {
                        //跳转到个人中心
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .register-btn{
        display: block;
        width: 3.6rem;
        height: .44rem;
        line-height: .44rem;
        font-size: .16rem;
        margin: 0 auto .2rem;
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
    .agree{
        width: 100%;
        padding: 0 .1rem;
        line-height: .4rem;
    }
</style>
