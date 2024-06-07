import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';

class Interest extends Model { }

Interest.init(
    {
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

export default Interest;
