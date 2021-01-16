const textContainer = document.querySelector(".container-top");
const greeting = document.querySelector("form[name='greeting']");
const greetText = document.querySelector(".container-top__greeting--text");
const greetInput = document.querySelector(".container-top__greeting--input");
const greetBtn = document.querySelector(".container-top__greeting--edit");
const NAME = "greeting";

function editItem(target) {
  const formContainer = target.parentNode;
  const formName = formContainer.getAttribute("name");
  const formText = document.querySelector(`.container-top__${formName}--name`);
  const selection = window.getSelection();
  formText.setAttribute("contenteditable", true);
  selection.selectAllChildren(formText);
  selection.collapseToEnd();
  formText.focus();
  formText.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      if (formText.innerText == "" || formText.innerText.trim("") == "") {
        loadText();
        return;
      }
      formText.setAttribute("contenteditable", false);
      saveItem(formText.innerText, formName);
    }
  });
  formText.addEventListener("blur", () => {
    if (formText.innerText == "" || formText.innerText.trim("") == "") {
      loadText();
      return;
    }
    formText.setAttribute("contenteditable", false);
    saveItem(formText.innerText, formName);
  });
}

function saveItem(text, target) {
  if (target === greeting || target === "greeting") {
    localStorage.setItem(NAME, text);
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
  if (inputValue === " ") {
    return;
  }
  saveItem(inputValue, target);
  createItem(inputValue, target);
}
function initName() {
  greetInput.classList.remove("hide");
  greetBtn.classList.add("hide");
}
// 아이템 불러오기
function loadText() {
  const loadedName = localStorage.getItem(NAME);
  if (loadedName === null) {
    initName();
    return;
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
