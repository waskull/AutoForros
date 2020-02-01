const pool = require('../database');

class ModelInventario{
    private inventario:any = [];
    private idMaterial:number = 0;
    private cantidad:number = 0;
    lista = async () => {
        this.inventario = await pool.query("SELECT cod,cantidadStock, Colores.descripcion,tipoMaterial.descrip FROM Inventario,Colores,tipoMaterial,Materiales Where Inventario.id_material=Materiales.idMaterial and Materiales.idTipo=tipoMaterial.idTipo and Colores.idColor=Materiales.color");
        return this.inventario;
    };
    public setIdMaterial(idMaterial:number){
        this.idMaterial = idMaterial;
    }
    public getIdMaterial(){
        return this.idMaterial;
    }
    public setCantidad(cantidad:number){
        this.cantidad = cantidad;
    }
    public getCantidad(){
        return this.cantidad;
    }
}

export default ModelInventario;
