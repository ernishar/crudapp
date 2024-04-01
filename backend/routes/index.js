
const express = require('express');
const {
    registerUser,
    loginUser,
    fetchAllData,
    fetchDataById,
    updateUserData,
    deleteUserData,
} = require('../controller/userController');
const auth = require('../middleware/auth');
const fileUpload = require('../middleware/fileUpload');

const router = express.Router();

// Routes
router
    .post('/register', fileUpload,  registerUser)
    .post('/login', loginUser)
    .get('/all', fetchAllData)
    .get('/:id',auth, fetchDataById)
    .put('/update',auth,updateUserData)
    .delete('/:id', auth,deleteUserData)

exports.router = router;
