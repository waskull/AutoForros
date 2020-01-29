import { Router } from 'express';
const router = Router();

const { isLoggedIn, isCliente,isEmpleado } = require('../lib/auth');
const { lista, agregar, agregarMaterial,getColorByMaterial, borrar, agregarColor, registrarColor,getMaterialURL,listaCostura,registrarCostura,agregarCostura,borrarCostura } = require('../controllers/material.controller');
router.use(isLoggedIn);

router.get('/',isLoggedIn,isCliente,isEmpleado, lista);
router.get('/agregar',isLoggedIn,isCliente,isEmpleado, agregar);
router.post('/agregar',isLoggedIn,isCliente,isEmpleado, agregarMaterial);
router.get('/agregarColor',isLoggedIn,isCliente,isEmpleado, agregarColor);
router.get('/costura',isLoggedIn,isCliente,isEmpleado, listaCostura);
router.get('/costura/agregar',isLoggedIn,isCliente,isEmpleado, agregarCostura);
router.post('/costura/agregar',isLoggedIn,isCliente,isEmpleado, registrarCostura);
router.get('/costura/borrar/:id',isLoggedIn,isCliente,isEmpleado, borrarCostura);
router.post('/agregarColor',isLoggedIn,isCliente,isEmpleado, registrarColor);
router.get('/borrar/:id',isLoggedIn,isCliente,isEmpleado, borrar);
router.post('/imagenMaterial/',isLoggedIn, getMaterialURL);
router.post('/colorMaterial/:id',getColorByMaterial);

export default router;
