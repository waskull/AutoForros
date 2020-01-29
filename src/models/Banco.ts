export default class Bancos{
	private codbanco:number = 1;
	private _nombre:string = '';
	private list:any = [];
	public getBancos = async() =>{
        this.list = await pool.query("SELECT * FROM Bancos Where codbanco!=1");
        return this.list;
    };
}