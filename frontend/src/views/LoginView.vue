<template>
  <div class="login-wrapper">
    <div class="login-page">
      <h2>Đăng nhập</h2>
      <input v-model="tai_khoan" placeholder="Tài khoản" />
      <input v-model="mat_khau" type="password" placeholder="Mật khẩu" />
      <button @click="handleLogin">Đăng nhập</button>

      <p class="register-text text-center mt-3">
        Chưa có tài khoản?
        <a href="/register">Đăng ký</a>
      </p>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { login } from '../utils/api/login'
import { useRouter } from 'vue-router'

const tai_khoan = ref('')
const mat_khau = ref('')
const router = useRouter()
const error = ref('')

const handleLogin = async () => {
  try {
    console.log('Đang đăng nhập với:', tai_khoan.value, mat_khau.value)
    const result = await login(tai_khoan.value, mat_khau.value)
    if (!result || !result.user.role) {
      throw new Error('Không nhận được thông tin người dùng')
    }

    sessionStorage.setItem('isAuthenticated', 'true')
    sessionStorage.setItem('role', result.user.role)
    sessionStorage.setItem('ho_ten', result.user.ho_ten)

    if (result.user.role === 'admin') {
      await router.push('/admin/tinh')
    } else {
      await router.push('/')
    }
  } catch (err) {
    console.error('Lỗi đăng nhập:', err)
    error.value = err.message || 'Lỗi đăng nhập'
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  /* căn giữa theo chiều ngang */
  align-items: center;
  /* căn giữa theo chiều dọc */
  min-height: 100vh;
  /* chiếm toàn bộ chiều cao trình duyệt */
  background-color: #f2f2f2;
  /* nền sáng nhẹ */
  width: 1530px;
}

.login-page {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.login-page h2 {
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
}

.login-page input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

.login-page input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.login-page button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-page button:hover {
  background-color: #2980b9;
}

.register-text {
  margin-top: 16px;
  font-size: 14px;
}

.register-text a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.register-text a:hover {
  text-decoration: underline;
}
</style>
