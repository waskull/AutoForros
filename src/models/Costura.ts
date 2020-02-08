const pool = require('../database');
class ModelCostura{
	private costuras:any = [];
	public getCosturas = async() => {
		 this.costuras = await pool.query("SELECT * FROM Costura");
		 return this.costuras;
	}
    public checkCostura = async (texto:string) => {
        return await pool.query("SELECT * From Costura Where texto= ?",[texto]);
    }
    public borrarCostura = async (idc:number) => {
        return await pool.query("DELETE FROM Costura WHERE idc = ?",[idc]);
    }
    public agregarCostura = async (costu:string) => {
        await pool.query('INSERT INTO Costura SET texto = ?',[costu]);
    };
}
export default ModelCostura;