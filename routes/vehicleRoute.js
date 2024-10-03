const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {
  addVehicle,
  deleteVehicle,
  editVehicle,
  getVehicle,
  getVehicles
} = require('../controller/vehicleController');

/**
 * @swagger
 * tags:
 *   name: vehicle
 *   description: vehicle management operations
 */

/**
 * @swagger
 * /api/vehicle/add-vehicle:
 *   post:
 *     summary: Add a new vehicle
 *     tags: [vehicle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *               availabilityStatus:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehicle added successfully
 *       400:
 *         description: Bad request
 */
router.post('/add-vehicle', isAuth, addVehicle);

/**
 * @swagger
 * /api/vehicle/delete-vehicle/{vehicleId}:
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [vehicle]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the vehicle to delete
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Vehicle not found
 */
router.delete('/delete-vehicle/:vehicleId', isAuth, deleteVehicle);

/**
 * @swagger
 * /api/vehicle/edit-vehicle/{vehicleId}:
 *   put:
 *     summary: Edit an existing vehicle
 *     tags: [vehicle]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the vehicle to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *               availabilityStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Vehicle not found
 */
router.put('/edit-vehicle/:vehicleId', isAuth, editVehicle);

/**
 * @swagger
 * /api/vehicle/vehicle/{vehicleId}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [vehicle]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the vehicle to retrieve
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get('/vehicle/:vehicleId', isAuth, getVehicle);

/**
 * @swagger
 * /api/vehicle/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [vehicle]
 *     responses:
 *       200:
 *         description: Vehicles retrieved successfully
 *       404:
 *         description: No vehicles found
 */
router.get('/vehicles', isAuth, getVehicles);

module.exports = router;
