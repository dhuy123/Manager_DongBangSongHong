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
              <input v-model="searchQuery" placeholder="Nhập tên tỉnh/huyện/xã..." @keyup.enter="handleSearch" />
              <button @click="handleSearch">Tìm kiếm</button>
            </div>
            <h3>Quản lý Lớp</h3>

            <div class="checkbox-container">
              <label>
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                Chọn tất cả
              </label>
              <label class="layer-row">
                <input type="checkbox" v-model="layersVisibility.tinh" @change="toggleLayer('tinh')" />
                Tỉnh
                <input type="range" class="opacity-range" v-model.number="layersOpacity.tinh" min="0" max="1"
                  step="0.01" @input="onOpacityChange('tinh', layersOpacity.tinh)" />
                <span>{{ layersOpacity.tinh }}</span>
              </label>
              <label class="layer-row">
                <input type="checkbox" v-model="layersVisibility.huyen" @change="toggleLayer('huyen')" />
                Huyện
                <input type="range" class="opacity-range" v-model.number="layersOpacity.huyen" min="0" max="1"
                  step="0.01" @input="onOpacityChange('huyen', layersOpacity.huyen)" />
                <span>{{ layersOpacity.huyen }}</span>
              </label>
              <label class="layer-row">
                <input type="checkbox" v-model="layersVisibility.xa" @change="toggleLayer('xa')" />
                Xã
                <input type="range" class="opacity-range" v-model.number="layersOpacity.xa" min="0" max="1" step="0.01"
                  @input="onOpacityChange('xa', layersOpacity.xa)" />
                <span>{{ layersOpacity.xa }}</span>
              </label>
              <label class="layer-row">
                <input type="checkbox" v-model="layersVisibility.dan_so_tinh" @change="toggleLayer('dan_so_tinh')" />
                Dân số của tỉnh
                <input type="range" class="opacity-range" v-model.number="layersOpacity.dan_so_tinh" min="0" max="1"
                  step="0.01" @input="onOpacityChange('dan_so_tinh', layersOpacity.dan_so_tinh)" />
                <span>{{ layersOpacity.dan_so_tinh }}</span>
              </label>
              <label class="layer-row">
                <input type="checkbox" v-model="layersVisibility.dan_so_huyen" @change="toggleLayer('dan_so_huyen')" />
                Dân số của huyện
                <input type="range" class="opacity-range" v-model.number="layersOpacity.dan_so_huyen" min="0" max="1"
                  step="0.01" @input="onOpacityChange('dan_so_huyen', layersOpacity.dan_so_huyen)" />
                <span>{{ layersOpacity.dan_so_huyen }}</span>
              </label>
              <label class="layer-row">
                <input type="checkbox" v-model="layersVisibility.dan_so_xa" @change="toggleLayer('dan_so_xa')" />
                Dân số của xã
                <input type="range" class="opacity-range" v-model.number="layersOpacity.dan_so_xa" min="0" max="1"
                  step="0.01" @input="onOpacityChange('dan_so_xa', layersOpacity.dan_so_xa)" />
                <span>{{ layersOpacity.dan_so_xa }}</span>
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
                      item.layer === 'xa' ? item.properties.ten_xa :
                        item.layer === 'dan_so_tinh' ? item.properties.ten_tinh :
                          item.layer === 'dan_so_huyen' ? item.properties.ten_huyen :
                            item.layer === 'dan_so_xa' ? item.properties.ten_xa : 'Không rõ' }}
                </p>

                <p><strong>Mã:</strong>
                  {{ item.layer === 'tinh' ? item.properties.ma_tinh :
                    item.layer === 'huyen' ? item.properties.ma_huyen :
                      item.layer === 'xa' ? item.properties.ma_xa :
                        item.layer === 'dan_so_tinh' ? item.properties.ma_tinh :
                          item.layer === 'dan_so_huyen' ? item.properties.ma_huyen :
                            item.layer === 'dan_so_xa' ? item.properties.ma_xa : 'Không rõ' }}
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

                <router-link :to="item.layer === 'tinh' || item.layer === 'dan_so_tinh'
                  ? `/detailTinh/${item.properties.id}`
                  : item.layer === 'huyen' || item.layer === 'dan_so_huyen'
                    ? `/detailHuyen/${item.properties.id}`
                    : item.layer === 'xa' || item.layer === 'dan_so_xa'
                      ? `/detailXa/${item.properties.id}`
                      : '/'">
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
        <div id="map" class="map"></div>
        <div v-if="layersVisibility.dan_so_tinh" class="basemap-selector"
          style="top: 60px; right: 20px; height: 140px;">
          <h6>Chú giải</h6>
          <img
            src="http://localhost:8080/geoserver/ne/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=ne:dan_so_tinh"
            alt="Legend View Tỉnh" />
        </div>
        <div v-if="layersVisibility.dan_so_huyen" class="basemap-selector"
          style="top: 60px; right: 20px; height: 140px;">
          <h6>Chú giải</h6>
          <img
            src="http://localhost:8080/geoserver/ne/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=ne:dan_so_huyen"
            alt="Legend View Huyện" />
        </div>
        <div v-if="layersVisibility.dan_so_xa" class="basemap-selector" style="top: 60px; right: 20px; height: 140px;">
          <h6>Chú giải</h6>
          <img src="http://localhost:8080/geoserver/ne/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=ne:dan_so_xa"
            alt="Legend View Xã" />
        </div>

        <!-- Bộ chọn bản đồ nền -->
        <div class="basemap-selector">
          <select v-model="selectedBasemap" @change="switchBasemap">
            <option value="googleMap">GoogleMap</option>
            <option value="googleSatellite">Vệ tinh</option>
            <option value="google">Địa hình</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import Header from '../components/header/HeaderAdmin.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import ScaleLine from 'ol/control/ScaleLine';
