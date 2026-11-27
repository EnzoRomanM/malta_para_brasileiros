var database = require("../database/config");

// O count com left join faz a opção que ninguém escolheu aparecer com 0.

function total() {
    var instrucaoSql = `
        select count(*) as total from resposta;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarMotivos() {
    var instrucaoSql = `
        select motivo.nome, count(resposta.idResposta) as quantidade
        from motivo left join resposta on resposta.fkMotivo = motivo.idMotivo
        group by motivo.idMotivo, motivo.nome
        order by quantidade desc, motivo.idMotivo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarCidades() {
    var instrucaoSql = `
        select cidade.nome, count(resposta.idResposta) as quantidade
        from cidade left join resposta on resposta.fkCidade = cidade.idCidade
        group by cidade.idCidade, cidade.nome
        order by quantidade desc, cidade.idCidade;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPrazos() {
    var instrucaoSql = `
        select prazo.nome, count(resposta.idResposta) as quantidade
        from prazo left join resposta on resposta.fkPrazo = prazo.idPrazo
        group by prazo.idPrazo, prazo.nome
        order by prazo.idPrazo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPreocupacoes() {
    var instrucaoSql = `
        select preocupacao.nome, count(resposta.idResposta) as quantidade
        from preocupacao left join resposta on resposta.fkPreocupacao = preocupacao.idPreocupacao
        group by preocupacao.idPreocupacao, preocupacao.nome
        order by quantidade desc, preocupacao.idPreocupacao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(motivo, cidade, prazo, preocupacao) {
    var instrucaoSql = `
        insert into resposta (fkMotivo, fkCidade, fkPrazo, fkPreocupacao)
        values (${Number(motivo)}, ${Number(cidade)}, ${Number(prazo)}, ${Number(preocupacao)});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    total,
    listarMotivos,
    listarCidades,
    listarPrazos,
    listarPreocupacoes,
    cadastrar
};
