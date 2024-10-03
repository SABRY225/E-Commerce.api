const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    productName: {
        type: String,
        required: true
    },
    productImg: {
        type: [String], // Define productImg as an array of strings
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productReview: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Product', ProductSchema);
