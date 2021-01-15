const todoForm = document.querySelector(
  ".container-bottom--container__container--form"
);
const todosContainer = document.querySelector(
  ".container-bottom--container__container--list"
);
const todoInput = document.querySelector(
  ".container-bottom--container__container--input"
);
const todoItem = document.querySelector(
  ".container-bottom--container__container--item"
);
const TODOS = "todos";
let todos = [];

// 리스트 삭제하기
function deleteList() {
  console.log(e);
}

// 리스트 수정하기
function editList(e) {
  console.log(e);
}

// 배열에 추가하기
function saveList(content) {
  const li = document.createElement("li");
  li.setAttribute("class", "container-bottom--container__container--item");
  const index = todos.length + 1;
  const inputCheck = document.createElement("input");
  inputCheck.setAttribute("id", `item${index}`);
  inputCheck.setAttribute("type", "checkbox");
  const label = document.createElement("label");
  label.setAttribute("for", `item${index}`);
  const span = document.createElement("span");
  span.innerText = content;
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
  li.appendChild(inputCheck);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(div);
  todosContainer.appendChild(li);

  const todo = {
    index,
    content,
  };
  todos.push(todo);
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
  const content = todoInput.value;
  saveList(content);
  todoInput.value = "";
}

//리스트불러오기
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS);
  if (loadedToDos !== null) {
    const parsedTodos = JSON.parse(loadedToDos);
    parsedTodos.forEach((todo) => saveList(todo.content));
  }
}

function init() {
  loadToDos();
  // 서브밋하면 리스트 저장하기
  todoForm.addEventListener("submit", handleSubmit);
  todoItem.addEventListener("click", (e) => {
    const target = e.target;
    if (e.target.dataset.id === "edit") {
      editList(e);
    }
  });
}

init();
