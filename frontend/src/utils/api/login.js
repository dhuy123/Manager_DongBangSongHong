import { apiInstance } from "./api_config";

export const login = async (tai_khoan, mat_khau) => {
  try {
    const response = await apiInstance.post('/login', {
      tai_khoan,
      mat_khau
    })
    // console.log("Đăng nhập thành công:", response.data);
    return response.data
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi đăng nhập'
  }
}