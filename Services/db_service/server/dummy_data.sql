-- Creating database
CREATE DATABASE pixelgram;
-- Connecting to pixelgram databse
\c pixelgram

CREATE TABLE IF NOT EXISTS userdetails(
    user_id text NOT NULL,
    user_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS sessiontokens(
    user_id text NOT NULL,
    session_id text NOT NULL,
    expire_time timestamp without time zone,
    PRIMARY KEY (user_id, session_id)
);

CREATE TABLE IF NOT EXISTS imagedetails(
    user_id text NOT NULL,
    image_id text NOT NULL,
    latitude numeric,
    longitude numeric,
    location_name text,
    format text,
    time_on_image timestamp without time zone,
    PRIMARY KEY (image_id)
);

CREATE TABLE IF NOT EXISTS shareimagedetails(
    user_id text NOT NULL,
    image_id text NOT NULL,
    user_id_shared text NOT NULL,
    PRIMARY KEY (user_id, image_id, user_id_shared)
);

