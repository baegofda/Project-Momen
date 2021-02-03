const todoForm = document.querySelector(
  ".container-bottom--container__container--form"
);
const todosContainer = document.querySelector(
  ".container-bottom--container__container--list"
);
const todoInput = document.querySelector(
  ".container-bottom--container__container--input"
);
const noList = document.querySelector(".no-list");
const TODOS = "todos";
let todos = [];
let i = 0;

// 리스트가 체크될때
function checkList(target) {
  if (!target.classList.contains("checked")) {
    target.classList.add("checked");
    todos[target.dataset.id - 1].checked = 1;
    saveStorage();
  } else {
    target.classList.remove("checked");
    todos[target.dataset.id - 1].checked = 0;
    saveStorage();
  }
}

// 리스트 수정하기
function editList(target) {
  const btnContainer = target.parentNode;
  const targetList = btnContainer.parentNode;
  const content = targetList.querySelector(
    " .container-bottom--container__container--content"
  );
  const selection = window.getSelection();
  content.setAttribute("contenteditable", true);
  selection.selectAllChildren(content);
  selection.collapseToEnd();
  content.focus();
  content.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      if (content.innerText == "" || content.innerText.trim("") == "") {
        content.innerText = todos[targetList.dataset.id - 1].content;
        return;
      }
      content.setAttribute("contenteditable", false);
      todos[targetList.dataset.id - 1].content = content.innerText;
      saveStorage();
    }
  });
  content.addEventListener("blur", () => {
    if (content.innerText == "" || content.innerText.trim("") == "") {
      content.innerText = todos[targetList.dataset.id - 1].content;
      return;
    }
    content.setAttribute("contenteditable", false);
    todos[targetList.dataset.id - 1].content = content.innerText;
    saveStorage();
  });
}

// 리스트 삭제하기
function deleteList(target) {
  const btnContainer = target.parentNode;
  const targetList = btnContainer.parentNode;
  todosContainer.removeChild(targetList);
  const deleteTodos = todos.filter((todo) => {
    return todo.index !== parseInt(targetList.dataset.id);
  });
  todos = deleteTodos;
  if (todos.length <= 0) {
    noList.classList.remove("hide");
  }
  saveStorage();
}

// 배열에 추가하기
function saveList(content, checked) {
  const li = document.createElement("li");
  li.setAttribute("class", "container-bottom--container__container--item");
  const index = todos.length + 1;
  const inputCheck = document.createElement("input");
  inputCheck.setAttribute("id", `item${index}`);
  inputCheck.setAttribute("type", "checkbox");
  const label = document.createElement("label");
  label.setAttribute("for", `item${index}`);
  label.setAttribute("data-type", "checkbox");
  label.setAttribute("data-id", `${index}`);
  const span = document.createElement("span");
  span.setAttribute("class", "container-bottom--container__container--content");
  span.innerHTML = content;
  const sronly = document.createElement("span");
  sronly.setAttribute("class", "sr-only");
  sronly.innerText = content;
  const div = document.createElement("div");
  div.setAttribute("class", "container-bottom--container__container--btns");
  const editBtn = document.createElement("button");
  editBtn.setAttribute("class", "container-bottom--container__container--edit");
  editBtn.setAttribute("type", "button");
  editBtn.setAttribute("data-type", "edit");
  const delBtn = document.createElement("button");
  delBtn.setAttribute(
    "class",
    "container-bottom--container__container--delete"
  );
  delBtn.setAttribute("type", "button");
  delBtn.setAttribute("data-type", "delete");
  label.appendChild(sronly);
  div.appendChild(editBtn);
  div.appendChild(delBtn);
  li.setAttribute("data-id", `${index}`);
  li.appendChild(inputCheck);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(div);
  todosContainer.appendChild(li);
  const todo = {
    index,
    checked: checked >= 0 ? checked : 0,
    content,
  };
  todos.push(todo);
  if (checked === 1) {
    inputCheck.setAttribute("checked", checked);
    label.setAttribute("class", "checked");
  }
  saveStorage();
}

// 리스트 저장
function saveStorage() {
  const todosString = JSON.stringify(todos);
  localStorage.setItem(TODOS, todosString);
}
//서브밋 이벤트 관리
function handleSubmit(e) {
  e.preventDefault();
  noList.classList.add("hide");
  const content = todoInput.value;
  if (content === " ") {
    return;
  }
  saveList(content);
  todoInput.value = "";
}
//리스트불러오기
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS);
  if (loadedToDos === null || loadedToDos.length <= 2) {
    noList.classList.remove("hide");
  } else {
    noList.classList.add("hide");
    const parsedTodos = JSON.parse(loadedToDos);
    parsedTodos.forEach((todo) => {
      saveList(todo.content, todo.checked);
    });
  }
}

function init() {
  loadToDos();
  // 서브밋하면 리스트 저장하기
  todoForm.addEventListener("submit", handleSubmit);
  todosContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.dataset.type === "edit") {
      editList(target);
    } else if (target.dataset.type === "delete") {
      deleteList(target);
    } else if (target.dataset.type === "checkbox") {
      checkList(target);
    }
  });
}

init();
