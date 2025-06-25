const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  attachment: { type: String }, // Optional for multimedia messages
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: String },
  lastMessageTime: { type: Date, default: Date.now },
  isGroupChat: { type: Boolean, default: false },
  groupName: { type: String },
  groupImage: { type: String },
  groupAdmins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// Add indexes for performance
chatSchema.index({ participants: 1 });
chatSchema.index({ lastMessageTime: -1 });

const Chat = mongoose.model('Chat', chatSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = { Chat, Message };
