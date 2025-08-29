const cookie = document.querySelector(".cookie");
const numContainer = document.querySelector(".num-cookies-container");
const perSecContainer = document.querySelector(".per-second-container");

const cursorBtn = document.querySelector(".cursor-btn");
let perSec = 0;

setInterval(() => {
  cookies += perSec / 10;
  numContainer.textContent = Math.floor(cookies);
}, 100);

const clickAudio = document.getElementById("clickAudio");

let cookies = 0;
numContainer.textContent = "0";
perSecContainer.textContent = "0";

cookie.addEventListener("click", () => {
  cookie.classList.remove("start-bouncing");

  void cookie.offsetWidth;

  clickAudio.currentTime = 0;
  clickAudio.play();
  cookie.classList.add("start-bouncing");

  cookies++;
  numContainer.textContent = Math.floor(cookies);
});

cursorBtn.addEventListener("click", () => {
  if (cookies >= 10) {
    cookies -= 10;
    numContainer.textContent = Math.floor(cookies);

    perSec += 0.1;
    perSec = Math.round(perSec * 10) / 10;
    perSecContainer.textContent = perSec;
  }
});
