const pool = require('../database');

class ModelPedido{
    private pedidos:any = [];
    public lista = async () =>{
        this.pedidos = await pool.query('SELECT idPedido, Usuarios.nombre, Proveedores.nombre as proveedor, Usuarios.apellido, Colores.descripcion, Tipos.descrip, cantidad, costo, fecha FROM Pedidos,Usuarios,Proveedores,Materiales,Colores, Tipos  Where id_empleado = idUsuario and id_proveedor = idProveedor and idproducto = idMaterial and Colores.idColor = Materiales.color and Tipos.idTipo = Materiales.idTipo');
        return this.pedidos;
    };
    
    public getProveedor = async () =>{
        return await pool.query('SELECT nombre FROM Proveedores');
    };
    
    public getProducto= async () =>{
        return await pool.query('SELECT idMaterial, descrip, descripcion FROM Materiales,Colores,Tipos Where Colores.idColor = Materiales.color and Tipos.idTipo = Materiales.idTipo');
    };
    
    public getProveedorById = async (nombre:string) =>{
        return await pool.query('SELECT idProveedor FROM Proveedores Where nombre = ?', [nombre]);
    };
    
    public getProductoById = async (id:any) =>{
        return await pool.query('SELECT idMaterial FROM Materiales,Tipos Where descrip = ? and Materiales.idTipo = Tipos.idTipo', [id]);
    };
    
    public registro = async (nuevoPedido:any) => {
        await pool.query('INSERT INTO Pedidos set ?', [nuevoPedido]);
    };
    
    public actualizarInventario = async (cantidad:number,idproducto:number) => {
        await pool.query('UPDATE Inventario SET cantidadStock = cantidadStock+? WHERE id_material = ?', [cantidad, idproducto]);
    };
    
   public checkInventario = async (idproducto:number) =>{
        return await pool.query('SELECT * FROM Inventario WHERE id_material = ?', [idproducto]);
    };
    
    public getUsuario = async (pedido:number) => {
        return await pool.query('SELECT id_empleado FROM Pedidos WHERE idPedido = ?', [pedido]);
    };
    
    public registrarProducto = async (idproducto:any) => {
        await pool.query("INSERT INTO Inventario (id_material, cantidadStock) VALUES (?, ?)", [idproducto, 0]);
    };
}


export default ModelPedido;
