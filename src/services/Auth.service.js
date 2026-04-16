const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuditLog = require('../models/AuditLog.model');

const register = async (data, adminId) => {
  const {
    username, email, cccd, fullName, dob, gender,
    hometown, residence, expiryDate, phone,
    sharesFounder, sharesStrategic, sharesCommon, avatar, strategicCertImage
  } = data;

  // 1. Kiểm tra trùng lặp
  const existedUser = await User.findOne({
    $or: [{ email }, { cccd }, { username }]
  });
  if (existedUser) throw new Error('Email, CCCD hoặc Username đã tồn tại');

  // 2. Hash mật khẩu mặc định 123456
  const defaultPassword = '123456';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // 3. Tạo User mới
  const user = await User.create({
    username,
    email,
    cccd,
    password: hashedPassword,
    fullName,
    dob,
    gender,
    hometown,
    residence,
    expiryDate,
    phone,
    sharesCount: (Number(sharesFounder) || 0) + (Number(sharesStrategic) || 0) + (Number(sharesCommon) || 0),
    sharesFounder: Number(sharesFounder) || 0,
    sharesStrategic: Number(sharesStrategic) || 0,
    sharesCommon: Number(sharesCommon) || 0,
    role: 'shareholder',
    isFirstLogin: true,
    status: 'active',
    avatar,
    strategicCertImage
  });

  // 4. Audit Log
  await AuditLog.create({
    adminId,
    action: 'CREATE_SHAREHOLDER',
    targetUserId: user._id,
    details: { username: user.username, sharesCount: user.sharesCount }
  });

  return user;
};

const login = async (data) => {
  const { email, password, cccd } = data;
  const loginId = cccd || email;

  const user = await User.findOne({
    $or: [{ email: loginId }, { cccd: loginId }, { username: loginId }]
  });
  if (!user) throw new Error('Thông tin đăng nhập không chính xác');

  if (user.status === 'locked') {
    throw new Error('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Thông tin đăng nhập không chính xác');

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isFirstLogin: user.isFirstLogin,
      fullName: user.fullName
    },
    token
  };
};

const changePassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
    isFirstLogin: false
  }, { new: true });

  if (!user) throw new Error('Người dùng không tồn tại');

  await AuditLog.create({
    adminId: userId,
    action: 'CHANGE_PASSWORD_FIRST_LOGIN',
    targetUserId: userId,
    details: { username: user.username }
  });

  return user;
};

/**
 * Cổ đông chủ động đổi mật khẩu (yêu cầu xác nhận mật khẩu hiện tại)
 */
const changePasswordSelf = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Người dùng không tồn tại');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Mật khẩu hiện tại không chính xác');

  if (newPassword.length < 8) throw new Error('Mật khẩu mới phải có ít nhất 8 ký tự');
  if (newPassword === '123456') throw new Error('Mật khẩu mới không được là mật khẩu mặc định');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(userId, { password: hashedPassword, isFirstLogin: false });

  await AuditLog.create({
    adminId: userId,
    action: 'CHANGE_PASSWORD_SELF',
    targetUserId: userId,
    details: { username: user.username }
  });

  return { message: 'Đổi mật khẩu thành công' };
};

const resetPassword = async (targetUserId, adminId) => {
  const defaultPassword = await bcrypt.hash('123456', 10);

  const user = await User.findByIdAndUpdate(targetUserId, {
    password: defaultPassword,
    isFirstLogin: true
  }, { new: true });

  if (!user) throw new Error('Người dùng không tồn tại');

  await AuditLog.create({
    adminId,
    action: 'RESET_PASSWORD',
    targetUserId,
    details: { username: user.username }
  });

  return user;
};

/**
 * Lấy Audit Logs với bộ lọc ngày, action và phân trang
 */
const getAuditLogs = async ({ page = 1, limit = 50, action = '', dateFrom = '', dateTo = '' } = {}) => {
  const query = {};

  if (action) query.action = action;

  if (dateFrom || dateTo) {
    query.createdAt = {};
    if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      query.createdAt.$lte = toDate;
    }
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await AuditLog.countDocuments(query);
  const logs = await AuditLog.find(query)
    .populate('adminId', 'username fullName role')
    .populate('targetUserId', 'username fullName cccd')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return {
    logs,
    pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) }
  };
};

module.exports = { register, login, changePassword, changePasswordSelf, resetPassword, getAuditLogs };
