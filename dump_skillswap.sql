--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12
-- Dumped by pg_dump version 14.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL,
    picture text NOT NULL
);


ALTER TABLE public.category OWNER TO admin;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: interest; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.interest (
    "UserId" integer,
    "CategoryId" integer
);


ALTER TABLE public.interest OWNER TO admin;

--
-- Name: meeting; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.meeting (
    id integer NOT NULL,
    date timestamp with time zone NOT NULL,
    status text,
    mark integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer,
    "SkillId" integer
);


ALTER TABLE public.meeting OWNER TO admin;

--
-- Name: meeting_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.meeting ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.meeting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: skill; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.skill (
    id integer NOT NULL,
    title text NOT NULL,
    duration text,
    price integer DEFAULT 1 NOT NULL,
    level text NOT NULL,
    transmission text NOT NULL,
    description text NOT NULL,
    availability text NOT NULL,
    "averageMark" integer,
    "sumOfMarks" integer,
    "numberOfRating" integer,
    "SubCategoryId" integer NOT NULL,
    "CategoryId" integer NOT NULL,
    "UserId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.skill OWNER TO admin;

--
-- Name: skill_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.skill ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.skill_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: subcategory; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.subcategory (
    id integer NOT NULL,
    name text NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.subcategory OWNER TO admin;

--
-- Name: subcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public.subcategory ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.subcategory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    birthday timestamp with time zone,
    email text NOT NULL,
    grade_level text,
    presentation text,
    role text DEFAULT 'member'::text NOT NULL,
    swappies integer DEFAULT 2 NOT NULL,
    "swappiesWinned" integer DEFAULT 2 NOT NULL,
    "swappiesSpent" integer DEFAULT 0 NOT NULL,
    hash text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.category (id, name, picture) FROM stdin;
1	Langage	imageCategory/languageSkillswap.webp
2	Bricolage	imageCategory/handiworkSkillswap.webp
3	DIY	imageCategory/dyiSkillswap.webp
4	Cuisine	imageCategory/kitchenSkillswap.webp
5	Art	imageCategory/artSkillswap.webp
6	Scolaire	imageCategory/schoolSkillswap.webp
\.


--
-- Data for Name: interest; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.interest ("UserId", "CategoryId") FROM stdin;
1	1
2	2
3	3
4	4
5	5
6	6
7	1
8	2
1	2
2	3
3	4
4	5
5	6
6	5
7	4
8	3
\.


--
-- Data for Name: meeting; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.meeting (id, date, status, mark, "createdAt", "updatedAt", "UserId", "SkillId") FROM stdin;
1	2024-08-12 17:00:18.547+00	en attente	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	1	1
2	2024-08-12 17:00:18.548+00	en cours	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	1	3
3	2024-08-12 17:00:18.548+00	refusé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	1	4
4	2024-08-12 17:00:18.548+00	terminé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	1	5
5	2024-08-12 17:00:18.548+00	en attente	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	2	4
6	2024-08-12 17:00:18.548+00	en cours	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	2	1
7	2024-08-12 17:00:18.548+00	terminé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	2	6
8	2024-08-12 17:00:18.548+00	refusé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	2	7
9	2024-08-12 17:00:18.548+00	en cours	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	3	5
10	2024-08-12 17:00:18.548+00	refusé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	3	6
11	2024-08-12 17:00:18.548+00	terminé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	3	1
12	2024-08-12 17:00:18.548+00	en attente	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	3	2
13	2024-08-12 17:00:18.548+00	en attente	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	4	7
14	2024-08-12 17:00:18.548+00	terminé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	4	8
15	2024-08-12 17:00:18.548+00	refusé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	4	1
16	2024-08-12 17:00:18.548+00	en cours	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	4	2
17	2024-08-12 17:00:18.548+00	refusé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	5	5
18	2024-08-12 17:00:18.548+00	en attente	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	5	3
19	2024-08-12 17:00:18.548+00	en cours	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	5	8
20	2024-08-12 17:00:18.548+00	terminé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	5	7
21	2024-08-12 17:00:18.548+00	refusé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	6	2
22	2024-08-12 17:00:18.548+00	terminé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	6	3
23	2024-08-12 17:00:18.548+00	en attente	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	6	8
24	2024-08-12 17:00:18.548+00	en cours	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	6	6
25	2024-08-12 17:00:18.548+00	en cours	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	7	7
26	2024-08-12 17:00:18.548+00	refusé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	7	3
27	2024-08-12 17:00:18.548+00	en attente	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	7	5
28	2024-08-12 17:00:18.548+00	terminé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	7	4
29	2024-08-12 17:00:18.548+00	en attente	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	8	6
30	2024-08-12 17:00:18.549+00	refusé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	8	8
31	2024-08-12 17:00:18.549+00	en cours	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	8	4
32	2024-08-12 17:00:18.549+00	terminé	\N	2024-08-12 17:00:18.547+00	2024-08-12 17:00:18.547+00	8	2
\.


--
-- Data for Name: skill; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.skill (id, title, duration, price, level, transmission, description, availability, "averageMark", "sumOfMarks", "numberOfRating", "SubCategoryId", "CategoryId", "UserId", "createdAt", "updatedAt") FROM stdin;
1	self-defense	1h30	1	intermediaire	presentiel	apprenez à vous sortir des pires situations	soir et we	4	\N	\N	29	5	5	2024-08-12 17:00:18.488+00	2024-08-12 17:00:18.488+00
2	Histoires des Guerres	2h	1	avancé	visio	Découvrez comment les victoires ont été obtenues	soir et we	3	\N	\N	33	6	1	2024-08-12 17:00:18.488+00	2024-08-12 17:00:18.488+00
3	Bouture de basilic	15mn	1	débutant	presentiel et visio	Apprenez à faire vos propres boutures de basilic pour avoir des tonnes de basilic tout l'été	dimanche matin	4	\N	\N	11	2	8	2024-08-12 17:00:18.488+00	2024-08-12 17:00:18.488+00
4	Communication non violente	1h	1	débutant	presentiel	Apprenez à communiquer dans la bienveillance, dites ce que vous avez sur le coeur sans froisser votre entourage !	jeudi soir	4	\N	\N	4	1	3	2024-08-12 17:00:18.488+00	2024-08-12 17:00:18.488+00
5	Couture robe mariée	2h	1	avancé	presentiel	Créez vous-même la robe de vos rêves pour le plus beau jour de votre vie sans accro!	lundi et mercredi après-midi	4	\N	\N	14	3	2	2024-08-12 17:00:18.488+00	2024-08-12 17:00:18.488+00
6	Décriptez les waltDisneys	2h	1	débutant	visio	Basé sur le livre la psychologie des contes de fées, découvrez le vrai sens de nos chers dessins animés.	soir et we	5	\N	\N	6	1	4	2024-08-12 17:00:18.488+00	2024-08-12 17:00:18.488+00
7	Histoire de la feignantise	1h20	1	débutant	visio	D'où vient le concept de paresse? Une histoire du concept qui vous donnera un autre regard sur ce que nous appelons 'les personnes fénéantes'...	soirées	4	\N	\N	33	6	6	2024-08-12 17:00:18.488+00	2024-08-12 17:00:18.488+00
8	Le consentement	1h45	1	débutant	presentiel	Le consentement, c'est quoi? Apprenez à connaître vos limites et les communiquer, apprenez à entendre celles des autres	tout le temps	4	\N	\N	4	5	7	2024-08-12 17:00:18.488+00	2024-08-12 17:00:18.488+00
9	création site internet écologique	24h	1	débutant	live	Codez votre site en une nuit, ça fait des économies d'électricité! L'écologie c'est simple. Passez 24h avec moi sans dormir pour un site web 0 empreinte carbone, amenez votre coca ou votre café, votre source de caféine préférée.	week end	\N	\N	\N	18	3	8	2024-08-15 11:55:48.481+00	2024-08-15 11:55:48.481+00
\.


--
-- Data for Name: subcategory; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.subcategory (id, name, category_id) FROM stdin;
1	Langues etrangeres (anglais, francais, espagnol, etc.)	1
2	Grammaire et orthographe	1
3	Langage des signes	1
4	Linguistique	1
5	Redaction creative	1
6	Traduction et interpretation	1
7	Menuiserie	2
8	Electricite domestique	2
9	Plomberie	2
10	Peinture et decoration interieure	2
11	Jardinage	2
12	Reparation appareils electroniques	2
13	Fabrication de meubles	3
14	Couture et artisanat textile	3
15	Construction de modeles reduits	3
16	Conception de bijoux	3
17	Fabrication de produits de beaute maison	3
18	Artisanat ecologique	3
19	Cuisine regionale (italienne, asiatique, mexicaine, etc.)	4
20	Patisserie et desserts	4
21	Cuisine vegetalienne ou vegetarienne	4
22	Techniques de decoupe et de preparation	4
23	Cuisine rapide et pratique	4
24	Cuisine pour les regimes specifiques (sans gluten, sans lactose, etc.)	4
25	Dessin et peinture	5
26	Sculpture	5
27	Photographie	5
28	Art numerique	5
29	Artisanat traditionnel (poterie, tissage, etc.)	5
30	Histoire de l art et appreciation artistique	5
31	Mathematiques	6
32	Sciences (physique, chimie, biologie)	6
33	Histoire et geographie	6
34	Litterature et analyse de texte	6
35	Preparation aux examens (SAT, ACT, BAC, etc.)	6
36	Methodes de travail et organisation scolaire	6
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, firstname, lastname, birthday, email, grade_level, presentation, role, swappies, "swappiesWinned", "swappiesSpent", hash, "createdAt", "updatedAt") FROM stdin;
1	Victoire	Hourra	\N	onAUneBddEnSequelize@gmail.com	\N	 j'adore gagner	member	2	2	0	$2b$12$MLiHhojZr4vqCuBMuwp8R.3wgnErTEPWcivjx5eCnuhdWAsAvFWjy	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
2	marie	Edenlané	\N	diamant@gmail.com	\N	toujours de bonne humeur	member	2	2	0	$2b$12$AssGEysGMTeRymHzB7zyROQRUF6H00FqBeKEGqxUHGC4vEl.dTW5e	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
3	José	Paledire	\N	chut@gmail.com	\N	discret mais solide	member	2	2	0	$2b$12$fBOzARYyRanxJUOuTTUI3.mAPj.HSOCmoN26yQ8DLGCqimiqHPbby	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
4	Gus	GusLucifer	\N	estmechant@gmail.com	\N	j'adore les petits zétoné	member	2	2	0	$2b$12$O9rg1HxCsMri8NOtxI4jTeetvppUS4DnNFNQ.QPEe.X/k0P1eXVZO	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
5	Patrick	Apéro	\N	leurequelquepart@gmail.com	\N	toujours prêt pour accueillir des nouveaux copains	member	2	2	0	$2b$12$Z3ZXmqf7FzlBq.ljSCgLX.DoDSFVuyDgscVGU2qDRZfZVsM0yyzX2	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
6	Jeanne	aipazenvi	\N	detravailler@gmail.com	\N	Dans la lune que je trouve mes meilleurs idées	member	2	2	0	$2b$12$Y1mOsCBeCln1sgZnivD3v.J37w7Kj2FGIhNxfm8YtRaDcNEYsnYr6	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
7	Elodie	toujournon	\N	pasfun@gmail.com	\N	Vous pouvez me contacter je vous répondrai si je suis disponible	member	2	2	0	$2b$12$ls3Fl56R/DOPw.B7gvnrv.HBbYzHt6yCQeKPYhYUbMWodIPPNgxy2	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
8	Olivier	Vert	\N	belarbuste@gmail.com	\N	Mains toutes vertes et vie en rose	member	2	2	0	$2b$12$dJAFpMAeqKJ/531hiV3bsO1FITuwVWgA5OcgVteHJ1nA/dZuIdPS6	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
9	Ali	Baba	\N	tapis@gmail.com	\N	\N	admin	2	2	0	$2b$12$Ib2s6Rcmb6X7YdXBPC.jJ.7pvCMJHQGHHyv0AsujkSWpEAkj0HPbK	2024-08-12 17:00:13.608+00	2024-08-12 17:00:13.608+00
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.category_id_seq', 6, true);


--
-- Name: meeting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.meeting_id_seq', 32, true);


--
-- Name: skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.skill_id_seq', 9, true);


--
-- Name: subcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.subcategory_id_seq', 36, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 9, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: meeting meeting_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meeting
    ADD CONSTRAINT meeting_pkey PRIMARY KEY (id);


--
-- Name: skill skill_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.skill
    ADD CONSTRAINT skill_pkey PRIMARY KEY (id);


--
-- Name: subcategory subcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.subcategory
    ADD CONSTRAINT subcategory_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_email_key1; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key1 UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: interest interest_CategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.interest
    ADD CONSTRAINT "interest_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: interest interest_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.interest
    ADD CONSTRAINT "interest_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: meeting meeting_SkillId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meeting
    ADD CONSTRAINT "meeting_SkillId_fkey" FOREIGN KEY ("SkillId") REFERENCES public.skill(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: meeting meeting_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.meeting
    ADD CONSTRAINT "meeting_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: skill skill_CategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.skill
    ADD CONSTRAINT "skill_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: skill skill_SubCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.skill
    ADD CONSTRAINT "skill_SubCategoryId_fkey" FOREIGN KEY ("SubCategoryId") REFERENCES public.subcategory(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: skill skill_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.skill
    ADD CONSTRAINT "skill_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subcategory subcategory_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.subcategory
    ADD CONSTRAINT subcategory_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

