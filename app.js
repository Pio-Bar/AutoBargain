const cardContainer = document.getElementById("cardContainer");
const checkoutTitle = document.getElementById("checkoutTitle");
const checkoutPrice = document.getElementById("checkoutPrice");
const addonsContainer = document.getElementById("addonsContainer");
const addonsCheckout = document.getElementById("addonsCheckout");
const addonsButtons = document.querySelectorAll('input[type="checkbox"]');

//Displays selected car in the checkout
function selectCar(target) {
  const card = target.parentElement.parentElement.parentElement;
  const cardTitle = card.querySelector("h2");
  const cardPrice = card.querySelector("h1");
  checkoutTitle.innerText = cardTitle.innerText;
  checkoutTitle.value = parseInt(
    cardPrice.innerText.replace(" ", "").slice(0, -2)
  );
  updateTotal();
}

//Adds additional items to checkout
function addProductToCheckout(target) {
  const addon = target.parentElement;
  const addonName = addon.querySelector("p").innerText;
  const addonID = addonName.split(" ").pop();
  const addonCost = target.value;

  if (target.checked) {
    addonsCheckout.innerHTML += `<div value='${addonCost}' id='${addonID}'><h4>+ ${addonName}</h4><p class="text-muted">${addonCost} zł</p></div>`;
    updateTotal();
  } else {
    document.getElementById(addonID).remove();
    updateTotal();
  }
}

//Update total price
function updateTotal() {
  const carPrice = checkoutTitle.value;
  let addonsPrice = 0;

  for (let child of addonsCheckout.children) {
    addonsPrice += +child.getAttribute("value");
  }
  checkoutPrice.innerText = +carPrice + addonsPrice;
}

//Initial Setup of the page
function initialSetup() {
  for (button of addonsButtons) {
    if (button.checked) {
      addProductToCheckout(button);
    }
  }
}

//Get target and select a car
cardContainer.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName != "BUTTON") return;
  else {
    selectCar(target);
  }
});

//Get target and add a product to checkout
addonsContainer.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName != "INPUT") return;
  else {
    addProductToCheckout(target);
  }
});

initialSetup();
