const body = document.querySelector("body");
const API_KEY = "HZ_VhCN89TVCLoQK0G7xCcHz33_Obskf4KB0vkklu_g";

function imageHandle(img) {
  const url = img.urls.regular;
  console.log(img);
  body.style.backgroundImage = `url("${url}")`;
}

function loadImages() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.unsplash.com/search/photos/?query=nature&orientation=landscape&client_id=${API_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((json) => json.results)
    .then((images) => {
      const index = Math.floor(Math.random() * images.length);
      const img = images[index];
      imageHandle(img);
    })
    .catch((error) => console.log("error", error));
}

function init() {
  loadImages();
}

init();
