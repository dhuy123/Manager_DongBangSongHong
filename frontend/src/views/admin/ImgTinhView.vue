<template>
  <div class="admin-layout">
    <Header class="header" />
    <div class="main-layout">
      <Sidebar class="sidebar" />
      <main class="content">

      <div class="header-actions d-flex justify-content-between align-items-center mb-3">
          <h3>Danh sách các tỉnh</h3>
          <!-- <div class="action-buttons">
            <button @click="goToUser" class="btn btn-secondary me-2">
              <i class="fas fa-map-marker-alt"></i> Map
            </button>
            <button class="btn btn-success me-2" @click="exportToCSV">Xuất CSV</button>
            <button class="btn btn-danger" @click="exportToPDF">Xuất PDF</button>
          </div> -->
          <div class="search d-flex align-items-center">
            <button class="btn btn-success me-2" @click="openCreateModel" title="thêm mới">
              <i class="fas fa-add"></i> 
            </button>
            <div class="input-group" style="position: relative;">
              <div class="form-outline" data-mdb-input-init>
                <input id="search-input" type="search" class="form-control" v-model="search" @input="onSearch"
                  placeholder="Tìm kiếm..." />
              </div>

              <!-- Nút tìm kiếm -->
              <button id="search-button" type="button" class="btn btn-primary" @click="onSearch">
                <i class="fas fa-search"></i>
              </button>
            </div>

          </div>
        </div>

        <!-- Bảng danh sách -->
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã tỉnh</th>
              <th>Hình ảnh</th>
              <th>Mô tả</th>
              <th colspan="3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredTinhList.length === 0">
              <td colspan="7" class="text-center">Không có dữ liệu</td>
            </tr>
            <tr v-for="(tinh, index) in paginatedTinhList" :key="tinh.id">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ tinh.ma_tinh }}</td>
              <td><img :src="tinh.duong_dan" alt="Ảnh" width="60" /></td>
              <td>{{ tinh.mo_ta }}</td>
              <td>
                <button class="btn btn-info btn-sm" @click="openViewModal(tinh)">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
              <td>
                <button class="btn btn-warning btn-sm" @click="openEditModal(tinh)">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteTinh(tinh.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Phân trang -->
        <nav v-if="filteredTinhList.length > itemsPerPage" class="mt-3">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage">Trước</button>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <button class="page-link" @click="goToPage(page)">
                {{ page }}
              </button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage">Sau</button>
            </li>
          </ul>
        </nav>

        <!-- Modal xem -->
        <div class="modal fade" id="viewProvinceModal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Chi tiết thông tin tỉnh</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <p><strong>Mã tỉnh:</strong> {{ viewForm.ma_tinh }}</p>
                <p><strong>Hình ảnh:</strong></p>
                <img :src="viewForm.duong_dan" alt="Hình ảnh" width="300" />
                <p class="mt-3"><strong>Mô tả:</strong> {{ viewForm.mo_ta }}</p>
                <button type="button" class="btn btn-secondary mt-3" data-bs-dismiss="modal">Đóng</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal thêm/sửa -->
        <div class="modal fade" id="editProvinceModal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ isCreate ? 'Thêm mới ảnh' : 'Chỉnh sửa ảnh' }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="submitEditForm">
                  <div class="mb-3">
                    <label class="form-label">Mã tỉnh</label>
                    <input v-model="editForm.ma_tinh" type="text" class="form-control" readonly>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Hình ảnh</label>
                    <input v-model="editForm.duong_dan" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Mô tả</label>
                    <textarea v-model="editForm.mo_ta" class="form-control" rows="3"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Lưu</button>
                  <button type="button" class="btn btn-secondary ms-2" data-bs-dismiss="modal">Hủy</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';
import Header from '../../components/header/HeaderAdmin.vue';
import Sidebar from '../../components/sidebar/SidebarAdmin.vue';
import {
  getImgTinhById,
  getImgTinhByMaTinh,
  createImgTinh,
  updateImgTinh,
  deleteImgTinhAPI
} from '../../utils/api/api_imgTinh';

const tinhList = ref([]);
const route = useRoute();
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const editForm = ref({
  id: null,
  ma_tinh: '',
  duong_dan: '',
  mo_ta: ''
});
const viewForm = ref({
  id: null,
  ma_tinh: '',
  duong_dan: '',
  mo_ta: ''
});
const isCreate = ref(false);

let editModal = null;
let viewModal = null;

// --- Lọc danh sách theo tìm kiếm ---
const filteredTinhList = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return tinhList.value.filter(t =>
    t.ma_tinh.toLowerCase().includes(q) || t.mo_ta.toLowerCase().includes(q)
  );
});

// --- Phân trang ---
const totalPages = computed(() => Math.ceil(filteredTinhList.value.length / itemsPerPage));
const paginatedTinhList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTinhList.value.slice(start, start + itemsPerPage);
});

const goToPage = (page) => (currentPage.value = page);
const prevPage = () => (currentPage.value = Math.max(1, currentPage.value - 1));
const nextPage = () => (currentPage.value = Math.min(totalPages.value, currentPage.value + 1));

const fetchImgTinhData = async (ma_tinh) => {
  try {
    const res = await getImgTinhByMaTinh(ma_tinh);
    tinhList.value = Array.isArray(res.data) ? res.data : res;
  } catch (err) {
    console.error(err);
    alert('Không thể tải danh sách tỉnh.');
  }
};

const openCreateModel = () => {
  isCreate.value = true;
  editForm.value = { id: null, ma_tinh: route.params.ma_tinh, duong_dan: '', mo_ta: '' };
  editModal?.show();
};

const openViewModal = async (tinh) => {
  const res = await getImgTinhById(tinh.id);
  viewForm.value = res.data || res;
  console.log("Xem chi tiết tỉnh:", viewForm.value);
  viewModal?.show();
};

const openEditModal = async (tinh) => {
  const res = await getImgTinhById(tinh.id);
  editForm.value = res.data || res;
  isCreate.value = false;
  editModal?.show();
};

const submitEditForm = async () => {
  try {
    if (isCreate.value) {
      await createImgTinh(editForm.value);
    } else {
      await updateImgTinh(editForm.value.id, editForm.value);
    }
    editModal?.hide();
    await fetchImgTinhData(route.params.ma_tinh);
  } catch (err) {
    console.error(err);
    alert('Lỗi khi lưu dữ liệu.');
  }
};

const deleteTinh = async (id) => {
  if (confirm('Bạn có chắc muốn xóa tỉnh này?')) {
    await deleteImgTinhAPI(id);
    await fetchImgTinhData(route.params.ma_tinh);
  }
};

// --- Khởi tạo ---
onMounted(async () => {
  const maTinh = route.params.ma_tinh;
  if (maTinh) await fetchImgTinhData(maTinh);
  editModal = new Modal(document.getElementById('editProvinceModal'));
  viewModal = new Modal(document.getElementById('viewProvinceModal'));
});
</script>

<style scoped>
@import url('../../assets/css/admin.css');
</style>
