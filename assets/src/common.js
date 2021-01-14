// 헤더검색창 보이기
const inputToggle = document.querySelector(".header__toggle");
const inputFormContainer = document.querySelector(".header__form-container");
inputToggle.addEventListener("click", () => {
  inputFormContainer.classList.toggle("active");
});

//검색 보내기
const headerForm = document.querySelector(".header__form");
const headerInput = document.querySelector(".header__form--input");
headerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = headerInput.value;
  window.open(`http://www.google.co.kr/search?q=${value}`);
  headerInput.value = "";
});

//배경주소 이벤트
const backgroundLoaction = document.querySelector(
  ".container-bottom--location"
);
const mainContainer = document.querySelector(".container-top");
const header = document.querySelector("#header");
backgroundLoaction.addEventListener("mouseenter", () => {
  mainContainer.classList.add("hide");
  header.classList.add("hide");
});
backgroundLoaction.addEventListener("mouseleave", () => {
  mainContainer.classList.remove("hide");
  header.classList.remove("hide");
});

//투두리스트 보이기
const todoToggle = document.querySelector(".container-bottom--toggle");
const todoContainer = document.querySelector(
  ".container-bottom--container__position"
);

todoToggle.addEventListener("click", () => {
  todoContainer.classList.toggle("active");
});
