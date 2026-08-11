const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 100
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

    phone: {
        type: String,
        trim: true
    },

    address: {
        fullName: { type: String, trim: true },
        phone: { type: String, trim: true },
        addressLine1: { type: String, trim: true },
        addressLine2: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        pinCode: { type: String, trim: true }
    },

    lastLogin: {
        type: Date
    },

    resetPasswordOTP: {
        type: String
    },

    resetPasswordExpires: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);