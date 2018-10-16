<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
  @import "~@/style/variables.scss";
  #monarch-content-fragment {
    margin: 0;
    padding: 0;
  }

  @import "~bootstrap/scss/bootstrap";
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  .wrapperforfooter {
    min-height: 100%;
    width: 100%;
    margin: ($navbar-height + 3) 0 2px 0;
    padding: 0;
  }

  .wrapperforfooter .container-fluid.monarch-container {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  [v-cloak] {
    display: none;
  }
</style>
