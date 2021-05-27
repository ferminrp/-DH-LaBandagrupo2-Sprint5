const express = require('express');
const router = express.Router();
const path = require('path');

const userController = require('../controllers/userController');

//middlewares
const uploadFile = require('../middlewares/multerUserMiddleware')
const validations = require('../middlewares/validateRegisterMiddleware');


//Procesar el registro
router.post('/register', uploadFile.single('imagen'), validations, userController.processRegister);

//Mostrar el register
router.get('/register', /*guest midlleware*/userController.showRegister);

//formulario de login
router.get('/login', userController.show);

// Procesar el login
//router.post('/login', usersController.loginProcess);

// Perfil de Usuario
//router.get('/profile/', authMiddleware, usersController.profile);

// Logout
//router.get('/logout/', usersController.logout);


router.get('/users/edit/:id', userController.editUserScreen);




module.exports = router;