const API_KEY = "HZ_VhCN89TVCLoQK0G7xCcHz33_Obskf4KB0vkklu_g";

function infoHandle(info) {
  const description = document.querySelector(".container-bottom--location");
  const locationText = document.querySelector(".bg-location");
  const userText = document.querySelector(".bg-user");
  const link = info.links.html;
  const name = info.user.name;
  const location = info.user.location;
  description.setAttribute("href", `${link}`);
  locationText.innerText = `${location}`;
  userText.innerText = `by ${name}`;
}

function imageHandle(img) {
  const body = document.querySelector("body");
  const url = img.urls.regular;
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
      infoHandle(img);
    })
    .catch((error) => console.log("error", error));
}

function init() {
  loadImages();
}

init();
