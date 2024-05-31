import User from "./User.js";
import Category from "./Category.js";
import Skill from "./skill.js";
import Interest from "./Interest.js";
import Sub_category from "./Sub_category.js";
import Meeting from "./Meeting.js";

console.log('on est dans les associations=============================================================================================================================================')


//association many to manu category user
User.belongsToMany(Category, { through: Interest, });
Category.belongsToMany(User, { through: Interest, });

//meeting one to one
User.hasOne(Meeting);
Meeting.belongsTo(User);

Skill.hasOne(Meeting);
Meeting.belongsTo(Skill);

// skill
Sub_category.hasOne(Skill);
Skill.belongsTo(Sub_category);

Category.hasOne(Skill);
Skill.belongsTo(Category);

User.hasOne(Skill);
Skill.belongsTo(User);

// subcategory
Category.hasOne(Sub_category);
Sub_category.belongsTo(Category);


export { User, Category, Skill, Sub_category, Meeting, Interest };