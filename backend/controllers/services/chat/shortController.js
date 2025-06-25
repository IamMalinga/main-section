const Short = require('../../../models/services/chat/Short');


exports.createShort = async (req, res) => {
    const { userId, content, image } = req.body;

    try {
        const short = await Short.create({ userId, content, image });
        res.status(201).json(short);
    } catch (error) {
        console.error('Error creating short:', error);
        res.status(500).json({ error: 'Failed to create short' });
    }
};


exports.getShorts = async (req, res) => {
    try {
        const shorts = await Short.find().populate('userId', 'firstName lastName profilePic');
        res.status(200).json(shorts);
    } catch (error) {
        console.error('Error fetching shorts:', error);
        res.status(500).json({ error: 'Failed to fetch shorts' });
    }
};


exports.deleteShort = async (req, res) => {
    const { shortId } = req.params;

    try {
        const short = await Short.findByIdAndDelete(shortId);
        if (!short) return res.status(404).json({ error: 'Short not found' });

        res.status(200).json({ message: 'Short deleted successfully' });
    } catch (error) {
        console.error('Error deleting short:', error);
        res.status(500).json({ error: 'Failed to delete short' });
    }
};
