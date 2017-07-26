<template>
    <view-box>
        <com-header hideRight>用户积分</com-header>
        <div class="group">
            <div class="item">
                <span class="iconfont icon-mairu1"></span>
                <div class="inner">买家积分<span>{{ userInfo.userData.integral }}</span></div>
            </div>
            <div class="item" v-if="userInfo.becomeStatus === 2">
                <span class="iconfont icon-maichu1"></span>
                <div class="inner  vux-1px-t">卖家积分<span>{{ userInfo.sellerData.integral }}</span></div>
            </div>
        </div>
        <p class="tips">当前版本暂不提供在线积分兑换哦，我们会尽快上线积分商城</p>
    </view-box>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { ViewBox } from 'vux'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            ViewBox,
            comHeader
        },
        computed: {
            ...mapGetters(['userInfo'])
        }
    }
</script>

<style lang="less" scoped>
    .group{
        width: 100%;
        background-color: #fff;
        padding: .05rem .1rem;
        .item{
            position: relative;
            width: 100%;
            height: .4rem;
            line-height: .4rem;
        }
        .iconfont{
            font-size: .24rem;
            margin: 0 .05rem;
        }
        .icon-mairu1{
            color: #007de4;
        }
        .icon-maichu1{
            color: red;
        }

        .inner{
            position: absolute;
            width: 3rem;
            height: .4rem;
            left: .4rem;
            top: 0;
            span{
                float: right;
                color: rgb(251, 137, 63);
            }
        }
    }

    .tips{
        padding: .05rem .1rem;
        color: #bababa;
    }
</style>


