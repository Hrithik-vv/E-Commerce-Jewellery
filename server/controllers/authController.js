const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public

const signup = async (req, res) => {
    try {
        let { name, email, password, confirmPassword, consent } = req.body;

        // Trim inputs
        const trimmedName = name?.trim();
        const trimmedEmail = email?.trim().toLowerCase();
        const trimmedPassword = password?.trim();
        const trimmedConfirmPassword = confirmPassword?.trim();

        // 1. Check if all required fields are provided
        if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2. Consent check
        if (!consent) {
            return res.status(400).json({
                success: false,
                message: "You must accept the Terms & Conditions and Privacy Policy"
            });
        }

        // 3. Name Validation
        if (trimmedName.length < 3 || trimmedName.length > 50) {
            return res.status(400).json({
                success: false,
                message: "Name must be between 3 and 50 characters"
            });
        }

        // Accept alphabets and only single spaces between words
        const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

        if (!nameRegex.test(trimmedName)) {
            return res.status(400).json({
                success: false,
                message: "Name can only contain letters and single spaces between words"
            });
        }

        // 4. Email Validation
        if (trimmedEmail.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Email cannot exceed 100 characters"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Check duplicate email
        const existingUser = await User.findOne({ email: trimmedEmail });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        // 5. Password Validation

        if (trimmedPassword.length < 8 || trimmedPassword.length > 20) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 8 and 20 characters"
            });
        }

        // No spaces allowed
        if (/\s/.test(trimmedPassword)) {
            return res.status(400).json({
                success: false,
                message: "Password cannot contain spaces"
            });
        }

        // Password format validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_.+-])[A-Za-z\d@$!%*?&^#_.+-]{8,20}$/;

        if (!passwordRegex.test(trimmedPassword)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
            });
        }

        // 6. Confirm Password Validation
        if (trimmedPassword !== trimmedConfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // 7. Hash Password
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

        // 8. Create User
        const newUser = new User({
            name: trimmedName,
            email: trimmedEmail,
            password: hashedPassword
            // role will automatically be "User"
        })

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })

    } catch (error) {
        console.error("Signup Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/signin
// @access  Public
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (trimmedEmail.length > 100) {
            return res.status(400).json({ success: false, message: "Email cannot exceed 100 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (trimmedPassword.length < 8 || trimmedPassword.length > 20) {
            return res.status(400).json({ success: false, message: "Password must be between 8 and 20 characters" });
        }

        if (/\s/.test(trimmedPassword)) {
            return res.status(400).json({ success: false, message: "Password cannot contain spaces" });
        }

        const user = await User.findOne({
            email: trimmedEmail
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            trimmedPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const payload = {
            id: user._id,
            role: user.role
        };

        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Signin Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// @desc    Forgot Password (Send OTP)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });

        if (!user) {
            // Send 404 so frontend can show "email not registered" error as requested
            return res.status(404).json({ success: false, message: "Email address is not registered" });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // OTP expires in 15 minutes
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Send Email
        const sendEmail = require('../utils/sendEmail');

        const message = `You are receiving this email because you (or someone else) have requested the reset of a password. \n\n Your OTP is: ${otp} \n\n It is valid for 15 minutes.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset OTP',
                message
            });

            res.status(200).json({ success: true, message: "OTP sent to email successfully" });
        } catch (error) {
            console.error("Email Sending Error:", error);
            user.resetPasswordOTP = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({ success: false, message: "Email could not be sent" });
        }

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    try {
        // Expected request body: email, otp, newPassword, confirmPassword
        const { email, otp, newPassword, confirmPassword } = req.body;

        if (!email || !otp || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Please provide email, OTP, new password, and confirm password" });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
            resetPasswordOTP: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        // Password Validation
        const trimmedPassword = newPassword.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (trimmedPassword !== trimmedConfirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        if (trimmedPassword.length < 8 || trimmedPassword.length > 20) {
            return res.status(400).json({ success: false, message: "Password must be between 8 and 20 characters" });
        }

        if (/\s/.test(trimmedPassword)) {
            return res.status(400).json({ success: false, message: "Password cannot contain spaces" });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_.+-])[A-Za-z\d@$!%*?&^#_.+-]{8,20}$/;
        if (!passwordRegex.test(trimmedPassword)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
            });
        }

        // Hash new password
        user.password = await bcrypt.hash(trimmedPassword, 10);
        user.resetPasswordOTP = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful. You can now login." });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    signup,
    signin,
    forgotPassword,
    resetPassword
}