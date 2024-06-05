import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
// import { Category, SubCategory } from "../models/index.js";

class SubCategory extends Model { }

SubCategory.init(
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
    modelName: 'SubCategory',
    tableName: 'SubCategory',
});

// Category.hasOne(SubCategory);
// SubCategory.belongsTo(Category);



export default SubCategory;
