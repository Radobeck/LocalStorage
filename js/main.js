const formData = document.querySelector(".button");
const inpName = document.querySelector(".inp_name");
const inpPhoneNumber = document.querySelector(".inp_phone");
const inpPassword = document.querySelector(".inp_password");
const inpPasswordSecond = document.querySelector(".inp_password_second");

const setDataLS = (newData) => {
  const lsData = JSON.parse(localStorage.getItem("to-do"));
  if (!lsData) {
    localStorage.setItem("to-do", JSON.stringify([]));
  } else if (newData) {
    const dataArr = JSON.parse(localStorage.getItem("to-do"));
    dataArr.push(newData);
    localStorage.setItem("to-do", JSON.stringify(dataArr));
  }
};

setDataLS();
const setData = () => {
  if (
    !inpName.value.trim("") ||
    !inpPhoneNumber.value.trim("") ||
    !inpPassword.value.trim("") ||
    !inpPasswordSecond.value.trim("") ||
    inpPassword.value !== inpPasswordSecond.value
  ) {
    alert("Error");
    return;
  } else {
    const newData = {
      name: inpName.value,
      phone: inpPhoneNumber.value,
      password: inpPassword.value,
      passwordSecond: inpPasswordSecond.value,
    };
    setDataLS(newData);
  }
};

formData.addEventListener("click", setData);

const resultElem = document.querySelector(".result");

function getDataLS() {
  const data = JSON.parse(localStorage.getItem("to-do"));
  resultElem.innerHTML = "";
  data.forEach(
    (item) =>
      (resultElem.innerHTML += `<div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${item.phone}</h6>
    <p class="card-text">${item.password}</p>
    <a href="#" class="card-delete">DELETE</a>
    <a href="#" class="card-edit">EDIT</a>
    </div>
    </div>`)
  );
}
getDataLS();

resultElem.addEventListener("click", (event) => {
  if (event.target.classList.contains("card-delete")) {
    const cardElement = event.target.closest(".card");
    const cardName = cardElement.querySelector(".card-title").textContent;

    removeDataLS(cardName);

    cardElement.remove();
  }
});

const removeDataLS = (cardName) => {
  const dataArr = JSON.parse(localStorage.getItem("to-do"));
  const updatedData = dataArr.filter((item) => item.name !== cardName);
  localStorage.setItem("to-do", JSON.stringify(updatedData));
};

resultElem.addEventListener("click", (event) => {
  if (event.target.classList.contains("card-edit")) {
    const cardElement = event.target.closest(".card");
    const cardName = cardElement.querySelector(".card-title").textContent;

    const dataArr = JSON.parse(localStorage.getItem("to-do"));
    const cardData = dataArr.find((item) => item.name === cardName);

    inpName.value = cardData.name;
    inpPhoneNumber.value = cardData.phone;
    inpPassword.value = cardData.password;
    inpPasswordSecond.value = cardData.passwordSecond;

    removeDataLS(cardName);
  }
});
