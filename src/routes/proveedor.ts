import { Router } from 'express';
const router = Router();
const { isLoggedIn,isEmpleado } = require('../lib/auth');
const { lista, agregar, registrar, borrar, geditar, editar } = require('../controllers/proveedor.controller');
router.use(isLoggedIn);

router.get('/', isLoggedIn,isEmpleado, lista);
router.get('/agregar', isLoggedIn,isEmpleado, agregar);
router.post('/agregar', isLoggedIn,isEmpleado, registrar);
router.get('/borrar/:id', isLoggedIn,isEmpleado, borrar);
router.get('/editar/:id', isLoggedIn,isEmpleado, geditar);
router.post('/editar/:id', isLoggedIn,isEmpleado, editar);

export default router;