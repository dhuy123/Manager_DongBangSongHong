import {apiInstance } from "./api_config";

// export const getAllHuyen = async () => {
//     try {
//         const response = await apiInstance.get('/huyen');
//         console.log("Danh sách huyện:", response.data);
//         return response.data; // Trả về danh sách tất cả các huyện
//     } catch (error) {
//         console.error("Error fetching all districts:", error);
//         throw new Error("Lỗi khi lấy danh sách huyện");
//     }
// }

export const getPaginatedHuyen = async (page = 1, limit = 10) => {
    try {
        const response = await apiInstance.get('/huyen', {
            params: {
                page,
                limit
            }
        });
        console.log("Danh sách huyện phân trang:", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error fetching paginated districts:", error);
        throw new Error("Lỗi khi lấy danh sách huyện phân trang");
    }
}

// Lấy tất cả huyện (không phân trang) để xuất
export const getAllHuyen = async () => {
    try {
        const response = await apiInstance.get('/huyen/all');
        console.log("Danh sách huyện (all):", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all districts:", error);
        throw new Error("Lỗi khi lấy danh sách huyện");
    }
}

// Lấy tất cả kết quả tìm kiếm (không phân trang)
export const searchHuyenAll = async (query) => {
    try {
        const response = await apiInstance.get('/huyen/search/all', { params: { query } });
        console.log("Kết quả tìm kiếm huyện (all):", response.data);
        return response.data;
    } catch (error) {
        console.error("Error searching districts (all):", error);
        throw new Error("Lỗi khi lấy tất cả kết quả tìm kiếm huyện");
    }
}

export const searchHuyen = async (query, page = 1, limit = 10) => {
    try {
        const response = await apiInstance.get('/huyen/search', {
            params: {
                query,
                page,
                limit
            }
        });
        console.log("Kết quả tìm kiếm huyện:", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error searching districts:", error);
        throw new Error("Lỗi khi tìm kiếm huyện");
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
        delete payload.geom; 

        const response = await apiInstance.patch(`/huyen/${id}`, payload);
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
};

export const exportGeoJson = async (id) => {
    try {
        console.log("Xuất GeoJSON huyện với ID (api):", id);
        const response = await apiInstance.get(`/huyen/export-geojson/${id}`,{
            responseType: 'blob' // Đặt responseType là 'blob' để nhận file
        });
        console.log("GeoJSON huyện nhận được:", response.data);
        return response.data; // Trả về GeoJSON
    }
    catch (error) {
        console.error("Error exporting district GeoJSON:", error);
        throw new Error("Lỗi khi xuất GeoJSON huyện");
    }
};

    