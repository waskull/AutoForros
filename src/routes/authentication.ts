import { Router } from 'express';
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { registro, perfil, logout, login, logeo } = require('../controllers/authentication.controller');
const router = Router();

router.get('/registro', isNotLoggedIn, registro);
router.post('/registro',isNotLoggedIn, passport.authenticate('local.registro', {
    successRedirect : '/perfil/',
    failureRedirect : '/registro/',
    failureFlash: true
}));

router.get('/perfil', isLoggedIn, perfil);
router.get('/logout', isLoggedIn, logout);
router.get('/login', isNotLoggedIn, login);
router.post('/login', isNotLoggedIn, logeo);

export default router;