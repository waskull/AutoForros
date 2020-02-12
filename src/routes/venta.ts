import { Router } from 'express';
const router = Router();
const { isLoggedIn, isCliente,isProductor } = require('../lib/auth');
import VentaController from '../controllers/venta.controller';
router.use(isLoggedIn);

router.get('/',isLoggedIn,isCliente,isProductor, VentaController.lista);
router.get('/api/semanal/',VentaController.ventasSemanal);
router.get('/api/:id',VentaController.ventasIntervalo);

export default router;