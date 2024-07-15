const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { editCategory, crateCategory, getCategory, getCategories, deleteCategory } = require('../controller/categoryController');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management operations
 */

/**
 * @swagger
 * /api/category/create-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create-category', isAuth,crateCategory);

/**
 * @swagger
 * /api/category/edit-category/{categoryId}:
 *   put:
 *     summary: Edit an existing category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to edit
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 */
router.put('/edit-category/:categoryId', isAuth,editCategory);

/**
 * @swagger
 * /api/category/delete-category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 */
router.delete('/delete-category/:categoryId', isAuth,deleteCategory);

/**
 * @swagger
 * /api/category/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 */
router.get('/category/:categoryId', isAuth,getCategory);

/**
 * @swagger
 * /api/category/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       404:
 *         description: No categories found
 */
router.get('/categories', isAuth,getCategories);

module.exports = router;
