// on importe la classe la mère et la liste des types fournis par sequelize
import { Model, DataTypes } from 'sequelize';
// on importe notre client connecté à la base de données
import sequelize from '../database.js';
import bcrypt from 'bcrypt';
// import Category from './Category.js';
// import Sub_category from './Sub_category.js';
// import Meeting from './Meeting.js';
// import Skill from './skill.js';
// import Interest from './Interest.js';

// on définit le modèle qui étend la classe mère et hérite donc de ses méthodes
class User extends Model { }

// on execute la méthode qui sert à initialiser les propriétés de notre modèle
// on passe à init 2 objets en argument
User.init(
    {//in the first object we list our proprieties, we associate each one with a configurational object
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,

            unique: true,
            allowNull: false, // we configurate constraints that will be place on the db
            validate: { // we can put validators that will act on the level of setters
                notEmpty: true,
                isEmail: true,
                // myEmailValidator(value) {
                //     if (value === null)
                //         throw new Error('Please enter an email')
                // }
            },
        },
        hash: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [12, 100]
            },
            set(value) {
                const salt = bcrypt.genSaltSync(12);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue("hash", hash);
            }
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isNumeric: {
                    msg: "Vous devez entrer une date au format JJ/MM/AAAA"
                }
            },
        },
        grade_level: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        presentation: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'member',
            validate: {
                notEmpty: true,
            },
        },
        swappies: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            validate: {
                notEmpty: true,
            },
        },
    }, { // In the second object we say in which db the info will be persistant
    sequelize, // lient connected to the db
    modelName: 'User', //name of the model
    tableName: 'user', // in which table we want sequelize to put the informations of this model
});


sequelize.sync({ alter: true }).then(() => {
    console.log("table and model synced successfully!")
    // return User.create({ firstname: "bandida", lastname: "lafolita", email: 'null', hash: 'Mdp' });
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log("Error syncing the table and model!");
    console.log(err);
})



export default User;
