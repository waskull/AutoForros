import dotenv from 'dotenv';
dotenv.config();
module.exports = {
        database: {
                host: process.env.DBHOST,
                user: process.env.DBUSER,
                password: process.env.DBPASSWORD,
                database: process.env.DBNAME,
                port: 3306,
                connectTimeout: 15000,
        }
};
