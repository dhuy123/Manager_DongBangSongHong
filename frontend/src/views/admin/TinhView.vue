<template>
  <div class="admin-layout">
    <Header class="header" />
    <div class="main-layout">
      <Sidebar class="sidebar" />
      <main class="content">
        <div class="header-actions d-flex justify-content-between align-items-center mb-3">
          <h3>Danh sách các tỉnh</h3>
          <div class="action-buttons">
            <button @click="goToUser" class="btn btn-secondary me-2">
              <i class="fas fa-map-marker-alt"></i> Map
            </button>
            <button class="btn btn-success me-2" @click="exportToCSV">Xuất CSV</button>
            <button class="btn btn-danger" @click="exportToPDF">Xuất PDF</button>
          </div>
          <div class="search">
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

        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên tỉnh</th>
              <th>Mã tỉnh</th>
              <th>Quốc gia</th>
              <th>Cấp hành chính</th>
              <th>Diện tích (km²)</th>
              <th>Dân số (Người)</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tinh, index) in tinhList" :key="tinh.id">
              <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
              <td>{{ tinh.ten_tinh }}</td>
              <td>{{ tinh.ma_tinh }}</td>
              <td>{{ tinh.quoc_gia }}</td>
              <td>{{ tinh.cap_hanh_chinh }}</td>
              <td>{{ tinh.dien_tich }}</td>
              <td>{{ tinh.dan_so }}</td>
              <td class="d-flex justify-content-between">
                <button class="btn btn-info btn-sm me-1" @click="openViewModal(tinh)"><i
                    class="fas fa-eye"></i></button>
        <button class="btn btn-primary btn-sm" @click="goToImgTinh(tinh.ma_tinh)"><i
          class="fas fa-image"></i></button>
                <button class="btn btn-warning btn-sm me-1" @click="openEditModal(tinh)"><i
                    class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" @click="deleteTinh(tinh.id)"><i class="fas fa-trash"></i></button>
              </td>

            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div v-if="totalPages > 1">
          <ul class="pagination justify-content-end">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(currentPage - 1)">Trước</button>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="goToPage(currentPage + 1)">Sau</button>
            </li>
          </ul>
        </div>

        <!-- View Modal -->
        <div class="modal fade" id="viewProvinceModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Chi tiết tỉnh</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <p><strong>Tên tỉnh:</strong> {{ viewForm.ten_tinh }}</p>
                <p><strong>Mã tỉnh:</strong> {{ viewForm.ma_tinh }}</p>
                <p><strong>Quốc gia:</strong> {{ viewForm.quoc_gia }}</p>
                <p><strong>Cấp hành chính:</strong> {{ viewForm.cap_hanh_chinh }}</p>
                <p><strong>Diện tích:</strong> {{ viewForm.dien_tich }}</p>
                <p><strong>Dân số:</strong> {{ viewForm.dan_so }}</p>
                <p><strong>Mô tả:</strong> {{ viewForm.mo_ta }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editProvinceModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Chỉnh sửa tỉnh</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="submitEditForm">
                  <div class="mb-3">
                    <label class="form-label">Tên tỉnh</label>
                    <input v-model="editForm.ten_tinh" type="text" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Mã tỉnh</label>
                    <input v-model="editForm.ma_tinh" type="text" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Quốc gia</label>
                    <input v-model="editForm.quoc_gia" type="text" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Cấp hành chính</label>
                    <input v-model="editForm.cap_hanh_chinh" type="text" class="form-control" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Diện tích</label>
                    <input v-model="editForm.dien_tich" type="number" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Dân số</label>
                    <input v-model="editForm.dan_so" type="number" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Mô tả</label>
                    <textarea v-model="editForm.mo_ta" class="form-control"></textarea>
                  </div>
                  <button class="btn btn-primary" type="submit">Lưu</button>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "../../components/header/HeaderAdmin.vue";
import Sidebar from "../../components/sidebar/SidebarAdmin.vue";
import {
  getPaginatedTinh,
  getTinhById,
  updateTinh,
  deleteTinhAPI,
  searchTinh,

} from "../../utils/api/api_tinh.js";
import { Modal } from "bootstrap";

const router = useRouter();

const tinhList = ref([]);
const editForm = ref({
  id: null,
  ten_tinh: '',
  ma_tinh: '',
  quoc_gia: '',
  cap_hanh_chinh: '',
  dien_tich: 0,
  dan_so: 0,
  mo_ta: ''
});
const viewForm = ref({
  id: null,
  ten_tinh: '',
  ma_tinh: '',
  quoc_gia: '',
  cap_hanh_chinh: '',
  dien_tich: 0,
  dan_so: 0,
  mo_ta: ''
});

const search = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const limit = ref(10);

// Fetch data từ API
const fetchTinh = async (page = 1) => {
  try {
    const res = await getPaginatedTinh(page, limit.value);
    tinhList.value = res.data; // mảng dữ liệu tỉnh
    currentPage.value = res.currentPage;
    totalPages.value = res.totalPages; // LẤY TRỰC TIẾP
    console.log("Tổng số bản ghi:", res.totalRecords);
    console.log("Page:", page, "Total pages:", totalPages.value);
  } catch (err) {
    console.error(err);
  }
};


const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  fetchTinh(page);
};


const openViewModal = async (tinh) => {
  try {
    const res = await getTinhById(tinh.id);
    viewForm.value = res.data || res;
    const modalEl = document.getElementById("viewProvinceModal");
    const modal = new Modal(modalEl);
    modal.show();
  } catch (err) {
    console.error(err);
  }
};


const openEditModal = (tinh) => {
  editForm.value = { ...tinh };
  const modalEl = document.getElementById("editProvinceModal");
  const modal = new Modal(modalEl);
  modal.show();
};

const onSearch = async () => {
  if (search.value.trim() === '') {
    fetchTinh(1);
  } else {
    try {
      const res = await searchTinh(search.value, 1, limit.value);
      tinhList.value = res.data;
      currentPage.value = res.currentPage;
      totalPages.value = res.totalPages;
      console.log("từ khóa tìm kiếm:", search.value);
      console.log("Kết quả tìm kiếm:", res);
    } catch (err) {
      console.error(err);
    }
  }
}

const submitEditForm = async () => {
  try {
    await updateTinh(editForm.value.id, editForm.value);
    fetchTinh(currentPage.value);
    const modalEl = document.getElementById("editProvinceModal");
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  } catch (err) {
    console.error(err);
  }
};

const deleteTinh = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa tỉnh này?")) {
    try {
      await deleteTinhAPI(id);
      fetchTinh(currentPage.value);
    } catch (err) {
      console.error(err);
    }
  }
};

const goToUser = () => {
  router.push("/");
};


const goToImgTinh = (ma_tinh) => {
  router.push(`/admin/imgTinh/${ma_tinh}`);
};

onMounted(() => {
  fetchTinh();
});
</script>

<style scoped>
@import url("../../assets/css/admin.css");
</style>
