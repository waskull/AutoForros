import { Router } from 'express';
const router = Router();
const { isLoggedIn,isCliente } = require('../lib/auth');
const { lista, registro,aprobar } = require('../controllers/proceso.controller');
router.use(isLoggedIn);

router.get('/',isLoggedIn,isCliente,lista);
router.get('/aprobar/:id',isLoggedIn,isCliente, aprobar);

export default router;