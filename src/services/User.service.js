const User = require('../models/User.model');
const AuditLog = require('../models/AuditLog.model');

/**
 * Service to manage user data
 */
class UserService {
    async getUserById(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            const error = new Error('Người dùng không tồn tại');
            error.status = 404;
            throw error;
        }
        return user;
    }

    /**
     * Lấy tất cả users với phân trang và tìm kiếm
     */
    async getAllUsers({ page = 1, limit = 20, search = '', status = '' } = {}) {
        const query = { role: 'shareholder' };

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { cccd: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        if (status && ['active', 'locked'].includes(status)) {
            query.status = status;
        }

        const skip = (Number(page) - 1) * Number(limit);
        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        return {
            users,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            }
        };
    }

    /**
     * Admin cập nhật thông tin + cổ phần của cổ đông
     */
    async updateUserById(targetUserId, updateData, adminId) {
        const allowedFields = [
            'fullName', 'phone', 'hometown', 'residence',
            'gender', 'dob', 'expiryDate', 'avatar', 'strategicCertImage',
            'sharesFounder', 'sharesStrategic', 'sharesCommon'
        ];

        const updatePayload = {};
        allowedFields.forEach(field => {
            if (updateData[field] !== undefined) {
                updatePayload[field] = updateData[field];
            }
        });

        // Tính lại sharesCount nếu có cập nhật cổ phần
        if (
            updateData.sharesFounder !== undefined ||
            updateData.sharesStrategic !== undefined ||
            updateData.sharesCommon !== undefined
        ) {
            const current = await User.findById(targetUserId).select('sharesFounder sharesStrategic sharesCommon');
            if (!current) throw new Error('Cổ đông không tồn tại');
            updatePayload.sharesCount =
                (Number(updatePayload.sharesFounder ?? current.sharesFounder) || 0) +
                (Number(updatePayload.sharesStrategic ?? current.sharesStrategic) || 0) +
                (Number(updatePayload.sharesCommon ?? current.sharesCommon) || 0);
        }

        const user = await User.findByIdAndUpdate(
            targetUserId,
            updatePayload,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) throw new Error('Cổ đông không tồn tại');

        await AuditLog.create({
            adminId,
            action: 'UPDATE_SHAREHOLDER',
            targetUserId,
            details: { updatedFields: Object.keys(updatePayload) }
        });

        return user;
    }

    /**
     * Admin khóa hoặc mở khóa tài khoản cổ đông
     */
    async toggleUserStatus(targetUserId, adminId) {
        const user = await User.findById(targetUserId);
        if (!user) throw new Error('Cổ đông không tồn tại');
        if (user.role === 'admin') throw new Error('Không thể khóa tài khoản Admin');

        const newStatus = user.status === 'active' ? 'locked' : 'active';
        const updated = await User.findByIdAndUpdate(
            targetUserId,
            { status: newStatus },
            { new: true }
        ).select('-password');

        await AuditLog.create({
            adminId,
            action: newStatus === 'locked' ? 'LOCK_ACCOUNT' : 'UNLOCK_ACCOUNT',
            targetUserId,
            details: { previousStatus: user.status, newStatus }
        });

        return updated;
    }

    async updateMe(userId, profileData) {
        const { phone, hometown, residence, avatar } = profileData;
        const user = await User.findByIdAndUpdate(
            userId,
            { phone, hometown, residence, avatar },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            const error = new Error('Người dùng không tồn tại');
            error.status = 404;
            throw error;
        }

        return user;
    }
}

module.exports = new UserService();
