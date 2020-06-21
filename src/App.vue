<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  #app {
    @font-face {
      font-family: 'CorpAcon';
      src: url('assets/fonts/corporateacon-reg.eot');
      src: url('assets/fonts/corporateacon-reg.eot?#iefix') format('embedded-opentype'),
      url('assets/fonts/corporateacon-reg.woff') format('woff'),
      url('assets/fonts/corporateacon-reg.ttf') format('truetype'),
      url('assets/fonts/corporateacon-reg.svg#CorpAcon') format('svg');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'CorpS';
      src: url('assets/fonts/corporates-regular.eot');
      src: url('assets/fonts/corporates-regular.eot?#iefix') format('embedded-opentype'),
      url('assets/fonts/corporates-regular.woff') format('woff'),
      url('assets/fonts/corporates-regular.ttf') format('truetype'),
      url('assets/fonts/corporates-regular.svg#CorpS') format('svg');
      font-weight: normal;
      font-style: normal;
    }
    font-family: 'CorpS', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;

    [class*=" el-icon-"], [class^=el-icon-] {
      font-weight: 700;
      font-size: 16px !important;
    }
  }
</style>
