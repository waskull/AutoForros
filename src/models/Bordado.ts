const pool = require('../database');

class ModelBordado{
	private idBordado:number=0;
	private descripcion:string='';
	private img_url:string='';
	public getIdBordado():number{
		return this.idBordado;
	}
	public getImg_url():string{
		return this.img_url;
	}
	public setIdBordado(idBordado:number){
		this.idBordado = idBordado;
	}
    public getIMG_URLById = async ()=>{
        return await pool.query("SELECT img_url FROM Bordados Where idBordado = ?", [this.idBordado]);
    };
}

export default ModelBordado;
