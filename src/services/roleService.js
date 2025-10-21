const Role = require('../models/roleModel');

const getAllRoles = () => {
    return new Promise((resolve, reject) => {
        Role.findAll({
            // Removes Soft Deletes from View
            where: {
              deletedAt: null,
            },
        })
          .then((roles) => {
            resolve(roles); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const getOneRole = (id) => {
    return new Promise((resolve, reject) => {
        Role.findByPk(id)
          .then((role) => {
            resolve(role); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const getRoleByRolename = (rolename) => {
    return new Promise((resolve, reject) => {
        Role.findOne({
            // Find by rolename
            where: {
              name: rolename,
            },
            include: Role,
        })
          .then((role) => {
            resolve(role); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const createRole = (newRole) => {
    return new Promise((resolve, reject) => {
        Role.create(newRole)
          .then((role) => {
            resolve(role); // Resolve the Promise with the result
        })
          .catch((error) => {
            reject(error); // Reject the Promise with an error if there's a problem
        });
    });
}

const updateRole = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the Role by its ID
            const role = await Role.findByPk(id);
    
            if (!role) {
            reject(new Error('Role not found'));
            return;
            }
    
            // Update the role with the new data
            await role.update(updatedData);
    
            // Resolve the Promise with the updated role
            resolve(role);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteRole = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find the role by its ID
            const role = await Role.findByPk(id);
    
            if (!role) {
            reject(new Error('Role not found'));
            return;
            }
    
            // Update the role with the new data
            await role.destroy();
    
            // Resolve the Promise with the updated role
            resolve(role);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllRoles,
    getOneRole,
    getRoleByRolename,
    createRole,
    updateRole,
    deleteRole
}