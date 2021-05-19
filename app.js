const cardContainer = document.getElementById("cardContainer");
const checkoutTitle = document.getElementById("checkoutTitle");
const checkoutPrice = document.getElementById("checkoutPrice");
const addonsContainer = document.getElementById("addonsContainer");
const addonsCheckout = document.getElementById("addonsCheckout");
const addonsButtons = document.querySelectorAll('input[type="checkbox"]');
const form = document.querySelector("form");
const dateInput = document.getElementById("date");

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
  fromLocalStorage();
  for (button of addonsButtons) {
    if (button.checked) {
      addProductToCheckout(button);
    }
  }
}
initialSetup();

//Get target and select a car
cardContainer.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName != "BUTTON") return;
  else {
    selectCar(target);
  }
});

//Save to local storage
form.addEventListener("change", (e) => {
  const targetID = e.target.id;
  const targetValue = e.target.value;
  const targetChecked = e.target.checked;
  if (e.target.id[0] === "i") {
    localStorage.setItem(targetID, targetValue);
  } else {
    localStorage.setItem("option1", false);
    localStorage.setItem("option2", false);
    localStorage.setItem(targetID, targetChecked);
  }
});

//Load from local storage
function fromLocalStorage() {
  for (key of Object.keys(localStorage)) {
    let savedValue = localStorage.getItem(key);
    if (key[0] === "i") {
      document.getElementById(key).value = savedValue;
    } else {
      document.getElementById(key).checked = savedValue === "true";
    }
  }
}

//Get target and add a product to checkout
addonsContainer.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName != "INPUT") return;
  else {
    addProductToCheckout(target);
  }
});

//Validate and execute form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    //Scroll to First invalid Input
    form
      .querySelectorAll("input.form-control:invalid")[0]
      .scrollIntoView({ block: "center" });
  } else {
    console.log("THanks for Buying!");
  }
});

//Set in two weeks date in form
const date = new Date();
const inTwoWeeksDate = date.setDate(date.getDate() + 14);
const inTwoWeeksDateISO = date.toISOString().substr(0, 10);
dateInput.value = inTwoWeeksDateISO;
dateInput.min = inTwoWeeksDateISO;
