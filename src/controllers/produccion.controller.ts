import ModelProduccion from '../models/Produccion';
import {isAdmin,isUsuario,isEmsamblador,isBordador,isCortador,isCosturero,isDesigner,isVendedor,isGerente} from '../lib/helpers';
import NodeMailer from '../lib/nodemailer';

class Produccion{
    private hours:number = 0;
    private ModelProduccion = new ModelProduccion();
    public listaP = async (req:any, res:any) => {
        const registros = await this.ModelProduccion.listaP();
        if(registros){
        	for (var i = 0; i < registros.length; ++i) {
        		if(registros[i].fecha==null){
        			registros[i].fechaMostrar=false;
        		}else{registros[i].fechaMostrar=true;}
        	}
    	}
    	res.render('registro/lista',{registros});
	}
    public async listaFiltrada(){
        this.hours = 0;
        const solicitud = await this.ModelProduccion.listaTodos();
        var i=0;
        var listaFiltrada:any = [];
        solicitud.forEach(() => {
                const dia = solicitud[i].fechaSolicitud.getDay();
                if(solicitud[i].idfase === 3 || solicitud[i].idfase === 10){
                    solicitud[i].eta = 0;
                }
                else{
                    this.hours += solicitud[i].eta=this.getETA(dia,solicitud[i].idfase);
                    solicitud[i].eta = this.hours;
                    //var fechaSolicitud = new Date(solicitud[i].fechaSolicitud);
                    //fechaSolicitud.setHours(fechaSolicitud.getHours()+solicitud[i].eta);

                    var fechaTentativa = new Date(solicitud[i].fechaTentativa);
                    var fechaActual = new Date();
                    fechaActual.setHours(fechaActual.getHours()-solicitud[i].eta);
                    if(fechaActual >= fechaTentativa){
                        console.log("La Solicitud: "+solicitud[i].idSolicitud +" esta retrasada"+fechaTentativa+" "+fechaActual+" "+fechaActual);
                        solicitud[i].retraso = true;
                    }
                }
                listaFiltrada.push(solicitud[i]);
                i++;
        });
        return listaFiltrada;
    }
    private getETA(dia:number,fase:number){
        var horasTotales;
        var horas = 0;
        if(dia>=5){horasTotales = 72;}else{horasTotales = 48;}
        horas = horasTotales;
        for (let x = 4; x < fase; x++) {
            if(horasTotales==48){
                horas-=8; 
            }
            else{
                horas-=12;
            }
            
        }
        if(fase<=3 || fase>=10){
            horas = 0;
            return horas;
        }
         return horas;
    }
    public lista = async (req:any,res:any) => {
        if(isAdmin(req.user)){
            const solicitud = await this.listaFiltrada();
            console.log(solicitud);
            res.render('proceso/lista',{solicitud});
        }
        else if (isEmsamblador(req.user)){
            const solicitud = await this.ModelProduccion.listaFases(4,9);
            res.render('proceso/lista',{solicitud});
        }
        else if (isVendedor(req.user)){
            res.redirect('/solicitud/');
        }
        else if (isDesigner(req.user)){
            const solicitud = await this.ModelProduccion.listaEmpleado(5);
            res.render('proceso/lista',{solicitud});
        }
        else if (isCortador(req.user)){
            const solicitud = await this.ModelProduccion.listaEmpleado(6);
            res.render('proceso/lista',{solicitud});
        }
        else if (isCosturero(req.user)){
            const solicitud = await this.ModelProduccion.listaEmpleado(7);
            res.render('proceso/lista',{solicitud});
        }
        else if (isBordador(req.user)){
            const solicitud = await this.ModelProduccion.listaEmpleado(8);
            res.render('proceso/lista',{solicitud});
        }
        else{
            res.redirect('/solicitud/');
        }
    }
    
