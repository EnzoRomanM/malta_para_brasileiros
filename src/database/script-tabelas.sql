create database maltaexperience;
use maltaexperience;


create table usuario (
    idUsuario int primary key auto_increment,
    nome_completo varchar(30),
    cpf char(11) unique,
    email varchar(80) unique,
    senha varchar(50)
);

