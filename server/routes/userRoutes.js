const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    adminResetUserPassword,
    deactivateUser,
    uploadUserProfilePhoto
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/AuthMiddleware');
const upload = require('../middleware/ImageUploadMiddleware');

// All routes are protected and require Admin role
router.use(protect);
router.use(authorize('Admin'));

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.put('/:id/reset-password', adminResetUserPassword);
router.put('/:id/deactivate', deactivateUser);
router.put('/:id/upload-photo', upload.single('profileImage'), uploadUserProfilePhoto);

module.exports = router;
