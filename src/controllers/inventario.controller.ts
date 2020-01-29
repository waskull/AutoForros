import ModelInventario from '../models/Inventario';

class Inventario{
    private modelInventario = new ModelInventario();
    public lista = async (req:Request, res:any) => {
        const inventario = await this.modelInventario.lista();
        res.render('inventario/lista',{inventario});
    } 
}

module.exports = new Inventario();