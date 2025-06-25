// models/post.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: { type: String, required: true },
    image: { type: String },
    location: {
        name: String,
        lat: Number,
        lng: Number,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

postSchema.index({ 'location.lat': 1, 'location.lng': 1 });

module.exports = mongoose.model('Post', postSchema);
