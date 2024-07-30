const Category = require('../model/categoryModel'); // Assuming you have a Category model

// Create a new category
const createCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const newCategory = new Category({ categoryName });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
}

// Get a single category by ID
const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Log the ID to check what value is being received
        console.log('Received ID:', id);

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}
// Delete a category by ID
const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
    }
}

// Edit a category by ID
const editCategory = async (req, res, next) => {
    try {
        const { categoryId  } = req.params;
        console.log(categoryId);
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { categoryName },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error);
    }
}

// Get all categories
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createCategory,
    getCategory,
    getCategories,
    deleteCategory,
    editCategory
};
