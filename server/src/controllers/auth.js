// user login and registration with JWT

const UserSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// user registration
async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        // password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new UserSchema({ username, email, password: hashedPassword });
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// user login
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await UserSchema
            .findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    register,
    login
};

