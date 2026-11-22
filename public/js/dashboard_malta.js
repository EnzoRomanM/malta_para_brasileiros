// ===== DASHBOARD MALTA EXPERIENCE =====
// Chamada quando a página carrega: busca os dados de cada rota e manda para a função que desenha
function obterDados() {
    validarSessao();

    // letra menor nos gráficos para tudo caber na tela
    Chart.defaults.font.size = 10;

    fetch('/respostas/total')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            mostrarTotal(data);
        })
        .catch(function (err) {
            console.log(err);
            div_exibir.innerHTML = "<span style='color: red'>Não foi possível buscar os dados. Confira se o servidor está rodando.</span>";
        });

    fetch('/respostas/motivos')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            plotarGraficoMotivos(data);
        })
        .catch(function (err) {
            console.log(err);
        });

    fetch('/respostas/cidades')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            plotarGraficoCidades(data);
        })
        .catch(function (err) {
            console.log(err);
        });

    fetch('/respostas/prazos')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            plotarGraficoPrazos(data);
        })
        .catch(function (err) {
            console.log(err);
        });

    fetch('/respostas/preocupacoes')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            plotarGraficoPreocupacoes(data);
        })
        .catch(function (err) {
            console.log(err);
        });
}


// Card "Total de respostas"
function mostrarTotal(dados) {
    div_total.innerHTML = dados[0].total;

    if (dados[0].total == 0) {
        div_exibir.innerHTML = "Ainda não há respostas. Responda o formulário da página inicial para os gráficos aparecerem.";
    }
}


// Gráfico de pizza: motivo da mudança + card "Motivo mais comum"
function plotarGraficoMotivos(dados) {
    var motivos = [];
    var quantidades = [];
    var soma = 0;

    // Separando os nomes e as quantidades, e somando o total
    for (var i = 0; i < dados.length; i++) {
        quantidades.push(dados[i].quantidade);
        soma = soma + dados[i].quantidade;
    }

    // Nomes dos motivos + legenda ao lado da pizza
    var legenda = "";
    for (var i = 0; i < dados.length; i++) {
        motivos.push(dados[i].nome);
        legenda = legenda + "<div class='item_legenda'><div class='bolinha cor_" + i + "'></div><div class='nome_legenda'>" + dados[i].nome + "</div><b>" + quantidades[i] + "</b></div>";
    }
    div_legenda_motivo.innerHTML = legenda;

    // A lista já vem do maior para o menor, então o primeiro é o mais comum
    if (soma > 0) {
        div_motivo_top.innerHTML = dados[0].nome;
        div_motivo_detalhe.innerHTML = quantidades[0] + " de " + soma + " respostas";
    } else {
        div_motivo_top.innerHTML = "-";
    }

    var ctx = document.getElementById('canvas_motivo').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: motivos,
            datasets: [{
                label: 'Respostas',
                data: quantidades,
                backgroundColor: ['#FFE05A', '#00CB69', '#007A3D', '#0A2F5C']
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}


// Gráfico de barras: ranking das cidades + card "Cidade mais escolhida"
function plotarGraficoCidades(dados) {
    var cidades = [];
    var quantidades = [];
    var soma = 0;

    for (var i = 0; i < dados.length; i++) {
        quantidades.push(dados[i].quantidade);
        soma = soma + dados[i].quantidade;
    }

    for (var i = 0; i < dados.length; i++) {
        cidades.push((i + 1) + "º " + dados[i].nome);
    }

    if (soma > 0) {
        div_cidade_top.innerHTML = dados[0].nome;
        div_cidade_detalhe.innerHTML = quantidades[0] + " de " + soma + " respostas";
    } else {
        div_cidade_top.innerHTML = "-";
    }

    var ctx = document.getElementById('canvas_cidades').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: cidades,
            datasets: [{
                label: 'Respostas',
                data: quantidades,
                backgroundColor: '#F75D37'
            }]
        },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            scales: { x: { grid: { display: false }, ticks: { precision: 0 } }, y: { grid: { display: false }, ticks: { autoSkip: false } } },
            plugins: { legend: { display: false } }
        }
    });
}


// Gráfico de colunas: quando pretendem viajar
function plotarGraficoPrazos(dados) {
    var prazos = [];
    var quantidades = [];
    var soma = 0;

    for (var i = 0; i < dados.length; i++) {
        quantidades.push(dados[i].quantidade);
        soma = soma + dados[i].quantidade;
    }

    for (var i = 0; i < dados.length; i++) {
        prazos.push(dados[i].nome);
    }

    var ctx = document.getElementById('canvas_quando').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: prazos,
            datasets: [{
                label: 'Respostas',
                data: quantidades,
                backgroundColor: '#FFE05A'
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: { x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: false } }, y: { grid: { display: false }, ticks: { precision: 0 } } },
            plugins: { legend: { display: false } }
        }
    });
}


// Gráfico de barras: o que mais preocupa + card "Maior preocupação"
function plotarGraficoPreocupacoes(dados) {
    var preocupacoes = [];
    var quantidades = [];
    var soma = 0;

    for (var i = 0; i < dados.length; i++) {
        quantidades.push(dados[i].quantidade);
        soma = soma + dados[i].quantidade;
    }

    for (var i = 0; i < dados.length; i++) {
        preocupacoes.push(dados[i].nome);
    }

    if (soma > 0) {
        div_preocupacao_top.innerHTML = dados[0].nome;
        div_preocupacao_detalhe.innerHTML = quantidades[0] + " de " + soma + " respostas";
    } else {
        div_preocupacao_top.innerHTML = "-";
    }

    var ctx = document.getElementById('canvas_preocupacao').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: preocupacoes,
            datasets: [{
                label: 'Respostas',
                data: quantidades,
                backgroundColor: '#00CB69'
            }]
        },
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            scales: { x: { grid: { display: false }, ticks: { precision: 0 } }, y: { grid: { display: false }, ticks: { autoSkip: false } } },
            plugins: { legend: { display: false } }
        }
    });
}