import Rotate from 'ol/control/Rotate';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import axios from 'axios';
import { getGeoserver, getInfo } from '../utils/api/api_geoserverWMS';

const searchQuery = ref('');
// ?const mapContainer = ref(null);
const featureInfo = ref([]);
const activeTab = ref('layers');
const route = useRoute();
const router = useRouter();

let map = null;
let layers = { tinh: null, huyen: null, xa: null, dan_so_tinh: null, dan_so_huyen: null, dan_so_xa: null };

const layersVisibility = ref({
  tinh: true,
  huyen: false,
  xa: false,
  dan_so_tinh: false,
  dan_so_huyen: false,
  dan_so_xa: false
});

// Opacity values (0 = transparent, 1 = opaque)
const layersOpacity = ref({
  tinh: 1,
  huyen: 1,
  xa: 1,
  dan_so_tinh: 1,
  dan_so_huyen: 1,
  dan_so_xa: 1
});

const selectAll = ref(false);
const selectedBasemap = ref('googleMap');
const basemaps = {
  googleMap: new TileLayer({
    source: new XYZ({
      url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', // lyrs=r: roadmap
      attributions: 'Map data ©2025 Google',
      maxZoom: 20
    }),
    visible: true
  }),
  googleSatellite: new TileLayer({
    source: new XYZ({
      url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', // lyrs=s: satellite
      attributions: 'Map data ©2025 Google',
      maxZoom: 20
    }),
    visible: false
  }),
  google: new TileLayer({
    source: new XYZ({
      url: 'https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}', // lyrs=t: hybrid
      attributions: 'Map data ©2025 Google',
      maxZoom: 20
    }),
    visible: false
  }),
};

// Hàm đổi basemap
const switchBasemap = () => {
  Object.keys(basemaps).forEach(k => basemaps[k].setVisible(k === selectedBasemap.value));
};

