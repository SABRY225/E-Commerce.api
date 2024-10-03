const Customer = require('../model/customerModel');

/**
 * Get current user info
 */
const getUser = async (req, res, next) => {
    try {
        const user = await Customer.findById(req.userId); // Assuming user ID is available in req.user
        if (!user) {
            return res.status(200).json({ message: 'User not found',success: false });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Get all users
 */
const getUsers = async (req, res, next) => {
    try {
        const users = await Customer.find();
        if (users.length === 0) {
            return res.status(200).json({ message: 'No users found',success: false });
        }
       return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Edit user info
 */
const editUser = async (req, res, next) => {
    try {
        const { firstName,lastName, address,city,county } = req.body; // Adjust according to your user schema
        const updatedUser = await Customer.findByIdAndUpdate(
            req.userId,
            {firstName,lastName, address,city,county }, // Fields to update
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(200).json({ message: 'User not found',success: false });
        }
        return res.status(200).json({ message: 'User updated successfully',success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });

    }
};

/**
 * Delete user
 */
const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await Customer.findByIdAndDelete(userId); // Make sure to use the correct model.
        if (!user) {
            return res.status(200).json({ message: 'User not found',success: false });
        }
        return res.status(200).json({ message: 'User deleted successfully', success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getUser,
    getUsers,
    editUser,
    deleteUser
};
