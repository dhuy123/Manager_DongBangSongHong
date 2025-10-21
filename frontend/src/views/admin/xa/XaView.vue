<template>
    <div class="admin-layout">
        <Header class="header" />
        <div class="main-layout">
            <Sidebar class="sidebar" />
            <main class="content">

                <div class="header-actions">
                    <h3>Danh sách các tỉnh:</h3>
                    <div>
                        <button class="btn btn-success" @click="exportToCSV">Xuất CSV</button>
                        <button class="btn btn-danger" @click="exportToPDF">Xuất PDF</button>
                    </div>
                </div>

                <table class="province-table table table-striped table-bordered" id="provinceTable">
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
                            <td>
                                <button class="btn btn-info btn-sm" :data-id="xa.id"><i class="fas fa-eye"></i></button>
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
                                    <label class="form-label fw-bold">Mã tỉnh:</label>
                                    <p>{{ viewForm.ma_huyen }}</p>
                                </div>
                                 <div class="mb-3">
                                    <label class="form-label fw-bold">Huyện/Tỉnh</label>
                                    <p>{{  viewForm.ten_huyen }} - {{  viewForm.ten_tinh }} - {{  viewForm.quoc_gia }}</p>
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
                <div class="modal fade" id="editProvinceModal" tabindex="-1" aria-labelledby="editProvinceModalLabel"
                    aria-hidden="true">
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
                                        <label for="ma_xa" class="form-label">Mã huyện</label>
                                        <input v-model="editForm.ma_xa" type="text" class="form-control" id="ma_xa"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="ten_xa" class="form-label">Tên huyện</label>
                                        <input v-model="editForm.ten_xa" type="text" class="form-control" id="ten_xa"
                                            required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="ma_xa" class="form-label">Mã huyện</label>
                                        <input v-model="editForm.ma_huyen" type="text" class="form-control"
                                            id="quoc_gia" required>
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
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../../../components/header/HeaderAdmin.vue';
import Sidebar from '../../../components/sidebar/SidebarAdmin.vue';
import { getAllXa, getXaById, updateXa, deleteXaAPI } from '../../../utils/api/api_xa';
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
    ten_tinh: '',
    quoc_gia: '',
    cap_hanh_chinh: '',
    dien_tich: 0,
    dan_so: 0,
    mo_ta: ''
});
let editModal = null;
let viewModal = null;

const fetchXaData = async () => {
    try {
        const response = await getAllXa();
        xaList.value = response.data || response;
        console.log('Xa data fetched successfully:', xaList.value);

        await nextTick();

        if ($.fn.DataTable.isDataTable('#provinceTable')) {
            $('#provinceTable').DataTable().clear().destroy();
        }

        $('#provinceTable').DataTable({
            data: xaList.value,
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1 },
                { data: 'ma_xa' },
                { data: 'ten_xa' },
                { data: 'ma_huyen' },
                {
                    data: null,
                    render: (data, type, row) => `${row.ten_huyen}, ${row.ten_tinh}, ${row.quoc_gia}`
                },
                { data: 'cap_hanh_chinh' },
                { data: 'dien_tich' },
                { data: 'dan_so' },
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
            columnDefs: [
                { orderable: false, targets: [0, 8, 9, 10] } // Adjusted targets to match column indices
            ]
        });

        // Event delegation for buttons
        $('#provinceTable').on('click', '.btn-info', function () {
            const id = $(this).data('id');
            const xa = xaList.value.find((t) => t.id === id);
            openViewModal(xa);
        });

        $('#provinceTable').on('click', '.btn-primary', function () {
            const id = $(this).data('id');
            const xa = xaList.value.find((t) => t.id === id);
            openEditModal(xa);
        });

        $('#provinceTable').on('click', '.btn-danger', function () {
            const id = $(this).data('id');
            deleteXa(id);
        });
    } catch (error) {
        console.error('Error fetching Xa data:', error);
    }
};

const openViewModal = async (xa) => {
    try {
        const response = await getXaById(xa.id);
        const xaData = response.data || response;

        viewForm.value = { ...xaData };
        console.log('Xa data for view:', viewForm.value);

        await nextTick(); // ⬅ Đợi Vue cập nhật DOM xong

        const modalElement = document.getElementById('viewProvinceModal');

        if (!viewModal) {
            viewModal = new Modal(modalElement, {
                backdrop: 'static',
                keyboard: false
            });
        }

        // Gắn sự kiện chỉ 1 lần
        if (!modalElement.hasAttribute('data-events-attached')) {
            modalElement.setAttribute('data-events-attached', 'true');

            modalElement.addEventListener('shown.bs.modal', () => {
                const closeButton = modalElement.querySelector('.btn-close');
                if (closeButton) closeButton.focus();
            });

            modalElement.addEventListener('hidden.bs.modal', () => {
                const triggerButton = document.querySelector(`#provinceTable button.btn-info[data-id="${xa.id}"]`);
                if (triggerButton) triggerButton.focus();
            });
        }

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

        if (!editModal) {
            editModal = new Modal(document.getElementById('editProvinceModal'), {
                backdrop: 'static',
                keyboard: false
            });
        }

        // Show modal and manage focus
        editModal.show();
        const modalElement = document.getElementById('editProvinceModal');
        modalElement.addEventListener('shown.bs.modal', () => {
            // Ensure aria-hidden is removed when modal is shown
            modalElement.removeAttribute('aria-hidden');
            // Focus the first input field
            const firstInput = modalElement.querySelector('#ma_xa');
            if (firstInput) {
                firstInput.focus();
            }
        }, { once: true });

        modalElement.addEventListener('hidden.bs.modal', () => {
            // Restore aria-hidden when modal is hidden
            modalElement.setAttribute('aria-hidden', 'true');
            // Move focus back to the triggering button
            const triggerButton = document.querySelector(`#provinceTable button.btn-primary[data-id="${xa.id}"]`);
            if (triggerButton) {
                triggerButton.focus();
            }
        }, { once: true });
    } catch (error) {
        console.error('Error fetching Xa data for edit:', error);
    }
};

