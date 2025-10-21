import { apiInstance } from "../api/api_config";

export const getAllAccount = async () => {
    try {
        const response = await apiInstance.get('/account');
        console.log("Danh sách tài khoản:", response.data);
        return response.data; // Trả về danh sách tất cả các tài khoản
    } catch (error) {
        console.error("Error fetching all accounts:", error);
        throw new Error("Lỗi khi lấy danh sách tài khoản");
    }
}

export const getAccountById = async (id) => {   
    try {
        const response = await apiInstance.get(`/account/${id}`);
        console.log("Tài khoản tìm thấy:", response.data);
        return response.data; // Trả về tài khoản nếu tìm thấy
    } catch (error) {
        console.error("Error fetching account by ID:", error);
        throw new Error("Lỗi khi lấy thông tin tài khoản");
    }
}

export const createAccount = async (data) => {
    try {
        console.log("Dữ liệu gửi lên:", data);
        const response = await apiInstance.post('/account', data);
        console.log("Tạo tài khoản thành công:", response.data);
        return response.data; // Trả về tài khoản mới tạo
    } catch (error) {
        console.error("Error creating account:", error);
        throw new Error("Lỗi khi tạo tài khoản");
    }
}

export const updateAccount = async (id, data) => {
    try {
        console.log("Dữ liệu gửi lên:", data);
        const response = await apiInstance.put(`/account/${id}`, data);
        console.log("Cập nhật tài khoản thành công:", response.data);
        return response.data; // Trả về tài khoản đã cập nhật
    } catch (error) {
        console.error("Error updating account:", error);
        throw new Error("Lỗi khi cập nhật thông tin tài khoản");
    }
}

export const deleteAccountAPI = async (id) => {
    try {
        const response = await apiInstance.delete(`/account/${id}`);
        console.log("Xoá tài khoản thành công:", response.data);
        return response.data; // Trả về thông tin xoá thành công
    } catch (error) {
        console.error("Error deleting account:", error);
        throw new Error("Lỗi khi xoá thông tin tài khoản");
    }
}