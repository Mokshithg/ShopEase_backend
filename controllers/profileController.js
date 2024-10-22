const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Update profile info (name, email, etc.)
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ message: 'Name or email is required to update profile' });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash and save the new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Manage addresses (CRUD operations)

// Add address
exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    user.addresses.push(address);

    await user.save();
    res.status(200).json({ message: 'Address added successfully', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get addresses
exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { addressId, updatedAddress } = req.body;

    if (!addressId || !updatedAddress) {
      return res.status(400).json({ message: 'Address ID and updated address are required' });
    }

    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    user.addresses[addressIndex] = updatedAddress;
    await user.save();

    res.status(200).json({ message: 'Address updated successfully', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { addressId } = req.body;

    if (!addressId) {
      return res.status(400).json({ message: 'Address ID is required' });
    }

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update privacy settings
exports.updatePrivacySettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { allowMarketingEmails, twoFactorAuth } = req.body;

    if (allowMarketingEmails === undefined && twoFactorAuth === undefined) {
      return res.status(400).json({ message: 'At least one privacy setting must be updated' });
    }

    user.privacySettings.allowMarketingEmails = allowMarketingEmails ?? user.privacySettings.allowMarketingEmails;
    user.privacySettings.twoFactorAuth = twoFactorAuth ?? user.privacySettings.twoFactorAuth;

    await user.save();

    res.status(200).json({ message: 'Privacy settings updated successfully', privacySettings: user.privacySettings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update notification preferences
exports.updateNotificationPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { emailNotifications, smsNotifications } = req.body;

    if (emailNotifications === undefined && smsNotifications === undefined) {
      return res.status(400).json({ message: 'At least one notification preference must be updated' });
    }

    user.notificationPreferences.emailNotifications = emailNotifications ?? user.notificationPreferences.emailNotifications;
    user.notificationPreferences.smsNotifications = smsNotifications ?? user.notificationPreferences.smsNotifications;

    await user.save();

    res.status(200).json({ message: 'Notification preferences updated successfully', notificationPreferences: user.notificationPreferences });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
