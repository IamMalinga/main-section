const RecentService = require('../models/RecentService');

const addRecentService = async (req, res) => {
    const { userId, serviceName } = req.body;

    try {
        const recentService = new RecentService({
            userId,
            serviceName,
        });

        await recentService.save();
        res.status(201).json(recentService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRecentServices = async (req, res) => {
    try {
        const recentServices = await RecentService.find({ userId: req.user._id }).sort({ usedAt: -1 }).limit(5);
        res.status(200).json(recentServices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addRecentService, getRecentServices };