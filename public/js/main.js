var tempoInicial = $("#tempo-digitacao").text();
var campoDigitacao = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();

    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();

    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });

    $(".tooltip").tooltipster({
        trigger: "custom"
    });
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();

    var numPalavras = frase.split(" ").length;

    var tamanhoFrase = $("#numero-palavras");

    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function inicializaContadores(){
    campoDigitacao.on("input", function(){
        var conteudo = campoDigitacao.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro(){
    campoDigitacao.one("focus", function(){
        var tempoRestante = tempoInicial;

        $("#botao-reiniciar").attr("disabled", true);

        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo(){
    $("#botao-reiniciar").attr("disabled", false);

    campoDigitacao.attr("disabled", true);

    campoDigitacao.addClass("campo-desativado");

    inserePlacar();
}

function inicializaMarcadores(){
    

    campoDigitacao.on("input", function(){
        var frase = $(".frase").text();

        var digitado = campoDigitacao.val();

        if(frase.startsWith(digitado)){
            campoDigitacao.removeClass("conteudo-digitado-errado");
            campoDigitacao.addClass("conteudo-digitado-correto");
        } else {
            campoDigitacao.removeClass("conteudo-digitado-correto");
            campoDigitacao.addClass("conteudo-digitado-errado");
        }
    });
}



function reiniciaJogo(){
    campoDigitacao.attr("disabled", false);

    campoDigitacao.val("");

    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");

    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();
    
    campoDigitacao.removeClass("campo-desativado");

    campoDigitacao.removeClass("conteudo-digitado-errado");
    campoDigitacao.removeClass("conteudo-digitado-correto");
}