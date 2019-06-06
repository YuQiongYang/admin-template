<template>
  <section :class="{'isOpen' : !sidebar.opened}" class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 60px);
  width: calc(100% - #{$sideBarWidth});
  position: relative;
  overflow: hidden;
  background: #f7f7f7;
  margin-left: $sideBarWidth;
  transition: all .28s;
}
.isOpen{
  width: calc(100% - 54px);
  margin-left: 54px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
