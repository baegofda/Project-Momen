const time = document.querySelector(".container-top--time");

// 시간 정보 불러오기
function timeHandler() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  time.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

// 1분마다 업데이트
function init() {
  timeHandler();
  setInterval(timeHandler, 60000);
}

init();
