// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email format'],
  },
  address: { type: String, required: true },
  bod: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  password: { type: String, required: true },
  profilePic: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: {type: String},
  verificationCodeExpires: {type: Date},
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

userSchema.statics.signup = async function (firstName, lastName, email, address, bod, gender, password, profilePicUrl = '') {
  if (!firstName || !lastName || !email || !password || !address || !bod || !gender) {
    throw new Error('All fields must be filled');
  }

  if (!profilePicUrl) {
    throw new Error('Profile picture must be uploaded');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const verificationCodeExpires = Date.now() + 3 * 60 * 1000; // 3 minutes

  const user = await this.create({
    firstName,
    lastName,
    email,
    address,
    bod,
    gender,
    password: hash,
    profilePic: profilePicUrl,
    verificationCode,
    verificationCodeExpires,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Incorrect email');
  }


  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
};

userSchema.statics.verifyCode = async function (email, code) {
  // Check if email and code are provided
  if (!email || !code) throw new Error('Email and verification code are required');

  // Find the user by email
  const user = await this.findOne({ email });

  // Handle cases where the user is not found
  if (!user) throw new Error('User not found');

  // Check if the user is already verified
  if (user.isVerified) throw new Error('User is already verified');

  // Check if the verification code has expired
  if (!user.verificationCodeExpires || user.verificationCodeExpires < Date.now()) {
    throw new Error('Verification code has expired');
  }

  // Check if the provided code matches the user's code
  if (user.verificationCode !== code) throw new Error('Invalid verification code');

  // Mark the user as verified
  user.isVerified = true;
  user.verificationCode = undefined; // Clear the verification code
  user.verificationCodeExpires = undefined; // Clear the expiry time
  await user.save();

  return user;
};
;

userSchema.methods.addContact = async function (contactId) {
  if (this.contacts.includes(contactId)) throw new Error('User already in contacts');
  this.contacts.push(contactId);
  await this.save();
  return this;
};

module.exports = mongoose.model('User', userSchema);
