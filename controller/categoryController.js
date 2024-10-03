const Category = require('../model/categoryModel'); // Assuming you have a Category model

// Create a new category
const createCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(200).json({ message: 'Category name is required',success: false });
        }

        const newCategory = new Category({ categoryName });
        await newCategory.save();

        res.status(201).json({ message: 'create Category successfully',success: true});
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get a single category by ID
const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(200).json({ message: 'Category not found',success: false });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).send(error);
    }
}
// Delete a category by ID
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(200).json({ message: 'Category not found',success: false });
        }

        res.status(200).json({ message: 'Category deleted successfully',success: true });
    } catch (error) {
        res.status(500).send(error);
    }
}

// Edit a category by ID
const editCategory = async (req, res, next) => {
    try {
        const { categoryId  } = req.params;
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(200).json({ message: 'Category name is required',success: false });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { categoryName },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(200).json({ message: 'Category not found',success: false });
        }

        res.status(200).json({ message: 'Category updated successfully',success: true });
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get all categories
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createCategory,
    getCategory,
    getCategories,
    deleteCategory,
    editCategory
};
