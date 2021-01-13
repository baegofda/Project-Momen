const greetingForm = document.querySelector(".container-top__greeting");
const greetingName = document.querySelector(".container-top__greeting--name");
const greetingNameText = document.querySelector(
  ".container-top__greeting--name-text"
);
const greetingInput = document.querySelector(".container-top__greeting--input");
const greetingText = document.querySelector(".container-top__greeting--text");
const greetingEditBtn = document.querySelector(".container-top__greeting--btn");
const focusForm = document.querySelector(".container-top__focus");
const USER = "user";
const getUser = localStorage.getItem(USER);

function editName() {
  const trimText = greetingNameText.innerText.trim("");
  if (greetingNameText.textContent === "" || trimText === "") {
    saveName(getUser);
    getGreetingName(getUser);
  }
  saveName(greetingNameText.innerText);
  greetingNameText.removeAttribute("contenteditable");
}

greetingEditBtn.addEventListener("click", (e) => {
  const selection = window.getSelection();
  greetingNameText.setAttribute("contenteditable", true);
  greetingNameText.focus();
  selection.selectAllChildren(greetingNameText);
  selection.collapseToEnd();
  greetingNameText.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      editName();
    }
  });
  greetingNameText.addEventListener("blur", () => editName());
});

function getGreetingName(getUser) {
  greetingName.classList.remove("hide");
  focusForm.classList.remove("hide");
  greetingText.childNodes[0].textContent = `Hello, `;
  greetingNameText.innerText = `${getUser}`;
  greetingInput.classList.add("hide");
}

function saveName(userName) {
  localStorage.setItem(USER, userName);
}

function handleSubmit(e) {
  e.preventDefault();
  const greetingInputValue = greetingInput.value;
  if (greetingInputValue === " ") {
    return;
  }
  saveName(greetingInputValue);
  getGreetingName(greetingInputValue);
}
function askName() {
  focusForm.classList.add("hide");
  greetingName.classList.add("hide");
  greetingInput.classList.remove("hide");
  greetingForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  if (getUser === null) {
    askName();
  } else {
    getGreetingName(getUser);
  }
}

function init() {
  loadName();
}

init();
