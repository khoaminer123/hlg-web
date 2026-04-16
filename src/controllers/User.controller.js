const UserService = require('../services/User.service');

/**
 * Controller for user operations
 */
const getMe = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, search, status } = req.query;
    const result = await UserService.getAllUsers({ page, limit, search, status });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const user = await UserService.updateMe(req.userId, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Admin: Sửa thông tin + cổ phần cổ đông
const updateUserById = async (req, res, next) => {
  try {
    const user = await UserService.updateUserById(req.params.id, req.body, req.userId);
    res.json({ message: 'Cập nhật thành công', user });
  } catch (err) {
    next(err);
  }
};

// Admin: Khóa / Mở khóa tài khoản cổ đông
const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await UserService.toggleUserStatus(req.params.id, req.userId);
    res.json({
      message: user.status === 'locked' ? 'Tài khoản đã bị khóa' : 'Tài khoản đã được mở khóa',
      user
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe, getAllUsers, updateMe, updateUserById, toggleUserStatus };
