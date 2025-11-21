import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   proxy: {
  //     '/geoserver': {
  //       target: 'http://localhost:8080',   
  //       changeOrigin: true,               
  //       rewrite: (path) => path.replace(/^\/geoserver/, '/geoserver'),
  //     },
  //   },
  // },

  server: {
    host: '0.0.0.0',  // Cho phép truy cập từ mạng khác / ngrok
    port: 5173,       // Port cố định
    strictPort: true, // Nếu port đang bận sẽ báo lỗi
    hmr: {
      protocol: 'ws',
      host: 'localhost', // hoặc thay bằng URL ngrok nếu muốn HMR hoạt động từ xa
    }
  }
})
