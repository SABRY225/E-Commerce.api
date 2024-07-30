const mongoose = require('mongoose');

const customerSelectCategorySchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

module.exports = mongoose.model('customerSelectCategory', customerSelectCategorySchema);
