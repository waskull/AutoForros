import express, {Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import exphbs from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
const MySQLStore = require('express-mysql-session')(session);
import multer from 'multer';
import uuid from 'uuid';
const { database } = require('./conf');
const pass = require('./lib/passport');
import timeago from './lib/handlebars';
import index from './routes/index';
import authentication from './routes/authentication';
import usuario from './routes/usuario';
import bordado from './routes/bordado';
import costura from './routes/costura';
import inventario from './routes/inventario';
import material from './routes/material';
import pedido from './routes/pedido';
import proveedor from './routes/proveedor';
import produccion from './routes/produccion';
import solicitud from './routes/solicitud';
import vehiculos from './routes/vehiculos';
import venta from './routes/venta';

export class App{
    private app: Application;
    constructor(){
        this.app = express();
        this.configurar();
        this.middleware();
        this.globalVariables();
        this.routes();
        this.errores();
    }
    private configurar(){
        let port = process.env.PORT || 8080;
        this.app.set('port',port);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs',
            helpers: timeago
          }));
        this.app.set('view engine', '.hbs');
    }
    private middleware(){
        this.app.use(morgan('dev'));
        this.app.use(session({
            secret: 'udomonagasautoForro',
            resave: false,
            saveUninitialized: false,
            store: new MySQLStore(database)
            }));
        this.app.use(flash());
        this.app.use(express.urlencoded({extended : false}));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        const imgStorage = multer.diskStorage({
            destination: path.join(__dirname, 'public/img') ,
            filename: (req,file,cb) => {
              cb(null, uuid() + path.extname(file.originalname).toLowerCase());
            }
        });
        this.app.use(multer({
            storage : imgStorage,
            dest: path.join(__dirname, 'public/img'),
            limits : {fileSize: 10000000},
            fileFilter:(req,file,cb)=>{
                const tipos = /jpeg|png|gif||jpg/;
                const mimetype = tipos.test(file.mimetype);
                const extname = tipos.test(path.extname(file.originalname));
                if(mimetype && extname){
                    return cb(null, true);
                }
                else{
                    return console.log("Error: Archivo debe ser una imagen valida");
                }
            }
        }).single('image'));
    }
    private globalVariables(){
        this.app.use((req, res, next) => {
        this.app.locals.message = req.flash('message');
        this.app.locals.success = req.flash('success');
        this.app.locals.user = req.user;
        next();
        });
    }
    private routes(){
        this.app.use(index);
        this.app.use(authentication);
        this.app.use('/usuarios',usuario);
        this.app.use('/bordado',bordado);
        this.app.use('/inventario',inventario);
        this.app.use('/material',material);
        this.app.use('/pedido',pedido);
        this.app.use('/costura',costura);
        this.app.use('/proveedor',proveedor);
        this.app.use('/produccion',produccion);
        this.app.use('/solicitud',solicitud);
        this.app.use('/vehiculos',vehiculos);
        this.app.use('/venta',venta);
        this.app.use('/static', express.static(__dirname + '/public'));
    }
    private errores(){
        this.app.use(function(req:any, res:any, next:any) {
            if(res.status(404)){
                res.render('404');
            }
            else{
                res.send({message: 'Un Error Ha Ocurrido, Contacta al Administrador'});
            }
        });
    }
    public async listen():Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Corriendo en el puerto '+this.app.get('port')); 
    }
}