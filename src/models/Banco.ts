const pool = require('../database');
export default class Banco{
	private bancos:any = [];
	public getBancos = async() =>{
        this.bancos = await pool.query("SELECT * FROM Bancos Where codbanco!=1");
        return this.bancos;
    };
}
