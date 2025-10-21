import { apiInstance } from "../api/api_config";

export const getAllImgHuyen = async () => {
    try {
        const response = await apiInstance.get('/imgHuyen');
        console.log("Danh sách hình ảnh huyện:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all district images:", error);
        throw new Error("Lỗi khi lấy danh sách hình ảnh huyện");
    }
};

export const getImgHuyenByMaHuyen = async (ma_huyen) => {
    try {
        const response = await apiInstance.get(`/imgHuyen/${ma_huyen}`);
        console.log("👉 Base URL API:", apiInstance.defaults.baseURL);
        console.log("Hình ảnh huyện tìm thấy:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching district image by ma_huyen:", error);
        throw new Error("Lỗi khi lấy thông tin hình ảnh huyện");
    }
};

export const getImgHuyenById = async (id) => {
    try {
        const response = await apiInstance.get(`/imgHuyen/id/${id}`);
        console.log("Hình ảnh huyện tìm thấy:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching district image by ID:", error);
        throw new Error("Lỗi khi lấy thông tin hình ảnh huyện theo ID");
    }
};

export const createImgHuyen = async (data) => {
    try {
        const response = await apiInstance.post('/imgHuyen', data);
        console.log("Thêm hình ảnh huyện thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating district image:", error);
        throw new Error("Lỗi khi thêm hình ảnh huyện");
    }
};

export const updateImgHuyen = async (id, data) => {
    try {
        const response = await apiInstance.put(`/imgHuyen/${id}`, data);
        console.log("Cập nhật hình ảnh huyện thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating district image:", error);
        throw new Error("Lỗi khi cập nhật thông tin hình ảnh huyện");
    }
};

export const deleteImgHuyenAPI = async (id) => {
    try {
        const response = await apiInstance.delete(`/imgHuyen/${id}`);
        console.log("Xoá hình ảnh huyện thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting district image:", error);
        throw new Error("Lỗi khi xoá thông tin hình ảnh huyện");
    }
};

export const uploadImgHuyen = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await apiInstance.post('/imgHuyen/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Tải lên hình ảnh huyện thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error uploading district image:", error);
        throw new Error("Lỗi khi tải lên hình ảnh huyện");
    }
};
