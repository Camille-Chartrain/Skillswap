import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
// import SubCategory from './SubCategory.js';
// import Category from './Category.js';
// import User from './User.js';
// import { User, Category, Skill, SubCategory } from "../models/index.js";

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
        sumOfMarks: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        numberOfRating: {
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
    hooks: {
        afterCreate: async (skill, options) => {
            if (skill.mark !== null) {
                await Skill.updateRating(skill.id, skill.mark);
            }
        },
        afterUpdate: async (skill, options) => {
            if (skill.mark !== null) {
                await Skill.updateRating(skill.id, skill.mark);
            }
        },
    },
});


export default Skill;