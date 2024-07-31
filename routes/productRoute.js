const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const {
    createProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getProducts
} = require('../controller/productController');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management operations
 */

/**
 * @swagger
 * /api/product/{categoryID}/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryID
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
 *               productName:
 *                 type: string
 *               productImg:
 *                 type: array
 *                 items:
 *                   type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               productDescription:
 *                 type: string
 *               productReview:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post('/:categoryID/create-product', isAuth, createProduct);
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productImg:
 *                 type: array
 *                 items:
 *                   type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               productDescription:
 *                 type: string
 *               productReview:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
router.put('/edit-product/:productId', isAuth, editProduct);

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
router.delete('/delete-product/:productId', isAuth, deleteProduct);

/**
 * @swagger
 * /api/product/singleproduct/{productId}:
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
router.get('/singleproduct/:productId', isAuth, getProduct);

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
router.get('/products', isAuth, getProducts);

module.exports = router;
