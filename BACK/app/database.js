import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config();


//connection to the db with client sequelize, with our identifiers written in the .env
const sequelize = new Sequelize(process.env.PG, process.env.PG1, process.env.PG2, {
    host: 'localhost',
    dialect: 'postgres'
});


//test of the connection to the db 
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// export of what represents our client connected to our database
export default sequelize;