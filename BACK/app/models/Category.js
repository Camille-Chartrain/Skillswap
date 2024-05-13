import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';

class Category extends Model { }

Category.init(
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
        picture: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
    timestamps: false,
    sequelize,
    modelName: 'Category',
    tableName: 'category',
});


export default Category;
