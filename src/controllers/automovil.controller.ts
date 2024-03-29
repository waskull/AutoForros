import ModelAutomovil from '../models/Automovil';
import {isAdmin,isUsuario} from '../lib/helpers';
class Automovil{
    private modelAutomovil = new ModelAutomovil();
    public lista = async (req:any,res:any) => {
        var vehiculos;
        if(isUsuario(req.user)){
            const vehiculos = await this.modelAutomovil.listaCliente(req.user.idUsuario);
            res.render('vehiculos/lista', {vehiculos});
        }
        else{
            vehiculos = await this.modelAutomovil.listaGerencia();
            res.render('vehiculos/listaGerencia', {vehiculos});
        }
    }
    
    public agregar = async (req:any,res:any) => {
        if(isAdmin(req.user)){
            const consulta = await this.modelAutomovil.usuario();
            res.render('vehiculos/agregar', {consulta});
        }
        else{
            res.render('vehiculos/agregarCliente');
        }
    }
    
    public registrar = async (req:any,res:any) => {
        if(isAdmin(req.user)){
            const consultarPlaca = await this.modelAutomovil.checkPlaca(req.body.placa);
            if(consultarPlaca.length>0){
                req.flash('message', 'La Placa ya esta Registrada');
                res.redirect('/vehiculos/agregar/');
            }
            else{
                await this.modelAutomovil.agregar(req.body);
                req.flash('success', 'El Vehiculo ha sido Creado');
                res.redirect('/vehiculos/');
            }
            
        }
        else{
            const consultarPlaca = await this.modelAutomovil.checkPlaca(req.body.placa);
            if(consultarPlaca.length>0){
                req.flash('message', 'La Placa ya esta Registrada');
                res.redirect('/vehiculos/agregar/');
            }
            else{
                const nuevoVehiculo = req.body;
                nuevoVehiculo.idCliente = req.user.idUsuario;
                await this.modelAutomovil.agregar(req.body);
                req.flash('success', 'El Vehiculo ha sido Creado');
                res.redirect('/vehiculos/');
            }
        }
    }
    
    public geditar = async (req:any,res:any) => {
        const consulta = await this.modelAutomovil.getUserByVehiculos(req.params.id);
        const vehiculo = await this.modelAutomovil.geditar(req.params.id);
        //if(isAdmin(req.user) && consulta[0].idUsuario != req.user.idUsuario){
        if(consulta[0].idUsuario != req.user.idUsuario){
            req.flash('message', 'Ese vehiculo no te pertenece');
            res.redirect('/vehiculos/');
        }else{
            res.render('vehiculos/editar', {vehiculo:vehiculo[0]});
        }
    }
    
    public editar = async (req:any,res:any) => {
        const consultarPlaca = await this.modelAutomovil.checkPlaca(req.body.placa);
        if(consultarPlaca.length>0){
            if(consultarPlaca[0].idAutomovil==req.params.id){
                await this.modelAutomovil.editar(req.body,req.params.id);
                req.flash('success', 'El Vehiculo ha sido Editado');
                res.redirect('/vehiculos/');
            }
            else{
                req.flash('message', 'La Placa ya esta Registrada');
                res.redirect('/vehiculos/editar/'+req.params.id);
            }
        }
        else{
            await this.modelAutomovil.editar(req.body,req.params.id);
            req.flash('success', 'El Vehiculo ha sido Editado');
            res.redirect('/vehiculos/');
        }
    }
    
    public borrar = async (req:any,res:any) => {
        const resp = await this.modelAutomovil.checkForeignKey(req.params.id);
        if(resp.length>0){
            req.flash('message', 'No puedes borrar este Vehiculo');
            res.redirect('/vehiculos/');
        }else{
            await this.modelAutomovil.eliminar(req.params.id);
            req.flash('success', 'Vehiculo Eliminado');
            res.redirect('/vehiculos/');
        }
        
    }
    
    public apiGetUsuario = async (req:any,res:any) => {
        const autos = await this.modelAutomovil.getAutosByUsuario(req.params.id);
        res.json(autos);
    }
}
module.exports = new Automovil();
