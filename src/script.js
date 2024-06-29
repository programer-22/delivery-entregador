window.onload = async function () {
  const body = document.querySelector("body");
  const generateButton = document.createElement("div");
  body.appendChild(generateButton);
  generateButton.classList.add("generate-button");
  const imageButton = document.createElement("img");
  imageButton.src = chrome.runtime.getURL("images/light-bulb.png");
  generateButton.appendChild(imageButton);

  const url = window.location.hostname;
  if (url === "gestordepedidos.ifood.com.br") {
    // se a imagem for clicada no ifood, procurar se existe a classe 'OrderDetails'
    imageButton.onclick = () => {
      const orderDetails = document.querySelector(".OrderDetails");
      if (orderDetails) {
        const clientName = orderDetails.querySelector("h2").innerText;
        const ButtonLocalizador = orderDetails.querySelector(".ContactButton").innerText;
        const localizador = ButtonLocalizador.split("ID: ")[1];
        const numberLocalizador = ButtonLocalizador.split(" ID: ")[0];
        const clientAddressQuery = orderDetails.querySelectorAll(".InlineList")
        const clientAddress = clientAddressQuery[0].innerText;
        const clientComplement = clientAddressQuery[1].innerText;
        const address = clientAddress.replace("●", " - ") + " - " + clientComplement.replace("●", " - ");
        const spans = orderDetails.querySelectorAll("span");
        const pedidoSpans = Array.from(spans).filter(span => span.textContent.trim().startsWith('Pedido'));
        const pedido = pedidoSpans.map(span => span.textContent.trim().split(' ')[1]).join(', ');
        const linkConfirmacao = 'https://confirmacao-entrega-propria.ifood.com.br/'
        console.log(clientName, localizador, numberLocalizador, address, pedido);
      }
    };
  } else if (url === "parceiros.quero.io") {
    //alert("Estou no quero");
  }

  console.log(url);
};
