const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.log("Admin credentials not found in .env");
            return;
        }

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("Admin user already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        
        const adminUser = new User({
            name: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "Admin"
        });

        await adminUser.save();
        console.log("Admin user created successfully");
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
};

module.exports = createAdmin;
