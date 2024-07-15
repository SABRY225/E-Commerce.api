const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { cratePayment, editPayment, deletePayment, getPayment, getPayments } = require('../controller/paymentController');

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management operations
 */

/**
 * @swagger
 * /api/payment/create-payment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create-payment', isAuth,cratePayment);

/**
 * @swagger
 * /api/payment/edit-payment/{paymentId}:
 *   put:
 *     summary: Edit an existing payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment to edit
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Payment not found
 */
router.put('/edit-payment/:paymentId', isAuth,editPayment);

/**
 * @swagger
 * /api/payment/delete-payment/{paymentId}:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment to delete
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Payment not found
 */
router.delete('/delete-payment/:paymentId', isAuth,deletePayment);

/**
 * @swagger
 * /api/payment/{paymentId}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the payment to retrieve
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *       404:
 *         description: Payment not found
 */
router.get('/payment/:paymentId', isAuth,getPayment);

/**
 * @swagger
 * /api/payment/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
 *       404:
 *         description: No payments found
 */
router.get('/payments', isAuth,getPayments);

module.exports = router;
