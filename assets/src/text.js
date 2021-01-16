const textContainer = document.querySelector(".container-top");
const greeting = document.querySelector("form[name='greeting']");
const greetText = document.querySelector(".container-top__greeting--text");
const greetInput = document.querySelector(".container-top__greeting--input");
const greetBtn = document.querySelector(".container-top__greeting--edit");
const NAME = "name";

function editItem(target) {
  const formContainer = target.parentNode;
  console.log(formContainer);
}

function saveItem(text, target) {
  if (target === greeting) {
    localStorage.setItem(NAME, text);
  }
  if (target === focus) {
    localStorage.setItem(FOCUS, text);
  }
}

function createItem(inputValue, target) {
  const div = document.createElement("div");
  if (target === greeting || target === "greeting") {
    greetInput.classList.add("hide");
    greetBtn.classList.remove("hide");
    div.setAttribute("class", "container-top__greeting--name");
    div.innerText = `${inputValue}`;
    greetText.innerText = "Have A Nice Day !";
    greetText.appendChild(div);
  }
}

function handleSubmit(target) {
  const input = target.querySelector("input[type=text]");
  const inputValue = input.value;
  saveItem(inputValue, target);
  createItem(inputValue, target);
  input.value = "";
}
// 아이템 불러오기
function loadText() {
  const loadedName = localStorage.getItem(NAME);
  if (loadedName === null) {
    // initName();
  } else {
    createItem(loadedName, "greeting");
  }
}

// loadText
function init() {
  loadText();
  textContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target;
    handleSubmit(target);
  });
  textContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.dataset.type === "edit") editItem(target);
  });
}

init();
