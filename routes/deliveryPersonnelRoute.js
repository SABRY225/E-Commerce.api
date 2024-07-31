const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {
  addDeliveryPersonnel,
  deleteDeliveryPersonnel,
  editDeliveryPersonnel,
  getDeliveryPersonnel,
  getDeliveryPersonnels,
  addAssignOrder,
  deleteAssignOrder,
  editAssignOrder,
  updateOrderStatus
} = require('../controller/deliveryPersonnelController');

/**
 * @swagger
 * tags:
 *   name: deliveryPersonnel
 *   description: deliveryPersonnel management operations
 */

/**
 * @swagger
 * /api/deliveryPersonnel/add-deliveryPersonnel/{vehicleID}:
 *   post:
 *     summary: Add a new delivery personnel
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: vehicleID
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Address:
 *                 type: string
 *               Email:
 *                 type: string
 *                 format: email
 *               Password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Delivery personnel added successfully
 *       400:
 *         description: Bad request
 */
router.post('/add-deliveryPersonnel/:vehicleID', isAuth, addDeliveryPersonnel);

/**
 * @swagger
 * /api/deliveryPersonnel/delete-deliveryPersonnel/{personnelId}:
 *   delete:
 *     summary: Delete a delivery personnel
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: personnelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the delivery personnel to delete
 *     responses:
 *       200:
 *         description: Delivery personnel deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Delivery personnel not found
 */
router.delete('/delete-deliveryPersonnel/:personnelId', isAuth, deleteDeliveryPersonnel);

/**
 * @swagger
 * /api/deliveryPersonnel/edit-deliveryPersonnel/{personnelId}:
 *   put:
 *     summary: Edit an existing delivery personnel
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: personnelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the delivery personnel to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Address:
 *                 type: string
 *               Email:
 *                 type: string
 *                 format: email
 *               Password:
 *                 type: string
 *               vehicleID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delivery personnel updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Delivery personnel not found
 */
router.put('/edit-deliveryPersonnel/:personnelId', isAuth, editDeliveryPersonnel);

/**
 * @swagger
 * /api/deliveryPersonnel/deliveryPersonnel/{personnelId}:
 *   get:
 *     summary: Get a delivery personnel by ID
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: personnelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the delivery personnel to retrieve
 *     responses:
 *       200:
 *         description: Delivery personnel retrieved successfully
 *       404:
 *         description: Delivery personnel not found
 */
router.get('/deliveryPersonnel/:personnelId', isAuth, getDeliveryPersonnel);

/**
 * @swagger
 * /api/deliveryPersonnel/deliveryPersonnels:
 *   get:
 *     summary: Get all delivery personnels
 *     tags: [deliveryPersonnel]
 *     responses:
 *       200:
 *         description: Delivery personnels retrieved successfully
 *       404:
 *         description: No delivery personnels found
 */
router.get('/deliveryPersonnels', isAuth, getDeliveryPersonnels);

/**
 * @swagger
 * /api/deliveryPersonnel/{orderId}/add-assignOrder:
 *   post:
 *     summary: Assign a new order to a delivery personnel
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personnelId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order assigned successfully
 *       400:
 *         description: Bad request
 */
router.post('/:orderId/add-assignOrder', isAuth, addAssignOrder);

/**
 * @swagger
 * /api/deliveryPersonnel/{orderId}/delete-assignOrder:
 *   delete:
 *     summary: Delete an assigned order
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.delete('/:orderId/delete-assignOrder', isAuth, deleteAssignOrder);

/**
 * @swagger
 * /api/deliveryPersonnel/{orderId}/edit-assignOrder:
 *   put:
 *     summary: Edit an assigned order
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personnelId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.put('/:orderId/edit-assignOrder', isAuth, editAssignOrder);

/**
 * @swagger
 * /api/deliveryPersonnel/{orderId}/status-order:
 *   put:
 *     summary: Update the status of an order
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.put('/:orderId/status-order', isAuth, updateOrderStatus);

module.exports = router;
