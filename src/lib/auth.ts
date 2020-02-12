import {Request,Response, NextFunction} from 'express';
module.exports = {
    isLoggedIn(req:Request, res:Response,next:NextFunction){
        if(req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/login/');
        }
    },
    isNotLoggedIn(req:Request, res:Response,next:NextFunction){
        if(!req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/perfil/');
        }
    },
    isCliente(req:any, res:Response,next:NextFunction){
        if(req.user.Descripcion.toString().trim() == 'Usuario'){
            return res.redirect('/perfil/');
        }
        else{
            return next();
        }
    },
    isGerente(req:any, res:Response,next:NextFunction){
        if(req.user.Descripcion.toString().trim() == 'Gerente' || req.user.Descripcion.toString().trim() == 'Administrador'){
            return res.redirect('/perfil/');
        }
        else{
            return next();
        }
    },
    isVendedor(req:any, res:Response,next:NextFunction){
        if(req.user.Descripcion.toString().trim() == 'Vendedor'){
            return res.redirect('/perfil/');
        }
        else{
            return next();
        }
    },
    isNotVendedorOrAdmin(req:any, res:Response,next:NextFunction){
        if(req.user.Descripcion.toString().trim() === 'Vendedor' || req.user.Descripcion.toString().trim() === 'Administrador' || req.user.Descripcion.toString().trim() === 'Gerente'){
            return next();
        }
        else{
            return res.redirect('/perfil/');
        }
    },
    isProductor(req:any, res:Response,next:NextFunction){
        if(req.user.Descripcion.toString().trim() === 'Cortador' || req.user.Descripcion.toString().trim() === 'Bordador' || req.user.Descripcion.toString().trim() === 'Ensamblador'){
            return res.redirect('/perfil/');
        }
        else{
            return next();
        }
    },
    isEmpleado(req:any, res:Response,next:NextFunction){
        if(req.user.Descripcion.toString().trim() === 'Cortador' || req.user.Descripcion.toString().trim() === 'Vendedor' || req.user.Descripcion.toString().trim() === 'Bordador' || req.user.Descripcion.toString().trim() === 'Ensamblador'){
            return res.redirect('/perfil/');
        }
        else{
            return next();
        }
    },

};