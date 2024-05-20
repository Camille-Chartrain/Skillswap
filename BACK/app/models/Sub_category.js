import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
// import { Category, Sub_category } from "../models/index.js";

class Sub_category extends Model { }

Sub_category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
    timestamps: false,
    sequelize,
    modelName: 'Sub_category',
    tableName: 'sub_category',
});

// Category.hasOne(Sub_category);
// Sub_category.belongsTo(Category);



export default Sub_category;
