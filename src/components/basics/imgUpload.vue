<template>
    <div class="upload-warp">
        <label class="upload" :for="id" :style="{width:size,height:size,lineHeight:size}">
            <span class="iconfont icon-shangchuantupian" v-if="src === ''"></span>
            <template v-else>
                <img :src="src">
                <span class="del iconfont icon-closecircled" @click.stop="clearImg"></span>
            </template>
        </label>
        <input style="display:none" :id="id" type="file" accept="image" :ref="id" @change="showImg">
    </div>
</template>

<script>
export default {
    props:{
        id:{
            type:String
        },
        size:{
            type:String
        }
    },
    data () {
        return {
            src: ''
        }
    },
    methods: {
        showImg(){
            let _this = this;
            let input = this.$refs[this.id] ;
            let reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload=function(e){
                _this.src = this.result;
                _this.$emit('on-upload',this.result)
            }
        },
        clearImg(){}
    }
}
</script>

<style lang="less" scoped>
    .upload-warp{
        display: inline-block;
        padding: .1rem;
    }

    .upload{
        position: relative;
        display: block;
        text-align: center;
        .icon-shangchuantupian{
            font-size: 1.5rem;
            pointer-events:none;
        }
        img{
            display: block;
            width: 100%;
            height: 100%;
            pointer-events:none;
        }
        .del{
            position: absolute;
            right: -5%;
            top: -5%    ;
            font-size: .3rem;
            line-height: .3rem;
            color: red;
        }
    }
</style>
