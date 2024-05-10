import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Category from './Category.js';
import User from './User.js';

class Interest extends Model { }

Interest.init(
    {
    }, {
    timestamps: false,
    sequelize,
    modelName: 'Interest',
    tableName: 'interest',
});

// Interest.hasMany(User);
// User.belongsTo(Interest);

// Interest.hasMany(Category);
// Category.belongsTo(Interest);

export default Interest;
