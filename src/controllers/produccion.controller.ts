import ModelProduccion from '../models/Produccion';
import ModelInventario from '../models/Inventario';
import ModelMaterial from '../models/Material';
import ModelSolicitud from '../models/Solicitud';
import ModelUsuario from '../models/Usuario';
import {isAdmin,isUsuario,isEmsamblador,isBordador,isCortador,isCosturero,isDesigner,isVendedor,isGerente} from '../lib/helpers';
import NodeMailer from '../lib/nodemailer';

class Produccion{
    private hours:number = 0;
    private modelSolicitud = new ModelSolicitud();
    private ModelProduccion = new ModelProduccion();
    private MU = new ModelUsuario();
    public listaP = async (req:any, res:any) => {
        const registros = await this.ModelProduccion.listaP();
        if(registros){
        	for (var i = 0; i < registros.length; ++i) {
                var tmp;

                tmp = await this.MU.getUsuario(registros[i].vendedor);
                if(registros[i].vendedor){registros[i].nombreVendedor = tmp[0].nombre+" "+tmp[0].apellido;}

                tmp = await this.MU.getUsuario(registros[i].ensamblador);
                if(registros[i].ensamblador){registros[i].nombreEnsamblador = tmp[0].nombre+" "+tmp[0].apellido;}

                tmp = await this.MU.getUsuario(registros[i].bordador);
                if(registros[i].bordador){registros[i].nombreBordador = tmp[0].nombre+" "+tmp[0].apellido;}

                tmp = await this.MU.getUsuario(registros[i].designer);
                if(registros[i].designer){registros[i].nombreDesigner = tmp[0].nombre+" "+tmp[0].apellido;}

                tmp = await this.MU.getUsuario(registros[i].costurero);
                if(registros[i].costurero){registros[i].nombreCosturero = tmp[0].nombre+" "+tmp[0].apellido;}

                tmp = await this.MU.getUsuario(registros[i].cortador);
                if(registros[i].cortador){registros[i].nombreCortador = tmp[0].nombre+" "+tmp[0].apellido;}

        		if(registros[i].fecha==null){
        			registros[i].fechaMostrar=false;
        		}else{registros[i].fechaMostrar=true;}
        	}
    	}
    	res.render('produccion/listaregistros',{registros});
	}
    public async listaFiltrada(){
        this.hours = 0;
        const solicitud = await this.modelSolicitud.listatodos();
        var i=0;
        var listaFiltrada:any = [];
        solicitud.forEach(() => {
                const dia = solicitud[i].fechaSolicitud.getDay();
                if(solicitud[i].idfase === 3 || solicitud[i].idfase === 10){
                    solicitud[i].eta = 0;
                }
                else{
                    this.hours += solicitud[i].eta=this.getETA(dia,solicitud[i].idfase);
                    if(solicitud[i].cantidad>1){
                        solicitud[i].eta = this.hours+Math.floor(this.hours/4);
                    }else{
                        solicitud[i].eta = this.hours;
                    }
                    console.log("Solicitud: "+solicitud[i].idSolicitud+" tiempo de completado: "+solicitud[i].eta);
                    var fechaTentativa = new Date(solicitud[i].fechaTentativa);
                    var fechaActual = new Date();
                    if(fechaActual >= fechaTentativa){
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
            res.render('produccion/lista',{solicitud});
        }
        else if (isEmsamblador(req.user)){
            const solicitud = await this.modelSolicitud.listaFases(4,9);
            res.render('produccion/lista',{solicitud});
        }
        else if (isVendedor(req.user)){
            res.redirect('/solicitud/');
        }
        else if (isDesigner(req.user)){
            const solicitud = await this.modelSolicitud.listaEmpleado(5);
            res.render('produccion/lista',{solicitud});
        }
        else if (isCortador(req.user)){
            const solicitud = await this.modelSolicitud.listaEmpleado(6);
            res.render('produccion/lista',{solicitud});
        }
        else if (isCosturero(req.user)){
            const solicitud = await this.modelSolicitud.listaEmpleado(7);
            res.render('produccion/lista',{solicitud});
        }
        else if (isBordador(req.user)){
            const solicitud = await this.modelSolicitud.listaEmpleado(8);
            res.render('produccion/lista',{solicitud});
        }
        else{
            res.redirect('/solicitud/');
        }
    }
    
    public aprobar = async (req:any,res:any) => {
        const id = req.params.id;
        const estadoActual = await this.modelSolicitud.getFase(id);
        if (isEmsamblador(req.user)){
            if(estadoActual[0].fase < 4 || estadoActual[0].fase > 9){
                console.log("xd "+estadoActual[0].fase); 
                res.redirect('/produccion/');
            }
            else{
                if(estadoActual[0].fase == 9){
                    const fecha = new Date();
                    await this.modelSolicitud.subirFase(id);
                    await this.ModelProduccion.setFecha(fecha,id);
                    req.flash('success', 'El forro esta listo para ser entregado');
                    console.log(id);
                    const consulta = await this.modelSolicitud.getidUsuario(id);
                    const infoUsuario = await this.MU.getUsuario(consulta[0].idUsuario);
                    const mailer = new NodeMailer("Forro Completado",infoUsuario[0].nombre,infoUsuario[0].apellido,id,infoUsuario[0].correo);
                    await mailer.enviarCorreo();
                    res.redirect('/produccion/');
                }
                else{
                    await this.modelSolicitud.subirFase(id);
                    await this.ModelProduccion.setEnsamblador(req.user.idUsuario,id);
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
                await this.modelSolicitud.subirFase(id);
                await this.ModelProduccion.setBordador(req.user.idUsuario,id);
                req.flash('success', 'El forro ahora esta en fase de Ensamblaje');
                res.redirect('/produccion/');
            }
        }
        else if (isCosturero(req.user)){
            if(estadoActual[0].fase != 7){
                res.redirect('/produccion/');
            }
            else{
                await this.modelSolicitud.subirFase(id);
                await this.ModelProduccion.setCosturero(req.user.idUsuario,id);
                req.flash('success', 'El forro ahora esta en fase de Bordado');
                res.redirect('/produccion/');
            }
        }
        else if (isCortador(req.user)){
            if(estadoActual[0].fase != 6){
                res.redirect('/produccion/');
            }
            else{
                await this.modelSolicitud.subirFase(id);
                await this.ModelProduccion.setCortador(req.user.idUsuario,id);
                req.flash('success', 'El forro ahora esta en fase de Costura');
                res.redirect('/produccion/');
            }
        }
        else if (isDesigner(req.user)){
            if(estadoActual[0].fase != 5){
                res.redirect('/produccion/');
            }
            else{
                //AQUI VA LA VAINA
                const solicitud = await this.modelSolicitud.getInfoSolicitud(req.params.id);
                const MI = new ModelInventario();
                const MM = new ModelMaterial();
                console.log(solicitud);
                const idMaterial = await MM.getIdMaterialByTipoAndColor(solicitud[0].id_material,solicitud[0].id_color);
                console.log(idMaterial);
                const checkCantidad = await MI.checkStock(idMaterial[0].idMaterial);
                if(checkCantidad[0].cantidad > 0 && checkCantidad[0].cantidad>=solicitud[0].cantidad){
                    await MI.subtractionMaterial(idMaterial[0].idMaterial,solicitud[0].cantidad);
                    await this.modelSolicitud.subirFase(id);
                    await this.ModelProduccion.setDesigner(req.user.idUsuario,id);
                    req.flash('success', 'El forro ahora esta en fase de Corte');
                    res.redirect('/produccion/');
                }
                else{
                    req.flash('message', 'Ya no queda '+solicitud[0].material+' '+solicitud[0].color+' en el inventario, pidele al encargado que realize un pedido');
                    res.redirect('/produccion/');
                }
                
            }
        }
        else if(isAdmin(req.user)){
            if(estadoActual[0].fase == 4){
                await this.ModelProduccion.setEnsamblador(req.user.idUsuario,id);
                await this.modelSolicitud.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Diseño');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 5){
                const solicitud = await this.modelSolicitud.getInfoSolicitud(req.params.id);
                const MI = new ModelInventario();
                const MM = new ModelMaterial();
                const idMaterial = await MM.getIdMaterialByTipoAndColor(solicitud[0].id_material,solicitud[0].id_color);
                console.log(idMaterial);
                const checkCantidad = await MI.checkStock(idMaterial[0].idMaterial);
                if(checkCantidad[0].cantidad > 0 && checkCantidad[0].cantidad>=solicitud[0].cantidad){
                    await MI.subtractionMaterial(idMaterial[0].idMaterial,solicitud[0].cantidad);
                    await this.modelSolicitud.subirFase(id);
                    await this.ModelProduccion.setDesigner(req.user.idUsuario,id);
                    req.flash('success', 'El forro ahora esta en fase de Corte');
                    res.redirect('/produccion/');
                }
                else{
                    req.flash('message', 'Ya no queda '+solicitud[0].material+' '+solicitud[0].color+' en el inventario, pidele al encargado que realize un pedido');
                    res.redirect('/produccion/');
                }
            }
            else if(estadoActual[0].fase == 6){
                await this.ModelProduccion.setCortador(req.user.idUsuario,id);
                await this.modelSolicitud.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Costura');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 7){
                await this.ModelProduccion.setCosturero(req.user.idUsuario,id);
                await this.modelSolicitud.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Bordado');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 8){
                await this.ModelProduccion.setBordador(req.user.idUsuario,id);
                await this.modelSolicitud.subirFase(id);
                req.flash('success', 'El forro ahora esta en fase de Ensamblado');
                res.redirect('/produccion/');
            }
            else if(estadoActual[0].fase == 9){
                await this.modelSolicitud.subirFase(id);
                const fecha = new Date();
                await this.ModelProduccion.setFecha(fecha,id);
                const consulta = await this.modelSolicitud.getidUsuario(id);
                const infoUsuario = await this.MU.getUsuario(consulta[0].idUsuario);
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
