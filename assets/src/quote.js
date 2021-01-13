//화면에 명언 표시
function createQuote(data) {
  const textQuote = document.querySelector(".container-bottom--quote");
  const testAuthor = document.querySelector(".container-bottom--author");
  const quote = data.content;
  const author = data.author;
  textQuote.innerText = `"${quote}"`;
  testAuthor.innerText = `- ${author}`;
}

// 명언 불러오기
function loadQuote() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch("https://api.quotable.io/random?maxLength=60", requestOptions)
    .then((response) => response.json())
    .then((json) => createQuote(json))
    .catch((error) => console.log("error", error));
}

function init() {
  loadQuote();
}

init();
