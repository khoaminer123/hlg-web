const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB URI from .env or default
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jwt_auth';

async function updateStockPrice() {
    try {
        console.log('Đang kết nối tới MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Kết nối thành công!');

        const db = mongoose.connection.db;
        const collection = db.collection('systemconfigs');

        const key = 'stockPrice';
        const newValue = 10000;

        const result = await collection.updateOne(
            { key: key },
            {
                $set: {
                    value: newValue,
                    description: 'Giá cổ phiếu mặc định (Cập nhật từ script)',
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        if (result.matchedCount > 0) {
            console.log(`Đã cập nhật giá cổ phần thành: ${newValue.toLocaleString('vi-VN')} VNĐ`);
        } else if (result.upsertedCount > 1) {
            console.log(`Đã tạo mới cấu hình giá cổ phần: ${newValue.toLocaleString('vi-VN')} VNĐ`);
        } else {
            console.log('Giá cổ phần đã được cập nhật hoặc tạo mới.');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Lỗi:', err);
        process.exit(1);
    }
}

updateStockPrice();
