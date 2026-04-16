const AuthService = require('../services/Auth.service');

const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body, req.userId);
    res.status(201).json({
      message: 'Register success',
      user
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    res.json({
      message: 'Login success',
      token: result.token,
      user: result.user
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await AuthService.changePassword(req.userId, req.body.newPassword);
    res.json({ message: 'Đổi mật khẩu thành công', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await AuthService.resetPassword(req.body.targetUserId, req.userId);
    res.json({ message: 'Khôi phục mật khẩu thành công', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const changePasswordSelf = async (req, res) => {
  try {
    const result = await AuthService.changePasswordSelf(
      req.userId,
      req.body.currentPassword,
      req.body.newPassword
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const { page, limit, action, dateFrom, dateTo } = req.query;
    const result = await AuthService.getAuditLogs({ page, limit, action, dateFrom, dateTo });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login, changePassword, changePasswordSelf, resetPassword, getAuditLogs };
