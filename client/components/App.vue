<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <router-view></router-view>
  </div>
</template>
<script>

</script>
<style lang="scss">
    @import '../common/css/common.scss';
    //解决引入字体文件路径问题
    //放弃这种做法，以cdn引入
    // @font-face {font-family: "iconfont";
    //   src: url(../common/font/iconfont.eot); /* IE9*/
    //   src: url(../common/font/iconfont.eot#iefix) format('embedded-opentype'), /* IE6-IE8 */
    //   url(../common/font/iconfont.woff) format('woff'), /* chrome, firefox */
    //   url(../common/font/iconfont.ttf) format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    //   url(../common/font/iconfont.svg#iconfont) format('svg'); /* iOS 4.1- */
    // }

    // .iconfont {
    //   font-family:"iconfont" !important;
    //   font-size:16px;
    //   font-style:normal;
    //   -webkit-font-smoothing: antialiased;
    //   -moz-osx-font-smoothing: grayscale;
    // }

    // .icon-close:before { content: "\e614"; }

    // .icon-jian:before { content: "\e608"; }
</style>
