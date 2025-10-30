import { apiInstance } from "../api/api_config";

// export const getAllAccount = async () => {
//     try {
//         const response = await apiInstance.get('/account');
//         console.log("Danh sách tài khoản:", response.data);
//         return response.data; // Trả về danh sách tất cả các tài khoản
//     } catch (error) {
//         console.error("Error fetching all accounts:", error);
//         throw new Error("Lỗi khi lấy danh sách tài khoản");
//     }
// }

export const getPaginatedAccount = async (page = 1, limit = 10) => {
    try {
        const response = await apiInstance.get('/account', {
            params: {
                _page: page,
                _limit: limit
            }
        });
        console.log("Danh sách tài khoản phân trang:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching paginated accounts:", error);
        throw new Error("Lỗi khi lấy danh sách tài khoản phân trang");
    }
}

export const searchAccount = async (query, page = 1, limit = 10) => {
    try {
        const response = await apiInstance.get('/account/search', {
            params: {
                q: query,
                _page: page,
                _limit: limit
            }
        });
        console.log("Kết quả tìm kiếm tài khoản:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error searching accounts:", error);
        throw new Error("Lỗi khi tìm kiếm tài khoản");
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

// Lấy tất cả tài khoản (không phân trang)
export const getAllAccount = async () => {
    console.log('Bắt đầu lấy tất cả tài khoản');
    try {
        const response = await apiInstance.get('/account/all');
        console.log('Danh sách tài khoản (all):', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all accounts:', error);
        throw new Error('Lỗi khi lấy danh sách tài khoản');
    }
}

// Lấy tất cả kết quả tìm kiếm (không phân trang)
export const searchAccountAll = async (query) => {
    try {
        const response = await apiInstance.get('/account/search/all', { params: { query } });
        console.log('Kết quả tìm kiếm tài khoản (all):', response.data);
        return response.data;
    } catch (error) {
        console.error('Error searching accounts (all):', error);
        throw new Error('Lỗi khi lấy tất cả kết quả tìm kiếm tài khoản');
    }
}