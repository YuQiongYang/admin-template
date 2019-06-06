import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/overview',
    children: [{
      path: 'overview',
      name: 'Overview',
      component: () => import('@/views/overview/index'),
      meta: { title: '概览', icon: 'overview' }
    }]
  },

  {
    path: '/',
    component: Layout,
    children: [{
      path: 'lottery',
      name: 'Lottery',
      component: () => import('@/views/lottery/index'),
      meta: { title: '彩民管理', icon: 'users' }
    }]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'store',
        name: 'Store',
        component: () => import('@/views/store/index'),
        meta: { title: '店家管理', icon: 'store' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'ticket',
        name: 'ticket',
        component: () => import('@/views/ticket/index'),
        meta: {
          title: '兑换券管理',
          icon: 'cart'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: 'Feedback',
    children: [
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/feedback/index'),
        meta: {
          title: '反馈管理',
          icon: 'feedback'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: 'Report',
    children: [
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/report/index'),
        meta: {
          title: '报表管理',
          icon: 'wallet'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/permission/index'),
        meta: {
          title: '权限管理',
          icon: 'permission'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: 'Log',
    children: [
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/log/index'),
        meta: {
          title: '操作日志',
          icon: 'log'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
