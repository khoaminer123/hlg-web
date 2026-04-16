const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const adminCheck = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
    }
    next();
};

// Cổ đông: Xem / Sửa thông tin bản thân
router.get('/me', authMiddleware, UserController.getMe);
router.patch('/me', authMiddleware, UserController.updateMe);

// Admin: Lấy danh sách cổ đông (có phân trang + tìm kiếm)
router.get('/', authMiddleware, adminCheck, UserController.getAllUsers);

// Admin: Sửa thông tin + cổ phần cổ đông
router.patch('/:id', authMiddleware, adminCheck, UserController.updateUserById);

// Admin: Khóa / Mở khóa tài khoản
router.patch('/:id/status', authMiddleware, adminCheck, UserController.toggleUserStatus);

module.exports = router;
