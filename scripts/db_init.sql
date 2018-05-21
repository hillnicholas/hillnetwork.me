

/* Initialize database script */
DROP DATABASE
CREATE DATABASE hillnetworkdb;
USE hillnetworkdb;


/* The main content table */
CREATE TABLE blog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ts TIMESTAMP,
    post_time DATETIME NOT NULL,
    content JSON
);


/* user table - only passwordhash is stored. */
CREATE TABLE users (
    username VARCHAR(20) AUTO_INCREMENT PRIMARY KEY,
    passwordhash VARCHAR(25) NOT NULL
);


GRANT SELECT ON hillnetworkdb.blog TO "content_read"@"databasehost" IDENTIFIED BY "us3LNkBjBGIG7NQbi5d1tFFqBL0dUI";
GRANT INSERT ON hillnetworkdb.blog TO "content_edit"@"databasehost" IDENTIFIED BY "GJFna3V6EpD58xZEF1NBWoGZe6QLV8";
GRANT SELECT ON hillnetworkdb.users TO "authenticator"@"databasehost" IDENTIFIED BY "UJYRRAAWITKRMMyqdlhjNozwTTOlgm";



/* password is "testtest" */
INSERT INTO users VALUES ( "nick", "125d6d03b32c84d492747f79cf0bf6e179d287f341384eb5d6d3197525ad6be8e6df0116032935698f99a09e265073d1d6c32c274591bf1d0a20ad67cba921bc");