const submitEditForm = async () => {
    try {
        await updateXa(editForm.value.id, editForm.value);
        console.log('Xa updated successfully:', editForm.value);

        // Update xaList
        const index = xaList.value.findIndex(h => h.id === editForm.value.id);
        if (index !== -1) {
            xaList.value[index] = { ...xaList.value[index], ...editForm.value };
        }

        // Refresh DataTable
        const table = $('#provinceTable').DataTable();
        table.clear();
        table.rows.add(xaList.value);
        table.draw();

        // Close modal
        if (editModal) {
            editModal.hide();
        }
    } catch (error) {
        console.error('Error updating Xa:', error);
    }
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

const exportToCSV = () => {
    const headers = ['STT', 'Mã huyện', 'Tên huyện', 'Mã Tỉnh', 'Tỉnh/Thành Phố', 'Cấp hành chính', 'Diện tích (km²)', 'Dân số (Người)', 'Mô tả'];
    const table = $('#provinceTable').DataTable();
    const rows = table.rows({ search: 'applied', order: 'applied' }).data().toArray().map((xa, idx) => [
        idx + 1,
        xa.ma_xa,
        xa.ten_xa,
        xa.ma_huyen,
        `${xa.ten_huyen} - ${xa.ten_tinh} - ${xa.quoc_gia}`,
        xa.cap_hanh_chinh,
        xa.dien_tich,
        xa.dan_so,
        xa.mo_ta || ''
    ]);

    const csvContent = '\uFEFF' + [headers, ...rows]
        .map(row => row.map(item => `"${item}"`).join(','))
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'xa_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const exportToPDF = () => {
    const table = $('#provinceTable').DataTable();
    const order = table.order();
    const sortColIndex = order?.[0]?.[0];
    const colTitle = table.column(sortColIndex).header().textContent.trim();

    let pdfTitle = 'Danh sách các huyện vùng đồng bằng sông Hồng';
    if (colTitle === 'Dân số (Người)') pdfTitle = 'Thống kê dân số các huyện vùng đồng bằng sông Hồng';
    else if (colTitle === 'Diện tích (km²)') pdfTitle = 'Thống kê diện tích các huyện vùng đồng bằng sông Hồng';

    const headers = [
        'STT', 'Mã huyện', 'Tên huyện', 'Mã Tỉnh', 'Tỉnh/Thành Phố', 'Cấp hành chính', 'Diện tích (km²)', 'Dân số (Người)'
    ];

    const rows = table
        .rows({ search: 'applied', order: 'applied' })
        .data()
        .toArray()
        .map((xa, idx) => [
            { text: idx + 1, alignment: 'center' },
            xa.ma_xa ?? '',
            xa.ten_xa ?? '',
            xa.ma_huyen ?? '',
            [xa.ten_huyen, xa.ten_tinh, xa.quoc_gia].filter(Boolean).join(' - '),
            xa.cap_hanh_chinh ?? '',
            xa.dien_tich ?? '',
            xa.dan_so ?? ''
        ]);

    if (rows.some(row => row.includes(undefined))) {
        console.error('❌ Dòng có undefined:', rows);
        return;
    }

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape', // Changed to landscape to fit table
        content: [
            { text: pdfTitle.toUpperCase(), style: 'header', alignment: 'center', margin: [0, 0, 0, 10] },
            {
                table: {
                    headerRows: 1,
                    widths: [20, 80, 100, 80, 120, 80, 80, 80],
                    body: [
                        headers.map(h => ({ text: h, bold: true, fillColor: '#eeeeee' })),
                        ...rows
                    ]
                },
                layout: 'lightHorizontalLines'
            }
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true
            }
        },
        defaultStyle: {
            font: 'Roboto',
            fontSize: 10
        }
    };

    pdfMake.createPdf(docDefinition).download(`${pdfTitle.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};

onMounted(() => {
    fetchXaData();
    // Initialize modals
    editModal = new Modal(document.getElementById('editProvinceModal'), {
        backdrop: 'static',
        keyboard: false
    });
    viewModal = new Modal(document.getElementById('viewProvinceModal'), {
        backdrop: 'static',
        keyboard: false
    });
});
</script>
<style scoped>
@import url('../../../assets/css/admin.css');
</style>