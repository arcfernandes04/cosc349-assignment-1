create table if not exists equipment(
name varchar(50) primary key,
description varchar(300)
);

insert into equipment (name, description) values ("light 2", "db test");