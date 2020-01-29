const pool = require('../database');

class ModelUsuario{
    private idUsuario:number = 0;
    private nombre:string = '';
    private apellido:string = '';
    private correo?:string = '';
    private sexo:string = '';
    private nivelAcceso?:number = 0;
    private clave?:any = '';
    private direccion:string = '';
    private telefono:string = '';
    public setidUsuario(idUsuario:number){
        this.idUsuario = idUsuario;
    }
    public getidUsuario(){
        return this.idUsuario;
    }
    public setUsuario(body:any){
        this.nombre = body.nombre;
        this.apellido = body.apellido;
        this.correo = body.correo;
        this.sexo = body.sexo;
        this.nivelAcceso = body.nivelAcceso;
        this.clave = body.clave;
        this.direccion = body.direccion;
        this.telefono = body.telefono;
    }
    public nuevoUsuario(){
        const nuevoUsuario = {
            nombre:this.nombre,
            apellido:this.apellido,
            correo:this.correo,
            sexo:this.sexo,
            clave:this.clave,
            nivelAcceso:this.nivelAcceso,
            direccion:this.direccion,
            telefono:this.telefono
        }
        return nuevoUsuario;
    }
    public usuarioEditado(){
        const usuarioEditado = {
            nombre:this.nombre,
            apellido:this.apellido,
            sexo:this.sexo,
            clave:this.clave,
            nivelAcceso:this.nivelAcceso,
            direccion:this.direccion,
            telefono:this.telefono
        }
        return usuarioEditado;
    }
    public setPass(clave:string){
        this.clave = clave;
    }
    public getPass(){
        return this.clave
    }
    public setNivelAcceso(nivelAcceso:number){
        this.nivelAcceso = nivelAcceso;
    }
    public getNivelAcceso(){
        return this.nivelAcceso;
    }
    public getCorreo(){
        return this.correo;
    }
    public getNivel = async (id:number) => {
        return await pool.query("SELECT nivelAcceso,idUsuario From Usuarios Where idUsuario = ?",[id]);
    }
    public lista = async () =>{
        return await pool.query("SELECT idUsuario, nombre, apellido, correo, sexo, clave, Descripcion, direccion, telefono, fechaInscripcion FROM Usuarios,tipoUsuario WHERE nivelAcceso=tipoUsuario.idTipo and nivelAcceso>1");
    };
    
    public descr = async () =>{
        return await pool.query("SELECT descripcion,idTipo FROM tipoUsuario Where idTipo >= 3");
    };
    
    public rango = async (nivelAcceso:number) =>{
        return await pool.query("SELECT idTipo FROM tipoUsuario Where Descripcion = ?", [nivelAcceso]);
    };
    
    public agregar = async () =>{
        await pool.query('INSERT INTO Usuarios set ?', [this.nuevoUsuario()]);
    };
    
    public borrar = async () =>{
        await pool.query('DELETE FROM Usuarios WHERE idUsuario = ?', [this.idUsuario]);
    };

    public checkCorreo = async () => {
        return await pool.query('SELECT correo FROM Usuarios WHERE correo = ?', [this.correo]);
    };
    
    public getUsuario = async () => {
        return await pool.query('SELECT * FROM Usuarios WHERE idUsuario = ?', [this.idUsuario]);
    };
    public geditar = async () => {
        return await pool.query("SELECT descripcion FROM tipoUsuario Where idTipo >= 3");
    };
    
    public nivelUsuario = async (nivel:string) => {
        return await pool.query("SELECT idTipo FROM tipoUsuario Where Descripcion = ?", [nivel]);
    };
    
    public editar = async () => {
        await pool.query("UPDATE Usuarios SET ? WHERE idUsuario = ? ", [this.usuarioEditado(), this.idUsuario]);
    };
    public checkForeignKey = async () => {
        return await pool.query("SELECT Automoviles.idAutomovil FROM Usuarios,Automoviles Where idUsuario = ? and Automoviles.idCliente = Usuarios.idUsuario", [this.idUsuario]);
    } 


    //auth 

    public login = async (correo:string) =>{
        return await pool.query("SELECT * FROM Usuarios WHERE correo = ?", [correo]);
    };
    
    public registrarUsuario = async (nuevoUsuario:any) => {
        return await pool.query('INSERT INTO Usuarios SET ?', [nuevoUsuario]);
    };
    
    public datosUsuario = async (idUsuario:number) => {
        return await pool.query('SELECT idUsuario, nombre, apellido, correo, sexo, clave, Descripcion, direccion, telefono, fechaInscripcion,nivelAcceso FROM Usuarios,tipoUsuario Where idUsuario = ? AND Usuarios.nivelAcceso = tipoUsuario.idTipo ', [idUsuario]);
    };

    public getNumSolicitudes = async () =>{
        return await pool.query("SELECT COUNT(*) AS solicitudes FROM tipoCostura,Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Solicitudes.fase=3 and Pagos.idSoli=Solicitudes.idSolicitud and tipoCostura.idc=Solicitudes.costura and Pagos.tipo=tipoPago.idpago ORDER BY fechaSolicitud");
    };
    
    public getNumeroSolicitudesById = async (id:number) => {
        return await pool.query('SELECT COUNT(*) AS solicitudes FROM Solicitudes Where idUsuario = ?',[id]);
    }

    public getNumSolicitudesById = async (id:number) =>{
        return await pool.query("SELECT COUNT(*) AS solicitudes FROM tipoCostura,Pagos,tipoPago, Usuarios,Automoviles, Colores, Bordados, tipoMaterial, Solicitudes, Procesos Where idVehiculo=Automoviles.idAutomovil and id_material=tipoMaterial.idTipo and id_color=Colores.idColor and id_bordado=Bordados.idBordado and Solicitudes.idUsuario=Usuarios.idUsuario and Procesos.idProceso=Solicitudes.fase and Pagos.idSoli=Solicitudes.idSolicitud and Pagos.tipo=tipoPago.idpago and Solicitudes.costura=tipoCostura.idc and Solicitudes.idUsuario=? ORDER BY fechaSolicitud",[id]);
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
    public getNumeroSolicitudes = async () => {
        return await pool.query('SELECT COUNT(*) AS solicitudes FROM Solicitudes');
    }
    
    public getNumeroVentas = async () => {
        return await pool.query('SELECT COUNT(*) AS ventas FROM Ventas');
    }
    
    public getNumeroProcesos = async () => {
        return await pool.query('SELECT COUNT(*) AS procesos From Solicitudes Where Solicitudes.fase>=4 and Solicitudes.fase<=9');
    }
}

export default ModelUsuario;
