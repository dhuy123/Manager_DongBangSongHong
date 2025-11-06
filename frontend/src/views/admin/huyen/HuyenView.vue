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
                            <th>Mã huyện</th>
                            <th>Tên huyện</th>
                            <th>Mã tỉnh</th>
                            <th> Tỉnh </th>
                            <th>Cấp hành chính</th>
                            <th>Diện tích (km²)</th>
                            <th>Dân số (Người)</th>
                            <!-- <th>Mô tả</th> -->
                            <th colspan="3">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(huyen, index) in huyenList" :key="huyen.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ huyen.ma_huyen }}</td>
                            <td>{{ huyen.ten_huyen }}</td>
                            <td>{{ huyen.ma_tinh }}</td>
                            <td>{{ huyen.ten_tinh }} - {{ huyen.quoc_gia }}</td>
                            <td>{{ huyen.cap_hanh_chinh }}</td>
                            <td>{{ huyen.dien_tich }}</td>
                            <td>{{ huyen.dan_so }}</td>
                            <td class="d-flex justify-content-between">
                                <button class="btn btn-info btn-sm me-1" @click="openViewModal(huyen)"><i
                                        class="fas fa-eye"></i></button>
                                <button class="btn btn-primary btn-sm" @click="goToImagePage(huyen.ma_huyen)"><i
                                        class="fas fa-image"></i></button>
                                <button class="btn btn-warning btn-sm me-1" @click="openEditModal(huyen)"><i
                                        class="fas fa-edit"></i></button>
                                <button class="btn btn-danger btn-sm" @click="deleteHuyen(huyen.id)"><i
                                        class="fas fa-trash"></i></button>
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
                        <li class="page-item" v-for="page in totalPages" :key="page"
                            :class="{ active: currentPage === page }">
                            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                        </li>
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
                                <h5 class="modal-title">Chi tiết thông tin huyện</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Mã huyện:</label>
                                    <p>{{ viewForm.ma_huyen }}</p>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Tên huyện:</label>
                                    <p>{{ viewForm.ten_huyen }}</p>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label fw-bold">Mã tỉnh:</label>
                                    <p>{{ viewForm.ma_tinh }}</p>
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
                                <h5 class="modal-title">Chỉnh sửa thông tin tỉnh</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="submitEditForm">
                                    <div class="mb-3">
                                        <label for="ma_huyen" class="form-label">Mã huyện</label>
                                        <input v-model="editForm.ma_huyen" type="text" class="form-control"
                                            id="ma_huyen" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="ten_huyen" class="form-label">Tên huyện</label>
                                        <input v-model="editForm.ten_huyen" type="text" class="form-control"
                                            id="ten_huyen" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="ma_huyen" class="form-label">Mã tỉnh</label>
                                        <input v-model="editForm.ma_tinh" type="text" class="form-control" id="quoc_gia"
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '../../../components/header/HeaderAdmin.vue';
import Sidebar from '../../../components/sidebar/SidebarAdmin.vue';
import { getPaginatedHuyen, searchHuyen, getHuyenById, updateHuyen, deleteHuyenAPI, getAllHuyen, searchHuyenAll } from '../../../utils/api/api_huyen';
// PDF generation
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Modal } from 'bootstrap';

const huyenList = ref([]);
const router = useRouter();
const editForm = ref({
    id: null,
    ten_huyen: '',
    ma_huyen: '',
    ma_tinh: '',
    ten_tinh: '',
    quoc_gia: '',
    cap_hanh_chinh: '',
    dien_tich: 0,
    dan_so: 0,
    mo_ta: ''
});
const viewForm = ref({
    id: null,
    ten_huyen: '',
    ma_huyen: '',
    ma_tinh: '',
    cap_hanh_chinh: '',
    dien_tich: 0,
    dan_so: 0,
    mo_ta: ''
});

const search = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const limit = ref(10);

const fetchHuyenData = async (page = 1) => {
    try {
        const response = await getPaginatedHuyen(page, limit.value);
        huyenList.value = response.data;
        currentPage.value = response.currentPage;
        totalPages.value = response.totalPages;
        console.log("Tổng số bản ghi:", response.totalRecords);
        console.log("Page:", response.currentPage, "Total pages:", totalPages.value);
        console.log('Huyen data fetched successfully:', huyenList.value);
    } catch (error) {
        console.error('Error fetching Huyen data:', error);
    }
};

const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    fetchHuyenData(page);
};

const onSearch = async () => {
    if (search.value.trim() === '') {
        await fetchHuyenData(1);
        return;
    } else {
        try {
            const response = await searchHuyen(search.value, 1, limit.value);
            huyenList.value = response.data || response;
            currentPage.value = response.currentPage;
            totalPages.value = response.totalPages;
            console.log("từ khóa tìm kiếm:", search.value);
            console.log("Kết quả tìm kiếm:", response);
        } catch (error) {
            console.error('Error searching Huyen:', error);
        }
    }
};

