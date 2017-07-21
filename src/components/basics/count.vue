<template>
    <div class="count-container vux-1px">
        <a class="count-btn vux-1px-r reduce" @click="minu">
            <span class="iconfont icon-sub"></span>
        </a>
        <input class="number" :value="value" @input="snycValue">
        <a class="count-btn vux-1px-l plus" @click="plus">
            <span class="iconfont icon-iconjia"></span>
        </a>
        
    </div>
</template>


<script>
export default {
    props:['value'],
    data () {
        return {
            val: this.value
        }
    },
    methods: {
        snycValue(){
            let value = event.target.value;
            this.$emit('input', value);
        },
        plus() {
            this.val++
            this.$emit('input', this.val)
        },
        minu() {
            if(this.val>0){
                this.val--
                this.$emit('input', this.val)
            }
        }
    }
}
</script>

<style lang="less">
    .count-container{
        position: relative;
        display: inline-block;
        width: 1rem;
        height: .26rem;
        background-color: #fff;
        .count-btn{
            position: absolute;
            display: block;
            width: .26rem;
            height: .26rem;
            text-align: center;
            text-indent: .02rem;
            .iconfont{
                font-size: .18rem;
                color: #999;
            }
        }
        .reduce{
            line-height: .3rem;
            left: 0;
        }
        .plus{
            line-height: .26rem;
            right: 0;
        }
        .number{
            position: absolute;
            width: .45rem;
            height: .24rem;
            line-height: .24rem;
            top: .01rem;
            left: .28rem;
            margin: 0;
            padding: 0;
            text-align: center;
            color: #333;
            border: none;
        }
    }
</style>
