import { apiInstance } from "./api_config";

// export const getAllXa = async () => {
//     try {
//         const response = await apiInstance.get(`/xa`);
//         console.log("Danh sách xã:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("lỗi lấy dữ liệu xã ", error);
//     }
// }

export const getPaginatedXa = async (page = 1, limit = 20) => {
    console.log("đã vào api xã phân trang");
    try {
        const response = await apiInstance.get('/xa', {
            params: {
                page,
                limit
            }
        });
        console.log("Danh sách xã phân trang:", response.data);
        return response.data; 
    } catch (error) {
        console.error("lỗi lấy dữ liệu xã phân trang", error);
    }
}

// Lấy tất cả xã (không phân trang)
export const getAllXa = async () => {
    try {
        const response = await apiInstance.get('/xa/all');
        console.log('Danh sách xã (all):', response.data);
        return response.data;
    } catch (error) {
        console.error('lỗi lấy tất cả xã ', error);
        throw new Error('Lỗi khi lấy danh sách xã');
    }
}

// Lấy tất cả kết quả tìm kiếm (không phân trang)
export const searchXaAll = async (query) => {
    try {
        const response = await apiInstance.get('/xa/search/all', { params: { query } });
        console.log('Kết quả tìm kiếm xã (all):', response.data);
        return response.data;
    } catch (error) {
        console.error('lỗi tìm kiếm dữ liệu xã (all)', error);
        throw new Error('Lỗi khi lấy tất cả kết quả tìm kiếm xã');
    }
}

export const searchXa = async (query, page = 1, limit = 10) => {
    try {
        const response = await apiInstance.get('/xa/search', {
            params: {
                query,
                page,
                limit
            }
        });
        console.log("Kết quả tìm kiếm xã:", response.data);
        return response.data; 
    } catch (error) {
        console.error("lỗi tìm kiếm dữ liệu xã", error);
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
export const exportGeoJson = async (id) => {
    try {
        const response = await apiInstance.get(`/xa/export-geojson/${id}`,
            { responseType: 'blob' }
        );
console.log("Export GeoJSON response:", response.data);
        return response.data;
    } catch (error) {
        console.error("lỗi xuất GeoJSON xã", error);
    }
}