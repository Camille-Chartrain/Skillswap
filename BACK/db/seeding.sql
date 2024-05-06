BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE "user", "skill", "category","sub_category","meeting","interest";

INSERT INTO "category"("name", "picture") VALUES
-- premier categorie
('Langage', 
''),

-- deuxième categorie
('Bricolage',
''),

-- troisième categorie
('DIY',
''),

-- quatrième categorie
('Cuisine',
'');

-- quatrième categorie
('Art',
'');

-- quatrième categorie
('Scolaire',
'');


COMMIT;
