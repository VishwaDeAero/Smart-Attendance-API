const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        // Call the service function to get all users
        const users = await userService.getAllUsers();
        // Handle the data (users) and send a response
        res.status(200).json({
            status: 'OK',
            data: users
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { body } = req;
        const currentUser = {
            username: body.username,
            password: body.password
        };
        // Call the service function to get the user by id
        const user = await userService.getUserByUsername(currentUser.username);
        if (!user) {
            res.status(400).json({
                status: 'FAIL',
                error: 'User not found'
            });
        } else {
            if (atob(user.password) === currentUser.password) {
                // Handle the data (user) and send a response
                const secretKey = process.env.SECRET_KEY;
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    role: user.role.name
                }, secretKey, { expiresIn: '1h' });
                res.status(200).json({
                    status: 'OK',
                    token: token,
                    expiresIn: 3600,
                    user: {
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            } else {
                res.status(400).json({
                    status: 'FAIL',
                    error: 'Username or Password is Incorrect'
                });
            }
        }
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const getOneUser = async (req, res) => {
    try {
        const { params: { userId } } = req;
        if (!userId) {
            return;
        }
        // Call the service function to get the user by id
        const user = await userService.getOneUser(userId);
        // Handle the data (user) and send a response
        res.status(200).json({
            status: 'OK',
            data: user
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { body } = req;
        const newUser = {
            name: body.name,
            username: body.username,
            password: btoa(body.password),
            email: body.email,
            roleId: body.roleId,
        };
        // Call the service function to create a user
        const user = await userService.createUser(newUser);
        // Handle the data (user) and send a response
        res.status(200).json({
            status: 'OK',
            data: user
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { params: { userId } } = req;
        const { body } = req;
        if (!userId) {
            return;
        }
        let updatedData = {
            name: body.name,
            username: body.username,
            email: body.email,
            roleId: body.roleId,
            status: body.status
        };
        if(body.password){
            let encpassword = btoa(body.password);
            updatedData = {
                ...updatedData,
                password: encpassword,
            }
        }

        // Call the service function to get the user by id
        const user = await userService.updateUser(userId, updatedData);
        // Handle the data (user) and send a response
        res.status(200).json({
            status: 'OK',
            data: user
        });
    } catch (error) {
        // Handle errors and send an error response
        console.log('Update User Error', error)
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { params: { userId } } = req;
        if (!userId) {
            return;
        }
        // Call the service function to get the user by id
        const user = await userService.deleteUser(userId);
        // Handle the data (user) and send a response
        res.status(200).json({
            status: 'OK',
            data: user
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    loginUser,
    createUser,
    updateUser,
    deleteUser
}