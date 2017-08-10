<template>
    <div class="co">
        <com-header>质检</com-header>
        <span class="iconfont icon-fixing sg"></span>
        <p>攻城狮正在施工中！</p>
    </div>
</template>

<script>
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            comHeader
        }
    }
</script>


<style lang="less" scoped>
    .co{
        width: 100%;
        height: 100%;
        background-color: #fff;
        text-align: center;
    }
    .sg{
        display: inline-block;
        margin-top: .3rem;
        font-size: .6rem;
    }
</style>
