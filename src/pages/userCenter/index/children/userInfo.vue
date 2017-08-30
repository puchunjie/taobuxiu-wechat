<template>
    <div>
        <com-header hideRight>账户信息</com-header>
        <group>
            <cell title="头像" @click.native="editBaseinfo = true">
                <img class="user-pic" slot="child" :src="headImg"></img>
            </cell>
            <cell title="真实姓名" :value="userInfo.name" @click.native="editBaseinfo = true" is-link></cell>
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
        
        <popup v-model="editPassword" position="right" width="100%">
            <reset-password @on-back="close"></reset-password>
        </popup>

        <popup v-model="editBaseinfo" position="right" width="100%">
            <reset-baseinfo  @on-back="close" @on-upload="changePic"></reset-baseinfo>
        </popup>
    </div>
</template>

<script>
    import { Cell, Group, XButton, Popup, XInput } from 'vux'
    import { mapGetters,mapActions } from 'vuex'
    import comHeader from '@/components/business/commonHead'
    import phone from '@/assets/Phone.png'
    import ResetPassword from './resetPassword.vue'
    import ResetBaseinfo from './resetBaseinfo.vue'
    export default {
        components: {
            comHeader,
            ResetPassword,
            ResetBaseinfo,
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
                editBaseinfo: false    
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ])
        },
        methods: {
            ...mapActions(['resetUserInfo']),
            changePic(result){
                this.headImg = result
            },
            close(){
                this.editPassword = false;
                this.editBaseinfo = false;
            },
            loginout(){
                this.$http.post(this.api.loginOut).then(res =>{
                    if(res.status === 0){
                        this.$router.push({name:'index'});
                        this.resetUserInfo();
                    }
                });
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
</style>
