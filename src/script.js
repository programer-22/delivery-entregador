window.onload = async function () {
  const body = document.querySelector("body");
  const generateButton = document.createElement("div");
  body.appendChild(generateButton);
  generateButton.classList.add("generate-button");
  generateButton.innerHTML =
    '<img src="' + chrome.runtime.getURL("images/light-bulb.png") + '"/>';
  const url = window.location.hostname;
  if (url === "gestordepedidos.ifood.com.br") {
    alert("Estou no ifood");
  } else if (url === "parceiros.quero.io") {
    alert("Estou no quero");
  }
  ifood_address = document.querySelector(
    "#root > div.App > div.App__content > div.sendbird-channel-list.undefined > div > div.internal-content > div > div > div.sc-klphht.geJmDy > div > div.OrderDetails__wrapper > div > div:nth-child(1) > div.Flex-sc-rrnf8w-0.sc-zmges.jvRBXt.grTgpo > span"
  );

  console.log(url);
};
