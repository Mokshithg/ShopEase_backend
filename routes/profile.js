const express = require('express');
const router = express.Router();
const { updateProfile, changePassword, addAddress, updateAddress, deleteAddress, updatePrivacySettings, updateNotificationPreferences } = require('../controllers/profileController');


const { protect } = require('../middleware/authMiddleware');

router.put('/update/details', protect, updateProfile);

router.put('/update/password', protect, changePassword);

router.post('/address', protect, addAddress); 

router.put('/update/address/:id', protect, updateAddress); 

router.delete('/delete/address/:id', protect, deleteAddress); 

router.put('/update/privacy', protect, updatePrivacySettings);

router.put('/update/notifications', protect, updateNotificationPreferences);

module.exports = router;
