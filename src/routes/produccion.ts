import { Router } from 'express';
const router = Router();
const { isLoggedIn, isCliente } = require('../lib/auth');
const { lista,listaP,aprobar } = require('../controllers/produccion.controller');

router.use(isLoggedIn);
router.get('/',isLoggedIn,isCliente, lista);
router.get('/registro',isLoggedIn,isCliente,listaP);
router.get('/aprobar/:id',isLoggedIn,isCliente, aprobar);
export default router;