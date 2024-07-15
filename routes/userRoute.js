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
 *     responses:
 *       200:
 *         description: User info updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/edit-info', isAuth,editUser);

/**
 * @swagger
 * /api/user/delete-user:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.delete('/delete-user', isAuth,deleteUser);

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
