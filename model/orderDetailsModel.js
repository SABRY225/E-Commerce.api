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
    totalPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('orderDetails', OrderDetailsSchema);
