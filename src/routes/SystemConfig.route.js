const express = require('express');
const router = express.Router();
const SystemConfigController = require('../controllers/SystemConfig.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const adminCheck = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
    }
    next();
};

// Public or authenticated to get config
router.get('/:key', authMiddleware, SystemConfigController.getConfig);

// Admin only to update config
router.patch('/:key', authMiddleware, adminCheck, SystemConfigController.updateConfig);

module.exports = router;
