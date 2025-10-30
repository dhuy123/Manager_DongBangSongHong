import { apiInstance } from "../api/api_config";

export const getAllImgHuyen = async () => {
    try {
        const response = await apiInstance.get('/img_huyen');
        console.log("Danh sách hình ảnh huyện:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all district images:", error);
        throw new Error("Lỗi khi lấy danh sách hình ảnh huyện");
    }
};

export const getImgHuyenByMaHuyen = async (ma_huyen) => {
    console.log("Lấy hình ảnh huyện theo ma_huyen:", ma_huyen);
    try {
        const response = await apiInstance.get(`/img_huyen/ma_huyen/${ma_huyen}`);
        console.log("Hình ảnh huyện tìm thấy:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching district image by ma_huyen:", error);
        throw new Error("Lỗi khi lấy thông tin hình ảnh huyện");
    }
};

export const getImgHuyenById = async (id) => {
    try {
        const response = await apiInstance.get(`/img_huyen/id/${id}`);
        console.log("Hình ảnh huyện tìm thấy:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching district image by ID:", error);
        throw new Error("Lỗi khi lấy thông tin hình ảnh huyện theo ID");
    }
};

export const createImgHuyen = async (data) => {
    try {
        const response = await apiInstance.post('/img_huyen', data);
        console.log("Thêm hình ảnh huyện thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating district image:", error);
        throw new Error("Lỗi khi thêm hình ảnh huyện");
    }
};

export const updateImgHuyen = async (id, data) => {
    try {
        const response = await apiInstance.put(`/img_huyen/${id}`, data);
        console.log("Cập nhật hình ảnh huyện thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating district image:", error);
        throw new Error("Lỗi khi cập nhật thông tin hình ảnh huyện");
    }
};

export const deleteImgHuyenAPI = async (id) => {
    try {
        const response = await apiInstance.delete(`/img_huyen/${id}`);
        console.log("Xoá hình ảnh huyện thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting district image:", error);
        throw new Error("Lỗi khi xoá thông tin hình ảnh huyện");
    }
};


