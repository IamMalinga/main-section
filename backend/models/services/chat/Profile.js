const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, default: '' },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    address: { type: String, default: '' },
    profilePic: { type: String, default: '' },
    banner: { type: String, default: '' },
    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
