const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { getUser, getUsers, editUser, deleteUser } = require('../controller/userController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management operations
 */

/**
 * @swagger
 * /api/user/current-user:
 *   get:
 *     summary: Get current user info
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Current user info retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/current-user', isAuth,getUser);

/**
 * @swagger
 * /api/user/edit-info:
 *   put:
 *     summary: Edit user info
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               City:
 *                 type: string
 *               County:
 *                 type: string
 *               Address:
 *                 type: string
 *     responses:
 *       200:
 *         description: User info updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/edit-info', isAuth,editUser);

/**
 * @swagger
 * /api/user/delete-user/{userID}:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to be deleted
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.delete('/delete-user/:userID', isAuth, deleteUser);


/**
 * @swagger
 * /api/user/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       404:
 *         description: No users found
 */
router.get('/users', isAuth,getUsers);

module.exports = router;
