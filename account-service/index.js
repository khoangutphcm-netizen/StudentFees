require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Cấu hình kết nối tới Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Tạo một API test thử lấy dữ liệu từ bảng users
app.get('/api/accounts', async (req, res) => {
    try {
        // Giả sử bạn đã có bảng users trong DB
        const result = await pool.query('SELECT * FROM users LIMIT 5');
        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error("Lỗi kết nối DB:", error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Account Service đang chạy ở port ${PORT}`);
});