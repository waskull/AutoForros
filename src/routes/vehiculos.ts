import { Router } from 'express';
const router = Router();
const { agregar,registrar,lista,apiGetUsuario, borrar,geditar,editar } = require('../controllers/automovil.controller');
const { isLoggedIn, isEmpleado } = require('../lib/auth');
router.use(isLoggedIn);

router.get('/agregar', isLoggedIn,isEmpleado, agregar);
router.post('/agregar', isLoggedIn,isEmpleado, registrar);
router.get('/', isLoggedIn,lista);
router.get('/usuario/:id', isLoggedIn,apiGetUsuario);
router.get('/borrar/:id', isLoggedIn,isEmpleado, borrar);
router.get('/editar/:id', isLoggedIn,isEmpleado, geditar);
router.post('/editar/:id', isLoggedIn,isEmpleado, editar);

export default router;