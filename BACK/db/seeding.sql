BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE TABLE "user", "skill", "category","sub_category","meeting","interest" RESTART IDENTITY CASCADE;

INSERT INTO "category"("name", "picture") VALUES
-- premier categorie
('Langage', 
'imageCategory/languageSkillswap.jpg'),

-- deuxième categorie
('Bricolage',
'imageCategory/handiworkSkillswap.jpg'),

-- troisième categorie
('DIY',
'imageCategory/dyiSkillswap.jpg'),

-- quatrième categorie
('Cuisine',
'imageCategory/kitchenSkillswap.jpg'),

-- cinquième categorie
('Art',
'imageCategory/artSkillswap.jpg'),

-- sixième categorie
('Scolaire',
'imageCategory/schoolSkillswap.jpg');


INSERT INTO "sub_category"("name","CategoryId") VALUES

-- première sub_categorie
('Langues étrangères (anglais, français, espagnol, etc.)',1), 
('Grammaire et orthographe',1),
('Langage des signes',1),
('Linguistique',1),
('Rédaction créative',1),
('Traduction et interprétation',1),

-- deuxième sub_categorie
('Menuiserie',2), 
('Électricité domestique',2),
('Plomberie',2),
('Peinture et décoration intérieure',2),
('Jardinage',2),
('Réparation appareils électroniques',2),

-- troisième sub_categorie
('Fabrication de meubles',3), 
('Couture et artisanat textile',3),
('Construction de modèles réduits',3),
('Conception de bijoux',3),
('Fabrication de produits de beauté maison',3),
('Artisanat écologique',3),

-- quatrième sub_categorie
('Cuisine régionale (italienne, asiatique, mexicaine, etc.)',4), 
('Pâtisserie et desserts',4),
('Cuisine végétalienne ou végétarienne',4),
('Techniques de découpe et de préparation',4),
('Cuisine rapide et pratique',4),
('Cuisine pour les régimes spécifiques (sans gluten, sans lactose, etc.)',4),

-- cinquième sub_categorie
('Dessin et peinture',5), 
('Sculpture',5),
('Photographie',5),
('Art numérique',5),
('Artisanat traditionnel (poterie, tissage, etc.)',5),
('Histoire de l art et appréciation artistique',5),

-- sixième sub_categorie
('Mathématiques',6), 
('Sciences (physique, chimie, biologie)',6),
('Histoire et géographie',6),
('Littérature et analyse de texte',6),
('Préparation aux examens (SAT, ACT, BAC, etc.)',6),
('Méthodes de travail et organisation scolaire',6);

COMMIT;
