/**
  * 路由配置
  */

import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// 异步组件实现路由懒加载
// const Login = resolve => require(['../views/Login'], resolve)
// const Regist = resolve => require(['../views/Regist'], resolve)
// const NotFound = resolve => require(['../views/NotFound'], resolve)

// 组件按组分块
// const Home = r => require.ensure([], () => r(require('../views/Home')), 'group-main')
// const CampusManage = r => require.ensure([], () => r(require('../views/main/CampusManage')), 'group-main')
// const ClassroomManage = r => require.ensure([], () => r(require('../views/main/ClassroomManage')), 'group-main')
// const RoleManage = r => require.ensure([], () => r(require('../views/main/RoleManage')), 'group-main')
// const TeacherManage = r => require.ensure([], () => r(require('../views/main/TeacherManage')), 'group-main')

// Webpack 2 + ES2015 写法，可设置 Chunk 名
const Login = () => import(/* webpackChunkName: 'Login' */ '../views/Login')
const Regist = () => import(/* webpackChunkName: 'Regist' */ '../views/Regist')
const NotFound = () => import('../views/NotFound')

const Home = () => import(/* webpackChunkName: 'group-main' */ '../views/Home')
const CampusManage = () => import(/* webpackChunkName: 'group-main' */ '../views/main/CampusManage')
const ClassroomManage = () => import(/* webpackChunkName: 'group-main' */ '../views/main/ClassroomManage')
const RoleManage = () => import(/* webpackChunkName: 'group-main' */ '../views/main/RoleManage')
const TeacherManage = () => import(/* webpackChunkName: 'group-main' */ '../views/main/TeacherManage')

Vue.use(Router)

const router = new Router({
  mode: 'hash', // history
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/regist', name: 'regist', component: Regist },
    {
      path: '/main',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/campus-manage'
        },
        {
          path: 'campus-manage',
          name: 'campusmanage',
          alias: '/campus-manage',
          component: CampusManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'classroom-manage',
          name: 'classroommanage',
          alias: '/classroom-manage',
          component: ClassroomManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'role-manage',
          name: 'rolemanage',
          alias: '/role-manage',
          component: RoleManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'teacher-manage',
          name: 'teachermanage',
          alias: '/teacher-manage',
          component: TeacherManage,
          meta: { requiresAuth: true }
        }
      ]
    },
    { path: '/', redirect: '/campus-manage' },
    { path: '*', component: NotFound }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 路由钩子：每个路由开始前处理
router.beforeEach((to, from, next) => {
  // 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.hasLoggedIn) {
      store.dispatch('setPageProgress', 60)
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

// 路由钩子：每个路由结束后处理
router.afterEach(route => {
  // window.scrollTo(0, 0)
  store.dispatch('setPageProgress', 100)
})

export default router
