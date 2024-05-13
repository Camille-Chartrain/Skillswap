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
    }, {
    timestamps: false,
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

// Skill.create({ title: "baston", level: "super fort", transmission: 'presentiel', description: 'apprenez à casser des nez', availability: 'soir et we' });

export default Skill;