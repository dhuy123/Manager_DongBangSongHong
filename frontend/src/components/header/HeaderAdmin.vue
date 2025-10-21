<template>
  <header>
    <div class="header-content">
      <h1>Hệ thông tin địa lý Đồng bằng sông Hồng</h1>
      <div class="user-controls">
        <span class="username">{{ ho_ten }}</span>
        <button class="logout-btn" @click="isAuthenticated ? handleLogout() : handleLogin()">
          {{ isAuthenticated ? 'Đăng xuất' : 'Đăng nhập' }}
        </button>
        <button v-if="!isAuthenticated" class="register-btn" @click="handleRegister">
          Đăng ký
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ho_ten = ref('')
const isAuthenticated = ref(false)

onMounted(() => {
  ho_ten.value = localStorage.getItem('ho_ten') || ''
  console.log('ho_ten:', ho_ten.value)
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
})

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('role')
  localStorage.removeItem('ho_ten')
  isAuthenticated.value = false
  ho_ten.value = ''
  router.push({ name: 'user' }).then(() => {
    window.location.reload()
  })
}

const handleLogin = () => {
  router.push({ name: 'login' })
}

// const handleRegister = () => {
//   router.push({ name: 'register' }) // 👉 Chuyển tới trang đăng ký
// }

</script>


<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1200px; */
  margin: 0 auto;
}

h1 {
  padding-left: 20px;
  margin: 0;
  font-size: 20px;
}

.user-controls {
  display: flex;
  margin-right: 20px;
}

.user-controls span {

  margin-right: 10px;
}

.username {
  display: flex;
  font-weight: 500;
  color: #333;
  justify-content: space-between;
  align-items: center;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #c82333;
}

.register-btn {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.register-btn:hover {
  background-color: rgb(0, 115, 255);
}
</style>