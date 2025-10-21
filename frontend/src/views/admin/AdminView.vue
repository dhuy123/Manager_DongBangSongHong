<template>
  <div class="admin-layout">
    <Header />
    <Sidebar />
    <main class="content">
      <h1>Trang Admin</h1>
      <p>Chào mừng Admin!</p>
    </main>
  </div>
</template>

<script setup>
import Header from '../../components/header/HeaderAdmin.vue';
import Sidebar from '../../components/sidebar/SidebarAdmin.vue';
</script>

<style>
.admin-layout {
  display: flex;
}

.content {
  flex-grow: 1;
  padding: 16px;
}
</style>
