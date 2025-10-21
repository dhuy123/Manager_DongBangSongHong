import {apiInstance } from "./api_config";

export const getAllHuyen = async () => {
    try {
        const response = await apiInstance.get('/huyen');
        console.log("Danh sách huyện:", response.data);
        return response.data; // Trả về danh sách tất cả các huyện
    } catch (error) {
        console.error("Error fetching all districts:", error);
        throw new Error("Lỗi khi lấy danh sách huyện");
    }
}

export const getHuyenById = async (id) => {
    try {
        const response = await apiInstance.get(`/huyen/${id}`);
        console.log("Huyện tìm thấy:", response.data);
        return response.data; // Trả về huyện nếu tìm thấy
    } catch (error) {
        console.error("Error fetching district by ID:", error);
        throw new Error("Lỗi khi lấy thông tin huyện");
    }
}

export const updateHuyen = async (id, data) => {
    try {
        // Tạo bản sao và loại bỏ geom nếu có
        const payload = { ...data };
        delete payload.geom;  // 🛑 Xoá geometry

        const response = await apiInstance.put(`/huyen/${id}`, payload);
        console.log("Cập nhật huyện thành công:", response.data);
        return response.data; // Trả về huyện đã cập nhật
    } catch (error) {
        console.error("Error updating district:", error);
        throw new Error("Lỗi khi cập nhật thông tin huyện");
    }
}

export const deleteHuyenAPI = async (id) => {
    try {
        const response = await apiInstance.delete(`/huyen/${id}`);
        console.log("Xoá huyện thành công:", response.data);
        return response.data; // Trả về thông tin xoá thành công
    } catch (error) {
        console.error("Error deleting district:", error);
        throw new Error("Lỗi khi xoá thông tin huyện");
    }
}

    