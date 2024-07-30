const Customer = require('../model/customerModel');

/**
 * Get current user info
 */
const getUser = async (req, res, next) => {
    try {
        const user = await Customer.findById(req.userId); // Assuming user ID is available in req.user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Get all users
 */
const getUsers = async (req, res, next) => {
    try {
        const users = await Customer.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * Edit user info
 */
const editUser = async (req, res, next) => {
    try {
        const { firstName,lastName, Address,City,County } = req.body; // Adjust according to your user schema
        const updatedUser = await Customer.findByIdAndUpdate(
            req.userId,
            {firstName,lastName, Address,City,County }, // Fields to update
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete user
 */
const deleteUser = async (req, res, next) => {
    try {
        const { userID } = req.params;

        const user = await Customer.findByIdAndDelete(userID); // Make sure to use the correct model.
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUser,
    getUsers,
    editUser,
    deleteUser
};
