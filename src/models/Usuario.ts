const pool = require('../database');

class ModelUsuario{
    private usuarios:any = [];
    public getNivel = async (id:number) => {
        return await pool.query("SELECT nivelAcceso,idUsuario From Usuarios Where idUsuario = ?",[id]);
    }
    public lista = async () =>{
        this.usuarios = await pool.query("SELECT idUsuario, nombre, apellido, correo, sexo, clave, Descripcion, direccion, telefono, fechaInscripcion FROM Usuarios,Roles WHERE nivelAcceso=Roles.idTipo and nivelAcceso>1");
        return this.usuarios;
    };
    public getUsuarios = async() => {
        this.usuarios = await pool.query("SELECT idUsuario, nombre, apellido FROM Usuarios Where nivelAcceso = 3");
        return this.usuarios;
    }
    public descr = async () =>{
        return await pool.query("SELECT descripcion,idTipo FROM Roles Where idTipo >= 3");
    };
    
    public rango = async (nivelAcceso:number) =>{
        return await pool.query("SELECT idTipo FROM Roles Where Descripcion = ?", [nivelAcceso]);
    };
    
    public agregar = async (body:any,pass:any) =>{
        const nuevoUsuario = {
            nombre : body.nombre,
            apellido : body.apellido,
            correo : body.correo,
            sexo : body.sexo,
            nivelAcceso : body.nivelAcceso,
            clave : pass,
            direccion : body.direccion,
            telefono : body.telefono,
        }
        await pool.query('INSERT INTO Usuarios set ?', [nuevoUsuario]);
    };
    
    public borrar = async (idUsuario:number) =>{
        await pool.query('DELETE FROM Usuarios WHERE idUsuario = ?', [idUsuario]);
    };

    public checkCorreo = async (correo:string) => {
        return await pool.query('SELECT correo FROM Usuarios WHERE correo = ?', [correo]);
    };
    
    public getUsuario = async (idUsuario:number) => {
        return await pool.query('SELECT * FROM Usuarios WHERE idUsuario = ?', [idUsuario]);
    };

    public getUsuarioByCorreo = async (correo:string) => {
        return await pool.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
    };
    
    public editar = async (usuarioEditado:any,id:number) => {
        await pool.query("UPDATE Usuarios SET ? WHERE idUsuario = ? ", [usuarioEditado, id]);
    };
    public checkForeignKey = async (idUsuario:number) => {
        return await pool.query("SELECT Automoviles.idAutomovil FROM Usuarios,Automoviles Where idUsuario = ? and Automoviles.idCliente = Usuarios.idUsuario", [idUsuario]);
    } 


    //auth 

    public login = async (correo:string) =>{
        return await pool.query("SELECT * FROM Usuarios WHERE correo = ?", [correo]);
    };
    
    public registrarUsuario = async (nuevoUsuario:any) => {
        return await pool.query('INSERT INTO Usuarios SET ?', [nuevoUsuario]);
    };
    
    public datosUsuario = async (idUsuario:number) => {
        return await pool.query('SELECT idUsuario, nombre, apellido, correo, sexo, clave, Descripcion, direccion, telefono, fechaInscripcion,nivelAcceso FROM Usuarios,Roles Where idUsuario = ? AND Usuarios.nivelAcceso = Roles.idTipo ', [idUsuario]);
    };

    public getNumSolicitudes = async () =>{
        return await pool.query("SELECT COUNT(*) AS solicitudes FROM Costuras,Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Solicitudes.fase=3 and Pagos.idSoli=Solicitudes.idSolicitud and Costuras.idc=Solicitudes.costura and Pagos.tipo=Metodos.idpago ORDER BY fechaSolicitud");
    };
    
    public getNumeroSolicitudesById = async (id:number) => {
        return await pool.query('SELECT COUNT(*) AS solicitudes FROM Solicitudes Where idUsuario = ?',[id]);
    }

    public getNumSolicitudesById = async (id:number) =>{
        return await pool.query("SELECT COUNT(*) AS solicitudes FROM Costuras,Pagos,Metodos, Usuarios,Automoviles, Colores, Bordados, Tipos, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=Tipos.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=Metodos.idpago and Solicitudes.costura=Costuras.idc and Solicitudes.idUsuario=? ORDER BY fechaSolicitud",[id]);
    };
    
    public getNumeroVehiculosById = async (id:number) => {
        return await pool.query('SELECT COUNT(*) AS vehiculos FROM Automoviles Where idCliente = ?',[id]);
    }
    
    public getNumeroUsuarios = async () => {
        return await pool.query('SELECT COUNT(*) AS usuarios FROM Usuarios');
    }
    public checkMail = async (correo:string) => {
        return await pool.query('SELECT correo FROM Usuarios WHERE correo = ?', [correo]);
    };

    public checkFK = async (idUsuario:number) => {
        return await pool.query("SELECT * FROM Producciones Where vendedor = ? || ensamblador=? || designer=? || costurero=? || cortador=? || bordador=?", [idUsuario,idUsuario,idUsuario,idUsuario,idUsuario,idUsuario,]);
    }

    public getNumeroSolicitudes = async () => {
        return await pool.query('SELECT COUNT(*) AS solicitudes FROM Solicitudes');
    }
    
    public getNumeroVentas = async () => {
        return await pool.query('SELECT COUNT(*) AS ventas FROM Ventas');
    }
    
    public getNumeroProcesos = async () => {
        return await pool.query('SELECT COUNT(*) AS procesos From Solicitudes Where Solicitudes.fase>=4 and Solicitudes.fase<=9');
    }
    public getNumeroProcesosByFase = async (id:number) => {
        return await pool.query('SELECT COUNT(*) AS procesos From Solicitudes Where Solicitudes.fase=?',[id]);
    }
    public getNumeroProcesosByIntervalo = async (intervalo:number,intervalo2:number) => {
        return await pool.query('SELECT COUNT(*) AS procesos From Solicitudes Where Solicitudes.fase=? or Solicitudes.fase=?',[intervalo,intervalo2]);
    }
    public setClave = async (clave:string,id:number) => {
        return await pool.query('UPDATE Usuarios SET clave=? WHERE idUsuario=?',[clave,id]);
    }
}

export default ModelUsuario;
