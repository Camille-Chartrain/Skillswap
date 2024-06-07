import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';

class Meeting extends Model { }

Meeting.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
                notEmpty: true,
            },
        },
        status: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
    sequelize,
    modelName: 'Meeting',
    tableName: 'meeting',
});

export default Meeting;
