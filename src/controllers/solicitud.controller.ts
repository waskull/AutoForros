import ModelSolicitud from '../models/Solicitud';
import ModelPago from '../models/Pago';
import ModelMetodo from '../models/Metodo';
import ModelBanco from '../models/Banco';
import ModelCostura from '../models/Costura';
import ModelBordado from '../models/Bordado';
import ModelTipo from '../models/Tipo';
import ModelColor from '../models/Color';
import {isUsuario,isAdmin,isVendedor} from '../lib/helpers';
import ModelAutomovil from '../models/Automovil';
import ModelUsuario from '../models/Usuario';
import ModelVenta from '../models/Venta';
import ModelProduccion from '../models/Produccion';

class Solicitud{
    private modelSolicitud = new ModelSolicitud();
    private modelPago = new ModelPago();
    private progreso:number=0;
    private hours:number=0;
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

    private setProgreso(fase:number){
        this.progreso = 0;
        for (var i = 4; i <= fase; ++i) {
            this.progreso += 15;
        }
        if(fase == 3){
            this.progreso = 10;
        }
        if(fase == 10){
            this.progreso = 100;
        }
        if(fase<3){
            this.progreso=0;
        }
    }
    public async listaFiltrada(id:number){
        const solicitud = await this.modelSolicitud.listaTodos();
        var i=0;
        var listaFiltrada:any = [];
        solicitud.forEach(() => {
            solicitud[i].estado = (solicitud[i].fase == 'Esperando confirmacion de Pago');
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
                    
                }
               this.setProgreso(solicitud[i].idfase);
                solicitud[i].progreso = this.progreso;
            if(solicitud[i].idUsuario === id){
                listaFiltrada.push(solicitud[i]);
            }
            i++;
        });
        return listaFiltrada;
    }
    public async ultimoETA(){
        this.hours = 0;
        const solicitud = await this.modelSolicitud.listaTodos();
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
                    var fechaTentativa = new Date(solicitud[i].fechaTentativa);
                    var fechaActual = new Date();
                    fechaActual.setHours(fechaActual.getHours()-solicitud[i].eta);
                    if(fechaActual >= fechaTentativa){
                        solicitud[i].retraso = true;
                    }
                }
                listaFiltrada.push(solicitud[i]);
                i++;
        });
        const len = listaFiltrada.length;
        if(len==1){return listaFiltrada[len-1].eta;}
        else if(len==0){return 0;}
        else{return listaFiltrada[len-2].eta;}
    }

    public lista = async (req:any, res:any) => {
        var solicitud:any = [];
        this.hours = 0;
        if(isUsuario(req.user)){
            solicitud = await this.listaFiltrada(req.user.idUsuario);
            const listaCancelados = await this.modelSolicitud.listaClienteByFase(req.user.idUsuario,1,2);
            const listaCompletados = await this.modelSolicitud.listaClienteByFase(req.user.idUsuario,10,10);             
            res.render('solicitud/listaCliente', {solicitud,listaCancelados,listaCompletados});
        }
        else{
            solicitud = await this.modelSolicitud.lista();
            var i=0;
            solicitud.forEach(function() {
                solicitud[i].estado = (solicitud[i].fase == 'Esperando confirmacion de Pago');
                i++;
            });
            res.render('solicitud/lista', {solicitud});
        }
    }
    public agregar = async (req:any, res:any) => {
            const modelBordado = new ModelBordado();
            const modelCostura = new ModelCostura();
            const modelTipo = new ModelTipo();
            const modelColor = new ModelColor();
            const modelauto = new ModelAutomovil();
            const modelUsuario = new ModelUsuario();
            const bordados = await modelBordado.getBordados();
            const materiales = await modelTipo.getTipoMateriales();
            const colores = await modelColor.getColors();
            const costuras = await modelCostura.getCosturas();
            if(isAdmin(req.user) || isVendedor(req.user)){
                const usuarios = await modelUsuario.getUsuarios();
                const vehiculos = await modelauto.getVehiculos();
                res.render('solicitud/agregar', {usuarios, vehiculos, bordados, materiales, colores,costuras});
            }
            else{
                const vehiculos = await modelauto.getVehiculosById(req.user.idUsuario);
                res.render('solicitud/agregarCliente',{vehiculos, bordados, materiales, colores,costuras});
            }
    }
    
    public agregarSolicitud = async (req:any, res:any) => {
            const { idVehiculo, id_material, id_color, id_bordado, cantidad,costura } = req.body;
            const idUsuario = null;
            const nuevaSolicitud = {
                idUsuario,
                idVehiculo,
                id_material,
                id_color,
                id_bordado,
                cantidad,
                costura
            }
            const tipo = 3;
            const referencia = '';
            const banco = 1;
            const monto = 0;
            if(isAdmin(req.user) || isVendedor(req.user)){
                nuevaSolicitud.idUsuario = req.body.idUsuario;
                const id = await this.modelSolicitud.registrar(nuevaSolicitud);
                const idSoli = parseInt(id.insertId);
                const pre = {
                    idSoli,
                    tipo,
                    referencia,
                    banco,
                    monto
                }
                await this.modelPago.prepararPago(pre);
                req.flash('success', 'La solicitud se ha registrado');
                res.redirect('/solicitud/');
            }
            else{
                nuevaSolicitud.idUsuario = req.user.idUsuario;
                const id = await this.modelSolicitud.registrar(nuevaSolicitud);
                const idSoli = parseInt(id.insertId);
                const pre = {
                    idSoli,
                    tipo,
                    referencia,
                    banco,
                    monto
                }
                await this.modelPago.prepararPago(pre);
                req.flash('success', 'La solicitud se ha registrado, recuerda que debes realizar el pago cuanto antes');
                res.redirect('/solicitud/');
            }
    }
    
    public aprobar = async (req:any, res:any) => {
            const { id } = req.params;
            console.log(id);
            const reg = await this.modelPago.checkPago(id);
            if(reg.tipo === 3){
                req.flash('message', 'El Pago no ha sido cargado');
                res.redirect('/solicitud/');
            }
            else{
                const fechaTentativa = new Date();
                var horasestimadas = await this.ultimoETA();
                horasestimadas+=this.getETA(fechaTentativa.getDay(),4);
                const sol = await this.modelSolicitud.getSolicitudById(id);
                if (sol[0].cantidad > 1){
                    horasestimadas+=Math.floor(horasestimadas/4);
                }
                fechaTentativa.setHours(fechaTentativa.getHours()+horasestimadas);
                await this.modelSolicitud.aprobarPago(id,fechaTentativa);

                const idpago = await this.modelPago.getiIdPago(id);
                const pago = parseInt(idpago[0].idPago);
                const modelVenta = new ModelVenta();
                await modelVenta.registrarVenta(id,pago);
                const solci = await this.modelPago.getSolicitud(pago);
                const modelProduccion = new ModelProduccion();
                await modelProduccion.crearRegistro(solci[0].idSoli,req.user.idUsuario);
                req.flash('success', 'La solicitud ha sido aprobada');
                res.redirect('/solicitud/');
            }
    }
    
    public cancelar = async (req:any, res:any) => {
            const { id } = req.params;
            const consulta = await this.modelSolicitud.esCancelable(id);
            if(parseInt(consulta[0].fase) == 3){
                await this.modelSolicitud.cancelar(id);
                req.flash('success', 'La solicitud fue cancelada');
                res.redirect('/solicitud/');
            }
            else{
                req.flash('message', 'La solicitud ya no puede ser cancelada');
                res.redirect('/solicitud/');
            }
    }
    
    public agregarPago = async (req:any, res:any) => {
            const id = req.params;
            const idSoli = id.id;
            const modelBanco = new ModelBanco();
            const banco = await modelBanco.getBancos();
            const modelMetodo = new ModelMetodo();
            const pago = await modelMetodo.getTipos();
            if(isAdmin(req.user) || isVendedor(req.user) ){
                const usuario = await this.modelSolicitud.getUsuario(idSoli);
                if(usuario.length==0){
                    res.redirect('/solicitud/');
                }
                const lista = await this.modelSolicitud.listaEstados(usuario[0].idUsuario,idSoli);
                if (lista.length==0) {
                    res.redirect('/solicitud/');
                }
                else{
                    if (usuario.length==0) {
                        res.redirect('/solicitud/');
                    }
                    else{
                        if(lista[0].idUsuario==usuario[0].idUsuario) {
                            res.render('solicitud/pago',{idSoli,banco,pago});
                        }else{
                            res.redirect('/solicitud/');
                        }
                    }
    
                }
            }
            else{
                const lista = await this.modelSolicitud.listaEstados(req.user.idUsuario,idSoli);
                if (lista.length==0) {
                    res.redirect('/solicitud/');
                }
                else{
                    if(lista[0].idUsuario==req.user.idUsuario) {
                        res.render('solicitud/pago',{idSoli,banco,pago});
                    }else{
                        res.redirect('/solicitud/');
                }
    
                }
            }
    
    
    }
    
    public setPago = async (req:any, res:any) => {
            const {idSoli,tipo,referencia,banco,monto} = req.body;
            await this.modelPago.setPago(tipo,referencia,banco,monto,idSoli);
            req.flash('success', 'El Pago ha sido registrado');
            res.redirect('/solicitud/');
    
    }

    public tipos = async(req:any,res:any) =>{
        const resp = {
            cuero: await this.modelSolicitud.getTipos(1),
            semicuero: await this.modelSolicitud.getTipos(2),
        }
        return res.status(200).json(resp);
    }
}

module.exports = new Solicitud();
