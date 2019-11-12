--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.15
-- Dumped by pg_dump version 9.6.15

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

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: block_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.block_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.block_seq OWNER TO yann;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Block; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."Block" (
    id integer DEFAULT nextval('public.block_seq'::regclass) NOT NULL,
    "blockedUser" integer NOT NULL,
    "blockingUser" integer NOT NULL
);


ALTER TABLE public."Block" OWNER TO yann;

--
-- Name: gender_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.gender_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.gender_seq OWNER TO yann;

--
-- Name: Gender; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."Gender" (
    id integer DEFAULT nextval('public.gender_seq'::regclass) NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Gender" OWNER TO yann;

--
-- Name: interest_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.interest_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.interest_seq OWNER TO yann;

--
-- Name: Interest; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."Interest" (
    id integer DEFAULT nextval('public.interest_seq'::regclass) NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Interest" OWNER TO yann;

--
-- Name: like_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.like_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.like_seq OWNER TO yann;

--
-- Name: Like; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."Like" (
    id integer DEFAULT nextval('public.like_seq'::regclass) NOT NULL,
    "likedUser" integer NOT NULL,
    "likingUser" integer NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public."Like" OWNER TO yann;

--
-- Name: match_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.match_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.match_seq OWNER TO yann;

--
-- Name: Match; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."Match" (
    id integer DEFAULT nextval('public.match_seq'::regclass) NOT NULL,
    user1 integer NOT NULL,
    user2 integer NOT NULL,
    date timestamp without time zone NOT NULL,
    "lastMessage" integer NOT NULL
);


ALTER TABLE public."Match" OWNER TO yann;

--
-- Name: message_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.message_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.message_seq OWNER TO yann;

--
-- Name: Message; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."Message" (
    id integer DEFAULT nextval('public.message_seq'::regclass) NOT NULL,
    match integer NOT NULL,
    author integer NOT NULL,
    content character varying NOT NULL,
    "creationDate" timestamp without time zone NOT NULL,
    read boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Message" OWNER TO yann;

--
-- Name: report_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.report_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.report_seq OWNER TO yann;

--
-- Name: Report; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."Report" (
    id integer DEFAULT nextval('public.report_seq'::regclass) NOT NULL,
    "reportedUser" integer NOT NULL,
    "reportingUser" integer NOT NULL
);


ALTER TABLE public."Report" OWNER TO yann;

--
-- Name: user_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.user_seq OWNER TO yann;

--
-- Name: User; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."User" (
    id integer DEFAULT nextval('public.user_seq'::regclass) NOT NULL,
    firstname character varying(30) NOT NULL,
    surname character varying(40) NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(80) NOT NULL,
    validated boolean DEFAULT false,
    suspended boolean DEFAULT false,
    gender integer,
    "sexualOrientation" integer,
    description text,
    interests integer[],
    images text[],
    "profilePicture" text,
    location numeric[],
    "notificationMail" boolean DEFAULT true,
    "notificationPush" boolean DEFAULT true,
    "lastVisit" timestamp without time zone,
    "popularityRate" double precision,
    "birthDate" date
);


ALTER TABLE public."User" OWNER TO yann;

--
-- Name: uservalidation_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.uservalidation_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.uservalidation_seq OWNER TO yann;

--
-- Name: UserValidation; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."UserValidation" (
    id integer DEFAULT nextval('public.uservalidation_seq'::regclass) NOT NULL,
    "userId" integer NOT NULL,
    "validationKey" text NOT NULL,
    "resetPasssword" text NOT NULL
);


ALTER TABLE public."UserValidation" OWNER TO yann;

--
-- Name: visit_seq; Type: SEQUENCE; Schema: public; Owner: yann
--

CREATE SEQUENCE public.visit_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.visit_seq OWNER TO yann;

--
-- Name: Visit; Type: TABLE; Schema: public; Owner: yann
--

CREATE TABLE public."Visit" (
    id integer DEFAULT nextval('public.visit_seq'::regclass) NOT NULL,
    visitor integer NOT NULL,
    visited integer NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public."Visit" OWNER TO yann;

--
-- Data for Name: Block; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."Block" (id, "blockedUser", "blockingUser") FROM stdin;
\.


--
-- Data for Name: Gender; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."Gender" (id, name) FROM stdin;
1	Male
2	Female
3	Binary
4	Non-Binary
\.


--
-- Data for Name: Interest; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."Interest" (id, name) FROM stdin;
1	poney
2	cuisine
3	ken
4	des bisous
5	yoga
6	les gentils
\.


--
-- Data for Name: Like; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."Like" (id, "likedUser", "likingUser", date) FROM stdin;
\.


--
-- Data for Name: Match; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."Match" (id, user1, user2, date, "lastMessage") FROM stdin;
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."Message" (id, match, author, content, "creationDate", read) FROM stdin;
\.


--
-- Data for Name: Report; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."Report" (id, "reportedUser", "reportingUser") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."User" (id, firstname, surname, username, password, email, validated, suspended, gender, "sexualOrientation", description, interests, images, "profilePicture", location, "notificationMail", "notificationPush", "lastVisit", "popularityRate", "birthDate") FROM stdin;
1	yann	petitjean	ypetitje	yann	yann@yann.com	t	f	\N	\N	\N	\N	\N	\N	{1,2}	t	t	\N	\N	\N
2	sego	alquier	salquier	sego	sego@sego.com	t	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
3	baptiste	fraikin	bafraiki	baba	sego@sego.com	t	t	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
11	antonin	siguier	antono	mignon	anto@ghetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
12	antonin	siguier	antono	mignon	anto@ghetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
14	antonin	siguier	antono	mignon	anto@ghetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
19	Yann	PETITJEAN	ds	123456	yann120@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
20	jhkj	ghjjhk	admin@grools.fr	123456	hjkjhk@go.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
21	Marc	Albertini	admin@grools.fr	123456	albertini@yopmail.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
22	Yann	PETITJEAN	admin@grools.fr	123456	yann@m2ice.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
23	Yann	PETITJEAN	admin@grools.fr	123456	yann@m2ice.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
24	Yann	PETITJEAN	admin@grools.fr	123456	yann120@me.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
25	Marc	Albertini	admin@grools.fr	123456	albertini@yopmail.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
26	Yann	PETITJEAN	admin@grools.fr	123456	yann@m2ice.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
27	antonin	siguier	antono	mignon	anto@ghetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
28	antonin	siguier	antono	mignon	anto@ghetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
29	antonin	siguier	antono	mignon		f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
31	antonin	siguier	antono	mignon	anto@guetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
32	Yann	PETITJEAN	admin@grools.fr	123456	yann@m2ice.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
33	Yann	PETITJEAN	admin@grools.fr	123456	yann120@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
34	Yann	PETITJEAN	admin@grools.fr	123456	yann@m2ice.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
35	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
36	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
37	Yann	PETITJEAN	admin@grools.fr	123456	yann120@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
38	Marc	Albertini	admin@grools.fr	123456	albertini@yopmail.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
39	Marc	Albertini	admin@grools.fr	123456	albertini@yopmail.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
40	Yann	PETITJEAN	admin@grools.fr	123456	yann120@me.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
41	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
42	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
43	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
44	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
45	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
46	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
47	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
48	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
49	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
50	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
51	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
52	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
53	Yann	PETITJEAN	admin@grools.fr	123456	yann.petitjean@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
54	Yann	PETITJEAN	admin@grools.fr	123456	yann120@me.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
55	Marc	Albertini	admin@grools.fr	123456	albertini@yopmail.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
58	Yann	PETITJEAN	fgh	fgh	yann120@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
59	Yann	PETITJEAN	fgd	dfg	yann120@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
60	antonin	siguier	antono	mignon	anto@guetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
61	antonin	siguier	antono	mignon	anto@guetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
62	antonin	siguier	antono	mignon	anto@guetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
63	antonin	siguier	antono	mignon	anto@guetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
64	antonin	siguier	antono	mignon	anto@guetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
65	antonin	siguier	antono	mignon	anto@guetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
66	antonin	siguier	antono	mignon	anto@guetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
67	antonin	siguier	antono	mignon	anto	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
68	antonin	siguier	antono	mignon	anto	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
69	antonin	siguier	antono	mignon	anto@mignon.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
70	antonin	siguier	antono	mignon	anto@mignon.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
71	antonin	siguier	antono	mignon	anto	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
72	antonin	siguier	antono	mignon	anto@	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
73	antonin	siguier	antono	mignon	anto@.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
74	antonin	siguier	antono	mignon	anto@.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
75	antonin	siguier	antono	mignon	anto@mignon.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
76	antonin	siguier	antono	mignon	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
77	antonin	siguier	antono	mignon	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
79	antonin	siguier	anto/	mignon	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
80	antonin	siguier	anto	mignon	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
81	antonin	siguier	anto	mignon	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
82	antonin	siguier	anto	mignon	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
83	antonin	siguier	anto	Mignon38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
84	antonin	siguier	anto	Mignon38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
85	antonin	siguier	anto	Mignon*38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
86	antonin	siguier	anto	mignon*38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
87	antonin	siguier	anto	mignon*38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
88	antonin	siguier	a	mignon*38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
89	antonin	siguier	adfngjhjsgjhfdjl	mignon*38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
90	antonin	siguier	anto	mignon*38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
91	antonin	siguier	anto	mignon*38	anto@mignon.fr.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
92	anthonin	siguier	ansdggfd	Mignon38.	antoa@go.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
93	anthonin	siguier	ansdggfdcvn	Mignon38.	antoa@go.frn	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
94	anthonin	siguier	ansdggfdcvnch	Mignon38.	antoa@go.frnd	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
95	anc	siguier	ansdggf	Mignon38.	antoa@go.frnddfg	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
96	anc	siguier	ansdggfh	Mignon38.	antoa@go.frnddfgh	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
15	lalala	siguier	salutcava	mignon	anto@ghetto.com	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
97	anc	siguier	ansdggfhsdf	Mignon38.	antoaf@go.frnddfgh	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
17	adrien	toto	adridu75	mignon	adri@sego.com	f	f	3	\N	arsuncriuih7rfg757h895hf2687511fj	\N	\N	\N	\N	t	t	\N	\N	\N
98	anc	siguier	ansdggfhsdfdfg	Mignon38.	antoaf@go.frnddfghg	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
99	anc	siguier	ansdggfhsd	Mignon38.	antoaf@go.frnddfghgwef	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
100	dhh	fg	fgn	fdh	cfgn@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
101	Yann	PETITJEAN	rrrew	qwe	yann120@hotewmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
102	Yann	PETITJEAN	erewrrew	qwe	yann120@hoqertmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
103	Yann	PETITJEAN	qwe	qwe	yann120@hwotqewmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
104	ygig	igiug	lggi	giihu	gi@gliu.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
105	hohoh	uhhoih	uhi	thrrht	vbu@fg.rg	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
106	Yann	PETITJEAN	qwd	qwddwq	yann120@hotqwdmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
107	rger	etryty	rty	1234	rty@erg.gt	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
108	Yann	PETITJEAN	dsf	sdf	sdfyann120@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
109	Yann	PETITJEAN	dsf2e	sdf	sdfyann1202e@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
110	Yann	PETITJEAN	asd	asd	yann120@me.coasdm	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
111	Yann	PETITJEAN	qwertg	qwe	yann120@hotmail.fqwer	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
112	Yann	PETITJEAN	wegegwe	r	yann@m2ice.frd	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
113	Yann	PETITJEAN	yann	4	yann120@hotmail.frfegrg	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
114	Yann	PETITJEANwqd	qwdfd	qdw	yann120@hotmail.frqd	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
115	Yann	etryty	rrtert	q	yann120@hoteeeemail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
116	aergh	petitjean	ewger	rert	bhij@oij.gt@	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
117	Yann	PETITJEAN	bkjbjk	1234	yann120@hotmail.fr.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
118	Yann	PETITJEAN	gzgrgrrtae	e	yann120@hotmail.fr@	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
119	Yann	PETITJEAN	ewf	wef	yann120f@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
120	Yann	PETITJEAN	sdv	sdv	yann120v@hotmail.fr	f	f	\N	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N
\.


--
-- Data for Name: UserValidation; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."UserValidation" (id, "userId", "validationKey", "resetPasssword") FROM stdin;
\.


--
-- Data for Name: Visit; Type: TABLE DATA; Schema: public; Owner: yann
--

COPY public."Visit" (id, visitor, visited, date) FROM stdin;
\.


--
-- Name: block_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.block_seq', 1, false);


--
-- Name: gender_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.gender_seq', 4, true);


--
-- Name: interest_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.interest_seq', 6, true);


--
-- Name: like_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.like_seq', 1, false);


--
-- Name: match_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.match_seq', 1, false);


--
-- Name: message_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.message_seq', 1, false);


--
-- Name: report_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.report_seq', 1, false);


--
-- Name: user_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.user_seq', 120, true);


--
-- Name: uservalidation_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.uservalidation_seq', 1, false);


--
-- Name: visit_seq; Type: SEQUENCE SET; Schema: public; Owner: yann
--

SELECT pg_catalog.setval('public.visit_seq', 1, false);


--
-- Name: Block pk_Block; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Block"
    ADD CONSTRAINT "pk_Block" PRIMARY KEY (id);


--
-- Name: Gender pk_Gender; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Gender"
    ADD CONSTRAINT "pk_Gender" PRIMARY KEY (id);


--
-- Name: Interest pk_Interest; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Interest"
    ADD CONSTRAINT "pk_Interest" PRIMARY KEY (id);


--
-- Name: Like pk_Like; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "pk_Like" PRIMARY KEY (id);


--
-- Name: Match pk_Match; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "pk_Match" PRIMARY KEY (id);


--
-- Name: Message pk_Message; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "pk_Message" PRIMARY KEY (id);


--
-- Name: Report pk_Report; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "pk_Report" PRIMARY KEY (id);


--
-- Name: User pk_User; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "pk_User" PRIMARY KEY (id);


--
-- Name: UserValidation pk_UserValidation; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."UserValidation"
    ADD CONSTRAINT "pk_UserValidation" PRIMARY KEY (id);


--
-- Name: Visit pk_Visit; Type: CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Visit"
    ADD CONSTRAINT "pk_Visit" PRIMARY KEY (id);


--
-- Name: Block fk_Block_blockedUser; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Block"
    ADD CONSTRAINT "fk_Block_blockedUser" FOREIGN KEY ("blockedUser") REFERENCES public."User"(id);


--
-- Name: Block fk_Block_blockingUser; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Block"
    ADD CONSTRAINT "fk_Block_blockingUser" FOREIGN KEY ("blockingUser") REFERENCES public."User"(id);


--
-- Name: Like fk_Like_likedUser; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "fk_Like_likedUser" FOREIGN KEY ("likedUser") REFERENCES public."User"(id);


--
-- Name: Like fk_Like_likingUser; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "fk_Like_likingUser" FOREIGN KEY ("likingUser") REFERENCES public."User"(id);


--
-- Name: Match fk_Match_lastMessage; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "fk_Match_lastMessage" FOREIGN KEY ("lastMessage") REFERENCES public."Message"(id);


--
-- Name: Match fk_Match_user1; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "fk_Match_user1" FOREIGN KEY (user1) REFERENCES public."User"(id);


--
-- Name: Match fk_Match_user2; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Match"
    ADD CONSTRAINT "fk_Match_user2" FOREIGN KEY (user2) REFERENCES public."User"(id);


--
-- Name: Message fk_Message_author; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "fk_Message_author" FOREIGN KEY (author) REFERENCES public."User"(id);


--
-- Name: Message fk_Message_match; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "fk_Message_match" FOREIGN KEY (match) REFERENCES public."Match"(id);


--
-- Name: Report fk_Report_reportedUser; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "fk_Report_reportedUser" FOREIGN KEY ("reportedUser") REFERENCES public."User"(id);


--
-- Name: Report fk_Report_reportingUser; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Report"
    ADD CONSTRAINT "fk_Report_reportingUser" FOREIGN KEY ("reportingUser") REFERENCES public."User"(id);


--
-- Name: UserValidation fk_UserValidation_userId; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."UserValidation"
    ADD CONSTRAINT "fk_UserValidation_userId" FOREIGN KEY ("userId") REFERENCES public."User"(id);


--
-- Name: User fk_User_gender; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "fk_User_gender" FOREIGN KEY (gender) REFERENCES public."Gender"(id);


--
-- Name: User fk_User_sexualOrientation; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "fk_User_sexualOrientation" FOREIGN KEY ("sexualOrientation") REFERENCES public."Gender"(id);


--
-- Name: Visit fk_Visit_visited; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Visit"
    ADD CONSTRAINT "fk_Visit_visited" FOREIGN KEY (visited) REFERENCES public."User"(id);


--
-- Name: Visit fk_Visit_visitor; Type: FK CONSTRAINT; Schema: public; Owner: yann
--

ALTER TABLE ONLY public."Visit"
    ADD CONSTRAINT "fk_Visit_visitor" FOREIGN KEY (visitor) REFERENCES public."User"(id);


--
-- PostgreSQL database dump complete
--

