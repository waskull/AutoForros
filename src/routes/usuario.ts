import { Router } from 'express';
const router = Router();
const { isLoggedIn,isCliente,isEmpleado } = require('../lib/auth');
const { lista, agregar, registrar, borrar, geditar, editar } = require('../controllers/usuario.controller');
router.use(isLoggedIn);

router.get('/', isLoggedIn,isCliente,isEmpleado, lista);
router.get('/agregar', isLoggedIn,isCliente,isEmpleado, agregar);
router.post('/agregar', isLoggedIn,isCliente,isEmpleado, registrar);
router.get('/borrar/:id', isLoggedIn,isCliente,isEmpleado, borrar);
router.get('/editar/:id', isLoggedIn,isEmpleado, geditar);
router.post('/editar/:id', isLoggedIn,isEmpleado, editar);

export default router;