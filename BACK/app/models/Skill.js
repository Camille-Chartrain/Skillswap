import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Sub_category from './Sub_category.js';
import Category from './Category.js';
import User from './User.js';

class Skill extends Model { }

Skill.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        mark: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'skill',
});

Skill.hasOne(Sub_category);
Sub_category.belongsTo(Skill);

Skill.hasOne(Category);
Category.belongsTo(Skill);

Skill.hasOne(User);
User.belongsTo(Skill);

export default Skill;