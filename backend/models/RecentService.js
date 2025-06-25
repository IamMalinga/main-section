const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recentServiceSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },
    usedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('RecentService', recentServiceSchema);