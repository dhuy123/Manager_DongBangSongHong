import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Admin from '../views/admin/AdminView.vue'
import TinhView from '../views/admin/TinhView.vue'
import ImgTinhView from '../views/admin/ImgTinhView.vue'
import ImgHuyenView from '../views/admin/huyen/ImgHuyenView.vue'
import HuyenView from '../views/admin/huyen/HuyenView.vue'
import XaView from '../views/admin/xa/XaView.vue'
import AccountView from '../views/admin/account/AccountView.vue'
import User from '../views/UserView.vue'
import Detail from '../views/DetailView.vue'
import DetailTinh from '../views/admin/DetailTinhView.vue'
import DetailHuyen from '../views/admin/huyen/DetailHuyenView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: User,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/admin/tinh',
      name: 'tinh',
      component: TinhView,
    },
  
    {
      path: '/admin/imgTinh/:ma_tinh',
      name: 'imgTinh',
      component: ImgTinhView,
    },
    {
      path: '/detailTinh/:id',
      name: 'detailTinh',
      component: DetailTinh,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/admin/huyen',
      name: 'huyen',
      component: HuyenView,
    },
    {
      path: '/detailHuyen/:id',
      name: 'detailHuyen',
      component: DetailHuyen,
    },
    {
      path: '/admin/imgHuyen/:ma_huyen',
      name: 'imgHuyen',
      component: ImgHuyenView,
    },
    {
      path: '/admin/xa',
      name: 'xa',
      component: XaView,
    },
    {
      path: '/admin/account',
      name: 'account',
      component: AccountView,
    },


  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const role = localStorage.getItem('role')

  const publicPages = ['user', 'login', 'register']

  // Nếu chưa đăng nhập
  if (!isAuthenticated) {
    // Cho truy cập vào các trang công khai
    if (publicPages.includes(to.name)) {
      return next()
    }
    // Chuyển về /user làm mặc định cho chưa đăng nhập
    return next({ name: 'user' })
  }

  // Nếu đã đăng nhập mà đang ở login → điều hướng theo role
  if (to.name === 'login') {
    if (role === 'admin') return next({ name: 'admin/tinh' })
    if (role === 'user') return next({ name: 'user' })
  }

  // Nếu user mà vào trang admin → không cho
  if (to.name?.startsWith('admin') && role !== 'admin/tinh') {
    return next({ name: 'user' })
  }

  return next()
})





export default router