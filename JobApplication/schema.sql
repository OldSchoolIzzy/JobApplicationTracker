DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS application;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE application (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  date_applied TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  status TEXT NOT NULL,
  interest_level TEXT NOT NULL,
  salary INTEGER NOT NULL,
  stage TEXT NOT NULL,
  website TEXT NOT NULL,
  note TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user (id)
);