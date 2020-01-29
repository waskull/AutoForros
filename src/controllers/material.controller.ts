import ModelMaterial from '../models/Material';

class Material{
    private modelMaterial = new ModelMaterial();
    public agregar = async (req:any, res:any) => {
        const material = await this.modelMaterial.getMaterial();
        const color = await this.modelMaterial.getColor();
        res.render('material/agregar',{material, color});
    }
    public listaCostura = async (req:any, res:any) => {
        const tipoCostura = await this.modelMaterial.getCosturas();
        res.render('material/listaCostura',{tipoCostura});
    }

    public agregarCostura = async (req:any, res:any) => {
        res.render('material/agregarCostura');
    }

    public registrarCostura = async (req:any, res:any) => {
        const {texto} = req.body;
        const check = await this.modelMaterial.checkCostura(texto);
        if(check.length>0){
            req.flash('message', 'La descripcion del color de la Costura ya Existe');
            res.render('material/agregarCostura');
        }
        else{
            this.modelMaterial.agregarCostura(texto);
            res.redirect('/material/costura/');
        }
    }

    public borrarCostura = async (req:any, res:any) => {
        const consulta = await this.modelMaterial.checkllaveFCostura(req.params.id);
        if(consulta.length>0){
            req.flash('message', 'Ya no puedes Borrar Esta Costura');
            res.redirect('/material/costura/');
        }else{
            this.modelMaterial.borrarCostura(req.params.id);
            req.flash('success', 'Color de Costura Eliminada');
            res.redirect('/material/costura/');
        }
        
    }
    
    public agregarColor = async (req:any, res:any) => {
        res.render('material/agregarColor');
    }
    
    public registrarColor = async (req:any, res:any) => {
        const { color } = req.body;
        const colores = await this.modelMaterial.getColorByDesc(color);
        if(colores.length >= 1){
            req.flash('message', 'El Color Ya Existe');
            res.redirect('/material/agregarColor');
        }
        else{
            await this.modelMaterial.agregarColor(color);
            req.flash('success', 'El Color Fue Agregado');
            res.redirect('/material/');
        }
    
    
    }
    
    public agregarMaterial = async (req:any, res:any) => {
        const { idTipo, color } = req.body;
        var url_img;
        if(req.file){
            url_img = req.file.filename;
        }
        else {
            url_img = "bordado.png";
        }
        const material = {
            idTipo,
            color,
            url_img
        };
        const existeMaterial = await this.modelMaterial.checkSiExiste(idTipo, color);
        if(existeMaterial.length > 0){
            req.flash('message', 'El Material Ya Existe');
            res.redirect('/material/');
        }
        else{
            await this.modelMaterial.agregar(material);
            req.flash('success', 'El Material ha sido Agregado');
            res.redirect('/material/');
        }
    }
    
    public lista = async (req:any, res:any) => {
        const material = await this.modelMaterial.lista();
        res.render('material/lista', {material});
    }
    
    public geditar = async (req:any, res:any) => {
        const { id } = req.params;
        const material = await this.modelMaterial.getDatos(id);
        const tipo = await this.modelMaterial.getMaterial();
        const color = await this.modelMaterial.getColor();
        res.render('material/editar', {material:material[0],color,tipo});
    }
    
    public editar = async (req:any, res:any) => {
        const { id } =  req.params;
        const { descripcion, color } = (req.body);
        await this.modelMaterial.editar(descripcion,color, id);
        req.flash('success', 'La descripcion del Material ha sido Editada');
        res.redirect('/material/');
    }
    
    public borrar = async (req:any, res:any) => {
        const { id } = req.params;
        const resp = await this.modelMaterial.checkllaveFMaterial(id);
        if(resp.length > 0){
            req.flash('success', 'Ya no puedes borrar ese material');
            res.redirect('/material/');
        }
        else{
            await this.modelMaterial.borrar(id);
            req.flash('success', 'Material Eliminado');
            res.redirect('/material/');
        }
        
    }
    public getMaterialURL = async (req:any, res:any) => {
        const material = req.body;
        const url = await this.modelMaterial.get_img_material(material[0],material[1]);
        res.json(url);
    }

    public getColorByMaterial = async (req:any, res:any) => {
        const colores = await this.modelMaterial.getColorByMaterial(req.params.id);
        res.json(colores);
    }
}

module.exports = new Material();
