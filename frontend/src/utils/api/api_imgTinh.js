import { apiInstance } from "../api/api_config";


export const getAllImgTinh = async () => {
    try {
        const response = await apiInstance.get('/img_tinh');
        console.log("Danh sách hình ảnh tỉnh:", response.data);
        return response.data; // Trả về danh sách tất cả hình ảnh tỉnh
    } catch (error) {
        console.error("Error fetching all province images:", error);
        throw new Error("Lỗi khi lấy danh sách hình ảnh tỉnh");
    }
}

export const getImgTinhByMaTinh = async (ma_tinh) => {
   
    try {
        const response = await apiInstance.get(`/img_tinh/ma_tinh/${ma_tinh}`);
        console.log(" ma_tinh:", ma_tinh);
        return response.data; // Trả về hình ảnh tỉnh nếu tìm thấy
    } catch (error) {
        console.error("Lỗi khi lấy thông tin hình ảnh tỉnh:", error);
        throw new Error("Lỗi khi lấy thông tin hình ảnh tỉnh");
    }
}

export const getImgTinhById = async (id) => {
    console.log("Lấy hình ảnh tỉnh theo ID:", id);
    try {
        const response = await apiInstance.get(`/img_tinh/id/${id}`);
        console.log("Hình ảnh tỉnh tìm thấy:", response.data);
        return response.data; // Trả về hình ảnh tỉnh nếu tìm thấy
    } catch (error) {
        console.error("Error fetching province image by ID:", error);
        throw new Error("Lỗi khi lấy thông tin hình ảnh tỉnh theo ID");
    }
}
export const createImgTinh = async (data) => {
    try {
        const response = await apiInstance.post('/img_tinh', data);
        console.log("Thêm hình ảnh tỉnh thành công:", response.data);
        return response.data; // Trả về hình ảnh tỉnh đã tạo
    } catch (error) {
        console.error("Error creating province image:", error);
        throw new Error("Lỗi khi thêm hình ảnh tỉnh");
    }
}

export const updateImgTinh = async (id, data) => {
    try {
        const response = await apiInstance.put(`/img_tinh/${id}`, data);
        console.log("Cập nhật hình ảnh tỉnh thành công:", response.data);
        return response.data; // Trả về hình ảnh tỉnh đã cập nhật
    } catch (error) {
        console.error("Error updating province image:", error);
        throw new Error("Lỗi khi cập nhật thông tin hình ảnh tỉnh");
    }
}

export const deleteImgTinhAPI = async (id) => {
    try {
        const response = await apiInstance.delete(`/img_tinh/${id}`);
        console.log("Xoá hình ảnh tỉnh thành công:", response.data);
        return response.data; // Trả về thông tin xoá thành công
    } catch (error) {
        console.error("Error deleting province image:", error);
        throw new Error("Lỗi khi xoá thông tin hình ảnh tỉnh");
    }
}
export const uploadImgTinh = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await apiInstance.post('/img_tinh/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Tải lên hình ảnh tỉnh thành công:", response.data);
        return response.data; // Trả về thông tin hình ảnh đã tải lên
    } catch (error) {
        console.error("Error uploading province image:", error);
        throw new Error("Lỗi khi tải lên hình ảnh tỉnh");
    }
}