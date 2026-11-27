var respostaModel = require("../models/respostaModel");

// Chamado pelo formulário da Home (index.html): grava 1 resposta
function cadastrar(req, res) {
    var motivo = req.body.motivoServer;
    var cidade = req.body.cidadeServer;
    var prazo = req.body.prazoServer;
    var preocupacao = req.body.preocupacaoServer;

    if (motivo == undefined || motivo == "") {
        res.status(400).send("O motivo está undefined!");
    } else if (cidade == undefined || cidade == "") {
        res.status(400).send("A cidade está undefined!");
    } else if (prazo == undefined || prazo == "") {
        res.status(400).send("O prazo está undefined!");
    } else if (preocupacao == undefined || preocupacao == "") {
        res.status(400).send("A preocupação está undefined!");
    } else {
        respostaModel.cadastrar(motivo, cidade, prazo, preocupacao)
            .then(function (resultado) {
                res.status(200).send("Resposta registrada com sucesso");
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao registrar a resposta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function total(req, res) {
    respostaModel.total()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarMotivos(req, res) {
    respostaModel.listarMotivos()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarCidades(req, res) {
    respostaModel.listarCidades()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarPrazos(req, res) {
    respostaModel.listarPrazos()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarPreocupacoes(req, res) {
    respostaModel.listarPreocupacoes()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    total,
    listarMotivos,
    listarCidades,
    listarPrazos,
    listarPreocupacoes
};
