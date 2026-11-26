
const senhaInput = document.querySelector('#senha');
const tentarButton = document.querySelector('#tentar');
const reiniciarButton = document.querySelector('#reiniciar');

const mensagem = document.querySelector('#mensagem');
const tentativasTexto = document.querySelector('#tentativas');
const restantesTexto = document.querySelector('#restantes');

const cofre = document.querySelector('#cofre');

const overview = document.querySelector('#overview');
const resultado = document.querySelector('#resultado');
const jogarNovamente = document.querySelector('#jogar-novamente');
const tituloModal = document.querySelector('#titulo-modal');

let senhaSecreta;
let tentativas;
let jogoAtivo;

// Inicia ou reinicia o jogo

function iniciarJogo() {

    senhaSecreta = Math.floor(Math.random() * 50) + 1;

    tentativas = 0;
    jogoAtivo = true;

    senhaInput.value = '';
    senhaInput.disabled = false;
    tentarButton.disabled = false;

    mensagem.textContent = 'Digite um número para começar.';

    tentativasTexto.textContent = 'Tentativas: 0 / 7';

    restantesTexto.textContent = 'Tentativas restantes: 7';

    restantesTexto.classList.remove('alerta');

    cofre.src = 'img/cofre-fechado.png';
    cofre.classList.remove('aberto');

    overview.classList.remove('ativo');

}

// Verifica o número digitado

function tentarAbrir() {

    if (!jogoAtivo) {
        return;
    }

    const numero = Number(senhaInput.value);

    // Verifica se o número é válido

    if (
        senhaInput.value === '' ||
        !Number.isInteger(numero) ||
        numero < 1 ||
        numero > 50
    ) {

        mensagem.textContent = 'Digite um número inteiro entre 1 e 50!';

        return;
    }

    tentativas++;

    let restantes = 7 - tentativas;

    tentativasTexto.textContent = `Tentativas: ${tentativas} / 7`;

    restantesTexto.textContent = `Tentativas restantes: ${restantes}`;

    // Se acertar a senha

    if (numero === senhaSecreta) {

        mensagem.textContent = 'Senha correta!';

        cofre.src = 'img/cofre-aberto.png';
        cofre.classList.add('aberto');

        jogoAtivo = false;

        senhaInput.disabled = true;
        tentarButton.disabled = true;

        tituloModal.textContent = 'Cofre desbloqueado!';

        resultado.textContent = `Você descobriu a senha em ${tentativas} tentativa(s)!`;

        overview.classList.add('ativo');

        return;
    }

    // Se errar a senha

    if (numero < senhaSecreta) {

        mensagem.textContent = 'A senha é maior!';

    } else {

        mensagem.textContent = 'A senha é menor!';

    }

    // Alerta quando restarem apenas duas tentativas

    if (restantes <= 2) {

        restantesTexto.classList.add('alerta');

        mensagem.textContent += ` Cuidado! Restam apenas ${restantes} tentativa(s)!`;

    }

    // Se acabar as tentativas

    if (tentativas === 7) {

        jogoAtivo = false;

        senhaInput.disabled = true;
        tentarButton.disabled = true;

        tituloModal.textContent = 'Cofre bloqueado!';

        resultado.textContent = `Você não conseguiu abrir o cofre. A senha era ${senhaSecreta}.`;

        overview.classList.add('ativo');

    }

    senhaInput.value = '';
    senhaInput.focus();

}

// Eventos dos botões

tentarButton.addEventListener('click', tentarAbrir);

reiniciarButton.addEventListener('click', iniciarJogo);

jogarNovamente.addEventListener('click', iniciarJogo);

// Permite tentar a senha apertando Enter

senhaInput.addEventListener('keydown', function(event) {

    if (event.key === 'Enter') {

        tentarAbrir();

    }

});

// Inicia o jogo ao abrir a página

iniciarJogo();
