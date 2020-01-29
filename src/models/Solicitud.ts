const pool = require('../database');

class ModelSolicitud{
    private idSolicitud:number=0;
    private idUsuario:number=0;
    private idVehiculo:number=0;
    private id_material:number=0;
    private id_color:number=0;
    private id_bordado:number=0;
    private cantidad:number=0;
    private costura:number=0;
    private fechaSolicitud:string='';
    private fechaTentativa:string='';
    private list:any = [];
    public setFechaTentativa(fechaTentativa:any){
        this.fechaTentativa = fechaTentativa;
    }
    public lista = async () =>{
        this.list = await pool.query("SELECT idSolicitud, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.descripcion as fase,descPago,referencia,Solicitudes.costura,tipoCostura.texto FROM tipoCostura,Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Solicitudes.fase=3 and Pagos.idSoli=Solicitudes.idSolicitud and tipoCostura.idc=Solicitudes.costura and Pagos.tipo=tipoPago.idpago ORDER BY fechaSolicitud");
        return this.list;
    };

    public listaTodos = async () => {
        this.list = await pool.query("SELECT idSolicitud,Usuarios.idUsuario, nombre, apellido, placa, descrip,fechaSolicitud, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.idProceso,Procesos.descripcion as fase,Procesos.idProceso as idfase,descPago,referencia,Solicitudes.costura,tipoCostura.texto FROM tipoCostura,Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=tipoPago.idpago and Solicitudes.costura=tipoCostura.idc and Solicitudes.fase>=3 and Solicitudes.fase<=9  ORDER BY fechaSolicitud");
        return this.list;
    }

    public listaCliente = async (id:number) =>{
        this.list = await pool.query("SELECT idSolicitud, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.idProceso,Procesos.descripcion as fase,Procesos.idProceso as idfase,descPago,referencia,Solicitudes.costura,tipoCostura.texto FROM tipoCostura,Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=tipoPago.idpago and Solicitudes.costura=tipoCostura.idc and Solicitudes.idUsuario=? ORDER BY fechaSolicitud",[id]);
        return this.list;
    };

    public listaClienteByFase = async (id:number,fase1:number,fase2:number) => {
        this.list = pool.query("SELECT idSolicitud, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.idProceso,Procesos.descripcion as fase,Procesos.idProceso as idfase,descPago,referencia,Solicitudes.costura,tipoCostura.texto FROM tipoCostura,Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=tipoPago.idpago and Solicitudes.costura=tipoCostura.idc and Solicitudes.idUsuario=? and Solicitudes.fase>=? and Solicitudes.fase<=? ORDER BY fechaSolicitud",[id,fase1,fase2]);
        return this.list;
    }

    public getSolicitud = async(id:number) => {
        return await pool.query("SELECT idSoli FROM Pagos Where idPago = ?",[id]);
    }

    public crearRegistro = async(id:number,vendedor:string) => {
        await pool.query("INSERT INTO Produccion (solicitud,vendedor) VALUES (?,?)",[id,vendedor]);
    };

    public listaEstados = async (id:number,sol:number) =>{
        return await pool.query("SELECT Solicitudes.idUsuario FROM Solicitudes, Procesos Where Solicitudes.fase=Procesos.idProceso and Solicitudes.idUsuario=? and Solicitudes.idSolicitud=? and Solicitudes.fase=3",[id,sol]);
    };

    public esCancelable = async(id:number) => {
        return await pool.query("SELECT fase FROM Solicitudes Where idSolicitud = ?",[id]);
    }

    public cancelar = async(id:number) => {
        await pool.query("UPDATE Solicitudes SET fase=fase-1 Where idSolicitud=?",[id]);
    }

    public getUsuario = async(id:number) => {
        return await pool.query("SELECT idUsuario FROM Solicitudes Where idSolicitud = ?",[id]);
    }

    public getUsuarios = async() => {
        return await pool.query("SELECT idUsuario, nombre, apellido FROM Usuarios Where nivelAcceso = 3");
    }

    public getFaseById = async(idSolicitud:number) =>{
        return await pool.query("SELECT fase FROM Solicitudes Where fase>=3 and Solicitudes.idSolicitud=?",[idSolicitud]);
    }

    public getVehiculos = async() => {
        return await pool.query("SELECT * FROM Automoviles");
    }

    public getVehiculosById = async(idUsuario:number) => {
        return await pool.query("SELECT * FROM Automoviles Where idCliente = ?", [idUsuario]);
    }

    public getProcesos = async() => {
        return await pool.query("SELECT * FROM Procesos");
    }

    public getProcesosById = async(id:number) => {
        return await pool.query("SELECT * FROM Procesos Where Procesos.idFase = ?", [id]);
    }

    public getBordados = async() => {
        return await pool.query("SELECT * FROM Bordados");
    }

    public getColores = async() => {
        return await pool.query("SELECT * FROM Colores");
    }

    public getCosturas = async() => {
        return await pool.query("SELECT * FROM tipoCostura");
    }

    public getTipoMateriales = async() => {
        return await pool.query("SELECT * FROM tipoMaterial");
    }

    public getMaterialById = async(id:number) => {
        return await pool.query("SELECT * FROM Materiales Where idMaterial = ?",[id]);
    }

    public getlistaById = async (idusuario:number) =>{
        return await pool.query("SELECT * FROM Solicitudes Where idUsuario = ? ORDER BY fechaSolicitud", [idusuario]);
    };

    public getlistaByIdVehiculo = async (idVehiculo:number) =>{
        return await pool.query("SELECT * FROM Solicitudes Where idVehiculo = ?", [idVehiculo]);
    };

    public getlistaByIdVehiculo_user = async (idVehiculo:number, idUsuario:number) =>{
        return await pool.query("SELECT * FROM Solicitudes Where idVehiculo = ? and idUsuario = ?", [idVehiculo, idUsuario]);
    };

    public checkStock = async (idproducto:number) =>{
        return await pool.query("SELECT cantidadStock FROM Inventario Where id_material = ?", [idproducto]);
    };

    public quitarStock = async (idproducto:number, cantidad:number) =>{
        await pool.query("UPDATE Inventario SET cantidadStock = cantidadStock-? Where id_material = ?", [cantidad, idproducto]);
    };

    public registrar = async (solicitud:any) =>{
        return await pool.query("INSERT INTO Solicitudes set ?", [solicitud]);
    };

    public aprobarPago = async (id:number,fechaTentativa:Date) =>{
        console.log(id+" "+fechaTentativa);
        await pool.query("UPDATE Solicitudes SET Solicitudes.fechaTentativa=?,Solicitudes.fase=fase+1 WHERE Solicitudes.idSolicitud=?", [fechaTentativa,id]);
    };

    public registrarVenta = async (idsol:number,idpago:number) =>{
        await pool.query("INSERT INTO Ventas (id_solicitud,pago) Values (?,?)", [idsol,idpago]);
    };

    public getBancos = async() =>{
        return await pool.query("SELECT * FROM Bancos Where codbanco!=1");
    };
}

export default ModelSolicitud;
