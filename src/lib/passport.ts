import {Request} from 'express';
import {comprobarClave,encriptarClave} from './helpers';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import ModelUsuario from '../models/Usuario';
passport.use('local.login', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req:Request, correo:string, clave:string, done:any) => {
    const model = new ModelUsuario();
    const consulta = await model.login(correo);
    if(consulta.length > 0 ){
        const usuario = consulta[0];
        const claveDesencriptada = await comprobarClave(clave, usuario.clave);
        if(claveDesencriptada){
            done(null, usuario, req.flash('sucesss', "Bienvenido " + usuario.nombre + " "+ usuario.apellido));
        }else{
            done(null, false, req.flash('message', "Contraseña Incorrecta"));
        }
    }else{
        return done(null, false, req.flash('message', "El Correo no Existe"));
    }
}));

passport.use('local.registro', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req:Request, correo:string, clave:string, done:any) => {
    const {nombre, apellido,sexo,direccion,telefono} = req.body;
    const nivelAcceso = 3;
    const idUsuario = null;
    var nuevoUsuario = {
        idUsuario,
        nombre,
        apellido,
        correo,
        sexo,
        clave,
        nivelAcceso,
        direccion,
        telefono
    };
    const model = new ModelUsuario();
    nuevoUsuario.clave = await encriptarClave(clave);
    const checkCorreo = await model.checkMail(correo);        
    if(checkCorreo.length>0){
        return done(null, false, req.flash('message', "El Correo Ya Existe"));
    }
    const consulta = await model.registrarUsuario(nuevoUsuario);
    nuevoUsuario.idUsuario = consulta.insertId;
    return done(null, nuevoUsuario);
}));

passport.serializeUser((user:any, done:any) => {
    done(null, user.idUsuario);
});

passport.deserializeUser(async (idUsuario:any, done:any) => {
    const model = new ModelUsuario();
    const resultado = await model.datosUsuario(idUsuario);
    done(null, resultado[0]);
});