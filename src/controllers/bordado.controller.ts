import ModelBordado from '../models/Bordado';

class Bordado{
    private modelBordado = new ModelBordado();
    public getImageURL = async (req:any, res:any) => {
        this.modelBordado.setIdBordado(req.params.id);
        const bordado = await this.modelBordado.getIMG_URLById();
        res.json(bordado);
    }
}
module.exports = new Bordado();
