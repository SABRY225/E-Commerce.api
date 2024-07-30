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
 * /api/deliveryPersonnel/add-deliveryPersonnel:
 *   post:
 *     summary: Add a new delivery personnel
 *     tags: [deliveryPersonnel]
 *     responses:
 *       201:
 *         description: Delivery personnel added successfully
 *       400:
 *         description: Bad request
 */
router.post('/add-deliveryPersonnel', isAuth, addDeliveryPersonnel);

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
 *       - in: body
 *         name: personnel
 *         description: Delivery personnel object to be edited
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - phone
 *           properties:
 *             name:
 *               type: string
 *             phone:
 *               type: string
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
 * /api/deliveryPersonnel/add-assignOrder:
 *   post:
 *     summary: Assign a new order to a delivery personnel
 *     tags: [deliveryPersonnel]
 *     responses:
 *       201:
 *         description: Order assigned successfully
 *       400:
 *         description: Bad request
 */
router.post('/add-assignOrder', isAuth, addAssignOrder);

/**
 * @swagger
 * /api/deliveryPersonnel/delete-assignOrder/{orderId}:
 *   delete:
 *     summary: Delete an assigned order
 *     tags: [deliveryPersonnel]
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
router.delete('/delete-assignOrder/:orderId', isAuth, deleteAssignOrder);

/**
 * @swagger
 * /api/deliveryPersonnel/edit-assignOrder/{orderId}:
 *   put:
 *     summary: Edit an assigned order
 *     tags: [deliveryPersonnel]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to edit
 *       - in: body
 *         name: order
 *         description: Order object to be edited
 *         schema:
 *           type: object
 *           required:
 *             - status
 *           properties:
 *             status:
 *               type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.put('/edit-assignOrder/:orderId', isAuth, editAssignOrder);

/**
 * @swagger
 * /api/deliveryPersonnel/status-order:
 *   put:
 *     summary: Update the status of an order
 *     tags: [deliveryPersonnel]
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
