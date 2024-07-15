const mongoose = require('mongoose');

const OrderDetailsSchema = new mongoose.Schema({
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    orderData: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('orderDetails', OrderDetailsSchema);
