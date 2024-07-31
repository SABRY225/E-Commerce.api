const DeliveryPersonnel = require('../model/deliveryPersonnelModel'); 
const OrderDelivery = require('../model/orderDeliveryModel'); 
const Order = require('../model/orderModel'); 
const bcrypt = require('bcryptjs');

const addDeliveryPersonnel = async (req, res, next) => {  
      const { vehicleID } = req.params;
      const { Name, Phone, Address, Email, Password } = req.body;
      try {
        let user = await DeliveryPersonnel.findOne({ Email });
        if (user) {
            return res.status(400).json({ msg: 'DeliveryPersonnel already exists' });
        }
        user = new DeliveryPersonnel({ Name, Phone, Address, Email, Password,vehicleID});
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(Password, salt);
        await user.save();
        res.status(201).json({ message: 'Delivery personnel added successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  };
  
  const deleteDeliveryPersonnel = async (req, res, next) => {
    try {
      const { personnelId } = req.params;
      await DeliveryPersonnel.findByIdAndDelete(personnelId);
      res.status(200).json({ message: 'Delivery personnel deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'Delivery personnel not found' });
    }
  };
  
  const editDeliveryPersonnel = async (req, res, next) => {
    try {
      const { personnelId } = req.params;
      const { Name, Phone, Address, Email, Password ,vehicleID} = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);
      const updatedPersonnel = await DeliveryPersonnel.findByIdAndUpdate(personnelId, { Name, Phone, Address, Email, Password:hashedPassword ,vehicleID}, { new: true });
      res.status(200).json(updatedPersonnel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getDeliveryPersonnel = async (req, res, next) => {
    try {
      const { personnelId } = req.params;
      const personnel = await DeliveryPersonnel.findById(personnelId);
      if (!personnel) {
        return res.status(404).json({ error: 'Delivery personnel not found' });
      }
      res.status(200).json(personnel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getDeliveryPersonnels = async (req, res, next) => {
    try {
      const personnels = await DeliveryPersonnel.find();
      res.status(200).json(personnels);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const addAssignOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const orderDelivery = await OrderDelivery.findOne({ orderID: orderId });

        if (orderDelivery) {
            return res.status(400).json({ error: 'Order already assigned to delivery' });
        }

        const { personnelId } = req.body;
        const newOrderDelivery = new OrderDelivery({
            orderID: orderId,
            deliveryPersonnelID: personnelId
        });

        await newOrderDelivery.save();
        res.status(201).json({ message: 'Order assigned to delivery successfully' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

  
  const editAssignOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { personnelId } = req.body;

        // Find the existing order assignment
        const orderDelivery = await OrderDelivery.findOne({ orderID: orderId });

        if (!orderDelivery) {
            return res.status(404).json({ error: 'Order not found in delivery assignments' });
        }

        // Update the delivery personnel ID
        orderDelivery.deliveryPersonnelID = personnelId;

        // Save the updated order delivery
        await orderDelivery.save();

        res.status(200).json({ message: 'Order delivery assignment updated successfully', orderDelivery });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAssignOrder = async (req, res, next) => {
  try {
      const { orderId } = req.params;

      // Find and delete the order assignment
      const result = await OrderDelivery.deleteOne({ orderID: orderId });

      if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Order delivery assignment not found' });
      }

      res.status(200).json({ message: 'Order delivery assignment deleted successfully' });

  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

  
const updateOrderStatus = async (req, res, next) => {
  try {
      const { orderId } = req.params;
      const { status } = req.body;

      // Validate status value if necessary
      const validStatuses = ['Done', 'Not Done']; // Example statuses
      if (!validStatuses.includes(status)) {
          return res.status(400).json({ error: 'Invalid status value' });
      }

      // Find the order by ID
      const order = await Order.findById(orderId);

      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }

      // Update the order status
      order.status = status;
      await order.save();

      res.status(200).json({ message: 'Order status updated successfully', order });

  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

  
  module.exports = {
    addDeliveryPersonnel,
    deleteDeliveryPersonnel,
    editDeliveryPersonnel,
    getDeliveryPersonnel,
    getDeliveryPersonnels,
    addAssignOrder,
    deleteAssignOrder,
    editAssignOrder,
    updateOrderStatus
  };
  