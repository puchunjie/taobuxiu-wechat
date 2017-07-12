<template>
    <div style="height:100%">
        <router-view></router-view>
        <transition enter-active-class="animated fadeIn">
            <confirm v-model="confirmShow"
            show-input
            title="您还没有登录，是否前往登录？"
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
            </confirm>
        </transition>
    </div>
    
</template>

<script>
    import { mapActions } from 'vuex'
    import { Confirm } from 'vux'
    export default {
        components: {
            Confirm
        },
        data () {
            return {
                confirmShow: false,      
            }
        },
        methods: {
            ...mapActions([
                'setUserInfo'
            ]),
            getUserData(){
                this.$http.get(this.api.userInfo).then(res => {
                    // 判断是否登录 
                    if(res.status === 0){
                        this.setUserInfo(res.data)
                    }else{
                        this.confirmShow = true
                    }
                }) 
            },
            onCancel(){
                this.$router.push({name:'index'})
            },
            onConfirm(){
                this.$router.push({name:'login'})
            },
        },
        created () {
            this.getUserData();
        }
        
    }
</script>

