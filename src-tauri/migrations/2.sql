CREATE TABLE profile (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    require_password BOOLEAN DEFAULT FALSE
);

CREATE TABLE ssh (
    id VARCHAR(255) PRIMARY KEY,
    profile_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    host VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY(profile_id) REFERENCES profile(id) ON
    DELETE
        CASCADE
);