<template>
  <div class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="logo-container">
      <img src="../../assets/img/logo.jfif" alt="Logo" class="logo" />
      <span v-if="!isCollapsed">Quản lý hành chính</span>
    </div>

    <nav class="nav-menu">
      <router-link to="/admin/tinh" class="nav-item">
        <i class="fas fa-map"></i>
        <span v-if="!isCollapsed">Quản lý tỉnh</span>
      </router-link>

      <router-link to="/admin/huyen" class="nav-item">
        <i class="fas fa-map-marker-alt"></i>
        <span v-if="!isCollapsed">Quản lý huyện</span>
      </router-link>

      <router-link to="/admin/xa" class="nav-item">
        <i class="fas fa-map-pin"></i>
        <span v-if="!isCollapsed">Quản lý xã</span>
      </router-link>

      <router-link to="/admin/account" class="nav-item">
        <i class="fas fa-users"></i>
        <span v-if="!isCollapsed">Quản lý người dùng</span>
      </router-link>

      <!-- <router-link to="/admin/statistics" class="nav-item">
        <i class="fas fa-chart-bar"></i>
        <span v-if="!isCollapsed">Thống kê</span>
      </router-link> -->

    </nav>

    <div class="collapse-btn" @click="toggleSidebar">
      <i :class="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isCollapsed = ref(false)
const router = useRouter()

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}


</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  margin-top: 50px;
}

.sidebar-collapsed {
  width: 60px;
}

.logo-container {
  margin-top: 20px ;
  /* padding: 20px; */
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px ;
}

.logo {
  margin-left: 10px ;
  width: 40px;
  height: 40px;
}

.nav-menu {
  margin-top: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  gap: 10px;
  cursor: pointer;
}

.nav-item:hover {
  background-color: #34495e;
}

.nav-item i {
  width: 20px;
  text-align: center;
}

.collapse-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
}

.router-link-active {
  background-color: #34495e;
}
</style>