var express = require("express");
var router = express.Router();

var respostaController = require("../controllers/respostaController");

// O formulário da Home chama /respostas/cadastrar
router.post("/cadastrar", function (req, res) {
    respostaController.cadastrar(req, res);
});

// O dashboard chama estas rotas para montar os cards e os gráficos
router.get("/total", function (req, res) {
    respostaController.total(req, res);
});

router.get("/motivos", function (req, res) {
    respostaController.listarMotivos(req, res);
});

router.get("/cidades", function (req, res) {
    respostaController.listarCidades(req, res);
});

router.get("/prazos", function (req, res) {
    respostaController.listarPrazos(req, res);
});

router.get("/preocupacoes", function (req, res) {
    respostaController.listarPreocupacoes(req, res);
});

module.exports = router;
