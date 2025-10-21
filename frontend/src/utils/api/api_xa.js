import { apiInstance } from "./api_config";

export const getAllXa = async () => {
    try {
        const response = await apiInstance.get(`/xa`);
        console.log("Danh sách xã:", response.data);
        return response.data;
    } catch (error) {
        console.error("lỗi lấy dữ liệu xã ", error);
    }
}

export const getXaById = async (id) => {
    try {
        const response = await apiInstance.get(`/xa/${id}`)
        return response.data;

    } catch (error) {
        console.error(" lỗi lấy thông tin xã", error);
    }
}

export const updateXa = async (id, data) => {
    try {
        const payload = { ...data };
        delete payload.geom; 
        const response = await apiInstance.put (`/xa/${id}`,payload)
        return response.data;
    } catch (error) {
        console.error(" lỗi cập nhật thông tin xã ", error)
    }
}

export const deleteXaAPI = async(id) => {
    try {
        const response = await apiInstance.delete(`/xa/${id}`);
        return response.data;
    } catch(error){
        console.error("lỗi xóa thông tin xã",error);
    }
}
