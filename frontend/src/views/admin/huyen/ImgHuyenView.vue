<template>

  <div class="admin-layout">
    <Header class="header" />
    <div class="main-layout">
      <Sidebar class="sidebar" />
      <main class="content">

        <div class="header-actions">
          <h3>Danh sách các tỉnh:</h3>
          <div>
            <button class="btn btn-success" @click="openCreateModel">Thêm mới </button>
          </div>
        </div>

        <table class="province-table table table-striped table-bordered" id="provinceTable">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã huyện</th>
              <th>Hình ảnh</th>
              <th>Mô tả </th>
              <th colspan="3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(huyen, index) in huyenList" :key="huyen.id">
              <td>{{ index + 1 }}</td>
              <td>{{ huyen.ma_huyen }}</td>
              <td>{{ huyen.duong_dan }}></td>
              <td>{{ huyen.mo_ta }}</td>
              <td>
                <button class="btn btn-info btn-sm" :data-id="huyen.id"><i class="fas fa-eye"></i></button>
              </td>
              <td>
                <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
              </td>
              <td>
                <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Modal for viewing province details -->
        <div class="modal fade" id="viewProvinceModal" tabindex="-1" aria-labelledby="viewProvinceModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewProvinceModalLabel">Chi tiết thông tin huyện</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label fw-bold">Mã huyện:</label>
                  <p>{{ viewForm.ma_huyen }}</p>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Hình ảnh:</label>
                 <p><img :src="viewForm.duong_dan" alt="Hình ảnh" width="300" /></p>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Mô tả:</label>
                  <p>{{ viewForm.mo_ta }}</p>
                </div>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal for editing province -->
        <div class="modal fade" id="editProvinceModal" tabindex="-1" aria-labelledby="editProvinceModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editProvinceModalLabel"> {{ isCreate ? 'Thêm mới ảnh' : ' Chỉnh sửa thông tin ảnh ' }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="submitEditForm">
                  <div class="mb-3">
                    <label for="ten_tinh" class="form-label">Mã huyện</label>
                    <input v-model="editForm.ma_huyen" type="text" class="form-control" id="ten_tinh" readonly>
                  </div>
                  <div class="mb-3">
                    <label for="ma_tinh" class="form-label">Hình ảnh</label>
                    <input v-model="editForm.duong_dan" type="text" class="form-control" id="ma_tinh">
                  </div>
                  <div class="mb-3">
                    <label for="mo_ta" class="form-label">Mô tả</label>
                    <textarea v-model="editForm.mo_ta" class="form-control" id="mo_ta" rows="4"></textarea>
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
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import Header from '../../../components/header/HeaderAdmin.vue';
import Sidebar from '../../../components/sidebar/SidebarAdmin.vue';
import {
  getImgHuyenById,
  getImgHuyenByMaHuyen,
  createImgHuyen,
  updateImgHuyen,
  deleteImgHuyenAPI
} from '../../../utils/api/api_imgHuyen';
import { Modal } from 'bootstrap';

// Reactive state
const huyenList = ref([]);
const router = useRouter();
const route = useRoute();
const editForm = ref({
  id: null,
  ma_huyen: route.params.ma_huyen,
  duong_dan: '',
  mo_ta: ''
});
const viewForm = ref({
  id: null,
  ma_huyen: '',
  duong_dan: '',
  mo_ta: ''
});
const isCreate = ref(false);
const isLoading = ref(false); // Loading state for UX
let editModal = null;
let viewModal = null;
let dataTable = null; // Store DataTable instance

// Fetch data and initialize/reinitialize DataTable
const fetchImgHuyenData = async (ma_huyen) => {
  try {
    isLoading.value = true; // Show loading state
    const response = await getImgHuyenByMaHuyen(ma_huyen);
    huyenList.value = Array.isArray(response.data) ? response.data : response;
    console.log('Tinh data fetched:', huyenList.value);

    await nextTick(); // Wait for DOM update

    // Destroy existing DataTable if initialized
    if (dataTable) {
      dataTable.destroy();
      dataTable = null;
    }

    // Initialize DataTable
    dataTable = $('#provinceTable').DataTable({
      data: huyenList.value,
      columns: [
        { data: null, render: (data, type, row, meta) => meta.row + 1 },
        { data: 'ma_huyen' },
        {
          data: 'duong_dan',
          render: (data) => `<img src="${data}" width="60" alt="Hình tỉnh" />`
        },
        { data: 'mo_ta' },
        {
          data: null,
          render: (data) =>
            `<button class="btn btn-info btn-sm" data-id="${data.id}" title="Xem chi tiết"><i class="fas fa-eye"></i></button>`
        },
        {
          data: null,
          render: (data) =>
            `<button class="btn btn-primary btn-sm" data-id="${data.id}" title="Chỉnh sửa"><i class="fas fa-edit"></i></button>`
        },
        {
          data: null,
          render: (data) =>
            `<button class="btn btn-danger btn-sm" data-id="${data.id}" title="Xóa"><i class="fas fa-trash"></i></button>`
        }
      ],
      pageLength: 10,
      responsive: true,
      destroy: true,
      columnDefs: [{ orderable: false, targets: [0, 4, 5, 6] }],
    });

    // Attach event listeners for buttons
    $('#provinceTable').off('click').on('click', '.btn-info', function () {
      const id = $(this).data('id');
      const tinh = huyenList.value.find((t) => t.id === id);
      openViewModal(tinh);
    });

    $('#provinceTable').on('click', '.btn-primary', function () {
      const id = $(this).data('id');
      const tinh = huyenList.value.find((t) => t.id === id);
      openEditModal(tinh);
    });

    $('#provinceTable').on('click', '.btn-danger', function () {
      const id = $(this).data('id');
      deleteTinh(id);
    });
  } catch (error) {
    console.error('Error fetching Tinh data:', error);
  //  alert('Lỗi khi tải dữ liệu tỉnh. Vui lòng thử lại.');
  } finally {
    isLoading.value = false; // Hide loading state
  }
};

// Open create modal
const openCreateModel = () => {
  isCreate.value = true;
  editForm.value = {
    id: null,
    ma_huyen: route.params.ma_huyen,
    duong_dan: '',
    mo_ta: ''
  };
  editModal?.show();
};

// Open view modal
const openViewModal = async (tinh) => {
  try {
    const response = await getImgHuyenById(tinh.id);
    viewForm.value = response.data || response;
    viewModal?.show();
  } catch (error) {
    console.error('Error fetching Tinh data for view:', error);
    alert('Lỗi khi xem chi tiết tỉnh.');
  }
};

// Open edit modal
const openEditModal = async (tinh) => {
  try {
    const response = await getImgHuyenById(tinh.id);
    editForm.value = { ...response.data || response };
    isCreate.value = false;
    editModal?.show();
  } catch (error) {
    console.error('Error fetching Tinh data for edit:', error);
    alert('Lỗi khi mở form chỉnh sửa.');
  }
};

// Submit form (create or update) with success message
const submitEditForm = async () => {
  try {
    isLoading.value = true; // Show loading state
    if (isCreate.value) {
      await createImgHuyen(editForm.value);
      
      console.log('Tinh created:', editForm.value);
    } else {
      await updateImgHuyen(editForm.value.id, editForm.value);
     
      console.log('Tinh updated:', editForm.value);
    }
    editModal?.hide();
    await fetchImgHuyenData(route.params.ma_huyen); // Refresh table
  } catch (error) {
    console.error('Error saving Tinh:', error);
  
  } finally {
    isLoading.value = false; // Hide loading state
  }
};

// Delete province
const deleteTinh = async (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa tỉnh này?')) {
    try {
      isLoading.value = true; // Show loading state
      await deleteImgHuyenAPI(id);
     
      console.log('Tinh deleted:', id);
      await fetchImgHuyenData(route.params.ma_huyen); // Refresh table
    } catch (error) {
      console.error('Error deleting Tinh:', error);
    
    } finally {
      isLoading.value = false; // Hide loading state
    }
  }
};

// Initialize modals and fetch data on mount
onMounted(async () => {
  console.log('TinhView mounted');
  editModal = new Modal(document.getElementById('editProvinceModal'), {
    backdrop: 'static',
    keyboard: false
  });
  viewModal = new Modal(document.getElementById('viewProvinceModal'), {
    backdrop: 'static',
    keyboard: false
  });
  await fetchImgHuyenData(route.params.ma_huyen);
});
</script>

<style scoped>
@import url('../../../assets/css/admin.css');
</style>