const makesList = document.getElementById("makesList");
const formSection = document.querySelector("section");
const cardContainer = document.getElementById("cardContainer");
const checkout = document.getElementById("checkout");
const checkoutTitle = document.getElementById("checkoutTitle");
const checkoutPrice = document.getElementById("checkoutPrice");
const checkoutPhoto = document.getElementById("checkoutPhoto");
const addonsContainer = document.getElementById("addonsContainer");
const addonsCheckout = document.getElementById("addonsCheckout");
const addonsButtons = document.querySelectorAll('input[type="checkbox"]');
const form = document.querySelector("form");
const dateInput = document.getElementById("date");
const modal = new bootstrap.Modal(document.getElementById("modal"), {
  keyboard: false,
  backdrop: "static",
});
const modalBody = document.getElementById("modalBody");
const backToMainBtn = document.getElementById("backToMainBtn");
const returnBtn = document.getElementById("returnBtn");

//Displays selected car in the checkout
function selectCar(target) {
  const card = target.parentElement.parentElement.parentElement;
  const cardTitle = card.querySelector("h2");
  const cardPrice = card.querySelector("h1");
  const cardPhoto = card.parentElement.parentElement.querySelector("img");
  checkoutPhoto.src = cardPhoto.src;
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
  const addonLabel = addon.querySelector("label");

  if (target.checked) {
    addonsCheckout.innerHTML += `<div value='${addonCost}' id='${addonID}'><h4>+ ${addonName}</h4><p class="text-muted">${addonCost} zł</p></div>`;
    addonLabel.innerText = "Remove";
    updateTotal();
  } else {
    addonLabel.innerText = "Add";
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

//Filter Cards
function filterCards(make) {
  const cards = document.getElementsByClassName("card");
  for (card of cards) {
    card.classList.remove("hidden");
    if (!card.classList.contains(make) && make !== "allmakes") {
      card.classList.add("hidden");
    }
  }
}

//Hide/Show Main Page
function togglePage() {
  const navList = document.querySelector("ul");
  const toggler = document.getElementById("toggler");
  cardContainer.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
  navList.classList.toggle("hidden");
  toggler.classList.toggle("hidden");
  returnBtn.classList.toggle("hidden");
}

//Back to main page
returnBtn.addEventListener("click", () => togglePage());

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

//Select a make and hide toggler
makesList.addEventListener("click", (e) => {
  e.preventDefault();
  filterCards(e.target.innerText.toLowerCase().replace(" ", ""));
  if (makesList.parentElement.classList.contains("show")) {
    const navButtons = document.getElementById("navbarSupportedContent");
    const bsCollapse = new bootstrap.Collapse(navButtons, "hide");
  }
});

//Get target and select a car
cardContainer.addEventListener("click", (e) => {
  let target = e.target;
  if (target.tagName != "BUTTON") return;
  else {
    selectCar(target);
  }
  togglePage();
  window.scroll(0, 0);
});

//Get target and add a product to checkout
addonsContainer.addEventListener("click", (e) => {
  let target = e.target;
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
    const payWithCash = document.getElementById("option1").checked;
    const confirmName = document.getElementById("confirmName");
    modalBody.innerHTML =
      checkout.innerHTML +
      `<p class="text-center">Method of payment: ${
        payWithCash ? "Cash" : "Leasing"
      }</p>`;
    confirmName.innerText = document.getElementById("inputName").value;
    modal.show();
  }
});

//Set proper date in form
const date = new Date();
const inTwoWeeksDate = date.setDate(date.getDate() + 14);
const inTwoWeeksDateISO = date.toISOString().substr(0, 10);
dateInput.value = inTwoWeeksDateISO;
dateInput.min = inTwoWeeksDateISO;

//reset the page and clear local storage
backToMainBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
