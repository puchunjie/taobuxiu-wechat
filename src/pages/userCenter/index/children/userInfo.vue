<template>
    <div>
        <com-header hideRight>账户信息</com-header>
        <group>
            <cell title="头像" style="position:relative">
                <img class="user-pic" slot="child" :src="headImg"></img>
                <label slot="child" class="upload" for="headImg"></label>
                <input id="headImg" style="display:none" type="file" accept="image" ref="headImg" @change="showImg">
            </cell>
            <cell title="真实姓名" :value="userInfo.name"></cell>
        </group>
        <group title="账号绑定">
            <cell title="手机" :value="userInfo.mobile">
                <img slot="icon" class="iphone" :src="phoneImg">
            </cell>
        </group>
        <group title="安全设置">
            <cell title="登录密码" value="去修改" @click.native="editPassword = true" is-link></cell>
        </group>

        <x-button action-type="button" type="warn" style="margin-top: .1rem" @click.native="loginout">退出登录</x-button>
        
        <popup v-model="editPassword" is-transparent>
            <div class="warp">
                <group>
                    <x-input ref="old" type="password" required placeholder="旧密码" v-model="apiData.oldPassword"></x-input>
                    <x-input ref="new" type="password" required placeholder="新密码" v-model="apiData.newPassword"></x-input>
                    <x-input ref="newConf" type="password" required placeholder="确认密码" v-model="apiData.newPasswordConfirm"></x-input>
                </group>
                <div style="padding:20px 15px;">
                    <x-button type="primary" @click.native="reset">确认修改</x-button>
                    <x-button type="warn" @click.native="close">取消</x-button>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex'
    import comHeader from '@/components/business/commonHead'
    import phone from '@/assets/Phone.png'
    import { Cell, Group, XButton, Popup, XInput } from 'vux'
    export default {
        components: {
            comHeader,
            Cell, 
            Group,
            XButton,
            Popup,
            XInput
        },
        data () {
            return {
                headImg:'',
                phoneImg: phone,
                editPassword: false,
                apiData:{
                    oldPassword:'',
                    newPassword:'',
                    newPasswordConfirm:''
                }      
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
            isConf(){
                return this.apiData.newPassword === this.apiData.newPasswordConfirm
            }
        },
        methods: {
            ...mapActions(['resetUserInfo']),
            close(){
                this.editPassword = false;
                this.resetApidata();
            },
            reset(){
                if(this.$refs.old.valid && this.$refs.new.valid && this.$refs.newConf.valid && this.isConf){
                    this.$http.post(this.api.changePassword,this.apiData).then(res => {
                        if(res.status === 0){
                            this.close();
                            this.$vux.alert.show({
                                title: '修改成功！',
                                content: '您的账户密码已经修改成功。'
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
            },
            resetApidata(){
                for(let key in this.apiData){
                    this.apiData[key] = ''
                }
            },
            loginout(){
                this.$http.post(this.api.loginOut).then(res =>{
                    if(res.status === 0){
                        this.$router.push({name:'index'});
                        this.resetUserInfo();
                    }
                });
            },
            showImg(){
                let _this = this;
                let input = this.$refs.headImg ;
                let reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload=function(e){
                    _this.headImg = this.result;
                }
            }
        },
        mounted () {
            this.headImg = this.userInfo.avator;
        }
    }
</script>

<style lang="less" scoped>
    .user-pic{
        width: .45rem;
        height: .45rem;
        border-radius: 50%;
    }
    .iphone{
        width: .24rem;
    }

    .warp{
        width: 95%;
        background-color:#fff;
        height:3rem;
        margin:0 auto;
        border-radius:.05rem;
        padding-top:.1rem;
    }

    .upload{
        position:absolute;
        display: block;
        right:.1rem;
        width:.5rem;
        height:.5rem;
    }
</style>
