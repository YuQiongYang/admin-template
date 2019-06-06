<template>
  <div :class="classObj" class="app-wrapper">
    <header class="yin-header">
      <div class="header-container justify-center">
        <h1>XX平台</h1>
        <div class="operate">
          <ul>
            <li>
              <svg-icon icon-class="operate" />
              <span>操作手册</span>
            </li>
            <li>
              <svg-icon icon-class="setting" />
              <span>设置</span>
            </li>
            <li>
              <svg-icon icon-class="user" />
              <span>admin</span>
            </li>
          </ul>
          <ul class="div">
            <li @click="logout">
              <svg-icon icon-class="return" />
              <span>退出</span>
            </li>
          </ul>
        </div>
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
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
        .operate{
          display: flex;
          ul{
            display: flex;
            li{
              cursor: pointer;
              margin-right: 18px;
              svg{
                margin-right: 3px;
              }
            }
          }
          ul:nth-of-type(1)::after{
            content: '';
            border-right: 1px solid #ccc;
          }
          ul:nth-of-type(2){
            margin-left: 18px;
            li{
              margin-right: 0;
            }
          }
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
