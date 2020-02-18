const express = require('express');
const passport = require('passport');
import Model from '../models/Usuario';
import ModelPasswordreset from '../models/Passwordreset';
import {isUsuario,isAdmin} from '../lib/helpers';
import NodeMailer from '../lib/nodemailer';
import {encriptarClave} from '../lib/helpers';
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
            if(isVendedor(req.user)){
                res.render('homeVendedor',{ventas:numVentas,solicitudes:numSolicitudes});
            }
            else if (!isVendedor(req.user) && !isAdmin(req.user)){
               res.render('homeEmpleado',{solicitudes:numSolicitudes,procesos:numProcesos});
            }
            else {res.render('home',{usuarios:numUsuarios,ventas:numVentas,solicitudes:numSolicitudes,procesos:numProcesos});}
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
    public reset = (req:Request, res:any) => {
        res.render('auth/reset');
    }
    public enviarCodigo = async (req:any,res:any) =>{
        const resp:any = await this.model.checkCorreo(req.body.correo);
        if(resp.length < 1){
            req.flash('message', 'El correo '+req.body.correo+' no existe');
            res.redirect('/reset/');
        }
        const user:any = await this.model.getUsuarioByCorreo(req.body.correo);
        if(user[0].nivelAcceso===1){
            req.flash('message', 'Ese usuario no puede recuperar su contraseña de esta forma. Misterios de la Vida');
            res.redirect('/login/');
        }
        const modelPR = new ModelPasswordreset();
        let codigo:string = Math.floor((Math.random() * (1100000-500000))+500000).toString();
        const cod = await modelPR.crearCodigo({idusuario:user[0].idUsuario,codigo:codigo,estaActivo:1});
        const mailer = new NodeMailer("Recuperacion de Contraseña",user[0].nombre,user[0].apellido,0,req.body.correo);
        mailer.setMensaje(codigo);
        mailer.enviarCodigo();
        console.log(codigo);
        req.flash('success', 'Hemos enviado un codigo al correo: '+req.body.correo+', debes introducirlo aca para cambiar tu clave');
        res.redirect('/reset2/'+cod.insertId+"/");

    }
    public changePassword = (req:any, res:any) => {
        const id = req.params.id;
        res.render('auth/resetPassword',{id});
    }
    public resetPassword = async (req:any,res:any) =>{
        const modelPR = new ModelPasswordreset();
        const resp:any = await modelPR.getCodigo(req.params.id);
        if(resp.length<1){
            req.flash('message', 'El codigo no existe');
            res.redirect('/login/');
        }
        if(req.body.clave.length < 2){
            req.flash('message', 'La clave es muy corta, debes ser mayor a 2 caracteres');
            res.redirect('/reset2/'+req.params.id+"/");
        }
        if(req.body.codigo.length < 1){
            req.flash('message', 'El codigo es invalido');
            res.redirect('/reset2/'+req.params.id+"/");
        }
        
        if(resp[0].codigo  !== req.body.codigo){
            req.flash('message', 'El codigo '+req.body.codigo+' es erroneo');
            res.redirect('/reset2/'+req.params.id+"/");
        }
        if(resp[0].estaActivo  !== 1){
            req.flash('message', 'El codigo '+req.body.codigo+' ya no es valido');
            res.redirect('/login/');
        }
        const clave = await encriptarClave(req.body.clave);
        await this.model.setClave(clave,resp[0].idusuario);
        await modelPR.deshabilitarCodigo(resp[0].id);
        req.flash('success', 'Contraseña Actualizada');
        res.redirect('/login/');

    }
}

module.exports = new Authentication();