//  Hàm khởi tạo bản đồ
const initMap = async () => {
  const makeLayer = (name) =>
    new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/ne/wms',
        params: {
          LAYERS: `ne:${name}`,
          TILED: true,
          VERSION: '1.1.0',
          FORMAT: 'image/png'
        },
        serverType: 'geoserver'
      }),
      visible: layersVisibility.value[name]
    });

  layers.tinh = makeLayer('tinh');
  layers.huyen = makeLayer('huyen');
  layers.xa = makeLayer('xa');
  layers.dan_so_tinh = makeLayer('dan_so_tinh');
  layers.dan_so_huyen = makeLayer('dan_so_huyen');
  layers.dan_so_xa = makeLayer('dan_so_xa');

  Object.keys(layersOpacity.value).forEach((k) => {
    if (layers[k]) layers[k].setOpacity(layersOpacity.value[k]);
  });

  //  Tạo map
  map = new Map({
    target: 'map',
    layers: [
      basemaps.googleMap,
      basemaps.googleSatellite,
      //basemaps.mapbox,
      basemaps.google,
      layers.tinh,
      layers.huyen,
      layers.xa,
      layers.dan_so_tinh,
      layers.dan_so_huyen,
      layers.dan_so_xa,
    ],
    view: new View({
      projection: 'EPSG:4326',
      center: [106.3, 20.8],
      zoom: 8
    }),
    controls: [
     
      new ScaleLine({
        units: 'metric',
        bar: true,
        text: true,
        minWidth: 100,
      }),
      //new Rotate()
    ]
  });

  //  Sự kiện click xem thông tin
  map.on('singleclick', async (evt) => {
    featureInfo.value = [];
    const resolution = map.getView().getResolution();
    const coordinate = evt.coordinate;

    const order = ['xa', 'huyen', 'tinh', 'dan_so_xa', 'dan_so_huyen', 'dan_so_tinh'];
    for (const name of order) {
      if (layers[name]?.getVisible()) {
        const src = layers[name].getSource();
        const url = src.getFeatureInfoUrl(coordinate, resolution, 'EPSG:4326', {
          INFO_FORMAT: 'application/json',
          FEATURE_COUNT: 1
        });

        if (!url) continue;

        try {
          const data = await getInfo(url);
          console.log("data", data);

          //  Nếu là dạng chuẩn của GeoServer
          if (data?.features?.length) {
            featureInfo.value = [{
              layer: name,
              properties: data.features[0].properties
            }];
          }
          //  Nếu là object phẳng như bạn log ra (id, ten_tinh, ma_tinh, ...)
          else if (data?.id || data?.ten_tinh || data?.ten_huyen || data?.ten_xa) {
            featureInfo.value = [{
              layer: name,
              properties: data
            }];
          }

          // Nếu có dữ liệu → chuyển sang tab info
          if (featureInfo.value.length > 0) {
            console.log(" featureInfo:", featureInfo.value);
            activeTab.value = 'info';
            return;
          }
        } catch (e) {
          console.error(`Lỗi lấy thông tin lớp ${name}:`, e);
        }

      }
    }
  });
};

const onOpacityChange = (name, value) => {
  const v = Number(value);
  layersOpacity.value[name] = v;
  if (layers[name]) {
    layers[name].setOpacity(v);
  }
};

watch(
  layersOpacity,
  (newVal) => {
    Object.keys(newVal).forEach((k) => {
      if (layers[k]) layers[k].setOpacity(newVal[k]);
    });
  },
  { deep: true }
);

const toggleLayer = (name) => {
  layers[name].setVisible(layersVisibility.value[name]);
  updateSelectAllStatus();
};

const toggleSelectAll = () => {
  const state = selectAll.value;
  Object.keys(layersVisibility.value).forEach(k => {
    layersVisibility.value[k] = state;
    layers[k].setVisible(state);
  });
};

const updateSelectAllStatus = () => {
  const values = Object.values(layersVisibility.value);
  selectAll.value = values.every(v => v);
};

//  Tìm kiếm tỉnh/huyện/xã theo tên
const getGeoserver1 = (opt) => axios.get('http://localhost:8080/geoserver/ne/ows', opt);

const handleSearch = async () => {
  if (!searchQuery.value) return;
  const format = new GeoJSON();

  for (const layer of ['tinh', 'huyen', 'xa', 'dan_so_tinh', 'dan_so_huyen', 'dan_so_xa']) {
    try {
      const res = await getGeoserver1({
        params: {
          service: 'WFS',
          version: '1.0.0',
          request: 'GetFeature',
          typeName: `ne:${layer}`,
          outputFormat: 'application/json',
          CQL_FILTER: `ten_${layer} ILIKE '%${searchQuery.value}%'`
        }
      });

      const data = res.data;
      if (!data?.features?.length) continue;

      const feature = format.readFeature(data.features[0]);
      const geom = feature.getGeometry();
      const extent = geom.getExtent();
      map.getView().fit(extent, { duration: 1000, padding: [40, 40, 40, 40] });

      featureInfo.value = [{ layer, properties: feature.getProperties() }];
      activeTab.value = 'info';
      return;
    } catch (e) {
      console.error(`Lỗi khi tìm trong lớp ${layer}:`, e);
    }
  }

  alert('Không tìm thấy kết quả phù hợp!');
};

onMounted(initMap);
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

.map-container {
  flex: 1;
  height: 100%;
  position: relative;
}


.map {
  width: 100%;
  height:100%;
 
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

.layer-row {
  display: flex;
  align-items: center;
  /* gap: 8px; */
}

.layer-row span {
  width: 15px;
}

.opacity-range {
  width: 100px;
  margin-left: auto;
}



</style>