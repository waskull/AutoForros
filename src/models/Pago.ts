const pool = require('../database');
export default class ModelPago{
	public prepararPago = async (pre:any) =>{
        await pool.query("INSERT INTO Pagos SET ?", [pre]);
    }
    public getiIdPago = async (id:number) => {
        return await pool.query("SELECT idPago FROM Pagos Where idSoli=?",[id]);
    }

    public getTipos = async() =>{
        return await pool.query("SELECT * FROM tipoPago Where idpago!=3");
    };

    public setPago = async(tipo:number,referencia:string,banco:number,monto:number,id:number) =>{
        await pool.query("UPDATE Pagos SET tipo=?,referencia=?,banco=?,monto=? Where idSoli=?",[tipo,referencia,banco,monto,id]);
    };
}