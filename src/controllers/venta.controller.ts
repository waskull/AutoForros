import ModelVenta from '../models/Venta';

export default new class Venta{
    private modelventa = new ModelVenta();
    public lista = async (req:any, res:any) => {
        const ventas = await this.modelventa.listaP();
        res.render('venta/lista',{ventas});
    }
    public ventasSemanal = async (req:any, res:any) => {
        const ventas = await this.modelventa.getNumVentas();
        res.json(ventas[0].semanal);
    }
    public ventasIntervalo = async (req:any, res:any) => {
        const ventas = await this.modelventa.ventasEntre(parseInt(req.params.id));
        res.json(ventas[0].numVentas);
    }
}