const openViewModal = async (huyen) => {
    try {
        const response = await getHuyenById(huyen.id);
        const huyenData = response.data || response;
        viewForm.value = { ...huyenData };
        const modalEl = document.getElementById('viewProvinceModal');
        const modal = new Modal(modalEl, {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();
    } catch (error) {
        console.error('Error fetching Huyen data for view:', error);
    }
};

const openEditModal = async (huyen) => {
    editForm.value = { ...huyen };
    const modalEl = document.getElementById('editProvinceModal');
    const editModal = new Modal(modalEl, {
        backdrop: 'static',
        keyboard: false
    });
    editModal.show();
};

const submitEditForm = async () => {
    try {
        await updateHuyen(editForm.value.id, editForm.value);
        console.log('Huyen updated successfully:', editForm.value);
        const modalEl = document.getElementById('editProvinceModal');
        const editModal = Modal.getInstance(modalEl);
        editModal.hide();
        fetchHuyenData(1)
    } catch (error) {
        console.error('Error updating Huyen:', error);
    }
};

const deleteHuyen = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa tỉnh này?')) {
        try {
            await deleteHuyenAPI(id);
            console.log('Huyen deleted successfully:', id);
            await fetchHuyenData();
        } catch (error) {
            console.error('Error deleting Huyen:', error);
        }
    }
};

const exportToCSV = async () => {
    try {
        let res;
        if (search.value && search.value.trim() !== '') {
            res = await searchHuyenAll(search.value);
        } else {
            res = await getAllHuyen();
        }
        const data = Array.isArray(res) ? res : res.data || [];
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }

        const headers = ['STT', 'Mã huyện', 'Tên huyện', 'Mã tỉnh', 'Tỉnh', 'Cấp hành chính', 'Diện tích (km²)', 'Dân số (Người)'];
        const rows = data.map((h, idx) => [
            idx + 1,
            h.ma_huyen ?? '',
            h.ten_huyen ?? '',
            h.ma_tinh ?? '',
            [h.ten_tinh, h.quoc_gia].filter(Boolean).join(' - '),
            h.cap_hanh_chinh ?? '',
            h.dien_tich ?? '',
            h.dan_so ?? ''
        ]);

        const csvContent = '\uFEFF' + [headers, ...rows]
            .map(row => row.map(item => `"${String(item).replace(/"/g, '""')}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const now = new Date();
        link.setAttribute('download', `huyen_all_${now.toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Lỗi khi xuất CSV huyện:', err);
        alert('Lỗi khi xuất CSV. Xem console để biết thêm chi tiết.');
    }
};

const exportToPDF = async () => {
    try {
        let res;
        if (search.value && search.value.trim() !== '') {
            res = await searchHuyenAll(search.value);
        } else {
            res = await getAllHuyen();
        }
        const data = Array.isArray(res) ? res : res.data || [];
        if (!data || data.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }

        const doc = new jsPDF('landscape');
        const title = 'Danh sách huyện';
        doc.setFontSize(14);
        doc.text(title, 14, 20);

        const columns = [
            { header: 'STT', dataKey: 'stt' },
            { header: 'Mã huyện', dataKey: 'ma_huyen' },
            { header: 'Tên huyện', dataKey: 'ten_huyen' },
            { header: 'Mã tỉnh', dataKey: 'ma_tinh' },
            { header: 'Tỉnh', dataKey: 'tinh' },
            { header: 'Cấp hành chính', dataKey: 'cap_hanh_chinh' },
            { header: 'Diện tích (km²)', dataKey: 'dien_tich' },
            { header: 'Dân số (Người)', dataKey: 'dan_so' }
        ];

        const rows = data.map((h, idx) => ({
            stt: idx + 1,
            ma_huyen: h.ma_huyen ?? '',
            ten_huyen: h.ten_huyen ?? '',
            ma_tinh: h.ma_tinh ?? '',
            tinh: [h.ten_tinh, h.quoc_gia].filter(Boolean).join(' - '),
            cap_hanh_chinh: h.cap_hanh_chinh ?? '',
            dien_tich: h.dien_tich ?? '',
            dan_so: h.dan_so ?? ''
        }));

        autoTable(doc, {
            head: [columns.map(c => c.header)],
            body: rows.map(r => columns.map(c => r[c.dataKey])),
            startY: 26,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [22, 160, 133] }
        });

        const now = new Date();
        doc.save(`huyen_all_${now.toISOString().slice(0,10)}.pdf`);
    } catch (err) {
        console.error('Lỗi khi xuất PDF huyện:', err);
        alert('Lỗi khi xuất PDF. Xem console để biết thêm chi tiết.');
    }
};

const goToImagePage = (ma_huyen) => {
    console.log('Navigating to image page for ID:', ma_huyen);
    router.push(`/admin/ImgHuyen/${ma_huyen}`);
};



onMounted(() => {
    fetchHuyenData();
});
</script>

<style scoped>
@import url('../../../assets/css/admin.css');
</style>