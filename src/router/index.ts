import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'

// Login Components
import StudentLogin from '../components/Login/StudentLogin.vue'
import TeacherLogin from '../components/Login/TeacherLogin.vue'
import AdminLogin from '../components/Login/AdminLogin.vue'

// Dashboard Components
import StudentDashboard from '../components/Dashboard/StudentDashboard.vue'
import TeacherDashboard from '../components/Dashboard/TeacherDashboard.vue'
import AdminDashboard from '../components/Dashboard/AdminDashboard.vue'

const routes: Array<RouteRecordRaw> = [
  // Default page
  {
    path: '/',
    name: 'home',
    component: Home
  },

  // Login Pages
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
  },

  // Dashboards
  {
    path: '/student-dashboard',
    name: 'student-dashboard',
    component: StudentDashboard
  },
  {
    path: '/teacher-dashboard',
    name: 'teacher-dashboard',
    component: TeacherDashboard
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
