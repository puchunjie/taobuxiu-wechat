<template>
    <x-header slot="header" :left-options="{backText:''}">
        <router-link slot="right" :to="{name:'index'}">
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

