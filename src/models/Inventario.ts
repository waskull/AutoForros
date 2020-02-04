const pool = require('../database');

class ModelInventario{
    private inventario:any = [];
    private idMaterial:number = 0;
    private cantidad:number = 0;
    public lista = async () => {
        this.inventario = await pool.query("SELECT cod,cantidadStock, Colores.descripcion,tipoMaterial.descrip FROM Inventario,Colores,tipoMaterial,Materiales Where Inventario.id_material=Materiales.idMaterial and Materiales.idTipo=tipoMaterial.idTipo and Colores.idColor=Materiales.color");
        return this.inventario;
    };
    public getMaterialById = async (id:number) => {
        return await pool.query("SELECT COUNT(*) as cantidad FROM Inventario WHERE id_material=?",[id]);
    }
    public subtractionMaterial = async (id:number,cantidad:number) =>{
        return await pool.query("UPDATE Inventario SET cantidadStock=cantidadStock-? WHERE id_material=?",[cantidad,id]);
    }
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
