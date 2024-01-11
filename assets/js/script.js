function palavraSecreta() {
  var palavras = {
    Animal: [
      "Gato",
      "Tigre",
      "Cachorro",
      "Rato",
      "Golfinho",
      "Macaco",
      "Gaivota",
    ],
    Cor: [
      "Amarelo",
      "Azul",
      "Vermelho",
      "Verde",
      "Laranja",
      "Vermelho",
      "Rosa",
    ],
    Frutas: [
      "Abacaxi",
      "Banana",
      "Melancia",
      "Ameixa",
      "Kiwi",
      "Maracuja",
      "Pessego",
    ],
  };

  setTimeout(() => {
    console.log("oi");
    document.getElementById("inputTeclado").focus();
  }, 100);

  var dicas = Object.keys(palavras);
  var dicaEscolhida = dicas[Math.floor(Math.random() * dicas.length)];

  var palavrasDaDica = palavras[dicaEscolhida];
  var palavraEscolhida =
    palavrasDaDica[Math.floor(Math.random() * palavrasDaDica.length)];

  return { dica: dicaEscolhida, palavra: palavraEscolhida };
}

var data = palavraSecreta();
document.getElementById("dica").textContent = data.dica;
let palavra = data.palavra;
let palavraFormada = [];
for (let i = 0; i < palavra.length; i++) {
  let divPalavraSecreta = document.getElementById("palavra-secreta");
  let divLetra = document.createElement("div");
  divLetra.setAttribute("class", "letter-box");
  divPalavraSecreta.appendChild(divLetra);
  palavraFormada.push("");
}

const container = document.querySelector("#jogo");
const fireworks = new Fireworks.default(container);
function startFogos() {
  fireworks.start();
}
var erros = 0;
const partes = [
  "cabeca",
  "corpo",
  "braco esquerdo",
  "braco direito",
  "perna esquerda",
  "perna direita",
];
let chances = partes.length;
document.getElementById("chances").innerText = `${chances} Tentativas`


document.addEventListener("keydown", (event) => {
  tecla = event.key;
  if (/^[a-zA-Z]$/.test(tecla)) {
    if (palavra.toLowerCase().includes(tecla.toLowerCase())) {
      for (let i in palavra) {
        if (palavra[i].toLowerCase() == tecla.toLowerCase()) {
          document.getElementById("palavra-secreta").children[i].textContent =
            tecla.toUpperCase();
          palavraFormada[i] = tecla;
        }
        if (
          palavra.toLowerCase() == palavraFormada.join("").toLocaleLowerCase()
        ) {
          startFogos();
        }
      }
    } else {
      let foi = false;
      chances -= 1;
      if(chances > 0){
        document.getElementById("chances").innerText = `${chances} Tentativas`
      }else{
        document.getElementById("chances").innerText = 'Fim de Jogo, Perdeu!'
      }
      
      if (chances == 0) {
        document.getElementById("buttonReload").disabled = false;
      }
      boneco = document.getElementById("boneco-palito");
      for (let i in partes) {
        if (
          !foi &&
          document.getElementById(partes[i]).style.display == "none"
        ) {
          document.getElementById(partes[i]).style.display = "block";
          foi = true;
        }
      }
    }
  }
});

function startAgain() {
  location.reload();
}
