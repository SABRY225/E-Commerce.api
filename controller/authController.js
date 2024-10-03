const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../model/customerModel'); 
const OTP = require('../model/otpModel'); 
const { validationResult } = require('express-validator');

// Register a new user
const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, firstName,lastName,county,city,address } = req.body;
    try {
        let user = await Customer.findOne({ email });
        if (user) {
                return res.status(200).json({ message: 'User already exists',success: false });
        }
        user = new Customer({ email, password, firstName,lastName,county,city,address });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const otp = (100000 + Math.floor(Math.random() * 900000)).toString();
        const newOTP = new OTP({
            email,
            otp
        });
        await newOTP.save();
        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("response",response.length);
        if (!response) {
            return res.status(200).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Send OTP successfully',
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Login user
const login = async (req, res, next) => {
    if (!req.body.email) {
        return res.status(200).json({ message: 'Email is Requird',success: false });
    }
    if (!req.body.password) {
        return res.status(200).json({ message: 'Password is Requird',success: false  });
    }
    try{
        const { email, password } = req.body;
        const user = await Customer.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'This Email does not exist',success: false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(200).json({ message: 'Incorrect password',success: false});
        }
        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });

        let Role = user.role || "";

        res.status(200).json({ Token: token, Role, message: 'Login successful',success: true });

    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Forget password
const forgetPassword = async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: 'Please provide email, OTP, and new password.' ,success: false});
    }

    try {
        const user = await Customer.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.',success: false });
        }

        const otpRecords = await OTP.findOne({ otp }).sort({ createdAt: -1 }).limit(1);
        console.log(otpRecords);
        if (otpRecords === null) {
            return res.status(200).json({ message: 'Invalid OTP.',success: false });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully.',success: true });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Refresh token
const refreshToken = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(200).json({ message: 'No token provided' ,success: false});
    }

    try {
        // تحقق من التوكين الأصلي
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // تأكد من أن SECRET يتم تحميله من البيئة
        const userId = decoded.userId; // تحقق من أن البيانات التي تحتاجها موجودة في التوكين

        if (!userId) {
            return res.status(200).json({ message: 'Invalid token data',success: false });
        }

        // قم بإنشاء توكين جديد يتضمن بيانات المستخدم
        const payload = {userId};
        console.log(payload);
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, newToken) => {
            if (err) {
                console.error(err.message);
                return res.status(200).json({ message: 'Error signing token',success: false });
            }
            res.status(200).json({ token: newToken });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
module.exports = {
    register,
    login,
    forgetPassword,
    refreshToken
};
