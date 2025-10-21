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
                            <td>
                                <button class="btn btn-info btn-sm" :data-id="huyen.id"><i
                                        class="fas fa-eye"></i></button>
                            </td>
                            <td>
                                <button class="btn btn-primary btn-sm" @click="goToImagePage(huyen.id)"><i
                                        class="fas fa-image"></i></button>
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
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import Header from '../../../components/header/HeaderAdmin.vue';
import Sidebar from '../../../components/sidebar/SidebarAdmin.vue';
import { getAllHuyen, getHuyenById, updateHuyen, deleteHuyenAPI } from '../../../utils/api/api_huyen.js';
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
let editModal = null;
let viewModal = null;

const fetchHuyenData = async () => {
    try {
        const response = await getAllHuyen();
        huyenList.value = response.data || response;
        console.log('Huyen data fetched successfully:', huyenList.value);

        await nextTick();

        if ($.fn.DataTable.isDataTable('#provinceTable')) {
            $('#provinceTable').DataTable().clear().destroy();
        }

        $('#provinceTable').DataTable({
            data: huyenList.value,
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1 },
                { data: 'ma_huyen' },
                { data: 'ten_huyen' },
                { data: 'ma_tinh' },
                {
                    data: null,
                    render: (data, type, row) => `${row.ten_tinh} (${row.quoc_gia})`
                },
                { data: 'cap_hanh_chinh' },
                { data: 'dien_tich' },
                { data: 'dan_so' },
                {
                    data: null,
                    render: (data) =>
                        `<button class="btn btn-info btn-sm" data-id="${data.id}" title="Xem chi tiết" ><i class="fas fa-eye"></i></button>`
                },
                {
                    data: null,
                    render: (data) =>
                        `<button class="btn btn-primary btn-sm" data-id="${data.ma_huyen}" title="Ảnh"><i class="fas fa-image"></i></button>`
                },
                {
                    data: null,
                    render: (data) =>
                        `<button class="btn btn-warning btn-sm" data-id="${data.id}" title="Chỉnh sửa "><i class="fas fa-edit"></i></button>`
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
                { orderable: false, targets: [0, 7, 8, 10] }
            ]
        });

        $('#provinceTable').on('click', '.btn-info', function () {
            const id = $(this).data('id');
            const huyen = huyenList.value.find((t) => t.id === id);
            openViewModal(huyen);
        });

        $('#provinceTable').on('click', '.btn-primary', function () {
            const ma_huyen = $(this).data('id');
            goToImagePage(ma_huyen); // Handle image button click
        });

        $('#provinceTable').on('click', '.btn-warning', function () {
            const id = $(this).data('id');
            const huyen = huyenList.value.find((t) => t.id === id);
            openEditModal(huyen);
        });

        $('#provinceTable').on('click', '.btn-danger', function () {
            const id = $(this).data('id');
            deleteHuyen(id);
        });
    } catch (error) {
        console.error('Error fetching Huyen data:', error);
    }
};

const openViewModal = async (huyen) => {
    try {
        const response = await getHuyenById(huyen.id);
        const huyenData = response.data || response;
        viewForm.value = { ...huyenData };
        console.log('Huyen data for view:', viewForm.value);
        if (!viewModal) {
            viewModal = new Modal(document.getElementById('viewProvinceModal'), {
                backdrop: 'static',
                keyboard: false
            });
        }
        viewModal.show();
    } catch (error) {
        console.error('Error fetching Huyen data for view:', error);
    }
};

const openEditModal = async (huyen) => {
      if (!huyen || !huyen.id) {
        console.error('Huyện không hợp lệ:', huyen);
        return;
    }
    try {
        const response = await getHuyenById(huyen.id);
        const huyenData = response.data || response;
        editForm.value = { ...huyenData };
        console.log('Huyen data for edit:', editForm.value);
        if (!editModal) {
            editModal = new Modal(document.getElementById('editProvinceModal'), {
                backdrop: 'static',
                keyboard: false
            });
        }
        editModal.show();
    } catch (error) {
        console.error('Error fetching Huyen data for edit:', error);
    }
};

