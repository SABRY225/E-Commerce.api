const DeliveryPersonnel = require('../model/deliveryPersonnelModel'); 
const OrderDelivery = require('../model/orderDeliveryModel'); 
const Order = require('../model/orderModel'); 
const bcrypt = require('bcryptjs');

const addDeliveryPersonnel = async (req, res, next) => {  
      const { vehicleID } = req.params;
      const { name, phone, address, email, password } = req.body;
      try {
        let user = await DeliveryPersonnel.findOne({ email });
        if (user) {
            return res.status(200).json({ message: 'DeliveryPersonnel already exists',success: false });
        }
        user = new DeliveryPersonnel({ name, phone, address, email, password,vehicleID});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ message: 'Delivery personnel added successfully',success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };
  
  const deleteDeliveryPersonnel = async (req, res, next) => {
    try {
      const { personnelId } = req.params;
      await DeliveryPersonnel.findByIdAndDelete(personnelId);
      res.status(200).json({ message: 'Delivery personnel deleted successfully',success: false });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  const editDeliveryPersonnel = async (req, res, next) => {
    try {
      const { personnelId } = req.params;
      const { name, phone, address, email, password ,vehicleID} = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updatedPersonnel = await DeliveryPersonnel.findByIdAndUpdate(personnelId, { name, phone, address, email, password:hashedPassword ,vehicleID}, { new: true });
      res.status(200).json({ message: 'Delivery personnel updated successfully',success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getDeliveryPersonnel = async (req, res, next) => {
    try {
      const { personnelId } = req.params;
      const personnel = await DeliveryPersonnel.findById(personnelId);
      if (!personnel) {
        return res.status(200).json({ message: 'Delivery personnel not found',success: false });
      }
      res.status(200).json(personnel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getDeliveryPersonnels = async (req, res, next) => {
    try {
      const personnels = await DeliveryPersonnel.find();
      res.status(200).json(personnels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const addAssignOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(200).json({ message: 'Order not found',success: false });
        }

        const orderDelivery = await OrderDelivery.findOne({orderId });

        if (orderDelivery) {
            return res.status(200).json({ message: 'Order already assigned to delivery',success: false });
        }

        const { personnelId } = req.body;
        const newOrderDelivery = new OrderDelivery({
            orderId,
            deliveryPersonnelId: personnelId
        });

        await newOrderDelivery.save();
        res.status(201).json({ message: 'Order assigned to delivery successfully',success: true });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

  
  const editAssignOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { personnelId } = req.body;

        // Find the existing order assignment
        const orderDelivery = await OrderDelivery.findOne({orderId });

        if (!orderDelivery) {
            return res.status(200).json({ error: 'Order not found in delivery assignments',success: false  });
        }

        // Update the delivery personnel ID
        orderDelivery.deliveryPersonnelId = personnelId;

        // Save the updated order delivery
        await orderDelivery.save();

        res.status(200).json({ message: 'Order delivery assignment updated successfully', success:true });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAssignOrder = async (req, res, next) => {
  try {
      const { orderId } = req.params;

      // Find and delete the order assignment
      const result = await OrderDelivery.deleteOne({ orderId });

      if (result.deletedCount === 0) {
          return res.status(200).json({ message: 'Order delivery assignment not found',success: false   });
      }

      res.status(200).json({ message: 'Order delivery assignment deleted successfully',success: true });

  } catch (error) {
      res.status(200).json({ error: error.message });
  }
};

  
const updateOrderStatus = async (req, res, next) => {
  try {
      const { orderId } = req.params;
      const { status } = req.body;

      // Validate status value if necessary
      const validStatuses = ['Done', 'Not Done']; // Example statuses
      if (!validStatuses.includes(status)) {
          return res.status(200).json({ message: 'Invalid status value',success: false });
      }

      // Find the order by ID
      const order = await Order.findById(orderId);

      if (!order) {
          return res.status(200).json({ message: 'Order not found',success: false   });
      }

      // Update the order status
      order.status = status;
      await order.save();

      res.status(200).json({ message: 'Order status updated successfully', success: true });

  } catch (error) {
      res.status(500).json({ error: error.message });
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
  