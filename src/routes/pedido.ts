import { Router } from 'express';
const router = Router();
const { isLoggedIn,isCliente,isEmpleado } = require('../lib/auth');
const { lista, agregar, agregarPedido } = require('../controllers/pedido.controller');
router.use(isLoggedIn);

router.get('/',isLoggedIn,isCliente,isEmpleado, lista);
router.get('/agregar',isLoggedIn,isCliente,isEmpleado, agregar);
router.post('/agregar',isLoggedIn,isCliente,isEmpleado, agregarPedido);
export default router;