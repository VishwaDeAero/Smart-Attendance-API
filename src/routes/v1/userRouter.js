const express = require('express');
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
router.post("/", createUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;