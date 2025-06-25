const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    attachment: { type: String },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['text', 'image', 'video'], default: 'text' },
});

module.exports = mongoose.model('Message', messageSchema);
