const cookie = document.querySelector(".cookie");
const numContainer = document.querySelector(".num-cookies-container");
const perSecContainer = document.querySelector(".per-second-container");

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
  numContainer.textContent = cookies;
});
