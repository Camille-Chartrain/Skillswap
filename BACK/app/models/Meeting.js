import { Model, DataTypes } from 'sequelize';
import sequelize from '../database.js';
// import User from './User.js';
// import Skill from './skill.js';


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
    }, {
    sequelize,
    modelName: 'Meeting',
    tableName: 'meeting',
});

//description of the relation, parent table first, child table next
// User.hasOne(Meeting);
// Meeting.belongsTo(User);

// Skill.hasOne(Meeting);
// Meeting.belongsTo(Skill);



export default Meeting;
