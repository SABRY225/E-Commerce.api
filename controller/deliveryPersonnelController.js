const DeliveryPersonnel = require('../model/deliveryPersonnelModel'); 
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
    // Implementation here
  };
  
  const deleteAssignOrder = async (req, res, next) => {
    // Implementation here
  };
  
  const editAssignOrder = async (req, res, next) => {
    // Implementation here
  };
  
  const updateOrderStatus = async (req, res, next) => {
    // Implementation here
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
  