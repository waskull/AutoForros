const pool = require('../database');

export default class ModelAutomovil{
    private automoviles:any = [];
    public getVehiculos = async() => {
        this.automoviles = await pool.query("SELECT * FROM Automoviles");
        return this.automoviles;
    }

    public getVehiculosById = async(idUsuario:number) => {
        this.automoviles = await pool.query("SELECT * FROM Automoviles Where idCliente = ?", [idUsuario]);
        return this.automoviles;
    }
    public getAutosByUsuario = async (id:number) =>{
        this.automoviles = await pool.query("SELECT idAutomovil, placa, marca, modelo FROM Usuarios, Automoviles Where idUsuario = ? and idCliente = idUsuario",[id]);
        return this.automoviles;
    };
    public getUserByVehiculos = async (id:number) => {
        return await pool.query("SELECT idUsuario FROM Usuarios, Automoviles Where idAutomovil = ? and idCliente = idUsuario",[id]);
    }
    public checkPlaca = async (placa:string) => {
        return await pool.query("SELECT placa,idAutomovil FROM Automoviles Where placa = ?",[placa]);
    }
    
    public agregar = async (nuevoAutomovil:any) =>{
        await pool.query('INSERT INTO Automoviles set ?', [nuevoAutomovil]);
    };
    
    public listaCliente = async (parametro:number) =>{
        this.automoviles = await pool.query("SELECT idAutomovil, placa, marca, modelo, year FROM Automoviles Where idCliente = ?", [parametro]);
        return this.automoviles;
    };
    
    public listaGerencia = async () =>{
        this.automoviles = await pool.query("SELECT idAutomovil, nombre, apellido, placa, marca, modelo, year FROM Automoviles, Usuarios Where idCliente = idUsuario ORDER BY fecha");
        return this.automoviles;
    };
    
    public eliminar = async (id:number) =>{
        await pool.query("DELETE FROM Automoviles Where idAutomovil = ?", [id]);
    };
    public usuario = async () =>{
        return await pool.query("SELECT idUsuario, nombre,apellido FROM Usuarios");
    };
    public geditar = async (id:number) =>{
        return await pool.query("SELECT * FROM Automoviles Where idAutomovil = ?", [id]);
    };
    
    public editar = async (nuevoVehiculo:any,id:number) =>{
        await pool.query("UPDATE Automoviles SET placa = ?, marca = ?, modelo = ?, year = ? Where idAutomovil = ?", [nuevoVehiculo.placa,nuevoVehiculo.marca,nuevoVehiculo.modelo,nuevoVehiculo.year, id]);
    };
    public checkForeignKey = async (id:number) =>{
        return await pool.query("SELECT idSolicitud FROM Automoviles,Solicitudes Where Automoviles.idAutomovil = ? and Solicitudes.idVehiculo = Automoviles.idAutomovil", [id]);
    };
}
