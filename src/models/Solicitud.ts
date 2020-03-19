const pool = require('../database');

class ModelSolicitud{
    private list:any = [];
    public lista = async () =>{
        this.list = await pool.query("SELECT idSolicitud, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.descripcion as fase,descPago,referencia,Solicitudes.costura,Costuras.texto FROM Costuras,Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Solicitudes.fase=3 and Pagos.idSoli=Solicitudes.idSolicitud and Costuras.idc=Solicitudes.costura and Pagos.tipo=Metodos.idpago");
        return this.list;
    };

    public listaTodos = async () => {
        this.list = await pool.query("SELECT idSolicitud,Usuarios.idUsuario, nombre, apellido, placa, descrip,fechaSolicitud, Colores.descripcion, Bordados.descripcion as bordado, cantidad,Procesos.idProceso,Procesos.descripcion as fase,Procesos.idProceso as idfase,descPago,referencia,Solicitudes.costura,Costuras.texto FROM Costuras,Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=Metodos.idpago and Solicitudes.costura=Costuras.idc and Solicitudes.fase>=3 and Solicitudes.fase<=9  ORDER BY fechaSolicitud");
        return this.list;
    }

    public listaCliente = async (id:number) =>{
        this.list = await pool.query("SELECT idSolicitud, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.idProceso,Procesos.descripcion as fase,Procesos.idProceso as idfase,descPago,referencia,Solicitudes.costura,Costuras.texto FROM Costuras,Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=Metodos.idpago and Solicitudes.costura=Costuras.idc and Solicitudes.idUsuario=? ORDER BY fechaSolicitud",[id]);
        return this.list;
    };

    public listaClienteByFase = async (id:number,fase1:number,fase2:number) => {
        this.list = pool.query("SELECT idSolicitud, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.idProceso,Procesos.descripcion as fase,Procesos.idProceso as idfase,descPago,referencia,Solicitudes.costura,Costuras.texto FROM Costuras,Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=Metodos.idpago and Solicitudes.costura=Costuras.idc and Solicitudes.idUsuario=? and Solicitudes.fase>=? and Solicitudes.fase<=? ORDER BY fechaSolicitud",[id,fase1,fase2]);
        return this.list;
    }

    public listaEstados = async (id:number,sol:number) =>{
        return await pool.query("SELECT Solicitudes.idUsuario FROM Solicitudes, Procesos Where Solicitudes.fase=Procesos.idProceso and Solicitudes.idUsuario=? and Solicitudes.idSolicitud=? and Solicitudes.fase=3",[id,sol]);
    };

    public esCancelable = async(id:number) => {
        return await pool.query("SELECT fase FROM Solicitudes Where idSolicitud = ?",[id]);
    }

    public cancelar = async(id:number) => {
        await pool.query("UPDATE Solicitudes SET fase=fase-1 Where idSolicitud=?",[id]);
    }

    public getSolicitudById = async(id:number) => {
        return await pool.query("SELECT cantidad FROM Solicitudes Where idSolicitud = ?",[id]);
    }

    public getUsuario = async(id:number) => {
        return await pool.query("SELECT idUsuario FROM Solicitudes Where idSolicitud = ?",[id]);
    }

    public getFaseById = async(idSolicitud:number) =>{
        return await pool.query("SELECT fase FROM Solicitudes Where fase>=3 and Solicitudes.idSolicitud=?",[idSolicitud]);
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

    public registrar = async (solicitud:any) =>{
        return await pool.query("INSERT INTO Solicitudes set ?", [solicitud]);
    };

    public aprobarPago = async (id:number,fechaTentativa:Date) =>{
        await pool.query("UPDATE Solicitudes SET Solicitudes.fechaTentativa=?,Solicitudes.fase=fase+1 WHERE Solicitudes.idSolicitud=?", [fechaTentativa,id]);
    };
    public listaGerente = async (fase:number,fase2:number) =>{
        return await pool.query("SELECT idSolicitud,fechaTentativa,Costuras.texto, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.descripcion as fase,descPago,referencia FROM Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados,Costuras, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and (Solicitudes.fase>=? and Solicitudes.fase<=?) and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=Metodos.idpago and Costuras.idc=Solicitudes.costura ORDER BY fechaSolicitud",[fase,fase2]);
    }
    
    public listaFases = async (fase1:number,fase2:number) =>{
        return await pool.query("SELECT idSolicitud,fechaTentativa,Costuras.texto, nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.descripcion as fase,descPago,referencia FROM Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados,Costuras, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and (Solicitudes.fase=? OR Solicitudes.fase=?) and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=Metodos.idpago and Costuras.idc=Solicitudes.costura ORDER BY fechaSolicitud",[fase1,fase2]);
    }

    public listatodos = async () => {
        return await pool.query("SELECT idSolicitud,fechaTentativa,Usuarios.idUsuario, nombre, apellido, placa, descrip,fechaSolicitud, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.idProceso,Procesos.descripcion as fase,Procesos.idProceso as idfase,descPago,referencia,Solicitudes.costura,Costuras.texto FROM Costuras,Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=Metodos.idpago and Solicitudes.costura=Costuras.idc and Solicitudes.fase>=4 and Solicitudes.fase<=9  ORDER BY fechaSolicitud");
    }

    public listaEmpleado = async (fase:number) =>{
        return await pool.query("SELECT idSolicitud, fechaTentativa,nombre, apellido, placa, descrip, Colores.descripcion, Bordados.descripcion as bordado, cantidad, fechaSolicitud,Procesos.descripcion as fase,descPago,referencia FROM Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Solicitudes.fase=? and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=Metodos.idpago ORDER BY fechaSolicitud",[fase]);
    }
    public getTipos = async (id:number) => {
        const result = await pool.query("SELECT count(id_material) as cantidad FROM Solicitudes WHERE id_material=?",[id]);
        return result[0].cantidad;
    }

    
    public getidUsuario = async(id:number) => {
        return await pool.query("SELECT idUsuario FROM Solicitudes Where idSolicitud = ?",[id]);
    }

    public getInfoSolicitud = async(id:number) =>{
        return await pool.query("SELECT Solicitudes.cantidad,id_material,id_color,descrip as material,descripcion as color FROM Solicitudes,Tipos,Colores Where idSolicitud=? and Solicitudes.id_color=Colores.idColor and Solicitudes.id_material=Tipos.idTipo",[id]);
    }
    
    public getFase = async (id:number) =>{
        return await pool.query("SELECT fase FROM Solicitudes Where idSolicitud = ?", [id]);
    }
    
    public subirFase = async(id:number) => {
        await pool.query("UPDATE Solicitudes SET fase=fase+1 Where idSolicitud=?",[id]);
    }
}

export default ModelSolicitud;
