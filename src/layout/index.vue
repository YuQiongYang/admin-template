<template>
  <div :class="classObj" class="app-wrapper">
    <header class="yin-header">
      <div class="header-container justify-center">
        <h1>XX平台</h1>
        <ul class="operate">
          <li>111</li>
        </ul>
      </div>
    </header>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <!-- <div :class="{'fixed-header':fixedHeader}"> -->
      <!-- <navbar /> -->
      <!-- </div> -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    // Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 1280px;
    margin: 0 auto;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    .yin-header{
      width: 100%;
      height: 60px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2019;
      background: #f2f7fb;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      .header-container{
        width: 1280px;
        margin: 0 auto;
        h1{
          font-size: 24px;
        }
      }
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
