const express = require('express');
const { protected } = require('../../middleware/auth');
const router = express.Router();

const {
    getAllRoles,
    getOneRole,
    createRole,
    updateRole,
    deleteRole 
} = require('../../controllers/roleController');

router.get("/", getAllRoles);
router.get("/:roleId", getOneRole);
router.post("/", createRole);
router.patch("/:roleId", updateRole);
router.delete("/:roleId", deleteRole);
// router.post("/", protected, createRole);
// router.patch("/:roleId", protected, updateRole);
// router.delete("/:roleId", protected, deleteRole);

module.exports = router;