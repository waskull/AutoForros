import {genSalt, hash, compare} from 'bcryptjs';

export const isUsuario = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Usuario'){
        return true;
    }
    else {return false;}
};

export const isAdmin = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Gerente' || req.Descripcion.toString().trim() == 'Administrador'){
        return true;
    }
    else {return false;}
};

export const isAdminer = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Administrador'){
        return true;
    }
    else {return false;}
};

export const isGerente = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Gerente'){
        return true;
    }
    else {return false;}
};

export const isVendedor = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Vendedor'){
        return true;
    }
    else {return false;}
};

export const isEmsamblador = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Emsamblador'){
        return true;
    }
    else {return false;}
};

export const isCosturero = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Costurero'){
        return true;
    }
    else {return false;}
};

export const isBordador = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Bordador'){
        return true;
    }
    else {return false;}
};

export const isDesigner = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Diseñador'){
        return true;
    }
    else {return false;}
};

export const isCortador = (req:any) => {
    if(req.Descripcion.toString().trim() == 'Cortador'){
        return true;
    }
    else {return false;}
};

export const encriptarClave = async (clave:string) => {
    const salt = await genSalt(10);
    const Hash = await hash(clave, salt);
    return Hash;
};

export const comprobarClave = async (clave:string, claveBD:string) => {
    try{
        return await compare(clave, claveBD);
    }catch(err){
        console.log(err);
    };
};