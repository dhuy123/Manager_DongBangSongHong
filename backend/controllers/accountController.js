const accountModel = require('../models/accountModel');

const getAllAccount = async (req, res) => {
    try {
        const response = await accountModel.getAllAccount();
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching all districts:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
}

const getPaginatedAccount = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const result = await accountModel.getPaginationAccount(parseInt(page), parseInt(limit));
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching paginated accounts:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

const searchAccount = async (req, res) => {
    try {
        const query = req.query.q;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        console.log("🔍 Từ khóa tìm kiếm:", query)
        if (!query) {
            return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
        }
        const result = await accountModel.searchAccount(query, page, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error searching accounts:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }   
};

// Trả về tất cả kết quả tìm kiếm (không phân trang) để xuất
const searchAccountAll = async (req, res) => {
    try {
        const query = req.query.query;
        console.log("🔍 Từ khóa tìm kiếm (all):", query);
        if (!query) {
            return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
        }
        const result = await accountModel.searchAccountAll(query);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error searching accounts (all):", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

const getAccountById = async (req, res) => {
    const { id } = req.params;
    console.log("🔍 Lấy thông tin tài khoản với ID:", id);
    try {
        const response = await accountModel.getAccountById(id);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching account by ID:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
}

const createAccount = async (req, res) => {
    const data = req.body;
    console.log("Dữ liệu gửi lên:", data);
    try {
        const newAccount = await accountModel.createAccount(data);
        res.status(201).json(newAccount);
    } catch (error) {
        console.error("Error creating district:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
}


const updateAccount = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log("Dữ liệu gửi lên:", data);
    try {
        const updatedAccount = await accountModel.updateAccount(id, data);
        res.status(200).json(updatedAccount);
    } catch (error) {
        console.error("Error updating district:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
}

const deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        await accountModel.deleteAccount(id);
        res.status(200).json({ message: "Huyện đã được xóa thành công" });
    } catch (error) {
        console.error("Error deleting district:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
}

module.exports = {
    getAllAccount,
    getPaginatedAccount,
    searchAccount,
    searchAccountAll,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}