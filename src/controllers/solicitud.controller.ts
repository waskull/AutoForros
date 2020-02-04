import ModelSolicitud from '../models/Solicitud';
import ModelPago from '../models/Pago';
import {isUsuario,isAdmin,isVendedor} from '../lib/helpers';

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
                //solicitud[i].eta=this.getETA(dia,solicitud[i].idfase);
                if(solicitud[i].idfase === 3 || solicitud[i].idfase === 10){
                    solicitud[i].eta = 0;
                }
                else{
                    this.hours += solicitud[i].eta=this.getETA(dia,solicitud[i].idfase);
                    solicitud[i].eta = this.hours;
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
                    //var fechaSolicitud = new Date(solicitud[i].fechaSolicitud);
                    //fechaSolicitud.setHours(fechaSolicitud.getHours()+solicitud[i].eta);

                    var fechaTentativa = new Date(solicitud[i].fechaTentativa);
                    var fechaActual = new Date();
                    fechaActual.setHours(fechaActual.getHours()-solicitud[i].eta);
                    if(fechaActual >= fechaTentativa){
                        //console.log("La Solicitud: "+solicitud[i].idSolicitud +" esta retrasada"+fechaTentativa+" "+fechaActual+" "+fechaActual);
                        solicitud[i].retraso = true;
                    }
                }
                listaFiltrada.push(solicitud[i]);
                i++;
        });
        const len = listaFiltrada.length;
        return listaFiltrada[len-2].eta;
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
                //comentar para recuperar el pago con administrador y gerentes comentar solo la linea de abajo
                solicitud[i].isVendedor = isVendedor(req.user);
                i++;
            });
            res.render('solicitud/lista', {solicitud});
        }
    }
    public agregar = async (req:any, res:any) => {
            const bordados = await this.modelSolicitud.getBordados();
            const materiales = await this.modelSolicitud.getTipoMateriales();
            const colores = await this.modelSolicitud.getColores();
            const costuras = await this.modelSolicitud.getCosturas();
            if(isAdmin(req.user) || isVendedor(req.user)){
                const usuarios = await this.modelSolicitud.getUsuarios();
                const vehiculos = await this.modelSolicitud.getVehiculos();
                res.render('solicitud/agregar', {usuarios, vehiculos, bordados, materiales, colores,costuras});
            }
            else{
                const vehiculos = await this.modelSolicitud.getVehiculosById(req.user.idUsuario);
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
            const fechaTentativa = new Date();
            var horasestimadas = await this.ultimoETA();
            horasestimadas+=this.getETA(fechaTentativa.getDay(),4);
            fechaTentativa.setHours(fechaTentativa.getHours()+horasestimadas);
            await this.modelSolicitud.aprobarPago(id,fechaTentativa);

            const idpago = await this.modelPago.getiIdPago(id);
            const pago = parseInt(idpago[0].idPago);
            await this.modelSolicitud.registrarVenta(id,pago);
            const solci = await this.modelSolicitud.getSolicitud(pago);
            const nombre = req.user.nombre+" "+req.user.apellido;
            await this.modelSolicitud.crearRegistro(solci[0].idSoli,nombre);
            req.flash('success', 'La solicitud ha sido aprobada');
            res.redirect('/solicitud/');
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
            const banco = await this.modelSolicitud.getBancos();
            const pago = await this.modelPago.getTipos();
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
}

module.exports = new Solicitud();
