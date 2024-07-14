window.onload = async function () {
  const body = document.querySelector("body");
  const generateButton = document.createElement("div");
  body.appendChild(generateButton);
  generateButton.classList.add("generate-button");
  const imageButton = document.createElement("img");
  imageButton.src = chrome.runtime.getURL("images/lampada.png");
  generateButton.appendChild(imageButton);

  const url = window.location.hostname;
  if (url === "gestordepedidos.ifood.com.br") {
    imageButton.onclick = () => {
      imageButton.src = chrome.runtime.getURL("images/light-bulb.png");
      const orderCards = document.querySelectorAll(
        'div[data-test-id$="-order-card"]'
      );

      orderCards.forEach((card) => {
        card.addEventListener("click", function (event) {
          console.log("Clicou em : ", event.currentTarget.innerText);
          // Remove o ícone do WhatsApp existente, se houver
          const existingWhatsAppLinks =
            document.querySelectorAll(".whatsapp-link");
          existingWhatsAppLinks.forEach((link) => link.remove());
          setTimeout(() => {
            const orderDetails = document.querySelector(".OrderDetails");
            if (orderDetails) {
              const clientName = orderDetails.querySelector("h2").innerText;
              const ButtonLocalizador =
                orderDetails.querySelector(".ContactButton").innerText;
              const localizador = ButtonLocalizador.split("ID: ")[1];
              const numberLocalizador = ButtonLocalizador.split(" ID: ")[0];
              const clientAddressQuery =
                orderDetails.querySelectorAll(".InlineList");
              const clientAddress = clientAddressQuery[0].innerText;
              const clientComplement = clientAddressQuery[1].innerText;
              const address =
                clientAddress.replace("●", " - ") +
                " - " +
                clientComplement.replace("●", " - ");
              const spans = orderDetails.querySelectorAll("span");
              const pedidoSpans = Array.from(spans).filter((span) =>
                span.textContent.trim().startsWith("Pedido")
              );
              const pedido = pedidoSpans
                .map((span) => span.textContent.trim().split(" ")[1])
                .join(", ");
              const linkConfirmacao =
                "https://confirmacao-entrega-propria.ifood.com.br/";
              const googleMapsLink = `https://www.google.com/maps/place/${encodeURIComponent(
                clientAddress.replace("●", " - ")
              )}`;
              const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(
                clientAddress.replace("●", " - ")
              )}`;
              const message = `
Pedido: *${pedido}*
Cliente: *${clientName}*
*Endereço:* ${address}

------------------------------
*Google Maps:*
${googleMapsLink}
______________________________
*Waze:*
${wazeLink}
------------------------------
*Localizador:* ${localizador}

-----------------------------
*Link de confirmação:* ${linkConfirmacao}
-----------------------------
Em caso de problemas, ligue para:
${numberLocalizador.replace(" ", "")}
            `;

              if (document.querySelectorAll(".whatsapp-link").length === 0) {
                const whatsAppLink = document.createElement("a");
                whatsAppLink.href =
                  "https://api.whatsapp.com/send/?text=" +
                  encodeURIComponent(message);
                whatsAppLink.target = "_blank";
                whatsAppLink.classList.add("whatsapp-link");
                const imagemWhatsapp = document.createElement("img");
                imagemWhatsapp.src = chrome.runtime.getURL(
                  "images/whatsapp.png"
                );
                whatsAppLink.appendChild(imagemWhatsapp);

                orderDetails
                  .querySelector(" header > div:nth-child(1) > div > div")
                  .appendChild(whatsAppLink);
              }
            }
          }, 1000);
        });
      });
    };
  } else if (url === "parceiros.quero.io") {
    imageButton.onclick = () => {
      imageButton.src = chrome.runtime.getURL("images/light-bulb.png");

      // Seleciona todos os cards
      const orderCards = document.querySelectorAll('div[data-cy="order-card"]');

      // Função para criar o observer
      function createObserver() {
        const targetNode = document.getElementById("root");

        const config = { childList: true, subtree: true };

        const callback = function (mutationsList, observer) {
          for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
              mutation.addedNodes.forEach((node) => {
                if (
                  node.matches &&
                  node.matches('div[data-cy="modal-order-details"]')
                ) {
                  const existingWhatsAppLinks =
                    document.querySelectorAll(".whatsapp-link");
                  existingWhatsAppLinks.forEach((link) => link.remove());
                  const orderDetails = node;
                  // adicionar uma div alerta para o usuário
                  const alertDiv = document.createElement("div");
                  alertDiv.innerHTML =
                    "<h3>O número para contato não pode ser encontrado automaticamente. Por favor, insira manualmente.</h3>";
                  alertDiv.style =
                    "background-color: #f44336; color: white; position: fixed; top: 0; left: 0; width: 100%; text-align: center; padding: 10px; z-index: 9999;";
                  document.body.appendChild(alertDiv);
                  setTimeout(() => {
                    alertDiv.remove();
                  }, 3000);
                  const clientName = orderDetails.querySelectorAll(
                    'div[class^="_usuarioName_"]'
                  )[0].innerText;
                  const clientAddress = orderDetails.querySelectorAll(
                    'div[class^="_endereco_"]'
                  )[0].innerText;
                  const clientComplement = orderDetails.querySelectorAll(
                    'div[class^="_enderecoDown_"]'
                  )[0].innerText;
                  const clientAddressAdditional = orderDetails.querySelectorAll(
                    'div[class^="_enderecoReferencia_"]'
                  )[0].innerText;
                  const address =
                    clientAddress +
                    " - " +
                    clientComplement +
                    " - " +
                    clientAddressAdditional;
                  const spans = orderDetails.querySelectorAll("span");
                  const pedido = orderDetails.querySelector(
                    "div.name-icon-modal strong"
                  ).innerText;
                  const googleMapsLink = `https://www.google.com/maps/place/${encodeURIComponent(
                    clientAddress + " , " + clientComplement
                  )}`;
                  const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(
                    clientAddress + " , " + clientComplement
                  )}`;
                  const message = `
Pedido: *${pedido}*
Cliente: *${clientName}*
*Endereço:* ${address}
------------------------------
*Google Maps:*
${googleMapsLink}
______________________________
*Waze:*
${wazeLink}
------------------------------
            `;
                  console.log(message);

                  const header = orderDetails.querySelectorAll(
                    'div[class^="_headerPedido_"]'
                  )[0];
                  const whatsAppLink = document.createElement("a");
                  whatsAppLink.href =
                    "https://api.whatsapp.com/send/?text=" +
                    encodeURIComponent(message);
                  whatsAppLink.target = "_blank";
                  whatsAppLink.classList.add("whatsapp-link");
                  const imagemWhatsapp = document.createElement("img");
                  imagemWhatsapp.src = chrome.runtime.getURL(
                    "images/whatsapp.png"
                  );
                  whatsAppLink.appendChild(imagemWhatsapp);
                  header.appendChild(whatsAppLink);
                }
              });
            }
          }
        };

        const observer = new MutationObserver(callback);

        observer.observe(targetNode, config);
      }

      // Função para adicionar o evento de clique aos cards
      function addClickEventListener() {
        orderCards.forEach((card) => {
          card.addEventListener("click", createObserver);
        });
      }

      // Chama a função para adicionar os event listeners
      addClickEventListener();
    };
  }

  console.log(url);
};
