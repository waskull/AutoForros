import ModelCostura from '../models/Costura';
import ModelMaterial from '../models/Material';
class Costura{
    private modelCostura = new ModelCostura();
    private modelMaterial = new ModelMaterial();
    public listaCostura = async (req:any, res:any) => {
        const modelCostura = new ModelCostura();
        const costuras = await modelCostura.getCosturas();
        res.render('costura/listaCostura',{costuras});
    }

    public agregarCostura = async (req:any, res:any) => {
        res.render('costura/agregarCostura');
    }

    public registrarCostura = async (req:any, res:any) => {
        const {texto} = req.body;
        const check = await this.modelCostura.checkCostura(texto);
        if(check.length>0){
            req.flash('message', 'La descripcion del color de la Costura ya Existe');
            res.render('costura/agregarCostura');
        }
        else{
            this.modelCostura.agregarCostura(texto);
            res.redirect('/costura/');
        }
    }

    public borrarCostura = async (req:any, res:any) => {
        const consulta = await this.modelMaterial.checkllaveFCostura(req.params.id);
        if(consulta.length>0){
            req.flash('message', 'Ya no puedes Borrar Esta Costura');
            res.redirect('/costura/');
        }else{
            this.modelCostura.borrarCostura(req.params.id);
            req.flash('success', 'Color de Costura Eliminada');
            res.redirect('/costura/');
        }
        
    }
}
module.exports = new Costura();