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
                        <div v-if="featureInfo && featureInfo.length > 0">
                            <div v-for="(item, index) in featureInfo" :key="index" class="layer-info">
                                <h4>Lớp: {{ item.layer }}</h4>
                                <p v-for="(value, key) in item.properties" :key="key">
                                    <strong>{{ key }}:</strong> {{ value }}
                                </p>
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
                    <!-- Hiển thị video -->
                    <video controls width="600" style="max-width: 100%;">
                        <source src="../assets/img/movie2.m4v" type="video/mp4">
                    </video>
                    <h2 style="text-align: center;">Vùng Đồng bằng Sông Hồng</h2>

                    <p><strong>Giới thiệu:</strong>
                        Đồng bằng Sông Hồng là một trong những vùng kinh tế, văn hóa, lịch sử quan trọng bậc nhất của
                        Việt Nam. Đây là nơi có nền văn minh lúa nước lâu đời, với những giá trị truyền thống đặc sắc,
                        đồng thời cũng là trung tâm chính trị và kinh tế hàng đầu của cả nước.
                    </p>

                    <p><strong>Vị trí địa lý:</strong>
                        Vùng nằm ở phía Bắc Việt Nam, giáp Trung du và miền núi Bắc Bộ ở phía Bắc và Tây, giáp vịnh Bắc
                        Bộ ở phía Đông, và giáp Bắc Trung Bộ ở phía Nam. Đồng bằng Sông Hồng có địa hình thấp và bằng
                        phẳng, rất thuận lợi cho phát triển nông nghiệp, đô thị và giao thông.
                    </p>

                    <p><strong>Các tỉnh thành:</strong>
                        Bao gồm 11 tỉnh, thành phố: Hà Nội, Hải Phòng, Quảng Ninh, Bắc Ninh, Hưng Yên, Hải Dương, Thái
                        Bình, Nam Định, Hà Nam, Ninh Bình và Vĩnh Phúc.
                    </p>

                    <p><strong>Diện tích và dân số:</strong>
                        Tổng diện tích toàn vùng khoảng hơn 21.000 km² với dân số trên 22 triệu người (số liệu có thể
                        thay đổi tùy theo năm). Mật độ dân số cao nhất cả nước, tập trung đông đúc ở các đô thị lớn như
                        Hà Nội, Hải Phòng.
                    </p>

                    <p><strong>Kinh tế:</strong>
                        Là vùng kinh tế phát triển năng động, với Hà Nội là trung tâm chính trị - hành chính quốc gia,
                        trung tâm kinh tế, tài chính, giáo dục, khoa học kỹ thuật và văn hóa lớn. Hải Phòng là thành phố
                        cảng quan trọng, là cửa ngõ ra biển của vùng và cả nước.
                    </p>

                    <p><strong>Xã hội - Dịch vụ:</strong>
                        Hệ thống giáo dục, y tế, giao thông, viễn thông phát triển mạnh. Nhiều trường đại học hàng đầu
                        và bệnh viện tuyến trung ương đóng tại đây. Các trung tâm thương mại, khu đô thị mới liên tục
                        được đầu tư mở rộng.
                    </p>

                    <p><strong>Nông nghiệp:</strong>
                        Là vùng trồng lúa trọng điểm, bên cạnh đó còn phát triển mạnh các loại rau màu, hoa, cây ăn quả
                        và chăn nuôi. Các mô hình nông nghiệp công nghệ cao, nông nghiệp sinh thái cũng đang được triển
                        khai.
                    </p>

                    <p><strong>Tầm quan trọng:</strong>
                        Là trung tâm chính trị, kinh tế, văn hóa, giáo dục của Việt Nam. Vùng có vai trò chiến lược
                        trong phát triển quốc gia và hội nhập quốc tế. Từ xưa đến nay, Đồng bằng Sông Hồng luôn là nơi
                        khởi nguồn của nhiều phong trào cách mạng và đổi mới.
                    </p>

                    <p><strong> Danh thắng:</strong>
                        Vùng có nhiều di tích lịch sử nổi tiếng như Văn Miếu – Quốc Tử Giám, Hoàng thành Thăng Long,
                        chùa Hương, chùa Bái Đính, vịnh Hạ Long... Đồng thời cũng là nơi có nhiều lễ hội truyền thống
                        đặc sắc như lễ hội đền Hùng, hội Lim, hội Gióng.
                    </p>

                    <p style="margin-top: 20px; text-align: center; font-style: italic;">
                        Đồng bằng Sông Hồng - Trái tim của đất nước, nơi hội tụ giữa truyền thống và hiện đại.
                    </p>
                    <p><strong>Hình ảnh:</strong></p>
                    <div class="image-gallery">
                        <div class="image-item">
                            <img src="D:\TTDN\ranhgioi\frontend\src\assets\img\hanoi.png" alt="Hà Nội">
                            <p class="image-caption">Hà Nội - Thủ đô nghìn năm văn hiến</p>
                        </div>
                        <div class="image-item">
                            <img src="D:\TTDN\ranhgioi\frontend\src\assets\img\vinhhalong.jfif" alt="Vịnh Hạ Long">
                            <p class="image-caption">Vịnh Hạ Long - Di sản thiên nhiên thế giới</p>
                        </div>
                        <div class="image-item">
                            <img src="D:\TTDN\ranhgioi\frontend\src\assets\img\haiphong.jfif" alt="Văn Miếu">
                            <p class="image-caption">Thành phố Hải Phòng</p>
                        </div>
                        <div class="image-item">
                            <img src="D:\TTDN\ranhgioi\frontend\src\assets\img\ninhbinh.jfif" alt="Nông nghiệp">
                            <p class="image-caption">Di sản Tràng An- Ninh Bình</p>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import Header from '../components/header/HeaderAdmin.vue';
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import { useRouter } from 'vue-router'

const router = useRouter()


const mapContainer = ref(null);
const featureInfo = ref([]); // Sử dụng mảng để lưu thông tin từ nhiều lớp
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

const goToUserTab = () => {
  activeTab.value = 'layers'
  router.push('/')
}



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

.image-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.image-item img:hover {
    transform: scale(1.05);
}
</style>
