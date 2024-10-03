const mongoose = require('mongoose');

const OrderDeliverySchema = new mongoose.Schema({
    deliveryPersonnelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPersonnel',
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
});

module.exports = mongoose.model('OrderDelivery', OrderDeliverySchema);
