# Project-Momenton

![Alt text](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrQwfz%2FbtqUvDqaUpR%2FfFxXnj7prhy7kcLXnCNxw0%2Fimg.jpg)

[프로젝트 구경가기](https://baegofda.github.io/Project-Momen/)

## **✨ 목표**

- API를 활용한 정보제공
- Local Storage를 이용한 데이터 저장
- 데이터 저장 여부에 따른 상태변화
<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTqrnS%2FbtqUGS7pyTS%2FrJ6DYvBp4kOREH1JdJb16K%2Fimg.png"/></p>

## **🧰 사용기술**

- HTML, CSS, JAVSCRIPT(Fetch API, Geolocation API), Local Storage
- OpenWeatherMap API
- Unsplash API
- Quotable API

## **📅 소요기간**

- 3일

## **👀 주요기능 & 코드**

```
💡 주요기능

1. 최초 페이지 방문시 사용자의 위치정보제공 동의여부와 시계 아래에 이름 입력창 표출
2. 제공 동의시 우측상단 날씨정보 제공(지역이름, 기온, 날씨아이콘)
3. 아이디 입력시 입력창 숨김 저장된 이름 표출과 수정기능 제공
4. 실시간 시간정보 제공
5. 페이지 방문시 배경 & 배경 정보 변경
6. 페이지 방문시 하단 중앙의 명언 변경
7. ToDoList 기능
```

### **1. 최초 페이지 방문시 사용자의 위치정보제공 동의여부와 시계아래에 이름 입력창 표출**

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoMPLV%2FbtqUGUqG7jN%2F3pzwpPqMaBHoGwRen6aEMk%2Fimg.png"/></p>

### **💻 코드살펴보기 (위치정보)**

> 날씨 정보를 제공을 위한 사용자의 위치정보를 얻기위해서
> javascript의 Geolocation API를 사용하였습니다.

```js
const COORDS = "coords";

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function succCoordsHandle(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(coordsObj);
  saveCoords(coordsObj);
}

function errLoacitonHandle() {
  console.log("cant access geo location");
}

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
```

> 최초 방문을 시도한 기기이거나 정보가 없을경우에는 loadCoords()를 호출하게됩니다.

```js
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
```

> loadCoords()는 navigator.geolocation을 통해 Geolocation API를 접근하고  
> 브라우저는 사용자에게 위치 정보 접근 권한을 요청합니다.  
> 이에 성공을 하게되면 받아온 GeolocationPosition 데이터를 매개변수로 넣어  
> succCoordsHandle 콜백을 호출하고 실패시 errLoacitonHandle 콜백을 호출합니다.

```js
function loadCoords() {
  navigator.geolocation.getCurrentPosition(succCoordsHandle, errLoacitonHandle);
}
```

> succCoordsHandle은 받아온 매개변수 position 데이터의 latitude값과 longitude 값을  
> coordsObj라는 object에 key와 value값으로 할당하여 줍니다.  
> 할당된 coordsObj를 getWeather()와 saveCoords()에 인자값으로 전달합니다.

```js
function succCoordsHandle(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(coordsObj);
  saveCoords(coordsObj);
}
```

> saveCoords()는 매개변수 coordsObj를 JSON.stringify를 이용하여 string타입으로 변환 후  
> locaStorage에 coords라는 key에 value로 저장을 합니다.

```js
const COORDS = "coords";

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
```

> 정보 받아오기에 실패하여 errLoacitonHandle 호출시 console창에 메세지를 띄웁니다.

```js
function errLoacitonHandle() {
  console.log("cant access geo location");
}
```

### **💻 코드살펴보기 (이름입력창)**

> 이름 입력 창의 경우 localStorage에 값이 있으면 입력창이 사라지고 저장된값이 표출되고  
> 문구가 바뀌며 수정 버튼이 나타납니다.
>
> > 이름 입력 코드의 경우 본래 이름 말고도 다른 텍스트 정보를 받아서 저장을 하기위해  
> > 이벤트 값을 받아 분기로 처리하기위해 작성을 하였으나 현재는 이름 입력만 남겨둔 상태입니다.

```js
const textContainer = document.querySelector(".container-top");
const greeting = document.querySelector("form[name='greeting']");
const greetText = document.querySelector(".container-top__greeting--text");
const greetInput = document.querySelector(".container-top__greeting--input");
const greetBtn = document.querySelector(".container-top__greeting--edit");
const NAME = "greeting";

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

function loadText() {
  const loadedName = localStorage.getItem(NAME);
  if (loadedName === null) {
    initName();
    return;
  } else {
    createItem(loadedName, "greeting");
  }
}

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
```

> 최초 방문을 시도한 기기이거나 정보가 없을경우에는 initName()를 호출하게됩니다.

```js
function loadText() {
  const loadedName = localStorage.getItem(NAME);
  if (loadedName === null) {
    initName();
    return;
  } else {
    createItem(loadedName, "greeting");
  }
}

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
```

> initName()이 호출이 되면 이름을 입력하는 인풋의 class에 hide가 삭제가되며 나타나게되고
> 수정버튼의 class에 hide가 추가가 되어 사라지게 됩니다.

```js
function initName() {
  greetInput.classList.remove("hide");
  greetBtn.classList.add("hide");
}
```

> 인풋창에 submit 이벤트가 발생시 handleSubmit()을 호출하고 타켓의 정보를 인자값으로 전달합니다.

```js
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
```

> handleSubmit()는 매개변수 target에 input[type=text]를 input이라는 변수에 할당을 하고  
> 만약 inputValue가 공백일 경우 리턴을 합니다.  
> 아니면 input의 value를 inputValue 변수에 할당을 하여 saveItem(), createItem()함수에 인자값으로 전달합니다.

```js
function handleSubmit(target) {
  const input = target.querySelector("input[type=text]");
  const inputValue = input.value;
  if (inputValue === " ") {
    return;
  }
  saveItem(inputValue, target);
  createItem(inputValue, target);
}
```

> saveItem()이 호출이 되면 매개변수 target을 이용하여 target이 form[name='greeting']과 같거나  
>  "greeting"과 같을 경우 locaStorage에 greeting라는 key에 value값으로 매개변수 text를 저장합니다.

```js
const greeting = document.querySelector("form[name='greeting']");
const NAME = "greeting";

function saveItem(text, target) {
  if (target === greeting || target === "greeting") {
    localStorage.setItem(NAME, text);
  }
}
```

> createItem()이 호출되면 div태그 생성과 함께 매개변수 target와 비교를 한 후  
> input창은 숨기고 수정 버튼은 활성화 하고 div태그에 class명 지정 후 매개변수 inputValue값을 div에 넣어줍니다.  
> 동시에 본래 메인의 "Thank you visiting our website !"대신에 "Have A Nice Day !"로 변경합니다.  
> 이후 위에 생성된 div를 자식 요소로 추가합니다.

```js
const greeting = document.querySelector("form[name='greeting']");

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
```

---

### **2. 제공 동의시 우측상단 날씨정보 제공(지역이름, 기온, 날씨아이콘)**

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FKvRwQ%2FbtqUzwKW4SJ%2Fn4FhWU6yljPcoGWAvvxGWk%2Fimg.jpg"/></p>

### **💻 코드살펴보기**

```


```

---

### **3. 아이디 입력시 입력창 숨김 저장된 이름 표출과 수정기능 제공**

## <p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcw3ckm%2FbtqUtp7ke4y%2FbkdQAB86Sb4Wsu47KjWTF1%2Fimg.jpg"/></p>

### ** 4. 실시간 시간정보 제공**

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcJnIKt%2FbtqUseruFy8%2F9BUBjsZBbHezOdQ3xyuYRk%2Fimg.jpg"/></p>

---

### **5. 페이지 방문시 배경이 바뀌며 좌측하단에 배경에 대한 정보 변경**

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbFfZbM%2FbtqUzwjSlim%2Fen1y7bC1mgidgWqarKHAk0%2Fimg.jpg"/></p>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdddiDw%2FbtqUtqLYf0B%2FK2NlaZO0YDoDH8BjFwQXwK%2Fimg.jpg"/></p>

---

### **6. 페이지 방문시 하단중앙의 명언 변경**

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbiL2Za%2FbtqUzu7okLs%2FvtkKsBjweLbbwyLKxkOxe0%2Fimg.jpg"/></p>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlsqBF%2FbtqUuNGFit4%2FIuXKdrAz8KRfYFR7JjCDq0%2Fimg.jpg"/></p>

---

### **7. ToDoList 기능**

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FblyYiP%2FbtqUuNUhScd%2FLMoVxJcyzXQvxQOjhhkb31%2Fimg.jpg"/></p>

---

### **8. 좌측상단에 구글 검색 기능**

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGEsjK%2FbtqUBw4XRE6%2FyBJdwDq2Fp8A5UwpH30T40%2Fimg.jpg"/></p>

---

## **👋 마무리 소감**
