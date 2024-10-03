require('dotenv').config();
const Product = require('../model/prouductModel');

const createProduct = async (req, res, next) => {
    const {categoryId }=req.params
    if (!categoryId) {
        return res.status(200).json({message:"Category not Found",success: false });
    }
  try {
    const {
      productName,
      productImg, // Include productImg from req.body
      quantity,
      price,
      productDescription,
      productReview,
    } = req.body;

    const product = new Product({
      productName,
      productImg, 
      quantity,
      price,
      productDescription,
      productReview,
      categoryId
    });

    await product.save();
    return res.status(200).json({message:"product added successfully",success: false });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const editProduct = async (req, res, next) => {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        'productName', 
        'productImg', // Include productImg in allowed updates
        'quantity', 
        'price', 
        'productDescription', 
        'productReview'
      ];
      
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));
      
      if (!isValidOperation) {
        return res.status(200).json({ message: 'Invalid updates!',success: false  });
      }
  
      const product = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!product) {
        return res.status(200).json({ message: 'Invalid updates!',success: false  });
      }
  
      return res.status(200).json({ success: true, message:"product updated successfully" });

    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });

    }
  };
  
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
        return res.status(200).json({message:"product not found",success: false});
    }else{
      return res.status(200).json({message:"product deleted successfully",success: true});
    }
  } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(200).json({message:"product Not Found",success: false});
    }
    return  res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
