const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth');
const hashingService = require('../services/hashing');
const Customer = require('../model/customerModel'); 
const OTP = require('../model/otpModel'); 
const { validationResult } = require('express-validator');

// Register a new user
const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { Email, Password, firstName,lastName,County,City,Address } = req.body;
    try {
        let user = await Customer.findOne({ Email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new Customer({ Email, Password, firstName,lastName,County,City,Address });
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(Password, salt);
        await user.save();
        const Otp = (100000 + Math.floor(Math.random() * 900000)).toString();
        const newOTP = new OTP({
            Email,
            Otp
        });
        await newOTP.save();
        // Find the most recent OTP for the email
        const response = await OTP.find({ Email }).sort({ createdAt: -1 }).limit(1);
        console.log("response",response.length);
        if (!response) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Send OTP successfully',
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login user
const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
    const { Email, Password } = req.body;

        const user = await Customer.findOne({ Email });
        if (!user) {
            return res.status(404).json({ error: 'This Email does not exist' });
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        if (user.verified === false) {
            return res.status(404).json({ error: 'not verified' });
        }
        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, '.njjfjfhjslslshfjiaoaosfkpjfjfj', { expiresIn: '1h' });

        let Role = user.Role || "";

        res.status(200).json({ Token: token, Role, message: 'Login successful' });

    } catch (err) {
        console.error('Error logging in:', err);
        next(err);
    }
};

// Forget password
const forgetPassword = async (req, res, next) => {
    const { Email, Otp, newPassword } = req.body;

    if (!Email || !Otp || !newPassword) {
        return res.status(400).json({ message: 'Please provide email, OTP, and new password.' });
    }

    try {
        const user = await Customer.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const otpRecords = await OTP.findOne({ Otp }).sort({ createdAt: -1 }).limit(1);
        console.log(otpRecords);
        if (otpRecords === null) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        user.Password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        next(error);
    }
};

// Refresh token
const refreshToken = async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, '.njjfjfhjslslshfjiaoaosfkpjfjfj'); 
        const payload = { user: { id: decoded.userId } };
        jwt.sign(payload, '.njjfjfhjslslshfjiaoaosfkpjfjfj', { expiresIn: '1h' }, (err, newToken) => {
            if (err) throw err;
            res.status(200).json({ token: newToken });
        });
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = {
    register,
    login,
    forgetPassword,
    refreshToken
};
