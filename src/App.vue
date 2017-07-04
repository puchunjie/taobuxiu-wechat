<template>
  <div id="app">
    <transition enter-active-class="animated fadeIn">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
 
  import wxShare from '@/components/basics/wechatShare'
  export default {
    name: 'app',
    mixins: [ wxShare ],
    created () {
      let wid = document.documentElement.clientWidth;
      var fz = wid / 3.75
      document.getElementsByTagName("html")[0].style.fontSize = fz + "px";
      // 设置微信分享
      this.getWXinfo()
    }
  }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';

    body,html {
      background-color: #efeff4;
      height: 100%;
    }

    #app{
      width: 100%;
      height: 100%;
    }
</style>
