import ModelBordado from '../models/Bordado';

class Bordado{
    private modelBordado = new ModelBordado();
    public getImageURL = async (req:any, res:any) => {
        const bordado = await this.modelBordado.getIMG_URLById(req.params.id);
        res.json(bordado);
    }
}
module.exports = new Bordado();
