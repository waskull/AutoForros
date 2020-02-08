const pool = require('../database');

class ModelBordado{
	private bordados:any=[];
    public getIMG_URLById = async (id:number) =>{
        return await pool.query("SELECT img_url FROM Bordados Where idBordado = ?", [id]);
	};
	public getBordados = async() => {
		this.bordados = await pool.query("SELECT * FROM Bordados");
		return this.bordados;
    }
}

export default ModelBordado;
