```vue
<!-- UserLayout.vue -->
<template>
    <div class="user-layout">
        <Header />
        <div class="main-content">
            <!-- Sidebar -->
            <aside class="sidebar">
                <div class="tab-container">
                    <button @click="goToUserTab()" :class="{ 'active-tab': activeTab === 'layers' }">
                        Lớp dữ liệu
                    </button>
                    <button @click="activeTab = 'info'" :class="{ 'active-tab': activeTab === 'info' }">
                        Thuyết minh
                    </button>
                </div>


                <div class="tab-content">
                    <!-- Tab Layer -->
                    <div v-if="activeTab === 'layers'">
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
                        <div v-if="featureInfo">
                            <p><strong>Tên huyện:</strong> {{ featureInfo.ten_huyen }}</p>
                            <p><strong>Mã huyện:</strong> {{ featureInfo.ma_huyen }}</p>
                            <p><strong>Tỉnh/Quốc gia:</strong> {{featureInfo.ten_tinh}}/{{ featureInfo.quoc_gia || 'Việt Nam'}} </p>
                            <p><strong>Cấp hành chính:</strong> {{ featureInfo.cap_hanh_chinh }}</p>
                            <p><strong>Diện tích:</strong> {{ featureInfo.dien_tich }} km²</p>
                            <p>
                                <strong>Dân số:</strong>
                                <span v-if="featureInfo.dan_so">{{ featureInfo.dan_so.toLocaleString() }} người</span>
                                <span v-else>Chưa cập nhật</span>
                            </p>
                             <p>
                                <a v-if="featureInfo.id" :href="geoJsonUrl"
                                    @click.prevent="downloadGeoJson(featureInfo.id)" download>
                                    Tải GeoJSON
                                </a>
                                <span v-else>Chưa có</span>
                            </p>
                        </div>



                    </div>
                </div>
            </aside>

            <!-- Nội dung bản đồ -->
            <div class="main-content1 ">
                <div class="header-main">
                    <router-link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </router-link>
                </div>

                <div class="content">
                    <h2><strong>Giới thiệu chi tiết:</strong></h2>
                    <div v-if="featureInfo && featureInfo.mo_ta" class="mo-ta"
                        v-html="featureInfo.mo_ta.replace(/\n/g, '<br>')"></div>

                    <p><strong>Hình ảnh:</strong></p>
                                       <div class="image-gallery">
                        <div class="image-item" v-for="(img, idx) in featureInfo?.hinh_anh_huyen" :key="idx">
                            <img :src="img.duong_dan" :alt="img.mo_ta || 'Ảnh huyện'" style="cursor:pointer;"
                                 @click="openImgModal(img.duong_dan)" />
                            <p class="image-caption">{{ img.mo_ta }}</p>
                        </div>
                        <div v-if="!featureInfo?.hinh_anh_huyen || featureInfo.hinh_anh_huyen.length === 0">
                            <em>Chưa có hình ảnh</em>
                        </div>
                    </div>
                    
                    <!-- Modal xem ảnh lớn -->
                    <div v-if="showImgModal" class="img-modal" @click.self="closeImgModal">
                        <img :src="selectedImg" style="max-width:90vw;max-height:90vh;display:block;margin:auto;" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import Header from '../../../components/header/HeaderAdmin.vue';
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute();

import {  getHuyenById, exportGeoJson } from '../../../utils/api/api_huyen';

const showImgModal = ref(false);
const selectedImg = ref('');

const geoJsonUrl = ref('');
const mapContainer = ref(null);
const featureInfo = ref(null); // Sử dụng mảng để lưu thông tin từ nhiều lớp
const activeTab = ref('info'); // Điều khiển tab
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
const selectAll = ref(true);
let map = null;


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

const fetchHuyenData = async () => {
    try {
        const id = route.params.id; // Lấy id từ URL
        if (!id) {
            console.error('Không tìm thấy id huyện trong route params');
            return;
        }
        const response = await getHuyenById(id);
        featureInfo.value = response.data || response; // Tùy API trả về
        console.log('Thông tin huyện:', featureInfo.value);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu huyện:', error);
    }
};
const goToUserTab = () => {
    activeTab.value = 'layers'
    router.push('/')
}

const openImgModal = (url) => {
  selectedImg.value = url;
  showImgModal.value = true;
};
const closeImgModal = () => {
  showImgModal.value = false;
  selectedImg.value = '';
};

const downloadGeoJson = async (id) => {
    try {
    const blob = await exportGeoJson(id);
        // Giải phóng URL cũ nếu có
        if (geoJsonUrl.value) URL.revokeObjectURL(geoJsonUrl.value);
        // Tạo URL tạm thời từ blob
        geoJsonUrl.value = URL.createObjectURL(blob);
        // Tạo click ảo để tải file
        const a = document.createElement('a');
        a.href = geoJsonUrl.value;
        a.download = `${featureInfo.value.ten_huyen}.geojson`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Lỗi tải GeoJSON:', error);
    }
};

onMounted(() => {
    fetchHuyenData();
});

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

.main-content1 {
    width: 80%;
}

.header-main {
    margin-top: 55px;
    width: 100%;
    max-height: 50px;
    background-color: rgb(235, 235, 235);
}

.content {
    height: calc(100vh - 130px);
    overflow-y: auto;
    padding: 20px;
    margin-right: 10px;
}

.content video {
    width: 80%;
    height: 500px;
    max-width: 500px;
    display: block;
    margin: 0 auto;
}

p {
    margin-top: 10px;
}

.image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
    padding: 0 20px;
}

.image-item {
    text-align: center;
}

.img-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.img-modal img {
    width: 500px;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.image-item img {
    width: 100%;
    height: 200px;  
    object-fit: contain; /* hoặc cover nếu muốn cắt cho vừa khung */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    background: #f8f8f8; /* giúp ảnh nhỏ không bị nền trắng */
    max-height: 250px;   /* Giới hạn chiều cao tối đa, có thể điều chỉnh */
}

.image-item img:hover {
    transform: scale(1.05);
}
</style>
