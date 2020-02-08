import { Router } from 'express';
const router = Router();
const { isLoggedIn,isCliente } = require('../lib/auth');

const { lista, agregar, agregarSolicitud, cancelar, aprobar, agregarPago,setPago,tipos } = require('../controllers/solicitud.controller');
router.use(isLoggedIn);

router.get('/',isLoggedIn, lista);
router.get('/agregar',isLoggedIn, agregar);
router.post('/agregar',isLoggedIn, agregarSolicitud);
router.get('/cancelar/:id',isLoggedIn, cancelar);
router.get('/aprobar/:id',isLoggedIn,isCliente, aprobar);
router.get('/pago/:id',isLoggedIn, agregarPago);
router.post('/pago',isLoggedIn, setPago);
router.get('/api/tipos', tipos);


export default router;