const pool = require('../database');

class ModelMaterial{
    private idMaterial:number = 0;
    private color:number = 0;
    private idTipo:number = 0;
    private materiales:any = [];
    public setIdMaterial(idMaterial:number){
        this.idMaterial = idMaterial;
    }
    public setColor(color:number){
        this.color = color;
    }
    public setIdTipo(idTipo:number){
        this.idTipo = idTipo;
    }
    public getIdMaterial(){
        return this.idMaterial;
    }
    public getcolor(){
        return this.color;
    }
    public getIdTipo(){
        return this.idTipo;
    }
    lista = async () =>{
        this.materiales = await pool.query('SELECT idMaterial, Colores.descripcion, tipoMaterial.descrip, url_img FROM Materiales, Colores, tipoMaterial Where Colores.idColor = Materiales.color and tipoMaterial.idTipo = Materiales.idTipo ORDER BY IdMaterial');
        return this.materiales;
    };
    
    getMaterial = async () => {
        return await pool.query("SELECT * FROM tipoMaterial ORDER BY idTipo");
    };
    
    getColor= async () => {
        return await pool.query("SELECT * FROM Colores ORDER BY idColor");
    };
    
    getColorByDesc = async (desc:string) => {
        return await pool.query("SELECT * FROM Colores Where descripcion = ?",[desc]);
    };
    
    agregar = async (mat:any) => {
        await pool.query('INSERT INTO Materiales set ?', [mat]);
    };
    
    agregarColor = async (asd:any) => {
        await pool.query('INSERT INTO Colores SET descripcion = ?',[asd]);
    };
    
    checkSiExiste = async (mat:number, color:number) => {
        return await pool.query('SELECT idMaterial FROM Materiales Where idTipo = ? and color = ?', [mat, color]);
    };
    
    borrar = async (mat:number) =>{
        await pool.query('DELETE FROM Materiales WHERE idMaterial = ?', [mat]);
    };
    
    getDatos = async (id:number) => {
        return await pool.query("SELECT idMaterial, Materiales.idTipo, color, tipoMaterial.descrip, Colores.descripcion FROM Materiales, Colores, tipoMaterial Where Materiales.idTipo = tipoMaterial.idTipo and Materiales.color = Colores.idColor and idMaterial = ?",[id]);
    };
    
    editar = async (idMaterial:number, color:number, idU:number) => {
        await pool.query("UPDATE Materiales SET idTipo = ?, color = ? Where idMaterial = ? ", [idMaterial, color, idU]);
    };
    getCosturas = async () => {
        return await pool.query("SELECT * From tipoCostura");
    };
    checkCostura = async (texto:string) => {
        return await pool.query("SELECT * From tipoCostura Where texto= ?",[texto]);
    }
    borrarCostura = async (idc:number) => {
        return await pool.query("DELETE FROM tipoCostura WHERE idc = ?",[idc]);
    }
    agregarCostura = async (costu:string) => {
        await pool.query('INSERT INTO tipoCostura SET texto = ?',[costu]);
    };
    private getColoryMaterial = async (id:number) => {
        return await pool.query("Select idTipo,color FROM Materiales Where idMaterial = ?",[id]);
    };
    private getColorById = async (id:number) => {
        return await pool.query("Select color FROM Materiales Where idMaterial = ?",[id]);
    };
    private getMaterialByColor = async (id:number) => {
        return await pool.query("Select idMaterial FROM Materiales Where color = ?",[id]);
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
