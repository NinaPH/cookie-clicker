const cookie = document.querySelector(".cookie");
const clickAudio = document.getElementById("clickAudio");

const numContainer = document.querySelector(".num-cookies-container");
const perSecContainer = document.querySelector(".per-second-container");
const upgradeBtn = document.querySelectorAll(".upgrade-btn");

let perSec = 0;
let cookies = 0;
numContainer.textContent = "0";
perSecContainer.textContent = "0";

setInterval(() => {
  cookies += perSec / 10;
  numContainer.textContent = Math.floor(cookies);
}, 100);

cookie.addEventListener("click", () => {
  cookie.classList.remove("start-bouncing");

  void cookie.offsetWidth;

  clickAudio.currentTime = 0;
  clickAudio.play();
  cookie.classList.add("start-bouncing");

  cookies++;
  numContainer.textContent = Math.floor(cookies);
});

upgradeBtn.forEach((button) =>
  button.addEventListener("click", () => {
    const cost = parseInt(button.dataset.cost);
    const rate = parseFloat(button.dataset.rate);

    if (cookies >= cost) {
      cookies -= cost;
      perSec += rate;

      numContainer.textContent = Math.floor(cookies);
      perSecContainer.textContent = perSec.toFixed(1);
    }
  })
);
