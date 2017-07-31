<template>
    <div>
        <com-header hideRight>绑定专员</com-header>
        <group>
            <x-input ref="salesmanId" v-model="salesmanId" required placeholder='在此输入专员编号后，点击下方"确认提交"'></x-input>
        </group>

        <x-button style="margin-top:.1rem" 
        :type="isOk ? 'primary' : 'default'" 
        :show-loading="isLoading"
        @click.native="doBinding"
        action-type="button">
            {{ isLoading ? '提交中...' :'确认提交' }}
        </x-button>
    </div>
</template>

<script>
    import { XInput, Group, XButton } from 'vux'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            comHeader,
            XInput, 
            Group,
            XButton
        },
        data () {
            return {
                isLoading:false,
                salesmanId:''
            }
        },
        computed: {
            isOk(){
                return this.salesmanId != ''
            }
        },
        methods: {
            doBinding(){
                let _this = this;
                if(this.isOk){
                    this.isLoading = true;
                    this.$http.post(this.api.bindSalesman,{
                        salesmanId: this.salesmanId
                    }).then(res => {
                        if(res.status === 0){
                            this.$vux.alert.show({
                                title: '绑定成功！',
                                content: '已经为您绑定专属客服。',
                                onHide () {
                                    _this.$router.push({name: 'userIndex'})
                                }
                            })
                        }else{
                            this.$vux.toast.show({
                                text: res.errorMsg,
                                type: 'warn',
                                width: '2rem'
                            });
                        }
                        this.isLoading = false;
                    })
                }else{
                    this.$refs.salesmanId.focus()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .weui-btn_primary{
        background-color: #007de4!important;
    }
</style>
