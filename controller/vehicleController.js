const Vehicle = require('../model/vehicleModel');

// Add a new vehicle
const addVehicle = async (req, res, next) => {
    try {
        const { type, registrationNumber, availabilityStatus } = req.body;

        if (!type || !registrationNumber || !availabilityStatus) {
            return res.status(200).json({ message: 'All fields are required',success:false });
        }

        const newVehicle = new Vehicle({ type, registrationNumber, availabilityStatus });
        await newVehicle.save();
        res.status(201).json({ message: 'add Vehicle successfully',success:false });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Delete a vehicle by ID
const deleteVehicle = async (req, res, next) => {
    try {
        const { vehicleId  } = req.params;
        const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!deletedVehicle) {
            return res.status(200).json({ message: 'Vehicle not found',success:false });
        }

        res.status(200).json({ message: 'Vehicle deleted successfully',success:true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Edit a vehicle by ID
const editVehicle = async (req, res, next) => {
    try {
        const { vehicleId } = req.params;
        const { type, registrationNumber, availabilityStatus } = req.body;

        if (!type || !registrationNumber || !availabilityStatus) {
            return res.status(200).json({ message: 'All fields are required',success:false });
        }

    
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            { type, registrationNumber, availabilityStatus },
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return res.status(200).json({ message: 'Vehicle not found' , success:false});
        }

        res.status(200).json({ message: 'Vehicle update successfully' , success:true});
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Get a single vehicle by ID
const getVehicle = async (req, res, next) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(200).json({ message: 'Vehicle not found',success:false });
        }

        return res.status(200).json(vehicle);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// Get all vehicles
const getVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find();
        return res.status(200).json(vehicles);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });

    }
}

module.exports = {
    addVehicle,
    deleteVehicle,
    editVehicle,
    getVehicle,
    getVehicles
};
