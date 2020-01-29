const pool = require('../database');


class ModelProduccion{

	private idRegistro:number = 0;
	private registros:any = [];
    public getBySolicitud = async (id:number) =>{
        return await pool.query('SELECT * FROM Produccion Where idSol = ?', [id]);
    };
    
    public lista = async () =>{
        this.registros = await pool.query('SELECT * FROM Produccion');
        return this.registros;
    };
    
    public setBordador  = async (bordador:string , id:number) => {
        await pool.query('UPDATE Produccion SET bordador = ? WHERE solicitud = ?', [bordador, id]);
    };

    public listaGerente = async (fase:number,fase2:number) =>{
        return await pool.query("SELECT idSolicitud,fechaTentativa,tipoCostura.texto, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.descripcion as fase,descPago,referencia FROM Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados,tipoCostura, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and (Solicitudes.fase>=? and Solicitudes.fase<=?) and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=tipoPago.idpago and tipoCostura.idc=Solicitudes.costura ORDER BY fechaSolicitud",[fase,fase2]);
    };
    
    public listaFases = async (fase1:number,fase2:number) =>{
        return await pool.query("SELECT idSolicitud,tipoCostura.texto, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.descripcion as fase,descPago,referencia FROM Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados,tipoCostura, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and (Solicitudes.fase=? OR Solicitudes.fase=?) and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=tipoPago.idpago and tipoCostura.idc=Solicitudes.costura ORDER BY fechaSolicitud",[fase1,fase2]);
    };

    public listaTodos = async () => {
        return await pool.query("SELECT idSolicitud,fechaTentativa,Usuarios.idUsuario, nombre, apellido, placa, descrip,fechaSolicitud, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.idProceso,Procesos.descripcion as fase,Procesos.idProceso as idfase,descPago,referencia,Solicitudes.costura,tipoCostura.texto FROM tipoCostura,Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=tipoPago.idpago and Solicitudes.costura=tipoCostura.idc and Solicitudes.fase>=4 and Solicitudes.fase<=9  ORDER BY fechaSolicitud");
    }
    
    public getFase = async (id:number) =>{
        return await pool.query("SELECT fase FROM Solicitudes Where idSolicitud = ?", [id]);
    };
    
    public subirFase = async(id:number) => {
        await pool.query("UPDATE Solicitudes SET fase=fase+1 Where idSolicitud=?",[id]);
    }
    
    public listaEmpleado = async (fase:number) =>{
        return await pool.query("SELECT idSolicitud, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.descripcion as fase,descPago,referencia FROM Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Solicitudes.fase=? and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=tipoPago.idpago ORDER BY fechaSolicitud",[fase]);
    };

    public listaP = async () =>{
        return await pool.query('SELECT * FROM Produccion');
    };
    
    public setVendedor = async (vendedor:string, id:number) => {
        await pool.query('UPDATE Produccion SET vendedor = ? WHERE solicitud = ?', [vendedor, id]);
    };
    
    public setEmsamblador = async (emsamblador:string, id:number) => {
        await pool.query('UPDATE Produccion SET emsamblador = ? WHERE solicitud = ?', [emsamblador, id]);
    };
    
    public setDesigner  = async (designer:string , id:number) => {
        await pool.query('UPDATE Produccion SET designer = ? WHERE solicitud = ?', [designer, id]);
    };
    
    public setFecha = async (fecha:any, id:number) => {
        await pool.query('UPDATE Produccion SET fecha = ? WHERE solicitud = ?', [fecha, id]);
    };
    
    public setCosturero = async (costurero:string, id:number) => {
        await pool.query('UPDATE Produccion SET costurero = ? WHERE solicitud = ?', [costurero, id]);
    };
    
    public setCortador = async (cortador:string, id:number) => {
        await pool.query('UPDATE Produccion SET cortador = ? WHERE solicitud = ?', [cortador, id]);
    };

    public getidUsuario = async(id:number) => {
        return await pool.query("SELECT idUsuario FROM Solicitudes Where idSolicitud = ?",[id]);
    }

    public getInfoUsuario = async(id:number) => {
        return await pool.query("SELECT nombre,apellido,correo FROM Usuarios Where idUsuario = ?",[id]);
    }
}

export default ModelProduccion;
