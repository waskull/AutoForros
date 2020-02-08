const pool = require('../database');
class ModelMetodo{
	private metodos:any = [];
	public getTipos = async() =>{
		this.metodos = await pool.query("SELECT * FROM tipoPago Where idpago!=3");
		return this.metodos;
    };
}
export default ModelMetodo;
