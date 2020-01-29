import ModelPedido from '../models/Pedido';

class Pedido{
    private modelPedido = new ModelPedido();
    public agregar = async (req:any, res:any) => {
        const proveedor = await this.modelPedido.getProveedor();
        const producto = await this.modelPedido.getProducto();
        res.render('pedido/agregar', {proveedor, producto});
    }
    
    public agregarPedido = async (req:any, res:any) => {
        this.modelPedido.setIdEmpleado(req.user.idUsuario);
        this.modelPedido.setIdProducto(req.body.idproducto);
        this.modelPedido.setCantidad(req.body.cantidad);
        this.modelPedido.setCosto(req.body.costo);
        const id_pro = await this.modelPedido.getProveedorById(req.body.proveedor);
        this.modelPedido.setIdProveedor(id_pro[0].idProveedor);
        const consulta = await this.modelPedido.checkInventario(this.modelPedido.getIdProduct());
        if (consulta.length == 0){
            await this.modelPedido.registrarProducto();
            
        }
        await this.modelPedido.registro();
        await this.modelPedido.actualizarInventario();
        req.flash('success', 'El pedido ha sido registrado en el inventario');
        res.redirect('/pedido/');
    }
    
    public lista = async (req:any, res:any) => {
        const pedido = await this.modelPedido.lista();
        res.render('pedido/lista', {pedido});
    }
}

module.exports = new Pedido();
