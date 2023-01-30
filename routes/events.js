/*
    Rutas de Events
    HOST +  / api/events
*/

const { Router } = require("express");
const { check } = require('express-validator') ;

const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validateFileds')
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router()

//Todas tiene que pasar por la validacion del JWT
router.use( validarJWT )//Se puede usar el metodo use para tener middleWare implicito en todas las funciones de abajo

//Obtener eventos
router.get( '/', getEvents)

//Crear nuevo evento
router.post(
    '/', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    createEvent)

//Actualizar evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    updateEvent);

//Borrrar evento
router.delete('/:id', deleteEvent);

module.exports = router;