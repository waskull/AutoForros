const pool = require('../database');


class ModelProduccion{
	private producciones:any = [];
    public getBySolicitud = async (id:number) =>{
        return await pool.query('SELECT * FROM Producciones Where idSol = ?', [id]);
    }
    
    public lista = async () =>{
        this.producciones = await pool.query('SELECT * FROM Producciones');
        return this.producciones;
    }
    public crearRegistro = async(id:number,vendedor:string) => {
        await pool.query("INSERT INTO Producciones (solicitud,vendedor) VALUES (?,?)",[id,vendedor]);
    }
    public setBordador  = async (bordador:number , id:number) => {
        await pool.query('UPDATE Producciones SET bordador = ? WHERE solicitud = ?', [bordador, id]);
    }

    public listaP = async () =>{
        return await pool.query('SELECT * FROM Producciones');
    }
    
    public setVendedor = async (vendedor:number, id:number) => {
        await pool.query('UPDATE Producciones SET vendedor = ? WHERE solicitud = ?', [vendedor, id]);
    }
    
    public setEnsamblador = async (ensamblador:number, id:number) => {
        await pool.query('UPDATE Producciones SET ensamblador = ? WHERE solicitud = ?', [ensamblador, id]);
    }
    
    public setDesigner  = async (designer:number , id:number) => {
        await pool.query('UPDATE Producciones SET designer = ? WHERE solicitud = ?', [designer, id]);
    }
    
    public setFecha = async (fecha:any, id:number) => {
        await pool.query('UPDATE Producciones SET fecha = ? WHERE solicitud = ?', [fecha, id]);
    }
    
    public setCosturero = async (costurero:number, id:number) => {
        await pool.query('UPDATE Producciones SET costurero = ? WHERE solicitud = ?', [costurero, id]);
    }
    
    public setCortador = async (cortador:number, id:number) => {
        await pool.query('UPDATE Producciones SET cortador = ? WHERE solicitud = ?', [cortador, id]);
    }
    
}

export default ModelProduccion;
