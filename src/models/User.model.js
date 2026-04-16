const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'shareholder'],
      default: 'shareholder'
    },
    status: {
      type: String,
      enum: ['active', 'locked'],
      default: 'active'
    },
    isFirstLogin: {
      type: Boolean,
      default: true
    },
    // CCCD / Profile data
    cccd: {
      type: String,
      required: true,
      unique: true
    },
    fullName: String,
    dob: Date,
    gender: {
      type: String,
      enum: ['Nam', 'Nữ']
    },
    hometown: String,
    residence: String,
    expiryDate: Date,
    avatar: String, // Base64 or URL
    strategicCertImage: String, // Base64 or URL for Strategic Certificate
    phone: {
      type: String,
      required: true
    },
    sharesCount: {
      type: Number,
      default: 0
    },
    sharesFounder: {
      type: Number,
      default: 0
    },
    sharesStrategic: {
      type: Number,
      default: 0
    },
    sharesCommon: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
