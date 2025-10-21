<template>
  <div class="register-container">
    <div class="register-card">
      <h3 class="text-center mb-4">Đăng ký tài khoản</h3>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="ho_ten" class="form-label">Họ tên</label>
          <input type="text" id="ho_ten" class="form-control" v-model="form.ho_ten" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Giới tính</label>
          <select class="form-select" v-model="form.gioi_tinh" required>
            <option disabled value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="tai_khoan" class="form-label">Tài khoản</label>
          <input type="text" id="tai_khoan" class="form-control" v-model="form.tai_khoan" required />
        </div>

        <div class="mb-3">
          <label for="mat_khau" class="form-label">Mật khẩu</label>
          <input type="password" id="mat_khau" class="form-control" v-model="form.mat_khau" required />
        </div>

        <div class="mb-3">
          <label for="sdt" class="form-label">Số điện thoại</label>
          <input type="tel" id="sdt" class="form-control" v-model="form.sdt" required />
        </div>

        <button type="submit" class="btn btn-primary w-100">Đăng ký</button>

        <div v-if="message" class="alert alert-success mt-3 text-center">
          {{ message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createAccount } from '../utils/api/api_account'

const router = useRouter()

const form = ref({
  ho_ten: '',
  gioi_tinh: '',
  tai_khoan: '',
  mat_khau: '',
  sdt: '',
  role: 'user'
})

const message = ref('')

const submitForm = async () => {
  try {
    const result = await createAccount(form.value)
    message.value = `Tạo tài khoản thành công cho ${result.ho_ten || form.value.ho_ten}`

    setTimeout(() => {
      router.push('/login') // 👉 Chuyển đến trang đăng nhập sau 2 giây
    }, 2000)

    form.value = {
      ho_ten: '',
      gioi_tinh: '',
      tai_khoan: '',
      mat_khau: '',
      sdt: '',
      role: 'user'
    }
  } catch (error) {
    alert('Lỗi khi tạo tài khoản: ' + error.message)
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center;     /* Căn giữa theo chiều dọc */
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem; /* Thêm padding để tránh bị sát mép trên mobile */
  width: 1535px;
}

.register-card {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: auto; /* Đảm bảo căn giữa nếu flex chưa hoạt động */
}

</style>
