const COORDS = "coords";
const WEATHER_KEY = "656940ab113d2f9387d07fe60d1bd857";

// 날씨 정보 표시하기
function createWeather(weather) {
  const textTemp = document.querySelector(".header__weather--temperature");
  const textLoaction = document.querySelector(".header__weather--location");
  const weatherIcon = document.querySelector(".header__weather--ico");
  const temp = weather.main.temp;
  const name = weather.name;
  const status = weather.weather[0].id;
  const sunrise = weather.sys.sunrise;
  const sunset = weather.sys.sunset;
  const getTime = new Date().getTime();
  const str = getTime.toString();
  const substr = str.substring(0, 10);
  const number = Number(substr);
  textTemp.innerText = temp;
  textLoaction.innerText = name;
  if (number >= sunrise && number < sunset) {
    weatherIcon.classList.add(`wi-owm-day-${status}`);
  } else {
    weatherIcon.classList.add(`wi-owm-night-${status}`);
  }
}

// 날씨 정보가져오기
function getWeather(coords) {
  const lat = coords.latitude;
  const lon = coords.longitude;
  let appUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`;
  $.ajax({
    type: "GET",
    url: appUrl,
    dataType: "json",
    success: (res) => {
      createWeather(res);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

// 위치정보 저장하기
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치정보 동의시
function succCoordsHandle(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
}

// 위치정보 거부시
function errLoacitonHandle(err) {
  console.log(err);
}

//위치정보 묻기
function loadCoords() {
  navigator.geolocation.getCurrentPosition(succCoordsHandle, errLoacitonHandle);
}

function init() {
  const coords = localStorage.getItem(COORDS);
  if (coords === null) {
    loadCoords();
  } else {
    const coordsParse = JSON.parse(coords);
    getWeather(coordsParse);
    setInterval(() => getWeather(coordsParse), 60000);
  }
}

init();
