import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 懒加载
const Dashboard = () => import('@/views/Dashboard')
const Navigation = () => import('@/views/Navigation')
const ResMonitoring = () => import('@/views/ResMonitoring')
const NavigationLink = () => import('@/views/NavigationLink')
export default new Router({
  // 设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置
  linkActiveClass: 'active',
  // 去掉路由中的#号
  // mode: 'history',
  routes: [
    {
      // 总览
      path: '/dashboard',
      component: Dashboard
    },
    {
      // 服务管理
      path: '/navigation',
      component: Navigation
    },
    {
      // 导航链接
      path: '/navigationLink',
      component: NavigationLink
    },
    {
      // 资源监控
      path: '/resmonitoring',
      component: ResMonitoring
    },
    {
      // 默认路由
      path: '/',
      redirect: '/dashboard'
    }
  ]
})
