const User = require('../models/UserSchema');
const argon2 = require('argon2');
const cloudinary = require('../config/cloudinary');

// @desc    Get all users with search, filter, and pagination
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { search, role, status } = req.query;

        let query = {};

        // Search by name or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by role
        if (role && role !== 'All' && role !== '') {
            query.role = role;
        }

        // Filter by status
        if (status && status !== 'All' && status !== '') {
            query.status = status;
        }

        const users = await User.find(query)
            .select('-password') // Exclude password
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            count: users.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: users
        });

    } catch (error) {
        console.error("Get Users Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Get User By ID Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Create a user (Admin only)
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res) => {
    try {
        const { name, email, password, role, status } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide name, email and password" });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await argon2.hash(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'User',
            status: status || 'Active'
        });

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({ success: true, data: userResponse });
    } catch (error) {
        console.error("Create User Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Update a user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const {
            name, email, role, status,
            username, emailVerified, phoneVerified, twoFactorEnabled,
            assignedProjects, tasksCompleted, tasksPending,
            phone, address, profileImage
        } = req.body;

        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if updating to an existing email
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ success: false, message: "Email is already in use by another user" });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.status = status || user.status;

        if (username !== undefined) user.username = username;
        if (emailVerified !== undefined) user.emailVerified = emailVerified;
        if (phoneVerified !== undefined) user.phoneVerified = phoneVerified;
        if (twoFactorEnabled !== undefined) user.twoFactorEnabled = twoFactorEnabled;
        if (assignedProjects !== undefined) user.assignedProjects = assignedProjects;
        if (tasksCompleted !== undefined) user.tasksCompleted = tasksCompleted;
        if (tasksPending !== undefined) user.tasksPending = tasksPending;
        
        if (profileImage !== undefined) user.profileImage = profileImage;
        if (phone !== undefined) user.phone = phone;
        if (address) {
            user.address = {
                fullName: address.fullName !== undefined ? address.fullName : user.address?.fullName,
                phone: address.phone !== undefined ? address.phone : user.address?.phone,
                addressLine1: address.addressLine1 !== undefined ? address.addressLine1 : user.address?.addressLine1,
                addressLine2: address.addressLine2 !== undefined ? address.addressLine2 : user.address?.addressLine2,
                city: address.city !== undefined ? address.city : user.address?.city,
                state: address.state !== undefined ? address.state : user.address?.state,
                country: address.country !== undefined ? address.country : user.address?.country,
                pinCode: address.pinCode !== undefined ? address.pinCode : user.address?.pinCode
            };
        }

        await user.save();

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({ success: true, data: userResponse });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Prevent admin from deleting themselves
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: "You cannot delete your own account" });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Get user profile (Current logged-in user)
// @route   GET /api/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Get User Profile Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Update user profile (Current logged-in user)
// @route   PUT /api/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { name, phone, address } = req.body;

        if (name) user.name = name;
        if (phone !== undefined) user.phone = phone; // Allow empty string to clear
        if (address) {
            user.address = {
                fullName: address.fullName !== undefined ? address.fullName : user.address?.fullName,
                phone: address.phone !== undefined ? address.phone : user.address?.phone,
                addressLine1: address.addressLine1 !== undefined ? address.addressLine1 : user.address?.addressLine1,
                addressLine2: address.addressLine2 !== undefined ? address.addressLine2 : user.address?.addressLine2,
                city: address.city !== undefined ? address.city : user.address?.city,
                state: address.state !== undefined ? address.state : user.address?.state,
                pinCode: address.pinCode !== undefined ? address.pinCode : user.address?.pinCode
            };
        }

        const updatedUser = await user.save();

        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.status(200).json({ success: true, data: userResponse });
    } catch (error) {
        console.error("Update User Profile Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Admin reset user password
// @route   PUT /api/users/:id/reset-password
// @access  Private/Admin
const adminResetUserPassword = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: "Please provide a new password" });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const hashedPassword = await argon2.hash(password);
        user.password = hashedPassword;

        // Log the activity
        user.activities.push({
            activityType: "Password Reset",
            description: "Password was reset by Administrator"
        });

        await user.save();

        res.status(200).json({ success: true, message: "User password reset successfully" });
    } catch (error) {
        console.error("Admin Reset Password Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Deactivate a user account
// @route   PUT /api/users/:id/deactivate
// @access  Private/Admin
const deactivateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: "You cannot deactivate your own account" });
        }

        user.status = "Inactive";

        // Log the activity
        user.activities.push({
            activityType: "Account Deactivated",
            description: "Account was deactivated by Administrator"
        });

        await user.save();

        res.status(200).json({ success: true, message: "User account deactivated successfully" });
    } catch (error) {
        console.error("Deactivate User Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// @desc    Upload user profile photo
// @route   PUT /api/users/:id/upload-photo
// @access  Private/Admin
const uploadUserProfilePhoto = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please provide an image file" });
        }

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'ecommerce-jewellery/users'
        });

        user.profileImage = result.secure_url;
        
        // Log the activity
        user.activities.push({
            activityType: "Profile Photo Updated",
            description: "Profile photo was updated by Administrator"
        });

        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Profile photo uploaded successfully",
            profileImage: user.profileImage
        });
    } catch (error) {
        console.error("Upload Profile Photo Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
    adminResetUserPassword,
    deactivateUser,
    uploadUserProfilePhoto
};
