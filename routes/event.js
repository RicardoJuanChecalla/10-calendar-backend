/*
    Event Route
    /api/event
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');
const {isDate}=require('../helpers/isDate');
const {getEventos,crearEvento,actualizarEvento,eliminarEvento} = require('../controllers/event');

const router = Router();
//Todos tienen que pasar por la validacion JWT
router.use(validarJWT);

router.get('/', getEventos);

router.post('/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatorio').not().isEmpty().custom(isDate),
        check('end','Fecha final es obligatorio').not().isEmpty().custom(isDate),
        validarCampos
    ],
    crearEvento);

router.put('/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatorio').not().isEmpty().custom(isDate),
        check('end','Fecha final es obligatorio').not().isEmpty().custom(isDate),
        validarCampos
    ], 
    actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;