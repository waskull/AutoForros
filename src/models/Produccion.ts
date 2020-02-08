const pool = require('../database');


class ModelProduccion{
	private producciones:any = [];
    public getBySolicitud = async (id:number) =>{
        return await pool.query('SELECT * FROM Produccion Where idSol = ?', [id]);
    }
    
    public lista = async () =>{
        this.producciones = await pool.query('SELECT * FROM Produccion');
        return this.producciones;
    }
    public crearRegistro = async(id:number,vendedor:string) => {
        await pool.query("INSERT INTO Produccion (solicitud,vendedor) VALUES (?,?)",[id,vendedor]);
    }
    public setBordador  = async (bordador:string , id:number) => {
        await pool.query('UPDATE Produccion SET bordador = ? WHERE solicitud = ?', [bordador, id]);
    }

    public getFase = async (id:number) =>{
        return await pool.query("SELECT fase FROM Solicitudes Where idSolicitud = ?", [id]);
    }
    
    public subirFase = async(id:number) => {
        await pool.query("UPDATE Solicitudes SET fase=fase+1 Where idSolicitud=?",[id]);
    }

    public listaP = async () =>{
        return await pool.query('SELECT * FROM Produccion');
    }
    
    public setVendedor = async (vendedor:string, id:number) => {
        await pool.query('UPDATE Produccion SET vendedor = ? WHERE solicitud = ?', [vendedor, id]);
    }
    
    public setEmsamblador = async (emsamblador:string, id:number) => {
        await pool.query('UPDATE Produccion SET emsamblador = ? WHERE solicitud = ?', [emsamblador, id]);
    }
    
    public setDesigner  = async (designer:string , id:number) => {
        await pool.query('UPDATE Produccion SET designer = ? WHERE solicitud = ?', [designer, id]);
    }
    
    public setFecha = async (fecha:any, id:number) => {
        await pool.query('UPDATE Produccion SET fecha = ? WHERE solicitud = ?', [fecha, id]);
    }
    
    public setCosturero = async (costurero:string, id:number) => {
        await pool.query('UPDATE Produccion SET costurero = ? WHERE solicitud = ?', [costurero, id]);
    }
    
    public setCortador = async (cortador:string, id:number) => {
        await pool.query('UPDATE Produccion SET cortador = ? WHERE solicitud = ?', [cortador, id]);
    }

    public getidUsuario = async(id:number) => {
        return await pool.query("SELECT idUsuario FROM Solicitudes Where idSolicitud = ?",[id]);
    }

    public getInfoUsuario = async(id:number) => {
        return await pool.query("SELECT nombre,apellido,correo FROM Usuarios Where idUsuario = ?",[id]);
    }
    public getInfoSolicitud = async(id:number) =>{
        return await pool.query("SELECT Solicitudes.cantidad,id_material,id_color,descrip as material,descripcion as color FROM Solicitudes,tipoMaterial,Colores Where idSolicitud=? and Solicitudes.id_color=Colores.idColor and Solicitudes.id_material=tipoMaterial.idTipo",[id]);
    }
}

export default ModelProduccion;
