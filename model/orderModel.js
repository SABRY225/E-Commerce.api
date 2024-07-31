const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true // Assuming each order must have a customer
    },
    products: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Correct model assumed as 'Product'
                required: true // Assuming each product must be linked
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
    orderDate: { // Renamed for clarity
        type: String,
        default: Date.now, 
    },
    paymentType: {
        type: String,
        enum: ['Cash', 'Credit Card'],
        default: 'Cash'
    },
    paymentStatus: {
        type: String,
        enum: ['Done', 'Not Done'],
        default: 'Not Done'
    },
    paymentDate: { // Renamed for clarity
        type: String
    },
    status: {
        type: String,
        enum: ['SendToAdmin', 'SendToDelivery',"Done", 'Not Done'],
        default: 'SendToAdmin'
    },
});

module.exports = mongoose.model('Order', OrderSchema);
