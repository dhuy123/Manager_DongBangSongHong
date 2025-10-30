import { apiInstance } from "../api/api_config";

export const getAllTinh = async () => {
    try {
        // New backend route /tinh/all returns full list (no pagination)
        const response = await apiInstance.get('/tinh/all');
        console.log("Danh sách tỉnh (all):", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all provinces:", error);
        throw new Error("Lỗi khi lấy danh sách tỉnh");
    }
}

export const getPaginatedTinh= async (page = 1, limit = 10) => {
  try {
    const response = await apiInstance.get('/tinh', {
      params: { page, limit }, // Gửi query ?page=1&limit=10
    });

    console.log("Danh sách tỉnh:", response.data);
   console.log(response.data.totalRecords);

    // Giả sử API trả về dữ liệu dạng { data, total, page, limit }
    return response.data;
  } catch (error) {
    console.error("Error fetching all provinces:", error);
    throw new Error("Lỗi khi lấy danh sách tỉnh");
  }
};

export const getTinhById = async (id) => {
    try {
        const response = await apiInstance.get(`/tinh/${id}`);
        console.log("Tỉnh tìm thấy:", response.data);
         console.log("👉 Base URL API:", apiInstance.defaults.baseURL);
        return response.data; // Trả về tỉnh nếu tìm thấy
    } catch (error) {
        console.error("Error fetching province by ID:", error);
        throw new Error("Lỗi khi lấy thông tin tỉnh");
    }
}

export const updateTinh = async (id, data) => {
    try {
        // Tạo bản sao và loại bỏ geom nếu có
        const payload = { ...data };
        delete payload.geom;  // 🛑 Xoá geometry

        const response = await apiInstance.put(`/tinh/${id}`, payload);
        console.log("Cập nhật tỉnh thành công:", response.data);
         console.log("👉 Base URL API:", apiInstance.defaults.baseURL);
        return response.data; // Trả về tỉnh đã cập nhật
    } catch (error) {
        console.error("Error updating province:", error);
        throw new Error("Lỗi khi cập nhật thông tin tỉnh");
    }
}
export const deleteTinhAPI = async (id) => {
    try {
        const response = await apiInstance.delete(`/tinh/${id}`);
        console.log("Xoá tỉnh thành công:", response.data);
        return response.data; // Trả về thông tin xoá thành công
    } catch (error) {
        console.error("Error deleting province:", error);
        throw new Error("Lỗi khi xoá thông tin tỉnh");
    }
}

export const searchTinh = async (query, page = 1, limit = 10) => {
    try {
        const response = await apiInstance.get('/tinh/search', {
            params: { query, page, limit }, // Gửi query ?query=...&page=...&limit=...
        });
        console.log("Kết quả tìm kiếm tỉnh:", response.data);
         console.log("👉 Base URL API:", apiInstance.defaults.baseURL);
        return response.data; // Trả về kết quả tìm kiếm
    } catch (error) {
        console.error("Error searching provinces:", error);
        throw new Error("Lỗi khi tìm kiếm tỉnh");
    }
}

// Lấy tất cả kết quả tìm kiếm (không phân trang) để xuất CSV/PDF
export const searchTinhAll = async (query) => {
    try {
        const response = await apiInstance.get('/tinh/search/all', {
            params: { query }
        });
        console.log("Kết quả tìm kiếm tỉnh (all):", response.data);
        return response.data;
    } catch (error) {
        console.error("Error searching provinces (all):", error);
        throw new Error("Lỗi khi lấy tất cả kết quả tìm kiếm tỉnh");
    }
}

