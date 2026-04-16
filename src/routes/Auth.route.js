const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.controller');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Mỗi IP tối đa 5 lần
  message: { message: 'Thử quá nhiều lần, vui lòng quay lại sau 15 phút.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authMiddleware = require('../middlewares/auth.middleware');

const adminCheck = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
  }
  next();
};

router.post('/register', authMiddleware, adminCheck, AuthController.register);
router.post('/login', AuthController.login);
router.post('/change-password', authMiddleware, AuthController.changePassword);
router.post('/change-password-self', authMiddleware, AuthController.changePasswordSelf);
router.post('/reset-password', authMiddleware, adminCheck, AuthController.resetPassword);
router.get('/audit-logs', authMiddleware, adminCheck, AuthController.getAuditLogs);

module.exports = router;