    public aprobar = async (req:any,res:any) => {
        const id = req.params.id;
        const estadoActual = await this.ModelProduccion.getFase(id);
        if (isEmsamblador(req.user)){
            if(estadoActual[0].fase != 4 || estadoActual[0].fase != 9){
                res.redirect('/produccion/');
            }
            else{
                if(estadoActual[0].fase == 9){
                    const fecha = new Date();
                    await this.ModelProduccion.subirFase(id);
                    await this.ModelProduccion.setFecha(fecha,id);
                    req.flash('success', 'El forro esta listo para ser entregado');
                    console.log(id);
                    const consulta = await this.ModelProduccion.getidUsuario(id);
                    const infoUsuario = await this.ModelProduccion.getInfoUsuario(consulta[0].idUsuario);
                    const mailer = new NodeMailer("Forro Completado",infoUsuario[0].nombre,infoUsuario[0].apellido,id,infoUsuario[0].correo);
                    await mailer.enviarCorreo();
                    res.redirect('/produccion/');
                }
                else{
                    await this.ModelProduccion.subirFase(id);
                    await this.ModelProduccion.setEmsamblador(req.user.nombre+" "+req.user.apellido,id);
                    req.flash('success', 'El forro ahora esta en fase de Diseño');
                    res.redirect('/produccion/');
                }
            }
        }
        else if (isBordador(req.user)){
            if(estadoActual[0].fase != 8){
                res.redirect('/produccion/');
            }
            else{
                await this.ModelProduccion.subirFase(id);
                await this.ModelProduccion.setBordador(req.user.nombre+" "+req.user.apellido,id);
                req.flash('success', 'El forro ahora esta en fase de Emsamblaje');
                res.redirect('/produccion/');
            }
        }
        else if (isCosturero(req.user)){
            if(estadoActual[0].fase != 7){
                res.redirect('/produccion/');
            }
            else{
                await this.ModelProduccion.subirFase(id);
                await this.ModelProduccion.setCosturero(req.user.nombre+" "+req.user.apellido,id);
                req.flash('success', 'El forro ahora esta en fase de Bordado');
                res.redirect('/produccion/');
            }
        }
        else if (isCortador(req.user)){
            if(estadoActual[0].fase != 6){
                res.redirect('/produccion/');
            }
            else{
                await this.ModelProduccion.subirFase(id);
                await this.ModelProduccion.setCortador(req.user.nombre+" "+req.user.apellido,id);
                req.flash('success', 'El forro ahora esta en fase de Costura');
                res.redirect('/produccion/');
            }
        }
        else if (isDesigner(req.user)){
            if(estadoActual[0].fase != 5){
                res.redirect('/produccion/');
            }
            else{
                await this.ModelProduccion.subirFase(id);
                await this.ModelProduccion.setDesigner(req.user.nombre+" "+req.user.apellido,id);
                req.flash('success', 'El forro ahora esta en fase de Corte');
                res.redirect('/produccion/');
            }
        }
        else if(isAdmin(req.user)){
            if(estadoActual[0].fase == 4){
                await this.ModelProduccion.setEmsamblador(req.user.nombre+" "+req.user.apellido,id);
                await this.ModelProduccion.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Diseño');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 5){
                await this.ModelProduccion.setDesigner(req.user.nombre+" "+req.user.apellido,id);
                await this.ModelProduccion.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Corte');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 6){
                await this.ModelProduccion.setCortador(req.user.nombre+" "+req.user.apellido,id);
                await this.ModelProduccion.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Costura');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 7){
                await this.ModelProduccion.setCosturero(req.user.nombre+" "+req.user.apellido,id);
                await this.ModelProduccion.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Bordado');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 8){
                await this.ModelProduccion.setBordador(req.user.nombre+" "+req.user.apellido,id);
                await this.ModelProduccion.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Emsamblado');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 9){
                await this.ModelProduccion.subirFase(id);
                const fecha = new Date();
                await this.ModelProduccion.setFecha(fecha,id);
                const consulta = await this.ModelProduccion.getidUsuario(id);
                const infoUsuario = await this.ModelProduccion.getInfoUsuario(consulta[0].idUsuario);
                req.flash('success', 'El forro esta listo para ser entregado');
                const mailer = new NodeMailer("Forro Completado",infoUsuario[0].nombre,infoUsuario[0].apellido,id,infoUsuario[0].correo);
                await mailer.enviarCorreo();
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 1){
                req.flash('message', 'La peticion del forro fue Cancelado');
                res.redirect('/produccion/');
    
            }
            else if(estadoActual[0].fase == 2){
                req.flash('message', 'La peticion del forro fue Cancelado por la gerencia');
                res.redirect('/produccion/');
    
            }
            else if(estadoActual[0].fase == 3){
                req.flash('message', 'El pago aun no ha sido concretado');
                res.redirect('/produccion/');
            }
            else{
                res.redirect('/produccion/');
            }
    
        }
        else{
            res.redirect('/produccion/');
        }
    }
}
module.exports = new Produccion();
