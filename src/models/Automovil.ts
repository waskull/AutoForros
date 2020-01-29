const pool = require('../database');

export default class ModelAutomovil{
    private idAutomovil?:number = 0;
    private idCliente:number = 0;
    private placa:string = '';
    private marca:string = '';
    private modelo:string = '';
    private year:string = '';
    public setClienteId(idCliente:number){
        this.idCliente = idCliente;
    }
    public getClienteId(){
       return this.idCliente;
    }
    public setAutomovilId(idAutomovil:number){
        this.idAutomovil = idAutomovil;
    }
    public setAutomovil(body:any){
        this.placa = body.placa;
        this.marca = body.marca;
        this.modelo = body.modelo;
        this.year = body.year;
    }
    public setAutomovilCliente(body:any){
        this.idCliente = body.idCliente;
        this.placa = body.placa;
        this.marca = body.marca;
        this.modelo = body.modelo;
        this.year = body.year;
    }
    public getAutomovil(){
        const nuevoAutomovil = {
            idCliente:this.idCliente,
            placa:this.placa,
            marca:this.marca,
            modelo:this.modelo,
            year:this.year
        };
        return nuevoAutomovil;
    }
    public getAutomoviId(){
        return this.idAutomovil;
    }
    public usuario = async () =>{
        return await pool.query("SELECT idUsuario, nombre,apellido FROM Usuarios");
    };
    
    public getAutosByUsuario = async (id:number) =>{
        return await pool.query("SELECT idAutomovil, placa, marca, modelo FROM Usuarios, Automoviles Where idUsuario = ? and idCliente = idUsuario",[id]);
    };
    public getUserByVehiculos = async () => {
        return await pool.query("SELECT idUsuario FROM Usuarios, Automoviles Where idAutomovil = ? and idCliente = idUsuario",[this.idAutomovil]);
    }
    public checkPlaca = async () => {
        return await pool.query("SELECT placa,idAutomovil FROM Automoviles Where placa = ?",[this.placa]);
    }
    
    public agregar = async () =>{
        await pool.query('INSERT INTO Automoviles set ?', [this.getAutomovil()]);
    };
    
    public listaCliente = async (parametro:number) =>{
        return await pool.query("SELECT idAutomovil, placa, marca, modelo, year FROM Automoviles Where idCliente = ?", [parametro]);
    };
    
    public listaGerencia = async () =>{
        return await pool.query("SELECT idAutomovil, nombre, apellido, placa, marca, modelo, year FROM Automoviles, Usuarios Where idCliente = idUsuario ORDER BY fecha");
    };
    
    public eliminar = async () =>{
        await pool.query("DELETE FROM Automoviles Where idAutomovil = ?", [this.idAutomovil]);
    };
    public geditar = async () =>{
        return await pool.query("SELECT * FROM Automoviles Where idAutomovil = ?", [this.idAutomovil]);
    };
    
    public editar = async () =>{
        await pool.query("UPDATE Automoviles SET placa = ?, marca = ?, modelo = ?, year = ? Where idAutomovil = ?", [this.placa,this.marca,this.modelo,this.year, this.idAutomovil]);
    };
    public checkForeignKey = async () =>{
        return await pool.query("SELECT idSolicitud FROM Automoviles,Solicitudes Where Automoviles.idAutomovil = ? and Solicitudes.idVehiculo = Automoviles.idAutomovil", [this.idAutomovil]);
    };
}
