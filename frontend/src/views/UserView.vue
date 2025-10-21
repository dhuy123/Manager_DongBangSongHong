```vue
<!-- UserLayout.vue -->
<template>
    <div class="user-layout">
        <Header />
        <div class="main-content">
            <!-- Sidebar -->
            <aside class="sidebar">
                <div class="tab-container">
                    <button @click="activeTab = 'layers'" :class="{ 'active-tab': activeTab === 'layers' }">
                        Lớp dữ liệu
                    </button>
                    <button @click="activeTab = 'info'" :class="{ 'active-tab': activeTab === 'info' }">
                        Thuyết minh
                    </button>
                </div>


                <div class="tab-content">
                    <!-- Tab Layer -->
                    <div v-if="activeTab === 'layers'">
                        <div class="search-box">
                            <input v-model="searchQuery" placeholder="Nhập tên tỉnh/huyện/xã..."
                                @keyup.enter="handleSearch" />
                            <button @click="handleSearch">Tìm kiếm</button>
                        </div>
                        <h3>Quản lý Lớp</h3>

                        <div class="checkbox-container">
                            <label>
                                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                                Chọn tất cả
                            </label>
                            <label>
                                <input type="checkbox" v-model="layersVisibility.tinh" @change="toggleLayer('tinh')" />
                                Tỉnh
                            </label>
                            <label>
                                <input type="checkbox" v-model="layersVisibility.huyen"
                                    @change="toggleLayer('huyen')" />
                                Huyện
                            </label>
                            <label>
                                <input type="checkbox" v-model="layersVisibility.xa" @change="toggleLayer('xa')" />
                                Xã
                            </label>
                        </div>

                    </div>


                    <!-- Tab Info -->
                    <div v-if="activeTab === 'info'" class="info-box">
                        <h3>Thông tin chi tiết</h3>
                        <div v-if="featureInfo.length > 0">
                            <div v-for="(item, index) in featureInfo" :key="index">
                                <p><strong>Tên:</strong>
                                    {{ item.layer === 'tinh' ? item.properties.ten_tinh :
                                        item.layer === 'huyen' ? item.properties.ten_huyen :
                                            item.layer === 'xa' ? item.properties.ten_xa : 'Không rõ' }}
                                </p>

                                <p><strong>Mã:</strong>
                                    {{ item.layer === 'tinh' ? item.properties.ma_tinh :
                                        item.layer === 'huyen' ? item.properties.ma_huyen :
                                            item.layer === 'xa' ? item.properties.ma_xa : 'Không rõ' }}
                                </p>

                                <p><strong>Quốc gia:</strong> {{ item.properties.quoc_gia || 'Việt Nam' }}</p>
                                <p><strong>Cấp hành chính:</strong> {{ item.properties.cap_hanh_chinh || 'Chưa rõ' }}
                                </p>
                                <p><strong>Diện tích:</strong> {{ item.properties.dien_tich || 'Chưa rõ' }} km²</p>

                                <p><strong>Dân số:</strong>
                                    <span v-if="item.properties.dan_so">
                                        {{ item.properties.dan_so.toLocaleString() }} người
                                    </span>
                                    <span v-else>Chưa cập nhật</span>
                                </p>

                                <router-link :to="item.layer === 'tinh'
                                        ? `/detailTinh/${item.properties.id}`
                                        : item.layer === 'huyen'
                                            ? `/detailHuyen/${item.properties.id}`
                                            : '#'">
                                    Chi tiết
                                </router-link>

                                <hr />
                            </div>
                        </div>


                        <div v-else>
                            <h3>Vùng Đồng bằng Sông Hồng</h3>
                            <p>
                                Là trung tâm kinh tế lớn thứ hai của cả nước, với công nghiệp, dịch vụ, nông nghiệp phát
                                triển mạnh. Hà Nội và Hải Phòng là hai đầu tàu kinh tế của vùng.
                            </p>
                            <p>
                                <strong>Diện tích:</strong>
                                Khoảng <span>21.236 km²</span>.
                            </p>
                            <p>
                                <strong>Dân số:</strong>
                                Gần <span>22 triệu người</span> (tính đến năm 2024), chiếm khoảng 22% dân số cả nước.
                            </p>
                            <p>
                                <strong>Các tỉnh/thành:</strong>
                                Bao gồm 11 tỉnh/thành phố: Hà Nội, Vĩnh Phúc, Bắc Ninh, Hưng Yên, Hà Nam, Ninh Bình, Nam
                                Định,
                                Thái Bình, Hải Dương, Hải Phòng, Quảng Ninh.
                            </p>


                            <router-link to="/detail">Chi tiết</router-link>

                        </div>

                    </div>
                </div>
            </aside>

            <div class="map-container">
                <!-- Thẻ bản đồ -->
                <div ref="mapContainer" class="map"></div>

                <!-- Bộ chọn bản đồ nền -->
                <div class="basemap-selector">
                    <select v-model="selectedBasemap" @change="switchBasemap">
                        <option value="osm">OpenStreetMap</option>
                        <option value="satellite">Vệ tinh</option>
                        <option value="dark">Giao thông</option>
                    </select>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import Header from '../components/header/HeaderAdmin.vue';
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import axios from 'axios';
import { getGeoserver, getInfo } from '../utils/api/api_geoserverWMS';


const searchQuery = ref('');
const mapContainer = ref(null);
const featureInfo = ref([]); // Sử dụng mảng để lưu thông tin từ nhiều lớp
const activeTab = ref('layers'); // Điều khiển tab
let layers = {
    tinh: null,
    huyen: null,
    xa: null
};
const layersVisibility = ref({
    tinh: true,
    huyen: true,
    xa: true
});

const basemaps = {
    osm: new TileLayer({
        source: new OSM(),
        visible: true // Mặc định hiển thị
    }),
    satellite: new TileLayer({
        source: new XYZ({
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attributions: '© Esri'
        }),
        visible: false
    }),
    dark: new TileLayer({
        source: new XYZ({
            url: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            attributions: 'Map data: © OpenTopoMap, SRTM | © OpenStreetMap contributors'
        }),
        visible: false
    })
};

const selectedBasemap = ref('osm');

const selectAll = ref(true);
let map = null;

const switchBasemap = () => {
    Object.keys(basemaps).forEach(key => {
        basemaps[key].setVisible(key === selectedBasemap.value);
    });
};

// Hàm khởi tạo bản đồ
const MapGeoDistrict = async () => {
    try {
        console.log("Khởi tạo bản đồ...");
        if (!mapContainer.value) return;

        const isGeoServerAvailable = await getGeoserver();

        layers.tinh = new TileLayer({
            source: new TileWMS({
                url: '/geoserver/ne/wms',
                params: {
                    'LAYERS': 'ne:tinh',
                    'TILED': true,
                    'VERSION': '1.1.0',
                    'FORMAT': 'image/png'
                },
                serverType: 'geoserver',
                transition: 0
            }),
            visible: isGeoServerAvailable
        });

        layers.huyen = new TileLayer({
            source: new TileWMS({
                url: '/geoserver/ne/wms',
                params: {
                    'LAYERS': 'ne:huyen',
                    'TILED': true,
                    'VERSION': '1.1.0',
                    'FORMAT': 'image/png'
                },
                serverType: 'geoserver',
                transition: 0
            }),
            visible: isGeoServerAvailable
        });

        layers.xa = new TileLayer({
            source: new TileWMS({
                url: '/geoserver/ne/wms',
                params: {
                    'LAYERS': 'ne:xa',
                    'TILED': true,
                    'VERSION': '1.1.0',
                    'FORMAT': 'image/png'
                },
                serverType: 'geoserver',
                transition: 0
            }),
            visible: isGeoServerAvailable
        });

        map = new Map({
            target: mapContainer.value,
            layers: [
                // Bản đồ nền
                basemaps.osm,
                basemaps.satellite,
                basemaps.dark,

                // Lớp dữ liệu hành chính
                layers.tinh,
                layers.huyen,
                layers.xa
            ],
            view: new View({
                projection: 'EPSG:4326',
                center: [106.5, 20.8],
                zoom: 9
            })
        });


        map.on('singleclick', async (event) => {
            featureInfo.value = []; // Reset thông tin cũ
            const viewResolution = map.getView().getResolution();
            const coordinate = event.coordinate;

            // Xác định layer đang được hiển thị theo thứ tự ưu tiên (xa > huyen > tinh)
            let targetLayer = null;
            if (layers.xa && layers.xa.getVisible()) {
                targetLayer = { name: 'xa', layer: layers.xa };
            } else if (layers.huyen && layers.huyen.getVisible()) {
                targetLayer = { name: 'huyen', layer: layers.huyen };
            } else if (layers.tinh && layers.tinh.getVisible()) {
                targetLayer = { name: 'tinh', layer: layers.tinh };
            }

            if (targetLayer) {
                const wmsSource = targetLayer.layer.getSource();
                const url = wmsSource.getFeatureInfoUrl(
                    coordinate,
                    viewResolution,
                    'EPSG:4326',
                    {
                        'INFO_FORMAT': 'application/json',
                        'FEATURE_COUNT': 1
                    }
                );

                if (url) {
                    try {
                        const data = await getInfo(url);
                        console.log(`Dữ liệu từ ${targetLayer.name}:`, data);
                        if (data && !data.message && !data.error) {
                            featureInfo.value = [{
                                layer: targetLayer.name,
                                properties: data
                            }];
                            activeTab.value = 'info';
                        }
                    } catch (error) {
                        console.error('Lỗi khi lấy thông tin:', error);
                        featureInfo.value = [{
                            layer: "Lỗi",
                            properties: { message: "Không thể lấy thông tin" }
                        }];
                    }
                }
            } else {
                featureInfo.value = [{
                    layer: "Thông báo",
                    properties: { message: "Vui lòng chọn một lớp để xem thông tin" }
                }];
            }
        });

        console.log("Bản đồ đã khởi tạo thành công!");
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu GeoServer:", error);
    }
};

// Hàm bật/tắt lớp bản đồ
const toggleLayer = (layerName) => {
    if (layersVisibility.value[layerName]) {
        // Nếu checkbox được chọn, bật lớp
        layers[layerName].setVisible(true);
    } else {
        // Nếu checkbox không được chọn, tắt lớp
        layers[layerName].setVisible(false);
    }

    updateSelectAllStatus();
};

// Hàm khi checkbox "Chọn tất cả" thay đổi
const toggleSelectAll = () => {
    const newVisibility = selectAll.value;

    // Cập nhật trạng thái các lớp
    layersVisibility.value.tinh = newVisibility;
    layersVisibility.value.huyen = newVisibility;
    layersVisibility.value.xa = newVisibility;

    // Cập nhật lại trạng thái của các lớp bản đồ
    toggleLayer('tinh');
    toggleLayer('huyen');
    toggleLayer('xa');
};

const updateSelectAllStatus = () => {
    const allSelected = Object.values(layersVisibility.value).every(visibility => visibility === true);
    const allDeselected = Object.values(layersVisibility.value).every(visibility => visibility === false);

    // Nếu tất cả lớp được chọn, bật checkbox "Chọn tất cả"
    if (allSelected) {
        selectAll.value = true;
    }
    // Nếu tất cả lớp đều tắt, tắt checkbox "Chọn tất cả"
    else if (allDeselected) {
        selectAll.value = false;
    }
    // Nếu có lớp bật và có lớp tắt, giữ trạng thái của checkbox "Chọn tất cả"
    else {
        selectAll.value = false; // Có thể để mặc định là false, hoặc thực hiện một trạng thái nào đó khác.
    }
};

const getGeoserver1 = (options) => {
    return axios.get('/geoserver/ne/ows', options); // Không phải wms!
};

const handleSearch = async () => {
    if (!searchQuery.value) return;

    const layers = ['tinh', 'huyen', 'xa'];
    const format = new GeoJSON();

    for (const layer of layers) {
        try {
            const response = await getGeoserver1({
                params: {
                    service: 'WFS',
                    version: '1.0.0',
                    request: 'GetFeature',
                    typeName: `ne:${layer}`,
                    outputFormat: 'application/json',
                    CQL_FILTER: `ten_${layer} ILIKE '%${searchQuery.value}%'`
                }
            });

            console.log('GeoServer response:', response.data);

            if (!response.data || response.data.type !== 'FeatureCollection') {
                console.warn(`Dữ liệu không hợp lệ từ lớp ${layer}`);
                continue;
            }

            const features = format.readFeatures(response.data);
            console.log(`Tìm thấy ${features.length} kết quả trong lớp ${layer}`);

            if (features.length > 0) {
                const feature = features[0];
                const geometry = feature.getGeometry();

                if (!geometry) {
                    console.warn(`Không có geometry trong lớp ${layer}`);
                    continue;
                }

                const extent = geometry.getExtent();
                map.getView().fit(extent, { duration: 1000, padding: [30, 30, 30, 30] });

                featureInfo.value = [
                    {
                        layer,
                        properties: feature.getProperties()
                    }
                ];

                return;
            }
        } catch (error) {
            console.error(`Lỗi khi tìm trong lớp ${layer}:`, error);
        }
    }

    alert('Không tìm thấy kết quả phù hợp!');
};
onMounted(() => MapGeoDistrict());
</script>

<style scoped>
.user-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    /* Ensure full viewport width */
    overflow: hidden;
    /* Prevent scrollbars */
}

/* Main Content (Chứa Sidebar & Map) */
.main-content {
    display: flex;
    flex: 1;
    height: 90%;
    position: relative;
    /* width: 100%; */
}

.map {
    width: 100%;
    height: 100%;
}

/* Sidebar */
.sidebar {
    width: 300px;
    background: #f8f9fa;
    border-right: 1px solid #ddd;
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.tab-container {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    margin-top: 40px;
}

.checkbox-container {
    display: flex;
    flex-direction: column;
    /* Sắp xếp các checkbox theo chiều dọc */
    gap: 10px;
    /* Khoảng cách giữa các checkbox */
}

.checkbox-container label {
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
}

.checkbox-container input {
    margin-right: 8px;
    /* Khoảng cách giữa checkbox và nhãn */
}


.tab-container button {
    background: none;
    border: none;
    padding: 5px;
    font-size: 16px;
    cursor: pointer;
    position: relative;
    color: #333;
    outline: none;
}

.tab-container button.active-tab {
    font-weight: bold;
    color: #007bff;
    /* Màu chữ khi tab được chọn */
}

.tab-container button.active-tab::after {
    content: '';
    position: absolute;
    bottom: -5px;
    /* Khoảng cách từ dưới nút */
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #007bff;
    /* Màu gạch dưới */
}

.tab-content {
    margin-top: 10px;
}

/* Map container */
.map-container {
    flex: 1;
}

/* Info Box */
.info-box {
    background: white;
    padding: 10px;
    border: 1px solid #ddd;
    margin-top: 10px;
    max-height: 610px;
    overflow-y: auto;
    margin-left: 0 !important;
    margin-right: 0 !important;
    align-self: flex-start;
    text-align: left;
}


.layer-info {
    border-bottom: 1px solid #ddd;
}

.layer-info:last-child {
    border-bottom: none;
}

.info-box h3,
h4,
p {
    margin-bottom: 5px;
    margin: 0;
}

.search-box {
    display: flex;
    gap: 8px;
    margin: 10px 0;
}

.search-box input {
    flex: 1;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.search-box button {
    padding: 6px 12px;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.basemap-selector {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.95);
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    z-index: 10;
}
</style>