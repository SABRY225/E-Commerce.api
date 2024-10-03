const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { createOrder, getOrder, getOrders, deleteOrder, editOrder } = require('../controller/orderController');

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management operations
 */

/**
 * @swagger
 * /api/order/create-order:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: '60b8d2a0f1a7f8cbb2e5d5a3'
 *                     quantity:
 *                       type: number
 *                       example: 3
 *                     price:
 *                       type: number
 *                       example: 29.99
 *               paymentType:
 *                 type: string
 *                 enum: ['Cash', 'Credit Card']
 *                 example: 'Credit Card'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create-order', isAuth, createOrder);

/**
 * @swagger
 * /api/order/edit-order/{orderId}:
 *   put:
 *     summary: Edit an existing order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: '60b8d2a0f1a7f8cbb2e5d5a3'
 *                     quantity:
 *                       type: number
 *                       example: 3
 *                     price:
 *                       type: number
 *                       example: 29.99
 *               paymentType:
 *                 type: string
 *                 enum: ['Cash', 'Credit Card']
 *                 example: 'Credit Card'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.put('/edit-order/:orderId', isAuth, editOrder);

/**
 * @swagger
 * /api/order/delete-order/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.delete('/delete-order/:orderId', isAuth, deleteOrder);

/**
 * @swagger
 * /api/order/order/{orderId}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */
router.get('/order/:orderId', isAuth, getOrder);

/**
 * @swagger
 * /api/order/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       404:
 *         description: No orders found
 */
router.get('/orders', isAuth, getOrders);


module.exports = router;
