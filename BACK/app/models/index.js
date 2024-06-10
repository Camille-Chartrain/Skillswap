import User from "./User.js";
import Category from "./Category.js";
import Skill from "./skill.js";
import Interest from "./Interest.js";
import SubCategory from "./SubCategory.js";
import Meeting from "./Meeting.js";

//description of the relation, parent table first, child table next
//association many to many category user
User.belongsToMany(Category, { through: Interest, });
Category.belongsToMany(User, { through: Interest, });

//meeting one to one
// User.hasOne(Meeting);
User.hasMany(Meeting);
Meeting.belongsTo(User);
// { as: 'Students' }

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
Category.hasMany(SubCategory, { foreignKey: 'category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id' });


// // Lucile
// await User.bulkCreate([
//     { firstname: "Victoire", lastname: "Hourra", email: 'onAUneBddEnSequelize@gmail.com', hash: 'Cochise1234.', presentation: " j'adore gagner" },
//     { firstname: "marie", lastname: "Edenlané", email: 'diamant@gmail.com', hash: 'Cochise1234.', presentation: "toujours de bonne humeur" },
//     { firstname: "José", lastname: "Paledire", email: 'chut@gmail.com', hash: 'Cochise1234.', presentation: "discret mais solide" },
//     { firstname: "Gus", lastname: "GusLucifer", email: 'estmechant@gmail.com', hash: 'Cochise1234.', presentation: "j'adore les petits zétoné" },
//     { firstname: "Patrick", lastname: "Apéro", email: 'leurequelquepart@gmail.com', hash: 'Cochise1234.', presentation: "toujours prêt pour accueillir des nouveaux copains" },
//     { firstname: "Jeanne", lastname: "aipazenvi", email: 'detravailler@gmail.com', hash: 'Cochise1234.', presentation: "Dans la lune que je trouve mes meilleurs idées" },
//     { firstname: "Elodie", lastname: "toujournon", email: 'pasfun@gmail.com', hash: 'Cochise1234.', presentation: "Vous pouvez me contacter je vous répondrai si je suis disponible" },
//     { firstname: "Olivier", lastname: "Vert", email: 'belarbuste@gmail.com', hash: 'Cochise1234.', presentation: "Mains toutes vertes et vie en rose" },
// ]);

// // Camille
// await User.bulkCreate([
//     { firstname: "Victoire", lastname: "Hourra", email: 'onAUneBddEnSequelize@gmail.com', hash: 'Azertyuiop12!.', presentation: " j'adore gagner" },
//     { firstname: "marie", lastname: "Edenlané", email: 'diamant@gmail.com', hash: 'Azertyuiop12!', presentation: "toujours de bonne humeur" },
//     { firstname: "José", lastname: "Paledire", email: 'chut@gmail.com', hash: 'Azertyuiop12!', presentation: "discret mais solide" },
//     { firstname: "Gus", lastname: "GusLucifer", email: 'estmechant@gmail.com', hash: 'Azertyuiop12!', presentation: "j'adore les petits zétoné" },
//     { firstname: "Patrick", lastname: "Apéro", email: 'leurequelquepart@gmail.com', hash: 'Azertyuiop12!', presentation: "toujours prêt pour accueillir des nouveaux copains" },
//     { firstname: "Jeanne", lastname: "aipazenvi", email: 'detravailler@gmail.com', hash: 'Azertyuiop12!', presentation: "Dans la lune que je trouve mes meilleurs idées" },
//     { firstname: "Elodie", lastname: "toujournon", email: 'pasfun@gmail.com', hash: 'Azertyuiop12!', presentation: "Vous pouvez me contacter je vous répondrai si je suis disponible" },
//     { firstname: "Olivier", lastname: "Vert", email: 'belarbuste@gmail.com', hash: 'Azertyuiop12!', presentation: "Mains toutes vertes et vie en rose" },
// ]);


// await Skill.bulkCreate([
//     { title: "self-defense", level: "intermediaire", transmission: 'presentiel', description: 'apprenez à vous sortir des pires situations', availability: 'soir et we', CategoryId: 5, SubCategoryId: 29, UserId: 5, duration: "1h30" },

//     { title: "Histoires des Guerres", level: "avancé", transmission: 'visio', description: 'Découvrez comment les victoires ont été obtenues', availability: 'soir et we', CategoryId: 6, SubCategoryId: 33, UserId: 1, duration: "2h" },

//     { title: "Bouture de basilic", level: "débutant", transmission: 'presentiel et visio', description: "Apprenez à faire vos propres boutures de basilic pour avoir des tonnes de basilic tout l'été", availability: 'dimanche matin', CategoryId: 2, SubCategoryId: 11, UserId: 8, duration: "15mn" },

