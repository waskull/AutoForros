const pool = require('../database');

class ModelInventario{
    private inventario:any = [];
    public lista = async () => {
        this.inventario = await pool.query("SELECT cod,cantidadStock, Colores.descripcion,Tipos.descrip FROM Inventario,Colores,Tipos,Materiales Where Inventario.id_material=Materiales.idMaterial and Materiales.idTipo=Tipos.idTipo and Colores.idColor=Materiales.color");
        return this.inventario;
    };
    public getMaterialById = async (id:number) => {
        return await pool.query("SELECT cantidadStock as cantidad FROM Inventario WHERE id_material=?",[id]);
    }
    public subtractionMaterial = async (id:number,cantidad:number) =>{
        return await pool.query("UPDATE Inventario SET cantidadStock=cantidadStock-? WHERE id_material=?",[cantidad,id]);
    }
    public checkStock = async (id:number) =>{
        return await pool.query("SELECT cantidadStock as cantidad FROM Inventario WHERE id_material=?",[id]);
    };
}

export default ModelInventario;
