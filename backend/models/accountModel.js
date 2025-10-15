const db = require('../config/database');

const getAllAccount = async () =>{
    try{
        const result = await db.query(`SELECT * FROM "user" `);
        return result.rows;
    } catch (error) {
    console.error("Error fetching all account:", error);
    throw new Error("Database error");
  }
}

const getAccountById = async (id) => {
    try {  
        const result = await db.query(`SELECT * FROM "user" WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            throw new Error("Account not found");
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching account by ID:", error); 
        throw new Error("Database error");
    }   
}

const createAccount = async (data) => {
    try {   
        const { tai_khoan, mat_khau, ho_ten, role, gioi_tinh, sdt } = data;
        const result = await db.query(
            `INSERT INTO "user" (tai_khoan, mat_khau, ho_ten, role, gioi_tinh, sdt) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [tai_khoan, mat_khau, ho_ten, role, gioi_tinh, sdt]
        );
        return result.rows[0]; // Trả về tài khoản đã tạo
    } catch (error) {
        console.error("Error creating account:", error);    
        throw new Error("Database error");
    }
}

const updateAccount = async (id, data) => {
    try {       
        const {tai_khoan, mat_khau, ho_ten, role, gioi_tinh, sdt } = data;
        const result = await db.query(
            `UPDATE "user" SET tai_khoan = $1, mat_khau = $2, ho_ten = $3, role = $4, gioi_tinh = $5, sdt = $6 WHERE id = $7 RETURNING *`,
            [tai_khoan, mat_khau, ho_ten, role, gioi_tinh, sdt, id]
        );
        if (result.rows.length === 0) {
            throw new Error("Account not found");
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error updating account:", error);
        throw new Error("Database error");
    }
}
const deleteAccount = async (id) => {
    try {       

        const result = await db.query(`DELETE FROM "user" WHERE id = $1`, [id]);
        if (result.rowCount === 0) {    
            throw new Error("Account not found");
        }   
    } catch (error) {
        console.error("Error deleting account:", error);        
        throw new Error("Database error");
    }
}



module.exports ={
    getAllAccount,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}