<template>
    <view-box>
        <section class="header-part">
            <header>
                <span class="back iconfont icon-fanhui"></span>
                我的淘不锈
                <a class="phone"><span class="iconfont icon-kefu1"></span></a>
            </header>
            <div class="content">
                <img class="head-pic" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
                <div class="panel">
                    <h3>公司名</h3>
                    <p><span class="iconfont icon-zhongqingdianxinicon15"></span>{{ userInfo.mobile }}</p>
                </div>
            </div>
        </section>

        

        <bottom-menu slot="bottom"></bottom-menu>
    </view-box>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { ViewBox } from 'vux'
    import bottomMenu from '@/components/business/bottomMenu'
    export default {
        components: {
            ViewBox,
            bottomMenu
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ])
        },
        methods: {
            ...mapActions([
                'setUserInfo'
            ]),
            getUserData(){
                this.$http.get(this.api.userInfo).then(res => {
                    this.setUserInfo(res.data)
                }) 
            }
        },
        created () {
            this.getUserData();
        }
    }
</script>


<style lang="less" scoped>
    .header-part{
        width: 100%;
        height: 1.7rem;
        background-color: #007de4;
        header{
            position: relative;
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            text-align: center;
            color: #fff;
            font-size: .16rem;
            .back{
                position: absolute;
                left: .1rem;
                font-size: .22rem;
            }
            .phone{
                position: absolute;
                right: .1rem;
                color: #fff;
                span{
                    font-size: .22rem;
                }
            }
        }
        .content{
            width: 100%;
            height: 1.3rem;
            .head-pic{
                float: left;
                width: .8rem;
                height: .8rem;
                margin: .2rem .1rem;
                border-radius: 50%;
            }
            .panel{
                width: 2.5rem;
                height: 1rem;
                line-height: .4rem;
                margin-top: .3rem;
                float: left;
                text-indent: .1rem;
                color: #fff;
                h3{
                    text-indent: .15rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .iconfont{
                    font-size: .24rem;
                }
            }
        }
    }
</style>
