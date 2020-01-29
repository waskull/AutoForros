import { Router } from 'express';
const router = Router();
const { isLoggedIn,isCliente } = require('../lib/auth');
const { getImageURL, getMaterialURL } = require('../controllers/bordado.controller');
router.use(isLoggedIn);

router.get('/', isLoggedIn,(req:Request,res:any) => {
    res.send('asd');
});
router.post('/imagen/:id',isLoggedIn, getImageURL);

export default router;
