const pool = require('../database');

class ModelProveedor{
    private list:any = [];
    private idProveedor:number = 0;
    private nombre:string = '';
    private direccion:string = '';
    private telefono:string = '';
    private ciudad:string = '';
    private sector:string = '';
    public getIdProveedor():number {
        return this.idProveedor;
    }
    public getNombre():string{
        return this.nombre;
    }
    public getDireccion():string{
        return this.direccion;
    }
    public getTelefono():string{
        return this.telefono;
    }
    public getCiudad():string{
        return this.ciudad;
    }
    public getSector():string{
        return this.sector;
    }
    public setIdProveedor(idProveedor:number) {
        this.idProveedor = idProveedor;
    }
    public setNombre(nombre:string){
        this.nombre = nombre;
    }
    public setDireccion(direccion:string){
        this.direccion = direccion;
    }
    public setTelefono(telefono:string){
        this.telefono = telefono;
    }
    public setCiudad(ciudad:string){
        this.ciudad = ciudad;
    }
    public setSector(sector:string){
        this.sector = sector;
    }
    public setProveedor(body:any){
        this.nombre = body.nombre;
        this.direccion = body.direccion;
        this.telefono = body.telefono;
        this.ciudad = body.ciudad;
        this.sector = body.sector;
    }
    public nuevoProveedor(){
        const nuevoProveeedor = {
            nombre:this.nombre,
            direccion:this.direccion,
            telefono:this.telefono,
            ciudad:this.ciudad,
            sector:this.sector
        };
        return nuevoProveeedor;
    }
    public lista = async () =>{
        this.list = await pool.query("SELECT idProveedor, nombre,direccion,telefono,ciudad,sector FROM Proveedores");
        return this.list;
    };
    
    public agregar = async () => {
        await pool.query('INSERT INTO Proveedores set ?', [this.nuevoProveedor()]);
    };
    
    public borrar = async () =>{
        await pool.query('DELETE FROM Proveedores WHERE idProveedor = ?', [this.idProveedor]);
    };
    
    public getUsuario = async () => {
        return await pool.query('SELECT * FROM Proveedores WHERE idProveedor = ?', [this.idProveedor]);
    };
    
    public geditar = async () => {
        return await pool.query("SELECT * FROM Proveedores Where idProveedor = ?",[this.idProveedor]);
    };
    
    public editar = async () => {
        await pool.query("UPDATE Proveedores SET ? WHERE idProveedor = ? ", [this.nuevoProveedor(), this.idProveedor]);
    };

    public checkSiExiste = async () =>{
        const T = await pool.query("SELECT id_proveedor FROM Proveedores,Pedidos Where id_proveedor=idProveedor and idProveedor = ?",[this.idProveedor]);
        if(T.length>0){return true}else{return false;}
    }
}


export default ModelProveedor;
