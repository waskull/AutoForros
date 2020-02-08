const pool = require('../database');
export default class Color{
	private colores:any = [];
	public getColores = async () => {
		this.colores = await pool.query("SELECT * FROM Colores ORDER BY idColor");
		return this.colores;
	};
	public getColors = async() => {
        return await pool.query("SELECT * FROM Colores");
    }
	public agregarColor = async (asd:any) => {
        await pool.query('INSERT INTO Colores SET descripcion = ?',[asd]);
	};
	public getColorByDesc = async (desc:string) => {
        return await pool.query("SELECT * FROM Colores Where descripcion = ?",[desc]);
    };
}
