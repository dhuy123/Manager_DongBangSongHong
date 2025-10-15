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

const getAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await accountModel.getAccountById(id);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching district by ID:", error);
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
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}