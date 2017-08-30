<template>
  <div class="warp">
    <x-header slot="header" :left-options="{showBack:false}">
        修改登录密码
        <span class="iconfont icon-fanhui" slot="left" @click="onBack"></span>
    </x-header>
    <group :gutter="0">
        <x-input ref="old" type="password" required placeholder="旧密码" v-model="apiData.oldPassword"></x-input>
        <x-input ref="new" type="password" required placeholder="新密码" v-model="apiData.newPassword"></x-input>
        <x-input ref="newConf" type="password" required placeholder="确认密码" v-model="apiData.newPasswordConfirm"></x-input>
    </group>
    <div style="padding:20px 15px;">
        <x-button type="primary" @click.native="reset">确认修改</x-button>
    </div>
  </div>
</template>

<script>
    import { Group, XButton, XInput, XHeader } from 'vux'
    export default {
        components: {
            Group, 
            XButton, 
            XInput,
            XHeader
        },
        data () {
            return {
                apiData:{
                    oldPassword:'',
                    newPassword:'',
                    newPasswordConfirm:''
                }    
            }
        },
        computed: {
            isConf(){
                return this.apiData.newPassword === this.apiData.newPasswordConfirm
            }
        },
        methods: {
            onBack(){
                this.resetApidata();
                this.$emit('on-back');
            },
            resetApidata(){
                for(let key in this.apiData){
                    this.apiData[key] = ''
                }
            },
            reset(){
                let _this = this;
                if(this.$refs.old.valid && this.$refs.new.valid && this.$refs.newConf.valid && this.isConf){
                    this.$http.post(this.api.changePassword,this.apiData).then(res => {
                        if(res.status === 0){
                            this.$vux.alert.show({
                                title: '修改成功！',
                                content: '您的账户密码已经修改成功。',
                                onHide () {
                                    _this.onBack();
                                }
                            })
                        }else{
                            this.$vux.alert.show({
                                title: '修改失败！',
                                content: res.errorMsg
                            })
                        }
                    })
                }else{
                    this.$vux.toast.show({
                        text: '请按规定输入密码!',
                        type: 'warn',
                        width: '2rem'
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .warp{
        width: 100%;
        background-color:#fff;
        height:100%;
    }
</style>


