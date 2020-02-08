const pool = require('../database');

class ModelMaterial{
    private materiales:any = [];
    public lista = async () =>{
        this.materiales = await pool.query('SELECT idMaterial, Colores.descripcion, tipoMaterial.descrip, url_img FROM Materiales, Colores, tipoMaterial Where Colores.idColor = Materiales.color and tipoMaterial.idTipo = Materiales.idTipo ORDER BY IdMaterial');
        return this.materiales;
    };
    
    public agregar = async (mat:any) => {
        await pool.query('INSERT INTO Materiales set ?', [mat]);
    };
    
    public checkSiExiste = async (mat:number, color:number) => {
        return await pool.query('SELECT idMaterial FROM Materiales Where idTipo = ? and color = ?', [mat, color]);
    };
    
    public borrar = async (mat:number) =>{
        await pool.query('DELETE FROM Materiales WHERE idMaterial = ?', [mat]);
    };
    
    public getDatos = async (id:number) => {
        return await pool.query("SELECT idMaterial, Materiales.idTipo, color, tipoMaterial.descrip, Colores.descripcion FROM Materiales, Colores, tipoMaterial Where Materiales.idTipo = tipoMaterial.idTipo and Materiales.color = Colores.idColor and idMaterial = ?",[id]);
    };
    public getMaterialById = async(id:number) => {
        return await pool.query("SELECT * FROM Materiales Where idMaterial = ?",[id]);
    }
    public editar = async (idMaterial:number, color:number, idU:number) => {
        await pool.query("UPDATE Materiales SET idTipo = ?, color = ? Where idMaterial = ? ", [idMaterial, color, idU]);
    };
    private getColoryMaterial = async (id:number) => {
        return await pool.query("Select idTipo,color FROM Materiales Where idMaterial = ?",[id]);
    };
    public get_img_material = async (material:number,color:number) => {
        return await pool.query("SELECT url_img FROM Materiales Where idTipo=? and color = ?", [material,color]);
    };
    public checkllaveFMaterial = async (idc:number) => {
        const material = await this.getColoryMaterial(idc);
        if(material.length>0){
            return await pool.query("Select Solicitudes.idSolicitud FROM Solicitudes Where Solicitudes.id_material=? and Solicitudes.id_color=?",[material[0].idTipo,material[0].color]);
        }
        else{return [];}
    }
    public checkllaveFCostura = async (idc:number) =>{
        return await pool.query("SELECT Solicitudes.costura From Solicitudes,tipoCostura Where tipoCostura.idc=Solicitudes.costura and Solicitudes.costura=?",[idc]);
    }
    public getColorByMaterial = async (idMaterial:number) =>{
        return await pool.query("SELECT Materiales.color,Colores.descripcion FROM Colores,Materiales,tipoMaterial Where Materiales.idTipo=? and Materiales.idTipo=tipoMaterial.idTipo and Materiales.color=Colores.idColor",[idMaterial]);
    }
    public getIdMaterialByTipoAndColor = async (material:number,color:number) =>{
        return await pool.query("SELECT idMaterial FROM Materiales Where idTipo=? and color=?",[material,color]);
    }
}

export default ModelMaterial;
