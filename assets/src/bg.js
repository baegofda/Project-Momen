const IMAGE_KEY = "HZ_VhCN89TVCLoQK0G7xCcHz33_Obskf4KB0vkklu_g";

// 배경 정보 불러오기
function infoHandle(info) {
  const description = document.querySelector(".container-bottom--location");
  const locationText = document.querySelector(".bg-location");
  const userText = document.querySelector(".bg-user");
  const link = info.links.html;
  const name = info.user.name;
  let location = info.user.location;
  if (location === null) {
    location = "Unsplash landscape";
  }
  description.setAttribute("href", `${link}`);
  locationText.innerText = `${location}`;
  userText.innerText = `by ${name}`;
}

//이미지 url 업데이트
function imageHandle(img) {
  const body = document.querySelector("body");
  const url = img.urls.regular;
  body.style.backgroundImage = `url("${url}")`;
}

//이미지 불러오기
function loadImages() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.unsplash.com/search/photos/?query=nature&color=black&orientation=landscape&client_id=${IMAGE_KEY}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      const images = json.results;
      const index = Math.floor(Math.random() * images.length);
      const img = images[index];
      imageHandle(img);
      infoHandle(img);
    })
    .catch((err) => console.log("err", err));
}

function init() {
  loadImages();
}

init();
