import ModelUsuario from '../models/Usuario';
import { isAdmin, isAdminer } from '../lib/helpers';
const helpers = require('../lib/helpers');

class Usuario{
    private ModelUsuario = new ModelUsuario();
    public lista= async (req:any, res:any) => {
        const usuarios = await this.ModelUsuario.lista();
        res.render('usuarios/lista', {usuarios});
    }
    
    public agregar = async (req:any, res:any) => {
        const consulta = await this.ModelUsuario.descr();
        res.render('usuarios/agregar', {consulta});
    }
    
    public registrar = async (req:any, res:any) => {
        this.ModelUsuario.setUsuario(req.body);
        const claveEncriptada:any = await helpers.encriptarClave(this.ModelUsuario.getPass());
        this.ModelUsuario.setPass(claveEncriptada);
        const checkCorreo = await this.ModelUsuario.checkCorreo();        
        if(checkCorreo.length>0){
            req.flash('message', 'El Correo ya esta Registrado');
            res.redirect('/usuarios/agregar/');
        }else{
            await this.ModelUsuario.agregar();
            req.flash('success', 'El Usuario ha sido Creado');
            res.redirect('/usuarios/');
        }
        
    }
    
    public borrar = async (req:any, res:any) => {
        this.ModelUsuario.setidUsuario(req.params.id);
        const resp = await this.ModelUsuario.checkForeignKey();
        if(resp.length>0){
            req.flash('message', 'No puedes borrar ese usuario');
            res.redirect('/usuarios/');
        }else{
            await this.ModelUsuario.borrar();
            req.flash('success', 'Usuario Eliminado');
            res.redirect('/usuarios/');
        }
        
    }
    
    public geditar = async (req:any, res:any) => {
        this.ModelUsuario.setidUsuario(req.params.id);
        const user = await this.ModelUsuario.getUsuario();
        if(req.user.Descripcion.toString().trim() != 'Administrador' && req.user.idUsuario != req.params.id){
            req.flash('message', 'No puedes editar un usuario que no sea el tuyo');
            res.redirect('/usuarios/');
        }
        else{
            if(isAdmin(req.user)){
                const consulta = await this.ModelUsuario.geditar();
                res.render('usuarios/editar', {user : user[0], consulta: consulta});
            }
            else{
                const consulta = await this.ModelUsuario.geditar();
                res.render('usuarios/editarUsuario', {user : user[0], consulta: consulta});
            }
            
        }
          
    }
    public editar = async (req:any, res:any) => {
        this.ModelUsuario.setidUsuario(req.params.id);
        this.ModelUsuario.setUsuario(req.body);
        this.ModelUsuario.setNivelAcceso(3);
        const claveEncriptada = await helpers.encriptarClave(this.ModelUsuario.getPass());
        this.ModelUsuario.setPass(claveEncriptada);
        if(isAdmin(req.user)){
            const nivel = await this.ModelUsuario.nivelUsuario(req.body.nivelAcceso);
            this.ModelUsuario.setNivelAcceso(nivel[0].idTipo);
            const nA = await this.ModelUsuario.getNivel(req.user.idUsuario);
            //El user Admin no puede ser editado
            if(nA[0].nivelAcceso == 1 && this.ModelUsuario.getidUsuario()==nA[0].idUsuario){
                req.flash('message', 'No puedes editar el usuario administrador');
                res.redirect('/usuarios/');
            }
            else{
                await this.ModelUsuario.editar();
                req.flash('success', 'El Usuario ha sido Editado');
                res.redirect('/usuarios/');
            }
        }else{
            await this.ModelUsuario.editar();
            req.flash('success', 'El Usuario ha sido Editado');
            res.redirect('/perfil/');
        }
        
        
        
    }
}

module.exports = new Usuario();
