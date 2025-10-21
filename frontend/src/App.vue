<template>
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>

<style>
</style>
