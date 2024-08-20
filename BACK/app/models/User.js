// on importe la classe la mère et la liste des types fournis par sequelize
import { Model, DataTypes } from 'sequelize';
// on importe notre client connecté à la base de données
import sequelize from '../database.js';
import bcrypt from 'bcrypt';

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
            allowNull: false, // we configurate constraints that will be placed on the db
            validate: { // we can put validators that will act on the level of setters
                notEmpty: true,
                isEmail: true,
                // myEmailValidator(value) {
                //     if (value === null)
                //         throw new Error('Please enter an email')
                // }
            },
        },
        swappies: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            validate: {
                notEmpty: true,
                min: 0 // doesn't allow values below 0
            },
        },
        swappiesWinned: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
        },
        swappiesSpent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
            // validate: {
            //     isDate: true,
            //     isNumeric: {
            //         msg: "Vous devez entrer une date au format JJ/MM/AAAA"
            //     }
            // },
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
    }, { // In the second object we say in which db the info will be persistant
    sequelize, // client connected to the db

    // hooks and validate ignored by query, handled with js in controller.
    // hooks: {
    //     beforeUpdate: (user, options) => {
    //         console.log('dans le before  update');
    //         if (user.swappies <= 0) {
    //             user.swappies = 0;
    //             throw new Error("User doesn't have enough swappies");
    //         }
    //     },
    // },

    // validate: {
    //     enoughSwappie() {
    //         if ((this.swappies < 0)) {
    //             throw new Error("User doesn't have enough swappies!");
    //         }
    //     },
    // },
    modelName: 'User', //name of the model
    tableName: 'user', // in which table we want sequelize to put the informations of this model
});

// User.beforeUpdate(user => {
//     console.log('dans le before  update');
//     if (user.swappies <= 0) {
//         throw new Error("User doesn't have enough swappies");
//     }
// });

export default User;
