<template>
    <view-box>
        <section class="header-part">
            <header>
                <span class="back iconfont icon-fanhui" @click="$router.go(-1)"></span>
                我的淘不锈
                <a class="phone"><span class="iconfont icon-kefu1"></span></a>
            </header>
            <div class="content">
                <img class="head-pic" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
                <div class="panel">
                    <h3>{{ userInfo }}</h3>
                    <p><span class="iconfont icon-zhongqingdianxinicon15"></span>{{ userInfo.mobile }}</p>
                </div>
                <span class="more iconfont icon-arrow-right"></span>
            </div>
        </section>

        

        <bottom-menu slot="bottom"></bottom-menu>

        <transition enter-active-class="animated fadeIn">
            <confirm v-model="confirmShow"
            show-input
            title="您还没有登录，是否前往登录？"
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
            </confirm>
        </transition>
    </view-box>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { ViewBox, Confirm } from 'vux'
    import bottomMenu from '@/components/business/bottomMenu'
    export default {
        components: {
            ViewBox,
            bottomMenu,
            Confirm
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
                    // 判断是否登录 
                    if(res.status === 0){
                        this.setUserInfo(res.data)
                    }else{
                        this.confirmShow = true
                    }
                }) 
            },
            onCancel(){
                this.$router.push({name:'index'})
            },
            onConfirm(){
                this.$router.push({name:'login'})
            }
        },
        data () {
            return {
                confirmShow: false,      
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
            position: relative;
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
                width: 2.3rem;
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
            .more{
                position: absolute;
                right: .1rem;;
                top: .3rem;
                color: #fff;
                font-size: .24rem;
            }
        }
    }
</style>
