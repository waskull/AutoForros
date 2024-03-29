const pool = require('../database');

class ModelVenta{
    private ventas:any = [];
    private intervalo:number=0;
    private intervalo2:number=0;
    public lista = async() => {
        this.ventas = await pool.query("SELECT idVenta, id_solicitud,pago,Bancos._nombre,Metodos.descPago,Pagos.referencia,Pagos.monto, cantidad,Ventas.fecha_pago FROM Pagos,Solicitudes,Ventas,Metodos,Bancos Where Solicitudes.idSolicitud = id_solicitud and Pagos.idPago=pago and Metodos.idpago=Pagos.tipo and Bancos.codbanco=Pagos.banco");
        return this.ventas;
    };
    public listaP = async() => {
        this.ventas =await pool.query("SELECT idVenta,nombre,apellido, id_solicitud,pago,Bancos._nombre,Metodos.descPago,Pagos.referencia,Pagos.monto, cantidad,Ventas.fecha_pago FROM Usuarios,Pagos,Solicitudes,Ventas,Metodos,Bancos Where Solicitudes.idSolicitud = id_solicitud and Pagos.idPago=pago and Metodos.idpago=Pagos.tipo and Bancos.codbanco=Pagos.banco and Usuarios.idUsuario=Solicitudes.idUsuario");
        return this.ventas;
    }
    public ventasEntre = async(intervalo:number) => {
        this.intervalo=intervalo;
        this.intervalo2=this.intervalo+1;
        return await pool.query("select COUNT(*) as numVentas from Ventas where fecha_pago between date_sub(now(),INTERVAL ? DAY) and date_sub(now(),INTERVAL ? DAY)",[this.intervalo2,this.intervalo]);
    }
    public getNumVentas = async () =>{
        return await pool.query("select COUNT(*) semanal from Ventas where fecha_pago between date_sub(now(),INTERVAL 7 DAY) and now()");
    }
    public registrarVenta = async (idsol:number,idpago:number) =>{
        await pool.query("INSERT INTO Ventas (id_solicitud,pago) Values (?,?)", [idsol,idpago]);
    };
}
export default ModelVenta;
