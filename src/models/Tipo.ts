const pool = require('../database');
class ModelTipo{
	private tipos:any = [];
	public getTipos = async () => {
		this.tipos = await pool.query("SELECT * FROM tipoMaterial ORDER BY idTipo");
		return this.tipos;
	};
	public getTipoMateriales = async() => {
        return await pool.query("SELECT * FROM tipoMaterial");
    }
}
export default ModelTipo;