const SystemConfigService = require('../services/SystemConfig.service');

/**
 * Controller for system configuration
 */
exports.getConfig = async (req, res, next) => {
    try {
        const { key } = req.params;
        const config = await SystemConfigService.getConfig(key);
        res.json(config);
    } catch (err) {
        next(err);
    }
};

exports.updateConfig = async (req, res, next) => {
    try {
        const { key } = req.params;
        const { value, description } = req.body;
        const config = await SystemConfigService.updateConfig(key, value, description, req.userId);
        res.json(config);
    } catch (err) {
        next(err);
    }
};
