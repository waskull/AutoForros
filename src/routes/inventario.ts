import { Router } from 'express';
const router = Router();
const { isLoggedIn, isCliente } = require('../lib/auth');

const { lista } = require('../controllers/inventario.controller');
router.use(isLoggedIn);

router.get('/',isLoggedIn,isCliente, lista);

export default router;