//     { title: "Communication non violente", level: "débutant", transmission: 'presentiel', description: 'Apprenez à communiquer dans la bienveillance, dites ce que vous avez sur le coeur sans froisser votre entourage !', availability: 'jeudi soir', CategoryId: 1, SubCategoryId: 4, UserId: 3, duration: "1h" },

//     { title: "Couture robe mariée", level: "avancé", transmission: 'presentiel', description: 'Créez vous-même la robe de vos rêves pour le plus beau jour de votre vie sans accro!', availability: 'lundi et mercredi après-midi', CategoryId: 3, SubCategoryId: 14, UserId: 2, duration: "2h" },

//     { title: "Décriptez les waltDisneys", level: "débutant", transmission: 'visio', description: 'Basé sur le livre la psychologie des contes de fées, découvrez le vrai sens de nos chers dessins animés.', availability: 'soir et we', CategoryId: 1, SubCategoryId: 6, UserId: 4, duration: "2h" },

//     { title: "Histoire de la feignantise", level: "débutant", transmission: 'visio', description: "D'où vient le concept de paresse? Une histoire du concept qui vous donnera un autre regard sur ce que nous appelons 'les personnes fénéantes'...", availability: 'soirées', CategoryId: 6, SubCategoryId: 33, UserId: 6, duration: "1h20" },

//     { title: "Le consentement", level: "débutant", transmission: 'presentiel', description: "Le consentement, c'est quoi? Apprenez à connaître vos limites et les communiquer, apprenez à entendre celles des autres", availability: 'tout le temps', CategoryId: 5, SubCategoryId: 4, UserId: 7, duration: "1h45" }
// ]);


// await Meeting.bulkCreate([
//     { status: 'en attente', UserId: "1", SkillId: '1' },
//     { status: 'en cours', UserId: "1", SkillId: '3' },
//     { status: 'refusé', UserId: "1", SkillId: '4' },
//     { status: 'terminé', UserId: "1", SkillId: '5' },

//     { status: 'en attente', UserId: "2", SkillId: '4' },
//     { status: 'en cours', UserId: "2", SkillId: '1' },
//     { status: 'terminé', UserId: "2", SkillId: '6' },
//     { status: 'refusé', UserId: "2", SkillId: '7' },

//     { status: 'en cours', UserId: "3", SkillId: '5' },
//     { status: 'refusé', UserId: "3", SkillId: '6' },
//     { status: 'terminé', UserId: "3", SkillId: '1' },
//     { status: 'en attente', UserId: "3", SkillId: '2' },

//     { status: 'en attente', UserId: "4", SkillId: '7' },
//     { status: 'terminé', UserId: "4", SkillId: '8' },
//     { status: 'refusé', UserId: "4", SkillId: '1' },
//     { status: 'en cours', UserId: "4", SkillId: '2' },

//     { status: 'refusé', UserId: "5", SkillId: '5' },
//     { status: 'en attente', UserId: "5", SkillId: '3' },
//     { status: 'en cours', UserId: "5", SkillId: '8' },
//     { status: 'terminé', UserId: "5", SkillId: '7' },

//     { status: 'refusé', UserId: "6", SkillId: '2' },
//     { status: 'terminé', UserId: "6", SkillId: '3' },
//     { status: 'en attente', UserId: "6", SkillId: '8' },
//     { status: 'en cours', UserId: "6", SkillId: '6' },

//     { status: 'en cours', UserId: "7", SkillId: '7' },
//     { status: 'refusé', UserId: "7", SkillId: '3' },
//     { status: 'en attente', UserId: "7", SkillId: '5' },
//     { status: 'terminé', UserId: "7", SkillId: '4' },

//     { status: 'en attente', UserId: "8", SkillId: '6' },
//     { status: 'refusé', UserId: "8", SkillId: '8' },
//     { status: 'en cours', UserId: "8", SkillId: '4' },
//     { status: 'terminé', UserId: "8", SkillId: '2' }
// ])

// await Interest.bulkCreate([
//     { UserId: "1", CategoryId: "1" },
//     { UserId: "2", CategoryId: "2" },
//     { UserId: "3", CategoryId: "3" },
//     { UserId: "4", CategoryId: "4" },
//     { UserId: '5', CategoryId: "5" },
//     { UserId: '6', CategoryId: "6" },
//     { UserId: '7', CategoryId: "1" },
//     { UserId: '8', CategoryId: "2" },
//     { UserId: "1", CategoryId: "2" },
//     { UserId: "2", CategoryId: "3" },
//     { UserId: "3", CategoryId: "4" },
//     { UserId: "4", CategoryId: "5" },
//     { UserId: '5', CategoryId: "6" },
//     { UserId: '6', CategoryId: "5" },
//     { UserId: '7', CategoryId: "4" },
//     { UserId: '8', CategoryId: "3" }
// ])

export { User, Category, Skill, SubCategory, Meeting, Interest };