<template>
    <div class="popup-content">
        <x-header slot="header" :left-options="{showBack:false}">
            关于我们
            <span class="iconfont icon-fanhui" slot="left" @click="onBack"></span>
        </x-header>
        <div style="padding: 0 .1rem">
            <p style="margin:0pt"><span style="font-family:Arial; font-size:12pt">&nbsp;</span></p>
            <p style="margin:0pt"><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">江苏淘不锈电子商务有限公司，成立于</span><span style="background-color:#ffffff; color:#424d58; font-family:'Lantinghei SC Extralight'; font-size:12pt">201</span><span style="background-color:#ffffff; color:#424d58; font-family:'Lantinghei SC Extralight'; font-size:12pt">6</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">年，源自澳洲互联网连续创业团队，有着丰富的互联网创业实战经验</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">，</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">现面向国内大宗商品交易提供专业的不锈钢交易平台。我平台由强大的澳洲技术团队及大量国内不锈钢行业资深专家进行研发，是一个集现货推广、需求发布、外协加工、物流配送、金融支持于一体的专业不锈钢全产业链电商平台，也是</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">行业内</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">全国首家提供上门质检服务</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">的绿色互联网服务中心</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">。我们有绝佳的用户体验，丰富的奖励模式，先进的管理</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">机制</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">，</span><span style="background-color:#ffffff; color:#424d58; font-family:'Times New Roman'; font-size:12pt">决心为不锈钢产业链上的每位用户提供最方便、快捷、放心的交易平台。买卖放心不锈钢，尽在淘不锈。</span>
            </p>

            <p style="margin:0pt"><span style="font-family:Cambria; font-size:12pt">&nbsp;</span></p>
        </div>
    </div>
</template>

<script>
    import { XHeader } from 'vux'
    export default {
        components: {
            XHeader
        },
        methods: {
            onBack(){
                this.$emit('on-back')
            }
        }
    }
</script>

<style lang="less" scoped>
    .popup-content{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
</style>


