const User = require('../models/UserSchema');
const argon2 = require('argon2');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public

const signup = async (req, res) => {
    try {
        let { name, email, password, confirmPassword, consent } = req.body;

        // Trim inputs
        const trimmedName = name?.trim();
        const trimmedEmail = email?.trim().toLowerCase();
        const trimmedConfirmPassword = confirmPassword?.trim();

        // 1. Check if all required fields are provided
        if (!trimmedName || !trimmedEmail || !password || !trimmedConfirmPassword) {
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

        // Accept alphabets, spaces, apostrophes and hyphens only
        const nameRegex = /^[A-Za-z\s'-]+$/;

        if (!nameRegex.test(trimmedName)) {
            return res.status(400).json({
                success: false,
                message: "Name can only contain letters, spaces, apostrophes (') and hyphens (-)"
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

        if (password.length < 8 || password.length > 20) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 8 and 20 characters"
            });
        }

        // No spaces allowed
        if (/\s/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password cannot contain spaces"
            });
        }

        // Password format validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_.+-])[A-Za-z\d@$!%*?&^#_.+-]{8,20}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
            });
        }

        // 6. Confirm Password Validation
        if (password !== trimmedConfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // 7. Hash Password
        const hashedPassword = await argon2.hash(password);

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

module.exports = {
    signup
}