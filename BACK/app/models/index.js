import User from "./User.js";
import Category from "./Category.js";
import Skill from "./skill.js";
import Interest from "./Interest.js";
import SubCategory from "./SubCategory.js";
import Meeting from "./Meeting.js";


//association many to many category user
User.belongsToMany(Category, { through: Interest, });
Category.belongsToMany(User, { through: Interest, });

//meeting one to one
// User.hasOne(Meeting);
User.hasMany(Meeting);
Meeting.belongsTo(User, { as: 'Students' });

Skill.hasMany(Meeting);
Meeting.belongsTo(Skill);

// skill
SubCategory.hasMany(Skill);
Skill.belongsTo(SubCategory);

Category.hasMany(Skill);
Skill.belongsTo(Category);

// User.hasOne(Skill);
User.hasMany(Skill);
Skill.belongsTo(User);

// subcategory
Category.hasMany(SubCategory);
SubCategory.belongsTo(Category);



export { User, Category, Skill, SubCategory, Meeting, Interest };