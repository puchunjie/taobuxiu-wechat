<template>
    <tabbar>
      <tabbar-item v-for="(menu,index) in menus" :key="index" :link="{ name: menu.link}" :selected="menu.link === routerName">
        <span slot="icon" class="tab-icon iconfont" :class="menu.icon"></span>
        <span slot="label">{{ menu.title }}</span>
      </tabbar-item>
    </tabbar>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vux'
    export default {
        components: {
            Tabbar,
            TabbarItem
        },
        data () {
            return {
                menus:[
                    {title:"首页",link:"index",icon:"icon-shouye-page"},
                    {title:"现货",link:"goodsInStock",icon:"icon-dahuo"},
                    {title:"采购",link:"purchase",icon:"icon-gou"},
                    {title:"物流",link:"logistics",icon:"icon-wuliu"},
                    {title:"我",link:"",icon:"icon-iconfontwohover"}
                    ]
            }
        },
        computed: {
            routerName(){
                return this.$route.name
            }
        }
    }
</script>

<style lang="less">
    .tab-icon{
        font-size: .22rem
    }

    .weui-bar__item_on>* {
        color: #007de4!important;
    }
</style>
