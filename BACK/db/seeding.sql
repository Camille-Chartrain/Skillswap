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


INSERT INTO "sub_category"("name","category_id") VALUES

-- première sub_categorie
('Langues étrangères (anglais, français, espagnol, etc.)',59), 
('Grammaire et orthographe',59),
('Langage des signes',59),
('Linguistique',59),
('Rédaction créative',59),
('Traduction et interprétation',59),

-- deuxième sub_categorie
('Menuiserie',60), 
('Électricité domestique',60),
('Plomberie',60),
('Peinture et décoration intérieure',60),
('Jardinage',60),
('Réparation appareils électroniques',60),

-- troisième sub_categorie
('Fabrication de meubles',61), 
('Couture et artisanat textile',61),
('Construction de modèles réduits',61),
('Conception de bijoux',61),
('Fabrication de produits de beauté maison',61),
('Artisanat écologique',61),

-- quatrième sub_categorie
('Cuisine régionale (italienne, asiatique, mexicaine, etc.)',62), 
('Pâtisserie et desserts',62),
('Cuisine végétalienne ou végétarienne',62),
('Techniques de découpe et de préparation',62),
('Cuisine rapide et pratique',62),
('Cuisine pour les régimes spécifiques (sans gluten, sans lactose, etc.)',62),

-- cinquième sub_categorie
('Dessin et peinture',63), 
('Sculpture',63),
('Photographie',63),
('Art numérique',63),
('Artisanat traditionnel (poterie, tissage, etc.)',63),
('Histoire de l art et appréciation artistique',63),

-- sixième sub_categorie
('Mathématiques',64), 
('Sciences (physique, chimie, biologie)',64),
('Histoire et géographie',64),
('Littérature et analyse de texte',64),
('Préparation aux examens (SAT, ACT, BAC, etc.)',64),
('Méthodes de travail et organisation scolaire',64);

COMMIT;
