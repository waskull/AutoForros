import ModelProveedor from '../models/Proveedor';

class Proveedor{
    private modelProveedor = new ModelProveedor();
    public lista = async(req:any,res:any) => {
        const proveedor = await this.modelProveedor.lista();
        res.render('proveedor/lista', {proveedor:proveedor});
    }
    
    public agregar = async(req:any,res:any) => {
        res.render('proveedor/agregar');
    }
    
    public registrar = async(req:any,res:any) => {
        await this.modelProveedor.agregar(req.body);
        req.flash('success', 'El Proveedor ha sido Agregado');
        res.redirect('/proveedor/');
    }
    
    public borrar = async(req:any,res:any) => {
        const result = await this.modelProveedor.checkSiExiste(req.params.id);
        if(result){
            req.flash('message', 'Ya no puedes borrar este proveedor, ya que tiene registros asignados en otra tabla');
            res.redirect('/proveedor/');
        }
        await this.modelProveedor.borrar(req.params.id);
        req.flash('success', 'Proveedor Eliminado');
        res.redirect('/proveedor/');
    }
    
    public geditar = async(req:any,res:any) => {
        const proveedor = await this.modelProveedor.geditar(req.params.id);
        res.render('proveedor/editar', {proveedor:proveedor[0]});
    }
    
    public editar = async(req:any,res:any) => {
        await this.modelProveedor.editar(req.body,req.params.id);
        req.flash('success', 'El Proveedor ha sido Editado');
        res.redirect('/proveedor/');
    }
}

module.exports = new Proveedor();
