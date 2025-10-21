<template>
    <div class="admin-layout">
        <Header class="header" />
        <div class="main-layout">
            <Sidebar class="sidebar" />
            <main class="content">

                <div class="header-actions">
                    <h3>Danh sách người dùng :</h3>
                    <div>
                        <button class="btn btn-success" @click="openCreateModel">Thêm mới </button>

                    </div>
                </div>

                <table class="province-table table table-striped table-bordered" id="provinceTable">
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
                            <th colspan="3">Thao tác</th>
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
                                <button class="btn btn-info btn-sm" :data-id="account.id"><i
                                        class="fas fa-eye"></i></button>
                            </td>
                            <td>
                                <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                            </td>
                            <!-- <td>
                <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
              </td> -->
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
                <div class="modal fade" id="editProvinceModal" tabindex="-1" aria-labelledby="editProvinceModalLabel"
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
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import Header from '../../../components/header/HeaderAdmin.vue';
import Sidebar from '../../../components/sidebar/SidebarAdmin.vue';
import { getAllAccount, getAccountById, createAccount, updateAccount, deleteAccountAPI } from '../../../utils/api/api_account';
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
let editModal = null;
let viewModal = null;
const isCreateMode = ref(false);


const fetchAccountData = async () => {
    try {
        const response = await getAllAccount();
        accountList.value = response.data || response;
        console.log('Tinh data fetched successfully:', accountList.value);

        await nextTick();

        if ($.fn.DataTable.isDataTable('#provinceTable')) {
            $('#provinceTable').DataTable().clear().destroy();
        }

        $('#provinceTable').DataTable({
            data: accountList.value,
            columns: [
                { data: null, render: (data, type, row, meta) => meta.row + 1 },
                { data: 'ho_ten' },
                { data: 'gioi_tinh' },
                { data: 'tai_khoan' },
                { data: 'mat_khau' },
                { data: 'role' },
                { data: 'sdt' },

                {
                    data: null,
                    render: (data) =>
                        `<button class="btn btn-info btn-sm" data-id="${data.id}" title="Xem chi tiết" ><i class="fas fa-eye"></i></button>`
                },
                {
                    data: null,
                    render: (data) =>
                        `<button class="btn btn-primary btn-sm" data-id="${data.id}" title="Chỉnh sửa "><i class="fas fa-edit"></i></button>`
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
                { orderable: false, targets: [0, 7, 8, 8] }
            ]
        });

        $('#provinceTable').on('click', '.btn-info', function () {
            const id = $(this).data('id');
            const account = accountList.value.find((t) => t.id === id);
            openViewModal(account);
        });

        $('#provinceTable').on('click', '.btn-primary', function () {
            const id = $(this).data('id');
            const account = accountList.value.find((t) => t.id === id);
            openEditModal(account);
        });

        $('#provinceTable').on('click', '.btn-danger', function () {
            const id = $(this).data('id');
            deleteAccount(id);
        });
    } catch (error) {
        console.error('Error fetching Tinh data:', error);
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
    editModal.show();
};


const openViewModal = async (account) => {
    try {
        const response = await getAccountById(account.id);
        const accountData = response.data || response;
        viewForm.value = { ...accountData };
        if (!viewModal) {
            viewModal = new Modal(document.getElementById('viewProvinceModal'), {
                backdrop: 'static',
                keyboard: false
            });
        }
        viewModal.show();
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
        // if (!editModal) {
        //     editModal = new Modal(document.getElementById('editProvinceModal'), {
        //         backdrop: 'static',
        //         keyboard: false
        //     });
        // }
        editModal.show();
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
        editModal.hide();
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
//     const headers = ['STT', 'Tên tỉnh', 'Mã tỉnh', 'Quốc gia', 'Cấp hành chính', 'Diện tích (km²)', 'Dân số (Người)', 'Mô tả'];
//     const table = $('#provinceTable').DataTable();
//     const rows = table.rows({ search: 'applied', order: 'applied' }).data().toArray().map((tinh, idx) => [
//         idx + 1,
//         tinh.ten_tinh,
//         tinh.ma_tinh,
//         tinh.quoc_gia,
//         tinh.cap_hanh_chinh,
//         tinh.dien_tich,
//         tinh.dan_so,
//         tinh.mo_ta || ''
//     ]);

//     // Thêm BOM ở đầu file để hỗ trợ UTF-8 cho tiếng Việt
//     const csvContent = '\uFEFF' + [headers, ...rows]
//         .map(row => row.map(item => `"${item}"`).join(','))
//         .join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'tinh_list.csv');
//     document.body.appendChild(link); // để đảm bảo click hoạt động ổn
//     link.click();
//     document.body.removeChild(link); // xóa khỏi DOM
//     URL.revokeObjectURL(url); // giải phóng bộ nhớ
// };

// const exportToPDF = () => {
//     const table = $('#provinceTable').DataTable();

//     // 1. Lấy thông tin sort hiện tại
//     const order = table.order(); // [ [columnIndex, 'asc' or 'desc'] ]
//     const sortColIndex = order?.[0]?.[0]; // chỉ lấy cột đầu tiên
//     const colTitle = table.column(sortColIndex).header().textContent.trim();

//     // 2. Đặt tiêu đề phù hợp
//     let pdfTitle = 'Danh sách các tỉnh vùng đồng bằng sông Hồng';
//     if (colTitle === 'Dân số (Người)') pdfTitle = 'Thống kê dân số vùng đồng bằng sông Hồng ';
//     else if (colTitle === 'Diện tích (km²)') pdfTitle = 'Thống kê diện tích vùng đồng bằng sông Hồng';

//     // 3. Đặt tiêu đề cột và dữ liệu (bỏ "Mô tả")
//     const headers = [
//         'STT',
//         'Tên tỉnh',
//         'Mã tỉnh',
//         'Quốc gia',
//         'Cấp hành chính',
//         'Diện tích (km²)',
//         'Dân số (Người)'
//     ];

//     const rows = table
//         .rows({ search: 'applied', order: 'applied' })
//         .data()
//         .toArray()
//         .map((tinh, idx) => [
//             { text: idx + 1, alignment: 'center' },
//             tinh.ten_tinh ?? '',
//             tinh.ma_tinh ?? '',
//             tinh.quoc_gia ?? '',
//             tinh.cap_hanh_chinh ?? '',
//             tinh.dien_tich ?? '',
//             tinh.dan_so ?? ''
//         ]);

//     // 4. Tạo nội dung PDF
//     const docDefinition = {
//         pageSize: 'A4',
//         pageOrientation: 'portrait', // ✅ A4 Dọc
//         content: [
//             { text: pdfTitle.toUpperCase(), style: 'header', alignment: 'center', margin: [0, 0, 0, 10] },
//             {
//                 table: {
//                     headerRows: 1,
//                     widths: [20, 100, 80, 80, 80, 80, 80],
//                     body: [
//                         headers.map(h => ({ text: h, bold: true, fillColor: '#eeeeee' })),
//                         ...rows
//                     ]
//                 },
//                 layout: 'lightHorizontalLines'
//             }
//         ],
//         styles: {
//             header: {
//                 fontSize: 14,
//                 bold: true
//             }
//         },
//         defaultStyle: {
//             font: 'Roboto',
//             fontSize: 10
//         },
//         pageOrientation: 'landscape'
//     };

//     // 5. Tạo và tải PDF
//     pdfMake.createPdf(docDefinition).download(`${pdfTitle.replace(/\s+/g, '_').toLowerCase()}.pdf`);
// };


onMounted(() => {
    console.log('Account View mounted');
    editModal = new Modal(document.getElementById('editProvinceModal'), {
        backdrop: 'static',
        keyboard: false
    });
    viewModal = new Modal(document.getElementById('viewProvinceModal'), {
        backdrop: 'static',
        keyboard: false
    });
    fetchAccountData();
});

</script>

<style scoped>
@import url('../../../assets/css/admin.css');
</style>