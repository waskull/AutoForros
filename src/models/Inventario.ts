const pool = require('../database');

class ModelInventario{
    private inventario:any = [];
    private idMaterial:number = 0;
    private cantidad:number = 0;
    lista = async () => {
        this.inventario = await pool.query("SELECT cod,cantidadStock, Color.descripcion,tipoMaterial.descrip FROM Inventario,Color,tipoMaterial,Material Where Inventario.id_material=Material.idMaterial and Material.idTipo=tipoMaterial.idTipo and Color.idColor=Material.color");
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
