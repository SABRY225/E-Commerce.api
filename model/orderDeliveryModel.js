const mongoose = require('mongoose');

const OrderDeliverySchema = new mongoose.Schema({
    deliveryPersonnelID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPersonnel',
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
});

module.exports = mongoose.model('OrderDelivery', OrderDeliverySchema);
