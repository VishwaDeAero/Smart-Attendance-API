const Role = require('../models/roleModel');
const User = require('../models/userModel');

User.belongsTo(Role);

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.findAll({
            // Removes Soft Deletes from View
            where: {
                deletedAt: null,
            },
            attributes: { exclude: ['password'] },
            include: Role,
        })
            .then((users) => {
                resolve(users); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const getOneUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findByPk(id, {
            attributes: { exclude: ['password'] }
        })
            .then((user) => {
                resolve(user); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            // Find by username
            where: {
                username: username,
            },
            include: Role,
        })
            .then((user) => {
                resolve(user); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        User.create(newUser)
            .then((user) => {
                resolve(user); // Resolve the Promise with the result
            })
            .catch((error) => {
                reject(error); // Reject the Promise with an error if there's a problem
            });
    });
}

const updateUser = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the User by its ID
            const user = await User.findByPk(id);

            if (!user) {
                reject(new Error('User not found'));
                return;
            }

            // Update the user with the new data
            await user.update(updatedData);

            // Resolve the Promise with the updated user
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the user by its ID
            const user = await User.findByPk(id);

            if (!user) {
                reject(new Error('User not found'));
                return;
            }

            // Update the user with the new data
            // await user.destroy();
            await user.update({
                status: 0,
                deletedAt: Date.now()
            });

            // Resolve the Promise with the updated user
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllUsers,
    getOneUser,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
}