require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User.model');
const connectDB = require('./src/config/db');

const createAdmin = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        // CHỈ CẦN CẤU HÌNH 2 THÔNG TIN NÀY
        const adminId = 'adminHLG'; // ID tài khoản của bạn (Vd: adminHT)
        const adminPassword = 'admin123'; // Mật khẩu của bạn

        // Hàm kiểm tra xem ID này (dù nhập ở form là cccd hay username) đã tồn tại chưa
        const existingAdmin = await User.findOne({
            $or: [{ username: adminId }, { cccd: adminId }]
        });

        if (existingAdmin) {
            console.log(`Tài khoản Admin với ID '${adminId}' đã tồn tại!`);
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Tạo tài khoản với ID mong muốn, các trường còn lại sẽ được tự động điền giá trị ngẫu nhiên hợp lệ
        const adminUser = new User({
            username: adminId,            // Khớp với loginId
            cccd: adminId,                // Khớp với loginId (để vượt qua lúc đăng nhập)
            email: `${adminId}@admin.local`, // Tự sinh
            password: hashedPassword,
            fullName: 'System Admin',
            phone: '0000000000',
            role: 'admin',
            isFirstLogin: false,
            status: 'active',
            sharesCount: 0
        });

        await adminUser.save();
        console.log(`\n======================================`);
        console.log(`🎉 TẠO TÀI KHOẢN ADMIN THÀNH CÔNG!`);
        console.log(`-> ID đăng nhập: ${adminId}`);
        console.log(`-> Mật khẩu: ${adminPassword}`);
        console.log(`======================================\n`);

        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
