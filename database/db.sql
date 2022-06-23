CREATE DATABASE sw1;

USE sw1;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL PRIMARY KEY (id),
  username VARCHAR(30) NOT NULL,
  correo varchar(100) not NULL,
  password VARCHAR(60) NOT NULL,
);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE users ADD COLUMN tokenU varchar(500);  

DESCRIBE users;


SELECT * FROM users;

-- salas TABLE
CREATE TABLE salas (
  id INT(11) NOT NULL PRIMARY KEY (id),
  title VARCHAR(100) NOT NULL,
  xml VARCHAR(255) NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE salas ADD COLUMN tokenS varchar(500);

ALTER TABLE salas
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE salas;

CREATE TABLE userSalas ( 
  id var(11) NOT null PRIMARY KEY AUTO_INCREMENT, 
  user_id int(11) not NULL, 
  salas_id int(11) not NULL, 
  FOREIGN KEY(user_id) REFERENCES users(id), 
  FOREIGN KEY(salas_id) REFERENCES salas(id) 
);


--
--andres 
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  username VARCHAR(50) NOT NULL,
  tokeen varchar(500) not NULL
);


create table Puzzle (
	id varchar(500) not null, 
    PRIMARY KEY (id),
    rowss int,
    cols int,
    imageName varchar(200),
    pieceCount int,
    showMenu boolean 
);

CREATE TABLE players ( 
  id int(11) NOT null AUTO_INCREMENT,
  PRIMARY KEY(id),  
  users_id int(11) not NULL, 
  puzzle_id varchar(500) not NULL, 
  FOREIGN KEY(users_id) REFERENCES users(id), 
  FOREIGN KEY(puzzle_id) REFERENCES puzzle(id) 
);

create table piece (
	id int(11) not null,
    PRIMARY KEY (id),
    x int,
    y int,
    top double (12,2),
    leftt double (12,2),
    isMov boolean,
    user varchar(50)
);
