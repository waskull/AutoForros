const express = require('express');
const passport = require('passport');
import Model from '../models/Usuario';
import {isUsuario} from '../lib/helpers';

class Authentication{
    private model = new Model();
    public registro = (req:any, res:any) => {
        res.render('auth/registro');
    }
    
    public perfil = async (req:any, res:any) => {
        if(!isUsuario(req.user)){
            const usuarios = await this.model.getNumeroUsuarios();
            const numUsuarios = usuarios[0].usuarios;
            const ventas = await this.model.getNumeroVentas();
            const numVentas = ventas[0].ventas;
            const solicitudes = await this.model.getNumSolicitudes();
            const numSolicitudes = solicitudes[0].solicitudes;
            const procesos = await this.model.getNumeroProcesos();
            const numProcesos = procesos[0].procesos;
            res.render('home',{usuarios:numUsuarios,ventas:numVentas,solicitudes:numSolicitudes,procesos:numProcesos});
        }
        else{
            const vehiculos = await this.model.getNumeroVehiculosById(req.user.idUsuario);
            const numVehiculos = vehiculos[0].vehiculos;
            const solicitudes = await this.model.getNumSolicitudesById(req.user.idUsuario);
            const numSolicitudes = solicitudes[0].solicitudes;
            res.render('homeCliente',{vehiculos:numVehiculos,solicitudes:numSolicitudes});
        }
    }
    
    public logout = async (req:any, res:any) => {
        req.logOut();
        res.redirect('/login/');
    }
    
    public login = (req:Request, res:any) => {
        res.render('auth/login');
    }
    
    public logeo = async (req:any, res:any,next:any) => {
        passport.authenticate('local.login',{
            successRedirect : '/perfil',
            failureRedirect : '/login/',
            failureFlash: true
        })(req, res, next);
    }
}

module.exports = new Authentication();