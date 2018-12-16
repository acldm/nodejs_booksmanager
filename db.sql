CREATE TABLE books (
    id integer primary key autoincrement,
    bID varchar(30) NOT NULL UNIQUE,
    bName varchar(30) NOT NULL,
    bPub varchar(30) NOT NULL,
    bDate DATE NOT NULL,
    bAuthor varchar(20) NOT NULL,
    bMem varchar(30) NOT NULL,
    bCnt unsigned integer  NOT NULL
)