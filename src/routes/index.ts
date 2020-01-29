import {Router} from 'express';
import Index from '../controllers/index.controller';
const router = Router();
const index = new Index();
router.route('/').get(index.Bienvenido);

export default router;