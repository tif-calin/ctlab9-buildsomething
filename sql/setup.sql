DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  birthday TEXT NOT NULL
);
