-- SQLBook: Code
BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE TABLE "user",
"skill",
"category",
"subcategory",
"meeting",
"interest" RESTART IDENTITY CASCADE;

INSERT INTO
    "category" ("name", "picture")
VALUES
    -- premier categorie
    (
        'Langage',
        'db/imageCategory/languageSkillswap.jpg'
    ),
-- deuxième categorie
( 'Bricolage', 'imageCategory/handiworkSkillswap.jpg' ),
-- troisième categorie
( 'DIY', 'imageCategory/dyiSkillswap.jpg' ),
-- quatrième categorie
( 'Cuisine', 'imageCategory/kitchenSkillswap.jpg' ),
-- cinquième categorie
( 'Art', 'imageCategory/artSkillswap.jpg' ),
-- sixième categorie
( 'Scolaire', 'imageCategory/schoolSkillswap.jpg' );

INSERT INTO "subcategory" ("name", "category_id") VALUES
-- première sub_categorie
(
    'Langues etrangeres (anglais, francais, espagnol, etc.)',
    1
),
('Grammaire et orthographe', 1),
('Langage des signes', 1),
('Linguistique', 1),
('Redaction creative', 1),
(
    'Traduction et interpretation',
    1
),
-- deuxième sub_categorie
('Menuiserie', 2),
('Electricite domestique', 2),
('Plomberie', 2),
(
    'Peinture et decoration interieure',
    2
),
('Jardinage', 2),
(
    'Reparation appareils electroniques',
    2
),
-- troisième sub_categorie
('Fabrication de meubles', 3),
(
    'Couture et artisanat textile',
    3
),
(
    'Construction de modeles reduits',
    3
),
('Conception de bijoux', 3),
(
    'Fabrication de produits de beaute maison',
    3
),
('Artisanat ecologique', 3),
-- quatrième sub_categorie
(
    'Cuisine regionale (italienne, asiatique, mexicaine, etc.)',
    4
),
('Patisserie et desserts', 4),
(
    'Cuisine vegetalienne ou vegetarienne',
    4
),
(
    'Techniques de decoupe et de preparation',
    4
),
(
    'Cuisine rapide et pratique',
    4
),
(
    'Cuisine pour les regimes specifiques (sans gluten, sans lactose, etc.)',
    4
),
-- cinquième sub_categorie
('Dessin et peinture', 5),
('Sculpture', 5),
('Photographie', 5),
('Art numerique', 5),
(
    'Artisanat traditionnel (poterie, tissage, etc.)',
    5
),
(
    'Histoire de l art et appreciation artistique',
    5
),
-- sixième sub_categorie
('Mathematiques', 6),
(
    'Sciences (physique, chimie, biologie)',
    6
),
('Histoire et geographie', 6),
(
    'Litterature et analyse de texte',
    6
),
(
    'Preparation aux examens (SAT, ACT, BAC, etc.)',
    6
),
(
    'Methodes de travail et organisation scolaire',
    6
);

COMMIT;