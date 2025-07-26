import dotenv from 'dotenv';
dotenv.config();
module.exports = {
        /*
       database:{
               host:'localhost',
               user:'udo',
               password:'1234',
               database:'AutoFDB',
               port:3306
       }
       */
        database: {
                host: process.env.HOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DATABASE_NAME,
                port: process.env.PORT,
                connectTimeout: parseInt(process.env.TIMEOUT || "15000"),
        }
};
