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
                    <div>
                        <button class="btn btn-success" @click="openCreateModel">Thêm mới </button>
                    </div>
                    <div class="search">
                        <div class="input-group" style="position: relative;">
                            <div class="form-outline" data-mdb-input-init>
                                <input id="search-input" type="search" class="form-control" v-model="search"
                                    @input="onSearch" placeholder="Tìm kiếm..." />
                            </div>


                            <!-- Nút tìm kiếm -->
                            <button id="search-button" type="button" class="btn btn-primary" @click="onSearch">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>

                    </div>
                </div>

                <table class=" table table-striped table-bordered" >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Tài khoản </th>
                            <th>Mật khẩu</th>
                            <th>Vai trò </th>
                            <th>Điện thoại</th>
                            <!-- <th>Mô tả</th> -->
                            <th colspan=" 3">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(account, index) in accountList" :key="account.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ account.ho_ten }}</td>
                            <td>{{ account.gioi_tinh }}</td>
                            <td>{{ account.tai_khoan }}</td>
                            <td>{{ account.mat_khau }}</td>
                            <td>{{ account.role }}</td>
                            <td>{{ account.sdt }}</td>
                            <td>
                                <button class="btn btn-info btn-sm" @click="openViewModal(account)"><i
                                        class="fas fa-eye"></i></button>
                            </td>
                            <td>
                                <button class="btn btn-warning btn-sm" @click="openEditModal(account)"><i
                                        class="fas fa-edit"></i></button>
                            </td>
                            <td>
                                <button class="btn btn-danger btn-sm" @click="deleteAccount(account.id)"><i
                                        class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Modal for viewing province details -->
                <div class="modal fade" id="viewProvinceModal" tabindex="-1"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewProvinceModalLabel">Chi tiết thông tin tỉnh</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Họ tên :</label>
                                    <p>{{ viewForm.ho_ten }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold"> Giới tính:</label>
                                    <p>{{ viewForm.gioi_tinh }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Tài Khoản:</label>
                                    <p>{{ viewForm.tai_khoan }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Mật Khẩu:</label>
                                    <p>{{ viewForm.mat_khau }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Vai trò :</label>
                                    <p>{{ viewForm.role }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Điện Thoại :</label>
                                    <p>{{ viewForm.sdt }}</p>
                                </div>
                                <!-- <div class="mb-3">
                                    <label class="form-label fw-bold">Mô tả:</label>
                                    <p>{{ viewForm.mo_ta }}</p>
                                </div> -->
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal for editing province -->
                <div class="modal fade" id="editProvinceModal" tabindex="-1" 
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editProvinceModalLabel">
                                    {{ isCreateMode ? 'Thêm người dùng' : 'Chỉnh sửa thông tin người dùng' }}
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="submitEditForm">
                                    <div class="mb-3">
                                        <label for="ten_tinh" class="form-label">Họ tên</label>
                                        <input v-model="editForm.ho_ten" type="text" class="form-control" id="ten_tinh"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="ma_tinh" class="form-label">Giới tính</label>
                                        <input v-model="editForm.gioi_tinh" type="text" class="form-control"
                                            id="ma_tinh" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="quoc_gia" class="form-label">Tài khoản</label>
                                        <input v-model="editForm.tai_khoan" type="text" class="form-control"
                                            id="quoc_gia" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="cap_hanh_chinh" class="form-label">Mật khẩu</label>
                                        <input v-model="editForm.mat_khau" type="text" class="form-control"
                                            id="cap_hanh_chinh" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="dien_tich" class="form-label">Vai trò </label>
                                        <input v-model="editForm.role" type="text" class="form-control" id="dien_tich">
                                    </div>
                                    <div class="mb-3">
                                        <label for="dan_so" class="form-label">Điện thoại</label>
                                        <input v-model="editForm.sdt" type="number" class="form-control" id="dan_so">
                                    </div>
                                    <!-- <div class="mb-3">
                                        <label for="mo_ta" class="form-label">Mô tả</label>
                                        <textarea v-model="editForm.mo_ta" class="form-control" id="mo_ta"
                                            rows="4"></textarea>
                                    </div> -->
                                    <button type="submit" class="btn btn-primary">Lưu</button>
                                    <button type="button" class="btn btn-secondary ms-2"
                                        data-bs-dismiss="modal">Hủy</button>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../../components/header/HeaderAdmin.vue';
import Sidebar from '../../../components/sidebar/SidebarAdmin.vue';
import { getPaginatedAccount, searchAccount, getAccountById, createAccount, updateAccount, deleteAccountAPI, getAllAccount, searchAccountAll } from '../../../utils/api/api_account';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Modal } from 'bootstrap';

const accountList = ref([]);
const router = useRouter();
const editForm = ref({
    id: null,
    ho_ten: '',
    gioi_tinh: '',
    tai_khoan: '',
    mat_khau: '',
    role: '',
    sdt: '',
});
const viewForm = ref({
    id: null,
    ho_ten: '',
    gioi_tinh: '',
    tai_khoan: '',
    mat_khau: '',
    role: '',
    sdt: '',
});
const isCreateMode = ref(null);
const search = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const limit = ref(10);

const viewModal = ref(null);
const editModal = ref(null);


const fetchAccountData = async () => {
    try {
        const response = await getPaginatedAccount(currentPage.value, limit.value);
        accountList.value = response.data || response;
        console.log('Tinh data fetched successfully:', accountList.value);

    } catch (error) {
        console.error('Error fetching Account data:', error);
    }
};

const gotoPage = async (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    await fetchAccountData();
};

const onSearch = async () => {
    if (search.value.trim() === '') {
        await fetchAccountData();
    } else {
        try {
            const response = await searchAccount(search.value.trim());
            accountList.value = response.data || response;
            console.log('Search results:', accountList.value);
        } catch (error) {
            console.error('Error searching Account:', error);
        }
    }
};

const openCreateModel = () => {
  isCreateMode.value = true;
  editForm.value = {
    id: null,
    ho_ten: '',
    gioi_tinh: '',
    tai_khoan: '',
    mat_khau: '',
    role: '',
    sdt: null
  };

  if (!editModal.value) {
    const el = document.getElementById('editProvinceModal');
    if (!el) {
      console.error('Không tìm thấy phần tử modal!');
      return;
    }
    editModal.value = new Modal(el, {
      backdrop: 'static',
      keyboard: false
    });
  }

  editModal.value.show();
};



const openViewModal = async (account) => {
    try {
        const response = await getAccountById(account.id);
        const accountData = response.data || response;
        viewForm.value = { ...accountData };
        if (!viewModal.value) {
            viewModal.value = new Modal(document.getElementById('viewProvinceModal'), {
                backdrop: 'static',
                keyboard: false
            });
        }
        viewModal.value.show();
    } catch (error) {
        console.error('Error fetching Account data for view:', error);
    }
};

const openEditModal = async (account) => {
    isCreateMode.value = false;
    try {
        const response = await getAccountById(account.id);
        const accountData = response.data || response;
        editForm.value = { ...accountData };
        if (!editModal.value) {
            editModal.value = new Modal(document.getElementById('editProvinceModal'), {
                backdrop: 'static',
                keyboard: false
            });
        }
        editModal.value.show();
    } catch (error) {
        console.error('Error fetching Tinh data for edit:', error);
    }
};

const submitEditForm = async () => {
    try {
        if (isCreateMode.value) {
            await createAccount(editForm.value);
        } else {
            await updateAccount(editForm.value.id, editForm.value);
        }
        editModal.value.hide();
        await fetchAccountData();
    } catch (error) {
        console.error('Error saving Account:', error);
    }
};

const deleteAccount = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa tỉnh này?')) {
        try {
            await deleteAccountAPI(id);
            console.log('Account deleted successfully:', id);
            await fetchAccountData();
        } catch (error) {
            console.error('Error deleting Tinh:', error);
        }
    }
};

// const exportToCSV = () => {
const exportToCSV = async () => {
    try {
        console.log('Bắt đầu xuất CSV account');
        let res;
        if (search.value && search.value.trim() !== '') {
            res = await searchAccountAll(search.value.trim());
        } else {
            res = await getAllAccount();
        }
        const data = Array.isArray(res) ? res : res.data || [];
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }

        const headers = ['STT', 'Họ và tên', 'Giới tính', 'Tài khoản', 'Vai trò', 'Điện thoại'];
        const rows = data.map((a, idx) => [
            idx + 1,
            a.ho_ten ?? '',
            a.gioi_tinh ?? '',
            a.tai_khoan ?? '',
            a.role ?? '',
            a.sdt ?? ''
        ]);

        const csvContent = '\uFEFF' + [headers, ...rows]
            .map(row => row.map(item => `"${String(item).replace(/"/g, '""')}"`).join(','))
            .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const now = new Date();
        link.setAttribute('download', `account_all_${now.toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Lỗi khi xuất CSV account:', err);
        alert('Lỗi khi xuất CSV. Xem console để biết thêm chi tiết.');
    }
};

// const exportToPDF = () => {
const exportToPDF = async () => {
    try {
        let res;
        if (search.value && search.value.trim() !== '') {
            res = await searchAccountAll(search.value.trim());
        } else {
            res = await getAllAccount();
        }
        const data = Array.isArray(res) ? res : res.data || [];
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }

        const doc = new jsPDF('landscape');
        const title = 'Danh sách tài khoản';
        doc.setFontSize(14);
        doc.text(title, 14, 20);

        const columns = [
            { header: 'STT', dataKey: 'stt' },
            { header: 'Họ và tên', dataKey: 'ho_ten' },
            { header: 'Giới tính', dataKey: 'gioi_tinh' },
            { header: 'Tài khoản', dataKey: 'tai_khoan' },
            { header: 'Vai trò', dataKey: 'role' },
            { header: 'Điện thoại', dataKey: 'sdt' }
        ];

        const rows = data.map((a, idx) => ({
            stt: idx + 1,
            ho_ten: a.ho_ten ?? '',
            gioi_tinh: a.gioi_tinh ?? '',
            tai_khoan: a.tai_khoan ?? '',
            role: a.role ?? '',
            sdt: a.sdt ?? ''
        }));

        autoTable(doc, {
            head: [columns.map(c => c.header)],
            body: rows.map(r => columns.map(c => r[c.dataKey])),
            startY: 26,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [22, 160, 133] }
        });

        const now = new Date();
        doc.save(`account_all_${now.toISOString().slice(0,10)}.pdf`);
    } catch (err) {
        console.error('Lỗi khi xuất PDF account:', err);
        alert('Lỗi khi xuất PDF. Xem console để biết thêm chi tiết.');
    }
};

const goToUser = () => {
  router.push("/");
};


onMounted(() => {
    fetchAccountData();
});

</script>

<style scoped>
@import url('../../../assets/css/admin.css');
</style>