<template>
    <div class="admin-layout">
        <Header class="header" />
        <div class="main-layout">
            <Sidebar class="sidebar" />
            <main class="content">

                <div class="header-actions d-flex justify-content-between align-items-center mb-3">
                    <h3>Danh sách các xã</h3>
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

                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã xã</th>
                            <th>Tên xã</th>
                            <th>Mã huyện</th>
                            <th>Huyện/Tỉnh </th>
                            <th>Cấp hành chính</th>
                            <th>Diện tích (km²)</th>
                            <th>Dân số (Người)</th>
                            <!-- <th>Mô tả</th> -->
                            <th colspan="3">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(xa, index) in xaList" :key="xa.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ xa.ma_xa }}</td>
                            <td>{{ xa.ten_xa }}</td>
                            <td>{{ xa.ma_huyen }}</td>
                            <td>{{ xa.ten_huyen }} - {{ xa.ten_tinh }} - {{ xa.quoc_gia }}</td>
                            <td>{{ xa.cap_hanh_chinh }}</td>
                            <td>{{ xa.dien_tich }}</td>
                            <td>{{ xa.dan_so }}</td>
                            <td class="d-flex justify-content-between">
                                <button class="btn btn-info btn-sm me-1" @click="openViewModal(xa)"><i
                                        class="fas fa-eye"></i></button>
                                <button class="btn btn-warning btn-sm me-1" @click="openEditModal(xa)"><i
                                        class="fas fa-edit"></i></button>
                                <button class="btn btn-danger btn-sm" @click="deleteXa(xa.id)"><i
                                        class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <div v-if="totalPages > 1">
                    <ul class="pagination justify-content-end">
                        <!-- Nút Trước -->
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="goToPage(currentPage - 1)">Trước</button>
                        </li>

                        <!-- Dấu ... đầu -->
                        <li v-if="visiblePages[0] > 1" class="page-item disabled">
                            <span class="page-link">...</span>
                        </li>

                        <!-- Danh sách trang -->
                        <li v-for="page in visiblePages" :key="page" class="page-item"
                            :class="{ active: currentPage === page }">
                            <button class="page-link" @click="goToPage(page)">
                                {{ page }}
                            </button>
                        </li>

                        <!-- Dấu ... cuối -->
                        <li v-if="visiblePages.at(-1) < totalPages" class="page-item disabled">
                            <span class="page-link">...</span>
                        </li>

                        <!-- Nút Sau -->
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <button class="page-link" @click="goToPage(currentPage + 1)">Sau</button>
                        </li>
                    </ul>
                </div>


                <!-- Modal for viewing province details -->
                <div class="modal fade" id="viewProvinceModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewProvinceModalLabel">Chi tiết thông tin tỉnh</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Mã xã:</label>
                                    <p>{{ viewForm.ma_xa || 'N/A' }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Tên xã:</label>
                                    <p>{{ viewForm.ten_xa || 'N/A' }}</p>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-bold">Mã huyện:</label>
                                    <p>{{ viewForm.ma_huyen || 'N/A' }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Huyện/Tỉnh</label>
                                    <p>{{ viewForm.ten_huyen }} - {{ viewForm.ten_tinh }} - {{ viewForm.quoc_gia }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Cấp hành chính:</label>
                                    <p>{{ viewForm.cap_hanh_chinh }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Diện tích (km²):</label>
                                    <p>{{ viewForm.dien_tich }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Dân số (Người):</label>
                                    <p>{{ viewForm.dan_so }}</p>
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
                <div class="modal fade" id="editProvinceModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editProvinceModalLabel">Chỉnh sửa thông tin tỉnh</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="submitEditForm">
                                    <div class="mb-3">
                                        <label for="ma_xa" class="form-label">Mã xã</label>
                                        <input v-model="editForm.ma_xa" type="text" class="form-control" id="ma_xa"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="ten_xa" class="form-label">Tên xã</label>
                                        <input v-model="editForm.ten_xa" type="text" class="form-control" id="ten_xa"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="ma_xa" class="form-label">Mã huyện</label>
                                        <input v-model="editForm.ma_huyen" type="text" class="form-control" id="ma_huyen"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="cap_hanh_chinh" class="form-label">Cấp hành chính</label>
                                        <input v-model="editForm.cap_hanh_chinh" type="text" class="form-control"
                                            id="cap_hanh_chinh" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="dien_tich" class="form-label">Diện tích (km²)</label>
                                        <input v-model="editForm.dien_tich" type="text" class="form-control"
                                            id="dien_tich">
                                    </div>
                                    <div class="mb-3">
                                        <label for="dan_so" class="form-label">Dân số (Người)</label>
                                        <input v-model="editForm.dan_so" type="text" class="form-control" id="dan_so">
                                    </div>
                                    <div class="mb-3">
                                        <label for="mo_ta" class="form-label">Mô tả</label>
                                        <textarea v-model="editForm.mo_ta" class="form-control" id="mo_ta"
                                            rows="4"></textarea>
                                    </div>
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

import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../../components/header/HeaderAdmin.vue';
import Sidebar from '../../../components/sidebar/SidebarAdmin.vue';
import { getPaginatedXa, searchXa, getXaById, updateXa, deleteXaAPI, getAllXa, searchXaAll } from '../../../utils/api/api_xa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Modal } from 'bootstrap';

const xaList = ref([]);
const router = useRouter();
const editForm = ref({
    id: null,
    ten_xa: '',
    ma_xa: '',
    ma_huyen: '',
    ten_huyen: '',
    ten_tinh: '',
    quoc_gia: '',
    cap_hanh_chinh: '',
    dien_tich: 0,
    dan_so: 0,
    mo_ta: ''
});
const viewForm = ref({
    id: null,
    ten_xa: '',
    ma_xa: '',
    ma_huyen: '',
    ten_huyen: '',
    ten_xa: '',
    ten_tinh: '',
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
const maxVisible = ref(5);

const fetchXaData = async () => {
    console.log("đã vào fetchXaData");
    try {
        const response = await getPaginatedXa(currentPage.value, limit.value);
        console.log('Fetched Xa data:', response);
        xaList.value = response.data || response;
        console.log('Xa data fetched successfully:', xaList.value);
        console.log('total pages:', response.totalPages);
        totalPages.value = response.totalPages || 1;

    } catch (error) {
        console.error('Error fetching Xa data:', error);
    }
};

const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page;
    fetchXaData(page);
};

const visiblePages = computed(() => {
    const half = Math.floor(maxVisible.value / 2);
    let start = currentPage.value - half;
    let end = currentPage.value + half;

    if (start < 1) {
        start = 1;
        end = Math.min(maxVisible.value, totalPages.value);
    } else if (end > totalPages.value) {
        end = totalPages.value;
        start = Math.max(1, totalPages.value - maxVisible.value + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
});


const openViewModal = async (xa) => {
    try {
        const response = await getXaById(xa.id);
        const xaData = response.data || response;
        viewForm.value = { ...xaData };
        console.log('Xa data for view:', viewForm.value);
        const viewModal = new Modal(document.getElementById('viewProvinceModal'), {
            backdrop: 'static',
            keyboard: false
        });
        viewModal.show();
    } catch (error) {
        console.error('Error fetching Xa data for view:', error);
    }
};
const openEditModal = async (xa) => {
    try {
        const response = await getXaById(xa.id);
        const xaData = response.data || response;
        editForm.value = { ...xaData };
        console.log('Xa data for edit:', editForm.value);

        const editModal = new Modal(document.getElementById('editProvinceModal'), {
            backdrop: 'static',
            keyboard: false
        });
        editModal.show();
    } catch (error) {
        console.error('Error fetching Xa data for edit:', error);
    }
};

const onSearch = async () => {
    if (search.value.trim() === '') {
        fetchXaData(1);
    } else {
        try {
            const res = await searchXa(search.value, 1, limit.value);
            xaList.value = res.data;
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
        await updateXa(editForm.value.id, editForm.value);
        console.log('Xa updated successfully:', editForm.value);
        const modalElement = document.getElementById('editProvinceModal');
        const modal = Modal.getInstance(modalElement);
        modal.hide();
        await fetchXaData();
    } catch (error) {
        console.error('Error updating Xa:', error);
    }
};

const goToUser = () => {
    router.push("/");
};

const deleteXa = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa tỉnh này?')) {
        try {
            await deleteXaAPI(id);
            console.log('Xa deleted successfully:', id);
            await fetchXaData();
        } catch (error) {
            console.error('Error deleting Xa:', error);
        }
    }
};

const exportToCSV = async () => {
    try {
        let res;
        if (search.value && search.value.trim() !== '') {
            res = await searchXaAll(search.value);
        } else {
            res = await getAllXa();
        }
        const data = Array.isArray(res) ? res : res.data || [];
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }

        const headers = ['STT', 'Mã xã', 'Tên xã', 'Mã huyện', 'Huyện/Tỉnh', 'Cấp hành chính', 'Diện tích (km²)', 'Dân số (Người)'];
        const rows = data.map((x, idx) => [
            idx + 1,
            x.ma_xa ?? '',
            x.ten_xa ?? '',
            x.ma_huyen ?? '',
            [x.ten_huyen, x.ten_tinh, x.quoc_gia].filter(Boolean).join(' - '),
            x.cap_hanh_chinh ?? '',
            x.dien_tich ?? '',
            x.dan_so ?? ''
        ]);

        const csvContent = '\uFEFF' + [headers, ...rows]
            .map(row => row.map(item => `"${String(item).replace(/"/g, '""')}"`).join(','))
            .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const now = new Date();
        link.setAttribute('download', `xa_all_${now.toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Lỗi khi xuất CSV xã:', err);
        alert('Lỗi khi xuất CSV. Xem console để biết thêm chi tiết.');
    }
};

const exportToPDF = async () => {
    try {
        let res;
        if (search.value && search.value.trim() !== '') {
            res = await searchXaAll(search.value);
        } else {
            res = await getAllXa();
        }
        const data = Array.isArray(res) ? res : res.data || [];
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }

        const doc = new jsPDF('landscape');
        const title = 'Danh sách xã';
        doc.setFontSize(14);
        doc.text(title, 14, 20);

        const columns = [
            { header: 'STT', dataKey: 'stt' },
            { header: 'Mã xã', dataKey: 'ma_xa' },
            { header: 'Tên xã', dataKey: 'ten_xa' },
            { header: 'Mã huyện', dataKey: 'ma_huyen' },
            { header: 'Huyện/Tỉnh', dataKey: 'huyen_tinh' },
            { header: 'Cấp hành chính', dataKey: 'cap_hanh_chinh' },
            { header: 'Diện tích (km²)', dataKey: 'dien_tich' },
            { header: 'Dân số (Người)', dataKey: 'dan_so' }
        ];

        const rows = data.map((x, idx) => ({
            stt: idx + 1,
            ma_xa: x.ma_xa ?? '',
            ten_xa: x.ten_xa ?? '',
            ma_huyen: x.ma_huyen ?? '',
            huyen_tinh: [x.ten_huyen, x.ten_tinh, x.quoc_gia].filter(Boolean).join(' - '),
            cap_hanh_chinh: x.cap_hanh_chinh ?? '',
            dien_tich: x.dien_tich ?? '',
            dan_so: x.dan_so ?? ''
        }));

        autoTable(doc, {
            head: [columns.map(c => c.header)],
            body: rows.map(r => columns.map(c => r[c.dataKey])),
            startY: 26,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [22, 160, 133] }
        });

        const now = new Date();
        doc.save(`xa_all_${now.toISOString().slice(0,10)}.pdf`);
    } catch (err) {
        console.error('Lỗi khi xuất PDF xã:', err);
        alert('Lỗi khi xuất PDF. Xem console để biết thêm chi tiết.');
    }
};

onMounted(() => {
    fetchXaData();
});
</script>
<style scoped>
@import url('../../../assets/css/admin.css');
</style>