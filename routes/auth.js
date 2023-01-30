/*
    Rutas de Usuario / Auth
    HOST +  / api/auth
*/


const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, revaidateToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validateFileds');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [//Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de mas de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ],
    createUser);

router.post(
    '/', 
    [//Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de mas de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ],
    loginUser);

router.get('/renew', validarJWT ,revaidateToken); 

module.exports = router; 