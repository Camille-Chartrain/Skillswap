import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config();


//connection to the db with client sequelize, with our identifiers written in the .env
console.log("Dans le fichier DATABASE.js, essai de sequelize");
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    port: process.env.PGPORT,
});
console.log("on est apres const sequelize");


//test of the connection to the db 
try {
    console.log("on essaie authenticate");
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// export of what represents our client connected to our database
export default sequelize;