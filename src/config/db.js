const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // 👉 Chỉ tạo admin nếu chưa tồn tại
    const adminUsername = 'adminHLG';

    const existingAdmin = await User.findOne({
      username: adminUsername
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const adminUser = new User({
        username: adminUsername,
        cccd: adminUsername,
        email: 'adminHLG@gmail.com',
        password: hashedPassword,
        fullName: 'System Admin',
        phone: '0000000000',
        role: 'admin',
        isFirstLogin: false,
        status: 'active',
        sharesCount: 0
      });

      await adminUser.save();

      console.log('✅ Admin account created: admin / admin123');
    } else {
      console.log('ℹ️ Admin already exists');
    }

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;