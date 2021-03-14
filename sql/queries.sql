CREATE TABLE users  (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName  VARCHAR(50) NOT NULL,
  password CHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social_media  (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);


CREATE TABLE social_media_users  (
  userId INT NOT NULL,
  mediaId INT NOT NULL,
  userName  VARCHAR(50) NOT NULL,
  password CHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE social_media_users ADD FOREIGN KEY(userId)
REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE social_media_users ADD FOREIGN KEY(mediaId)
REFERENCES social_media(id) ON DELETE CASCADE;

INSERT INTO users (firstName, lastName, password) VALUES ('Super', 'User', 'admin');
INSERT INTO users (firstName, lastName, password) VALUES ('Test', 'User', 'test');

INSERT INTO social_media (name) VALUES ('Facebook'), ('Twitter'), ('Instagram'), ('Pinterest');