const submitEditForm = async () => {
    try {
        await updateHuyen(editForm.value.id, editForm.value);
        console.log('Huyen updated successfully:', editForm.value);

        // Cập nhật dữ liệu trong huyenList
        const index = huyenList.value.findIndex(h => h.id === editForm.value.id);
        if (index !== -1) {
            huyenList.value[index] = {
                ...huyenList.value[index],  // giữ lại ten_tinh, ten_quocgia cũ
                ...editForm.value,          // ghi đè các trường đã sửa
            };

        }

        // Làm mới bảng DataTable mà không phá hủy
        const table = $('#provinceTable').DataTable();
        table.clear(); // Xóa dữ liệu cũ
        table.rows.add(huyenList.value); // Thêm dữ liệu mới
        table.draw(); // Vẽ lại bảng

        // Đóng modal
        if (editModal) {
            editModal.hide();
        }
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

const exportToCSV = () => {
    const headers = ['STT', 'Mã huyện', 'Tên huyện', 'Mã Tỉnh', 'Tỉnh/Thành Phố ', 'Cấp hành chính', 'Diện tích (km²)', 'Dân số (Người)', 'Mô tả'];
    const table = $('#provinceTable').DataTable();
    const rows = table.rows({ search: 'applied', order: 'applied' }).data().toArray().map((huyen, idx) => [
        idx + 1,
        huyen.ma_huyen,
        huyen.ten_huyen,
        huyen.ma_tinh,
        huyen.ten_tinh + '-' + huyen.quoc_gia,
        huyen.cap_hanh_chinh,
        huyen.dien_tich,
        huyen.dan_so,
        huyen.mo_ta || ''
    ]);

    // Thêm BOM ở đầu file để hỗ trợ UTF-8 cho tiếng Việt
    const csvContent = '\uFEFF' + [headers, ...rows]
        .map(row => row.map(item => `"${item}"`).join(','))
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'huyen_list.csv');
    document.body.appendChild(link); // để đảm bảo click hoạt động ổn
    link.click();
    document.body.removeChild(link); // xóa khỏi DOM
    URL.revokeObjectURL(url); // giải phóng bộ nhớ
};

const exportToPDF = () => {
    const table = $('#provinceTable').DataTable();

    // 1. Lấy thông tin sort hiện tại
    const order = table.order(); // [ [columnIndex, 'asc' or 'desc'] ]
    const sortColIndex = order?.[0]?.[0]; // chỉ lấy cột đầu tiên
    const colTitle = table.column(sortColIndex).header().textContent.trim();

    // 2. Đặt tiêu đề phù hợp
    let pdfTitle = 'Danh sách các huyện vùng đồng bằng sông Hồng';
    if (colTitle === 'Dân số (Người)') pdfTitle = 'Thống kê dân số các huyện vùng đồng bằng sông Hồng ';
    else if (colTitle === 'Diện tích (km²)') pdfTitle = 'Thống kê diện tích các huyện vùng đồng bằng sông Hồng';

    // 3. Đặt tiêu đề cột và dữ liệu (bỏ "Mô tả")
    const headers = [
        'STT', 'Mã huyện', 'Tên huyện', 'Mã Tỉnh', 'Tỉnh/Thành Phố ', 'Cấp hành chính', 'Diện tích (km²)', 'Dân số (Người)'
    ];

    const rows = table
        .rows({ search: 'applied', order: 'applied' })
        .data()
        .toArray()
        .map((huyen, idx) => [
            { text: idx + 1, alignment: 'center' },
            huyen.ma_huyen ?? '',
            huyen.ten_huyen ?? '',
            huyen.ma_tinh ?? '',
            [huyen.ten_tinh, huyen.quoc_gia].filter(Boolean).join(' - '),
            huyen.cap_hanh_chinh ?? '',
            huyen.dien_tich ?? '',
            huyen.dan_so ?? ''
        ]);

    if (rows.includes(undefined)) {
        console.error('❌ Dòng có undefined:', rows);
        return rows;
    }

    // 4. Tạo nội dung PDF
    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait', // ✅ A4 Dọc
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
        },
        pageOrientation: 'landscape'
    };

    // 5. Tạo và tải PDF
    pdfMake.createPdf(docDefinition).download(`${pdfTitle.replace(/\s+/g, '_').toLowerCase()}.pdf`);
};

const goToImagePage = (ma_huyen) => {
    console.log('Navigating to image page for ID:', ma_huyen);
    router.push(`/admin/ImgHuyen/${ma_huyen}`);
};



onMounted(() => {
    fetchHuyenData();
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