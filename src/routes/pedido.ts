import { Router } from 'express';
const router = Router();
const { isLoggedIn,isCliente } = require('../lib/auth');
const { lista, agregar, agregarPedido } = require('../controllers/pedido.controller');
router.use(isLoggedIn);

router.get('/',isLoggedIn,isCliente, lista);
router.get('/agregar',isLoggedIn,isCliente, agregar);
router.post('/agregar',isLoggedIn,isCliente, agregarPedido);
export default router;