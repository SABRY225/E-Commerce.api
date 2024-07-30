const Vehicle = require('../model/vehicleModel');

// Add a new vehicle
const addVehicle = async (req, res, next) => {
    try {
        const { Type, registrationNumber, availabilityStatus } = req.body;

        if (!Type || !registrationNumber || !availabilityStatus) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newVehicle = new Vehicle({ Type, registrationNumber, availabilityStatus });
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        if (error.code === 11000) { // Handle duplicate key error
            return res.status(400).json({ message: 'Registration number already exists' });
        }
        next(error);
    }
}

// Delete a vehicle by ID
const deleteVehicle = async (req, res, next) => {
    try {
        const { vehicleId  } = req.params;


        const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        next(error);
    }
}

// Edit a vehicle by ID
const editVehicle = async (req, res, next) => {
    try {
        const { vehicleId } = req.params;
        const { Type, registrationNumber, availabilityStatus } = req.body;

        if (!Type || !registrationNumber || !availabilityStatus) {
            return res.status(400).json({ message: 'All fields are required' });
        }

    
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { Type, registrationNumber, availabilityStatus },
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json(updatedVehicle);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error for registrationNumber
            return res.status(400).json({ message: 'Registration number must be unique' });
        }
        next(error);
    }
}

// Get a single vehicle by ID
const getVehicle = async (req, res, next) => {
    try {
        const { vehicleId } = req.params;


        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        next(error);
    }
}

// Get all vehicles
const getVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addVehicle,
    deleteVehicle,
    editVehicle,
    getVehicle,
    getVehicles
};
