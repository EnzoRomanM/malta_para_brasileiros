create database maltaexperience;
use maltaexperience;


create table usuario (
    idUsuario int primary key auto_increment,
    nome_completo varchar(30),
    cpf char(11) unique,
    email varchar(80) unique,
    senha varchar(50)
);


create table motivo (
    idMotivo int primary key auto_increment,
    nome varchar(30)
);

create table cidade (
    idCidade int primary key auto_increment,
    nome varchar(30)
);

create table prazo (
    idPrazo int primary key auto_increment,
    nome varchar(30)
);

create table preocupacao (
    idPreocupacao int primary key auto_increment,
    nome varchar(30)
);


-- Cada envio do formulário vira uma linha aqui (anônima, sem ligação com usuario)
create table resposta (
    idResposta int primary key auto_increment,
    fkMotivo int,
    fkCidade int,
    fkPrazo int,
    fkPreocupacao int,
    foreign key (fkMotivo) references motivo(idMotivo),
    foreign key (fkCidade) references cidade(idCidade),
    foreign key (fkPrazo) references prazo(idPrazo),
    foreign key (fkPreocupacao) references preocupacao(idPreocupacao)
);


-- As opções entram primeiro, porque a resposta depende delas.
-- A ordem dos inserts define o id (1, 2, 3...) e precisa bater com os value do formulário (index.html).
insert into motivo (nome) values
    ('Estudar'),
    ('Trabalhar'),
    ('Estudar e trabalhar'),
    ('Conhecer e avaliar');

insert into cidade (nome) values
    ('Valletta'),
    ('Sliema'),
    ('St. Julian''s'),
    ('Mdina'),
    ('Ainda não decidi');

insert into prazo (nome) values
    ('Em até 3 meses'),
    ('Entre 3 e 6 meses'),
    ('Entre 6 e 12 meses'),
    ('Em mais de 1 ano');

insert into preocupacao (nome) values
    ('Visto e documentos'),
    ('Moradia'),
    ('Custo de vida'),
    ('Trabalho'),
    ('Idioma');
