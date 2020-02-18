import ModelUsuario from '../models/Usuario';
import ModelRol from '../models/Rol';
import { isAdmin, isAdminer } from '../lib/helpers';
const helpers = require('../lib/helpers');

class Usuario{
    private ModelUsuario = new ModelUsuario();
    private modelRol = new ModelRol();
    public lista= async (req:any, res:any) => {
        const usuarios = await this.ModelUsuario.lista();
        res.render('usuarios/lista', {usuarios});
    }
    
    public agregar = async (req:any, res:any) => {
        const consulta = await this.ModelUsuario.descr();
        res.render('usuarios/agregar', {consulta});
    }
    
    public registrar = async (req:any, res:any) => {
        const claveEncriptada:any = await helpers.encriptarClave(req.body.clave);
        const checkCorreo = await this.ModelUsuario.checkCorreo(req.body.correo);        
        if(checkCorreo.length>0){
            req.flash('message', 'El Correo ya esta Registrado');
            res.redirect('/usuarios/agregar/');
        }else{
            await this.ModelUsuario.agregar(req.body,claveEncriptada);
            req.flash('success', 'El Usuario ha sido Creado');
            res.redirect('/usuarios/');
        }
        
    }
    
    public borrar = async (req:any, res:any) => {
        try{
            const resp = await this.ModelUsuario.checkForeignKey(req.params.id);
            const resp2 = await this.ModelUsuario.checkFK(req.params.id);
            if(resp.length>0){
                req.flash('message', 'No puedes borrar ese usuario');
                res.redirect('/usuarios/');
            }else if (resp2.length>0){
                req.flash('message', 'No puedes borrar ese empleado. Razon: Llave Foranea');
                res.redirect('/usuarios/');
            }
            else{
                await this.ModelUsuario.borrar(req.params.id);
                req.flash('success', 'Usuario Eliminado');
                res.redirect('/usuarios/');
            }
        }catch(e){
            req.flash('message', 'No puedes borrar ese Usuario.');
            res.redirect('/usuarios/');
        }
        
    }
    
    public geditar = async (req:any, res:any) => {
        const user = await this.ModelUsuario.getUsuario(req.params.id);
        if(req.user.Descripcion.toString().trim() != 'Administrador' && req.user.idUsuario != req.params.id){
            req.flash('message', 'No puedes editar un usuario que no sea el tuyo');
            res.redirect('/usuarios/');
        }
        else{
            if(isAdmin(req.user)){
                const consulta = await this.modelRol.getRoles();
                res.render('usuarios/editar', {user : user[0], consulta: consulta});
            }
            else{
                const consulta = await this.modelRol.getRoles();
                res.render('usuarios/editarUsuario', {user : user[0], consulta: consulta});
            }
            
        }
          
    }
    public editar = async (req:any, res:any) => {
        const claveEncriptada = await helpers.encriptarClave(req.body.clave);
        const niv = await this.ModelUsuario.getNivel(req.params.id);
        const usuarioEditado = {
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            sexo : req.body.sexo,
            clave : claveEncriptada,
            nivelAcceso: niv[0].nivelAcceso,
            direccion : req.body.direccion,
            telefono : req.body.telefono,
        }
        if(isAdmin(req.user)){
            const nivel = await this.modelRol.nivelUsuario(req.body.nivelAcceso);
            const nA = await this.ModelUsuario.getNivel(req.user.idUsuario);
            //evitar edicion admin
            if(nA[0].nivelAcceso == 1 && req.params.id==nA[0].idUsuario){
                req.flash('message', 'No puedes editar el usuario administrador');
                res.redirect('/usuarios/');
            }
            else{
                usuarioEditado.nivelAcceso = nivel[0].idTipo;
                await this.ModelUsuario.editar(usuarioEditado,req.params.id);
                req.flash('success', 'El Usuario ha sido Editado');
                res.redirect('/usuarios/');
            }
        }else{
            
            await this.ModelUsuario.editar(usuarioEditado,req.params.id);
            req.flash('success', 'El Usuario ha sido Editado');
            res.redirect('/perfil/');
        }
        
        
        
    }
}

module.exports = new Usuario();
