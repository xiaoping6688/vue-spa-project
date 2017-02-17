/**
  * 路由配置
  */

import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// 异步组件实现路由懒加载
const Login = resolve => require(['../views/Login'], resolve)
const Regist = resolve => require(['../views/Regist'], resolve)
const NotFound = resolve => require(['../views/NotFound'], resolve)
// 组件按组分块
const Home = r => require.ensure([], () => r(require('../views/Home')), 'group-main')
const CampusManage = r => require.ensure([], () => r(require('../views/main/CampusManage')), 'group-main')
const ClassManage = r => require.ensure([], () => r(require('../views/main/ClassManage')), 'group-main')
const ClassroomManage = r => require.ensure([], () => r(require('../views/main/ClassroomManage')), 'group-main')
const ClassTypeManage = r => require.ensure([], () => r(require('../views/main/ClassTypeManage')), 'group-main')
const CourseManage = r => require.ensure([], () => r(require('../views/main/CourseManage')), 'group-main')
const PurchaseManage = r => require.ensure([], () => r(require('../views/main/PurchaseManage')), 'group-main')
const RoleManage = r => require.ensure([], () => r(require('../views/main/RoleManage')), 'group-main')
const StudentManage = r => require.ensure([], () => r(require('../views/main/StudentManage')), 'group-main')
const SubjectManage = r => require.ensure([], () => r(require('../views/main/SubjectManage')), 'group-main')
const TeacherManage = r => require.ensure([], () => r(require('../views/main/TeacherManage')), 'group-main')
const ScheduleManage = r => require.ensure([], () => r(require('../views/main/ScheduleManage')), 'group-main')

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
        },
        {
          path: 'classtype-manage',
          name: 'classtypemanage',
          alias: '/classtype-manage',
          component: ClassTypeManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'class-manage',
          name: 'classmanage',
          alias: '/class-manage',
          component: ClassManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'subject-manage',
          name: 'subjectmanage',
          alias: '/subject-manage',
          component: SubjectManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'course-manage',
          name: 'coursemanage',
          alias: '/course-manage',
          component: CourseManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'student-manage',
          name: 'studentmanage',
          alias: '/student-manage',
          component: StudentManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'purchase-manage',
          name: 'purchasemanage',
          alias: '/purchase-manage',
          component: PurchaseManage,
          meta: { requiresAuth: true }
        },
        {
          path: 'schedule-manage',
          name: 'schedulemanage',
          alias: '/schedule-manage',
          component: ScheduleManage,
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
