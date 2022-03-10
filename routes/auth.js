/*
    Rutas de Usuarios
*/
const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {CrearUsuario, LoginUsuario, RevalidarToken} = require('../controllers/auth');

const router = Router();

router.post('/new',
    [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es de 6 caracteres').isLength({min: 6}),
    validarCampos
    ], 
    CrearUsuario );

router.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password es de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    LoginUsuario);

router.get('/renew', validarJWT, RevalidarToken);

module.exports = router;