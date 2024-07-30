const mongoose = require('mongoose');

const ProuductSchema = new mongoose.Schema({
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    prouductName: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    productDescripton: {
        type: String,
        required: true
    },
    productReview: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Prouduct', ProuductSchema);
