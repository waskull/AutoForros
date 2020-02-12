const pool = require('../database');
export default class PasswordReset{
	public crearCodigo = async (data:any) =>{
        return await pool.query("INSERT INTO Passwordresets SET ?", [data]);
    }
    public getCodigo = async (id:number) =>{
    	return await pool.query("SELECT * FROM Passwordresets Where id=?",[id]);
    }
    public deshabilitarCodigo = async (id:number) => {
    	pool.query("UPDATE Passwordresets SET estaActivo=? Where id=?",[false,id]);
    }
}