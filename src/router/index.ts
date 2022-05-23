import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import StudentLogin from '../components/StudentLogin.vue'
import TeacherLogin from '../components/TeacherLogin.vue'
import AdminLogin from '../components/AdminLogin.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login-student',
    name: 'student-login',
    component: StudentLogin
  },
  {
    path: '/login-teacher',
    name: 'teacher-login',
    component: TeacherLogin
  },
  {
    path: '/login-admin',
    name: 'admin-login',
    component: AdminLogin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
