const Order = require('../model/orderModel');
// Helper function to format date as dd/mm/yyyy
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Create Order Function
const createOrder = async (req, res, next) => {
    try {
        const customerId = req.userId;
        const {
            products,
            paymentType,
        } = req.body;

        const myday = new Date(); // Current date
        const orderDate = formatDate(myday);
        const paymentDate = formatDate(new Date(myday.setDate(myday.getDate() + 4))); // 4 days after orderDate

        const order = new Order({
            products,
            orderDate,
            paymentType,
            paymentDate,
            customerId
        });
        await order.save();
        return res.status(201).json({ message: 'Order created successfully', success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// Edit Order Function
const editOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const updates = req.body;

        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, {
            new: true, // Return the updated document
            runValidators: true // Validate updates according to schema
        });

        if (!updatedOrder) {
            return res.status(200).json({ message: 'Order not found', success: false });
        }

        return res.status(200).json({ message: 'Order updated successfully', success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(200).json({ message: 'Order not found',success: false });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        if (orders.length === 0) return res.status(200).json({ message: 'No orders found',success: false });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId);
        if (!order) return res.status(200).json({ message: 'Order not found',success: false });
        return res.status(200).json({ message: 'Order deleted successfully',success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createOrder,
    getOrder,
    getOrders,
    deleteOrder,
    editOrder,
};
