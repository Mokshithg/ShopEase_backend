const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [
    {
      street: String,
      city: String,
      zipCode: String,
      country: String,
    },
  ],
  privacySettings: {
    allowMarketingEmails: { type: Boolean, default: true },
    twoFactorAuth: { type: Boolean, default: false },
  },
  notificationPreferences: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
  },
  memberSince: {
    type: Date,
    default: Date.now, // Automatically set the date when the user is created
  },
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // If password is not modified, proceed to the next middleware
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Call next after hashing the password
});

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
