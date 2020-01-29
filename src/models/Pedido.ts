const pool = require('../database');

class ModelPedido{
    private idPedido:number = 0;
    private id_empleado:number = 0;
    private id_proveedor:number = 0;
    private idproducto:number = 0;
    private cantidad:number = 0;
    private costo:number = 0;
    private pedidos:any = [];
    public setIdPedido(idPedido:number):void{
        this.idPedido = idPedido;
    }
    public setIdEmpleado(id_empleado:number):void{
        this.id_empleado = id_empleado;
    }
    public setIdProveedor(id_proveedor:number):void{
        this.id_proveedor = id_proveedor;
    }
    public setIdProducto(idproducto:number):void{
        this.idproducto = idproducto;
    }
    public setCantidad(cantidad:number):void{
        this.cantidad = cantidad;
    }
    public setCosto(costo:number):void{
        this.costo = costo;
    }
    public getIdPedido():number{
        return this.idPedido;
    }
    public getIdEmpleado():number{
        return this.id_empleado;
    }
    public getIdProveedor():number{
        return this.id_proveedor;
    }
    public getIdProduct():number{
        return this.idproducto;
    }
    public getCantidad():number{
        return this.cantidad;
    }
    public getCosto():number{
        return this.costo;
    }
    public getPedido():any{
        const nuevoProducto = {
            id_empleado:this.id_empleado,
            id_proveedor:this.id_proveedor,
            idproducto:this.idproducto,
            cantidad:this.cantidad,
            costo:this.costo
        }
        return nuevoProducto;
    }
    public lista = async () =>{
        this.pedidos = await pool.query('SELECT idPedido, Usuario.nombre, Proveedores.nombre as proveedor, Usuario.apellido, Colores.descripcion, tipoMaterial.descrip, cantidad, costo, fecha FROM Pedidos,Usuario,Proveedores,Materiales,Colores, tipoMaterial  Where id_empleado = idUsuario and id_proveedor = idProveedor and idproducto = idMaterial and Colores.idColor = Materiales.color and tipoMaterial.idTipo = Materiales.idTipo');
        return this.pedidos;
    };
    
    public getProveedor = async () =>{
        return await pool.query('SELECT nombre FROM Proveedores');
    };
    
    public getProducto= async () =>{
        return await pool.query('SELECT idMaterial, descrip, descripcion FROM Materiales,Colores,tipoMaterial Where Colores.idColor = Materiales.color and tipoMaterial.idTipo = Materiales.idTipo');
    };
    
    public getProveedorById = async (nombre:string) =>{
        return await pool.query('SELECT idProveedor FROM Proveedores Where nombre = ?', [nombre]);
    };
    
    public getProductoById = async (id:any) =>{
        return await pool.query('SELECT idMaterial FROM Materiales,tipoMaterial Where descrip = ? and Materiales.idTipo = tipoMaterial.idTipo', [id]);
    };
    
    public registro = async () => {
        await pool.query('INSERT INTO Pedidos set ?', [this.getPedido()]);
    };
    
    public actualizarInventario = async () => {
        await pool.query('UPDATE Inventario SET cantidadStock = cantidadStock+? WHERE id_material = ?', [this.cantidad, this.idproducto]);
    };
    
   public checkInventario = async (idproducto:number) =>{
        return await pool.query('SELECT * FROM Inventario WHERE id_material = ?', [idproducto]);
    };
    
    public getUsuario = async (pedido:number) => {
        return await pool.query('SELECT id_empleado FROM Pedidos WHERE idPedido = ?', [pedido]);
    };
    
    public registrarProducto = async () => {
        await pool.query("INSERT INTO Inventario (id_material, cantidadStock) VALUES (?, ?)", [this.idproducto, 0]);
    };
}


export default ModelPedido;
