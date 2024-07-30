const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { crateOrder, getOrder, getOrders, deleteOrder, editOrder, updateOrderStatus } = require('../controller/orderController');

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
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create-order', isAuth, crateOrder);

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

/**
 * @swagger
 * /api/order/status-order:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Order]
 *     parameters:
 *       - in: body
 *         name: orderStatus
 *         description: Order status update object
 *         schema:
 *           type: object
 *           required:
 *             - orderId
 *             - status
 *           properties:
 *             orderId:
 *               type: string
 *               description: The ID of the order
 *             status:
 *               type: string
 *               description: The new status of the order
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.put('/status-order', isAuth, updateOrderStatus);

module.exports = router;
