const express = require('express');
const { protected } = require('../../middleware/auth');
const router = express.Router();

const {
    getAllUsers,
    getOneUser,
    loginUser,
    createUser,
    updateUser,
    deleteUser 
} = require('../../controllers/userController');

router.get("/", getAllUsers);
router.get("/:userId", getOneUser);
router.post("/login/", loginUser);
router.post("/", protected(['Administrator']), createUser);
router.patch("/:userId", protected(['Administrator']), updateUser);
router.delete("/:userId", protected(['Administrator']), deleteUser);

module.exports = router;