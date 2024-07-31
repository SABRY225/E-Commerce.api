require('dotenv').config();
const Product = require('../model/prouductModel');

const createProduct = async (req, res, next) => {
    const {categoryID }=req.params
    if (!categoryID) {
        return res.status(400).json({msg:"Category not Found"});
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
      productImg, // Assign productImg here
      quantity,
      price,
      productDescription,
      productReview,
      categoryID
    });

    await product.save();
    return res.status(200).json({msg:"product added successfully"});
  } catch (error) {
    res.status(400).send(error);
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
        return res.status(400).send({ error: 'Invalid updates!' });
      }
  
      const product = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!product) {
        return res.status(404).send();
      }
  
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
        return res.status(404).send();
    }else{
      return res.status(200).json({msg:"product deleted successfully"});

    }
  } catch (error) {
    return res.status(400).json({msg:"product Not Found"});
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(400).json({msg:"product Not Found"});
    }
    res.send(product);
  } catch (error) {
    return res.status(400).json({msg:"product Not Found"});
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
