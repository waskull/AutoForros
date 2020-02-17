import { Router } from 'express';
const router = Router();
const { isLoggedIn,isCliente,isNotVendedorOrAdmin,isProductor,isNotVendedorOrAdminOrClient} = require('../lib/auth');

const { lista, agregar, agregarSolicitud, cancelar, aprobar, agregarPago,setPago,tipos } = require('../controllers/solicitud.controller');
router.use(isLoggedIn);

router.get('/',isLoggedIn,isProductor, lista);
router.get('/agregar',isLoggedIn,isProductor, agregar);
router.post('/agregar',isLoggedIn,isProductor, agregarSolicitud);
router.get('/cancelar/:id',isLoggedIn, cancelar);
router.get('/aprobar/:id',isLoggedIn,isCliente,isNotVendedorOrAdmin, aprobar);
router.get('/pago/:id',isLoggedIn,isNotVendedorOrAdminOrClient, agregarPago);
router.post('/pago',isLoggedIn,isNotVendedorOrAdminOrClient, setPago);
router.get('/api/tipos', tipos);


export default router;