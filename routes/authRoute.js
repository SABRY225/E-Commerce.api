const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { register, login, forgetPassword, refershToken } = require('../controller/authController');
const { sendOtp, verifyOtp } = require('../controller/otpController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post('/login', isAuth,login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', isAuth,register);

/**
 * @swagger
 * /api/auth/forget-password:
 *   put:
 *     summary: Forgot password
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Bad request
 */
router.put('/forget-password', isAuth),forgetPassword;

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request
 */
router.post('/send-otp', isAuth,sendOtp);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 */
router.post('/verify-otp', isAuth,verifyOtp);

/**
 * @swagger
 * /api/auth/refersh-token:
 *   post:
 *     summary: Refersh Token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Refersh Token  successfully
 *       400:
 *         description: Invalid Refersh Token
 */
router.post('/refersh-token', isAuth,refershToken);
module.exports = router;
