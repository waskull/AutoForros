import ModelPedido from '../models/Pedido';

class Pedido{
    private modelPedido = new ModelPedido();
    public agregar = async (req:any, res:any) => {
        const proveedor = await this.modelPedido.getProveedor();
        const producto = await this.modelPedido.getProducto();
        res.render('pedido/agregar', {proveedor, producto});
    }
    
    public agregarPedido = async (req:any, res:any) => {
        const id_pro = await this.modelPedido.getProveedorById(req.body.proveedor);
        const consulta = await this.modelPedido.checkInventario(req.body.idproducto);
        if (consulta.length == 0){
            await this.modelPedido.registrarProducto(req.body.idproducto);
        }
        const pedido = {
            id_empleado:req.user.idUsuario,
            id_proveedor:id_pro[0].idProveedor,
            idproducto:req.body.idproducto,
            cantidad:req.body.cantidad,
            costo:req.body.costo
        }
        await this.modelPedido.registro(pedido);
        await this.modelPedido.actualizarInventario(req.body.cantidad,req.body.idproducto);
        req.flash('success', 'El pedido ha sido registrado en el inventario');
        res.redirect('/pedido/');
    }
    
    public lista = async (req:any, res:any) => {
        const pedido = await this.modelPedido.lista();
        res.render('pedido/lista', {pedido});
    }
}

module.exports = new Pedido();
