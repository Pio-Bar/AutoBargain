const cardContainer = document.getElementById("cardContainer");

cardContainer.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName != "BUTTON") return;
  else {
    checkoutUpdate(target);
  }
});

function checkoutUpdate(target) {
  let card = target.parentElement.parentElement.parentElement;
  let cardTitle = card.getElementsByClassName("card-title")[0];
  let cardPrice = card.getElementsByClassName("card-price")[0];
  let cardFullPrice = card.getElementsByClassName("card-full-price")[0];
  let checkoutTitle = document.getElementById("checkoutTitle");
  let checkoutPrice = document.getElementById("checkoutPrice");
  let checkoutSavings = document.getElementById("checkoutSavings");
  let fullPriceParsed = parseFloat(cardFullPrice.innerText.replace(" ", ""));
  let cardPriceParsed = parseFloat(cardPrice.innerText.replace(" ", ""));
  checkoutTitle.innerText = cardTitle.innerText;
  checkoutTitle.value = cardPrice.innerText;
  checkoutPrice.innerText = cardPrice.innerText;
  checkoutSavings.innerText = fullPriceParsed - cardPriceParsed;
}

//ADDING EXTRAS TO CHECKOUT
const addonsContainer = document.getElementById("addonsContainer");

addonsContainer.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName != "INPUT") return;
  else {
    appendAddons(target);
  }
});

function appendAddons(target) {
  let addon = target.parentElement;
  let addonName = addon.getElementsByTagName("p")[0].innerText;
  let addonCost = target.value;
  let addonsCheckout = document.getElementById("addonsCheckout");
  console.log(addonName, addonCost);

  addonsCheckout.innerHTML +=
    `<h4>+ ${addonName}</h4><p class="text-muted">${addonCost} zł</p>`;
}
