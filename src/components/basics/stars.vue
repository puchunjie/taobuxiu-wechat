<template>
    <div class="star-container" :value="value">
        <span class="stars iconfont icon-xing1" 
        v-for="el in starLength" :key="el" 
        :class="{'pick':el <= pickerData}"
        @click="pickStar(el)"></span>
    </div>
</template>
<script>
    export default {
        props:{
            starLength:{
                type: Number,
                default: 10
            },
            value:{
                type: Number,
                default: 3
            },
            // 作为展示，不可点击
            disable:{
                type:Boolean,
                default: false
            }
        },
        data(){
           return {
               pickerData: 0
           }
        },
        methods:{
            pickStar(el){
                if(!this.disable){
                    this.pickerData = el;
                    this.$emit('on-pick',el)
                }
            }
        },
         watch:{
            value(val) {
                this.pickerData = val;
            },
            pickerData(val) {
                this.$emit('input', val);
            }
        },
        mounted() {
            if (this.value) {
                this.pickerData = this.value;
            }
        }
    }
</script>

<style lang="less" scoped>
    .star-container{
        display: inline-block;
        .stars{
            font-size: .24rem;
        }
        .pick{
            color: #ff6a08;
        }
    }
</style>
