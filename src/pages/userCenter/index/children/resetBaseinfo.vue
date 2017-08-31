<template>
    <div class="warp">
        <x-header slot="header" :left-options="{showBack:false}">
            修改个人信息
            <span class="iconfont icon-fanhui" slot="left" @click="onBack"></span>
        </x-header>
        <group>
            <cell title="头像" style="position:relative">
                <img class="user-pic" slot="child" :src="headImg"></img>
                <label slot="child" class="upload" for="headImg"></label>
                <input id="headImg" style="display:none" type="file" accept="image" ref="headImg" @change="showImg">
            </cell>
            <x-input title="真实姓名" placeholder="填写真实姓名" :show-clear="false" text-align="right" v-model="userInfo.name"></x-input>
        </group>
        <div style="padding:20px 15px;">
            <x-button type="primary" @click.native="reset">确认修改</x-button>
        </div>
    </div>
</template>

<script>
    import { Group, Cell, XButton, XInput, XHeader } from 'vux'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            Group, 
            Cell,
            XButton, 
            XInput,
            XHeader
        },
        data () {
            return {
                headImg:'',
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ])
        },
        methods: {
            showImg(){
                let _this = this;
                let input = this.$refs.headImg ;
                let reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload=function(e){
                    _this.headImg = this.result;
                    _this.$emit("on-upload",this.result);
                }
            },
            onBack(){
                this.$emit('on-back');
            },
            reset(){
                let _this = this;
                let input = this.$refs.headImg;  
                // 创建一个空的FormData对象   
                let data = new FormData();
                // 使用FormData.append来添加键/值对到表单里面;
                if(input.files[0])
                    data.append('avator', input.files[0]);
                data.append('name', this.userInfo.name)
                this.$http.post(this.api.updateProfile,data,{
                    headers: { 'Content-Type': 'multipart/form-data' },
                    pic: true
                }).then(res => {
                    if(res.status === 0){
                        this.$vux.alert.show({
                            title: '修改成功！',
                            content: '您的个人信息已经修改成功。',
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
            }
        },
        mounted () {
            this.headImg = this.userInfo.avator;
        }
    }
</script>

<style lang="less" scoped>
    .warp{
        width: 100%;
        background-color:#fff;
        height:100%;
    }

    .user-pic{
        width: .45rem;
        height: .45rem;
        border-radius: 50%;
    }

    .upload{
        position:absolute;
        display: block;
        right:.1rem;
        width:.5rem;
        height:.5rem;
    }
</style>

