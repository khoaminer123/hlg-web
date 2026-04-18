const SystemConfig = require('../models/SystemConfig.model');
const AuditLog = require('../models/AuditLog.model');

/**
 * Service to manage system configurations
 */
class SystemConfigService {
    async getConfig(key) {
        let config = await SystemConfig.findOne({ key });

        // Default values if not set
        if (!config && key === 'stockPrice') {
            return { key: 'stockPrice', value: 10000 };
        }

        if (!config) {
            const error = new Error('Configuration not found');
            error.status = 404;
            throw error;
        }

        return config;
    }

    async updateConfig(key, value, description, userId) {
        let config = await SystemConfig.findOne({ key });

        if (config) {
            const oldValue = config.value;
            config.value = value;
            if (description) config.description = description;
            config.updatedBy = userId;
            await config.save();

            // Log the change
            await AuditLog.create({
                adminId: userId,
                action: 'UPDATE_CONFIG',
                details: { key, oldValue, newValue: value }
            });
        } else {
            config = await SystemConfig.create({
                key,
                value,
                description,
                updatedBy: userId
            });

            // Log the creation
            await AuditLog.create({
                adminId: userId,
                action: 'CREATE_CONFIG',
                details: { key, value }
            });
        }

        return config;
    }
}

module.exports = new SystemConfigService();
