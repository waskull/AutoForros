import { Router } from 'express';
const router = Router();
const { isLoggedIn, isCliente,isEmpleado } = require('../lib/auth');
const {listaCostura,registrarCostura,agregarCostura,borrarCostura} = require('../controllers/costura.controller');

router.get('/',isLoggedIn,isCliente, listaCostura);
router.get('/agregar',isLoggedIn,isCliente,isEmpleado, agregarCostura);
router.post('/agregar',isLoggedIn,isCliente,isEmpleado, registrarCostura);
router.get('/borrar/:id',isLoggedIn,isCliente,isEmpleado, borrarCostura);

export default router;