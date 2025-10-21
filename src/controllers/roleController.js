const roleService = require('../services/roleService');

const getAllRoles = async (req, res) => {
    try {
        // Call the service function to get all roles
        const roles = await roleService.getAllRoles();
        // Handle the data (roles) and send a response
        res.status(200).json({
            status: 'OK',
            data: roles
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const getOneRole = async (req, res) => {
    try {
        const { params: { roleId } } = req;
        if (!roleId) {
            return;
        }
        // Call the service function to get the role by id
        const role = await roleService.getOneRole(roleId);
        // Handle the data (role) and send a response
        res.status(200).json({
            status: 'OK',
            data: role
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const createRole = async (req, res) => {
    try {
        const { body } = req;
        const newRole = {
            name: body.name,
            code: body.code,
            description: body.description,
        };
        // Call the service function to create a role
        const role = await roleService.createRole(newRole);
        // Handle the data (role) and send a response
        res.status(200).json({
            status: 'OK',
            data: role
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const updateRole = async (req, res) => {
    try {
        const { params: { roleId } } = req;
        const { body } = req;
        if (!roleId) {
            return;
        }
        const updatedData = {
            name: body.name,
            code: body.code,
            description: body.description,
            status: body.status,
        };
        // Call the service function to get the role by id
        const role = await roleService.updateRole(roleId, updatedData);
        // Handle the data (role) and send a response
        res.status(200).json({
            status: 'OK',
            data: role
        });
    } catch (error) {
        // Handle errors and send an error response
        res.status(500).json({
            error: 'Internal server error',
            details: error
        });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { params: { roleId } } = req;
        if (!roleId) {
            return;
        }
        // Call the service function to get the role by id
        const role = await roleService.deleteRole(roleId);
        // Handle the data (role) and send a response
        res.status(200).json({
            status: 'OK',
            data: role
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
    getAllRoles,
    getOneRole,
    createRole,
    updateRole,
    deleteRole
}