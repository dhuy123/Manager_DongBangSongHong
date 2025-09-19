# 🌍 WebGIS Ranh Giới

Ứng dụng WebGIS hiển thị ranh giới hành chính (tỉnh/huyện/xã) sử dụng **Node.js + Express + PostgreSQL (PostGIS)** cho backend và **Vue.js + OpenLayers** cho frontend.  
Dự án áp dụng mô hình **MVC** để dễ dàng phát triển và bảo trì.

---

## 📂 Cấu trúc dự án

```bash
ranhgioi1/
|
├── backend/               # Backend (Node.js + Express + PostgreSQL)
│   ├── src/
|   |   ├── config/        # Cấu hình kết nối DB 
│   │   ├── controllers/   # Controller xử lý request
│   │   ├── models/        # Model kết nối CSDL (PostgreSQL + PostGIS)
│   │   ├── routes/        # Router định nghĩa API
│   │   ├── services/      # Business logic
│   │   └── app.js         # File khởi động backend
│   ├── package.json
│   └── .env               # Thông tin kết nối DB
│
├── frontend/              # Frontend (Vue.js + Vite + OpenLayers)
│   ├── src/
│   │   ├── assets/        # CSS, hình ảnh, icon
│   │   ├── components/    # Các component Vue
│   │   ├── views/         # Giao diện chính
│   │   ├── router/        # Vue Router
│   │   └── main.js        # File khởi động Vue
│   ├── index.html
│   └── package.json
│
├── README.md
└── .gitignore
