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
      let _this = this;
      this.resizeWindow();
      window.onresize = function() {
        console.log(1)
          _this.resizeWindow();
      };
      // 设置微信分享
      this.getWXinfo()
    },
    methods: {
      resizeWindow(){
        let wid = document.documentElement.clientWidth;
        wid = wid > 640 ? 640 : wid;
        let fz = wid / 3.75
        document.getElementsByTagName("html")[0].style.fontSize = fz + "px";
      }
    }
  }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';

    body,html {
      background-color: #efeff4;
      height: 100%;
      max-width: 640px;
      margin: 0 auto;
    }

    #app{
      width: 100%;
      height: 100%;
    }
</style>
