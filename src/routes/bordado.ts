import { Router } from 'express';
const router = Router();
const { isLoggedIn,isCliente } = require('../lib/auth');
const { getImageURL, getMaterialURL } = require('../controllers/bordado.controller');
router.use(isLoggedIn);

router.get('/', isLoggedIn,isCliente, (req:Request,res:any) => {
    res.send('GG');
});
router.post('/imagen/:id',isLoggedIn, getImageURL);

export default router;
