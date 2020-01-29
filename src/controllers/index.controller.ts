import {Request, Response } from 'express';
export default class Index{
    public Bienvenido(req:Request, res:Response) {
        res.render('index');
    }
}