-- SQLBook: Code
BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

DROP TABLE IF EXISTS "user",
"category",
"subcategory",
"skill",
"meeting",
"interest";

CREATE TABLE "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthday" DATE,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "grade_level" TEXT NOT NULL,
    "presentation" TEXT,
    "role" TEXT NOT NULL,
    "swappies" INTEGER
);

CREATE TABLE "category" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL
);

CREATE TABLE "subcategory" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category_id" INTEGER REFERENCES "category" ("id") NOT NULL
);

CREATE TABLE "skill" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "duration" INTEGER,
    "price" INTEGER,
    "mark" INTEGER,
    "level" TEXT NOT NULL,
    "transmission" TEXT,
    "description" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "subcategory_id" INTEGER REFERENCES "subcategory" ("id") NOT NULL,
    "category_id" INTEGER REFERENCES "category" ("id") NOT NULL,
    "user_id" INTEGER REFERENCES "user" ("id") NOT NULL
);

CREATE TABLE "meeting" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "skill_id" INTEGER REFERENCES "skill" ("id") NOT NULL,
    "user_id" INTEGER REFERENCES "user" ("id") NOT NULL
);

CREATE TABLE "interest" (
    "category_id" INTEGER REFERENCES "category" ("id") NOT NULL,
    "user_id" INTEGER REFERENCES "user" ("id") NOT NULL
);

COMMIT;