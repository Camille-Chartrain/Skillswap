import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Sub_category from './Sub_category.js';
import Category from './Category.js';
import User from './User.js';

class Skill extends Model { }

Skill.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        duration: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        mark: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        level: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        transmission: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        availability: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        SubCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'skill',
});

Sub_category.hasOne(Skill);
Skill.belongsTo(Sub_category);

Category.hasOne(Skill);
Skill.belongsTo(Category);

User.hasOne(Skill);
Skill.belongsTo(User);

// await Skill.bulkCreate([
//     { title: "self-defense", level: "intermediaire", transmission: 'presentiel', description: 'apprenez à vous sortir des pires situations', availability: 'soir et we', CategoryId: 5, SubCategoryId: 29, UserId: 5 },

//     { title: "Histoires des Guerres", level: "avancé", transmission: 'visio', description: 'Découvrez comment les victoires ont été obtenues', availability: 'soir et we', CategoryId: 6, SubCategoryId: 33, UserId: 1 },

//     { title: "Bouture de basilic", level: "débutant", transmission: 'presentiel et visio', description: "Apprenez à faire vos propres boutures de basilic pour avoir des tonnes de basilic tout l'été", availability: 'dimanche matin', CategoryId: 2, SubCategoryId: 11, UserId: 8 },

//     { title: "Communication non violente", level: "débutant", transmission: 'presentiel', description: 'Apprenez à communiquer dans la bienveillance, dites ce que vous avez sur le coeur sans froisser votre entourage !', availability: 'jeudi soir', CategoryId: 1, SubCategoryId: 4, UserId: 3 },

//     { title: "Couture robe mariée", level: "avancé", transmission: 'presentiel', description: 'Créez vous-même la robe de vos rêves pour le plus beau jour de votre vie sans accro!', availability: 'lundi et mercredi après-midi', CategoryId: 3, SubCategoryId: 14, UserId: 2 },

//     { title: "Décriptez les waltDisneys", level: "débutant", transmission: 'visio', description: 'Basé sur le livre la psychologie des contes de fées, découvrez le vrai sens de nos chers dessins animés.', availability: 'soir et we', CategoryId: 1, SubCategoryId: 6, UserId: 4 },

//     { title: "Histoire de la feignantise", level: "débutant", transmission: 'visio', description: "D'où vient le concept de paresse? Une histoire du concept qui vous donnera un autre regard sur ce que nous appelons 'les personnes fénéantes'...", availability: 'soirées', CategoryId: 6, SubCategoryId: 33, UserId: 6 },

//     { title: "Le consentement", level: "débutant", transmission: 'presentiel', description: "Le consentement, c'est quoi? Apprenez à connaître vos limites et les communiquer, apprenez à entendre celles des autres", availability: 'tout le temps', CategoryId: 5, SubCategoryId: 4, UserId: 7 }
// ]);


export default Skill;