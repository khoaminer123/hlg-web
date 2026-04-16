const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        action: {
            type: String,
            required: true // e.g., 'CREATE_USER', 'LOCK_USER', 'RESET_PASSWORD'
        },
        targetUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        details: {
            type: mongoose.Schema.Types.Mixed
        },
        ipAddress: String
    },
    { timestamps: true }
);

module.exports = mongoose.model('AuditLog', AuditLogSchema);
