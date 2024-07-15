const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { cratePayment, editPayment, deletePayment, getPayment, getPayments } = require('../controller/paymentController');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management operations
 */

/**
 * @swagger
 * /api/product/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create-product', isAuth,cratePayment);

/**
 * @swagger
 * /api/product/edit-product/{productId}:
 *   put:
 *     summary: Edit an existing product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to edit
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
router.put('/edit-product/:productId', isAuth,editPayment);

/**
 * @swagger
 * /api/product/delete-product/{productId}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
router.delete('/delete-product/:productId', isAuth,deletePayment);

/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
router.get('/product/:productId', isAuth,getPayment);

/**
 * @swagger
 * /api/product/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       404:
 *         description: No products found
 */
router.get('/products', isAuth,getPayments);

module.exports = router;
