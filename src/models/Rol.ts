const pool = require('../database');
class ModelRol{
	private roles:any = [];
	public nivelUsuario = async (nivel:string) => {
        return await pool.query("SELECT idTipo FROM Roles Where Descripcion = ?", [nivel]);
	};
	public getRoles = async () => {
        this.roles =await pool.query("SELECT descripcion FROM Roles Where idTipo >= 3");
		return this.roles;
	};
	
}
export default ModelRol;