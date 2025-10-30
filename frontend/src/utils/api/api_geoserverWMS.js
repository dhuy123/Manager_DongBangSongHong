import axios from 'axios';

export const getGeoserver = async () => {
    try {
        const response = await axios.get('geoserver/ne/wms?service=WMS&request=GetCapabilities');
        console.log('Kết nối GeoServer thành công');
        return response.status === 200;
    } catch (error) {
        console.error('Lỗi kết nối GeoServer:', error);
        return false;
    }
};

export const getInfo= async (url) => {
    try {
        const response = await axios.get(url);
        if (response.data.features.length > 0) {
            //console.log("response", response.data.features[0].properties)
            return response.data.features[0].properties;
        }
        return { message: "Không có dữ liệu tại vị trí này." };
    } catch (error) {
        console.error("Lỗi khi lấy thông tin thuộc tính:", error);
        return { error: "Không thể lấy dữ liệu." };
    }
};

