<template>
    <x-header slot="header" :left-options="{backText:''}">
        <router-link v-show="!hideRight" slot="right" :to="{name:'index'}">
            <span class="iconfont icon-shouye"></span>
        </router-link>
        <slot></slot>
    </x-header>
</template>


<script>
    import { XHeader } from 'vux'
    export default {
        components: {
            XHeader
        },
        props:{
            hideRight:{
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="less">
    .vux-header{
        background-color: #007de4!important;
        .iconfont{
            font-size: .24rem;
            color: #fff;
        }
        .vux-header-left a{
            color: #fff!important;
        }
        .left-arrow:before{
            border-color: #fff!important;
        }
    }
</style>

