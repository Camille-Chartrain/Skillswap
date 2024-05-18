import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
// import Category from './Category.js';
// import User from './User.js';

class Interest extends Model { }

Interest.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
        },
        CategoryId: {
            type: DataTypes.INTEGER,
        }
    }, {
    timestamps: false,
    sequelize,
    modelName: 'Interest',
    tableName: 'interest',
});

// Interest.create({

//     UserId: 11,
//     CategoryId: 5
// });


export default Interest;
