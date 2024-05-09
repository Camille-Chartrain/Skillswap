import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Category from './Category.js';

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

Sub_category.hasOne(Category);
Category.belongsTo(Sub_category);



export default Sub_category;
