const pool = require('../database');

class ModelProveedor{
    private list:any = [];
    public lista = async () =>{
        this.list = await pool.query("SELECT idProveedor, nombre,direccion,telefono,ciudad,sector FROM Proveedores");
        return this.list;
    };
    
    public agregar = async (proveedor:any) => {
        await pool.query('INSERT INTO Proveedores set ?', [proveedor]);
    };
    
    public borrar = async (id:number) =>{
        await pool.query('DELETE FROM Proveedores WHERE idProveedor = ?', [id]);
    };
    
    public geditar = async (id:number) => {
        return await pool.query("SELECT * FROM Proveedores Where idProveedor = ?",[id]);
    };
    
    public editar = async (proveedor:any,id:number) => {
        await pool.query("UPDATE Proveedores SET ? WHERE idProveedor = ? ", [proveedor, id]);
    };

    public checkSiExiste = async (id:number) =>{
        const T = await pool.query("SELECT id_proveedor FROM Proveedores,Pedidos Where id_proveedor=idProveedor and idProveedor = ?",[id]);
        if(T.length>0){return true}else{return false;}
    }
    public getUsuario = async (id:number) => {
        return await pool.query('SELECT * FROM Proveedores WHERE idProveedor = ?', [id]);
    };
}


export default ModelProveedor;
