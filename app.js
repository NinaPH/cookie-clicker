// references to HTML-elements
const cookieEl = document.querySelector(".cookie");
const cookiesEl = document.querySelector(".num-cookies-container");
const perSecEl = document.querySelector(".per-second-text");
const cookieAudio = document.querySelector(".cookie-audio");
const upgradeBtns = document.querySelectorAll(".upgrade-btn");

// init of variables
let cookies = 0;
let perSec = 0;

// init of on-page text
cookiesEl.textContent = cookies;
perSecEl.textContent = perSec;

// update buttons and check if they should be updated
function updateUpgradeBtns() {
  upgradeBtns.forEach((button) => {
    const cost = parseInt(button.dataset.cost);
    button.disabled = cookies < cost;
  });
}

function showGraphic(button) {
  const imageSrc = `${button.dataset.name}.png`;
  const image = document.createElement("img");
  image.src = imageSrc;
  image.style.position = "absolute";
  image.classList.add(".graphics");
  image.style.opacity = 0.5;

  //make position random
  const maxX = window.innerWidth - image.width;
  const maxY = window.innerHeight - image.height;

  const posX = Math.random() * maxX;
  const posY = Math.random() * maxY;

  image.style.left = `${posX}px`;
  image.style.top = `${posY}px`;

  // make rotation random
  const rotation = Math.random() * 90 - 45; // 0–90 minus 45 = -45 til +45
  image.style.transform = `rotate(${rotation}deg)`;

  document.body.appendChild(image);
}

// interval running every 0.1 secs
setInterval(() => {
  cookies += perSec / 10;
  cookiesEl.textContent = Math.floor(cookies);
  updateUpgradeBtns();
}, 100);

// cookie click event listener
cookieEl.addEventListener("click", () => {
  //animation resetting and playing
  cookieEl.classList.remove("start-bouncing");
  void cookieEl.offsetWidth;
  cookieEl.classList.add("start-bouncing");

  //audio resetting and playing
  cookieAudio.currentTime = 0;
  cookieAudio.play();

  //adding cookies to variable and interface
  cookies++;
  cookiesEl.textContent = Math.floor(cookies);
});

// dynamic event listener for upgrade btns
upgradeBtns.forEach((button) => {
  // initialize dynamic cost and rate variables based on data attributes in the html
  const cost = parseInt(button.dataset.cost);
  const rate = parseFloat(button.dataset.rate);

  if (rate == 1) {
    button.title = `Gain ${rate} cookie/sec\nCost: ${cost} cookies`;
  } else {
    button.title = `Gain ${rate} cookies/sec\nCost: ${cost} cookies`;
  }

  button.addEventListener("click", () => {
    // check if user has enough cookies
    if (cookies >= cost) {
      // subtract cost to cookies, add rate to perSec
      cookies -= cost;
      perSec += rate;

      // show results on page elements
      cookiesEl.textContent = Math.floor(cookies);
      perSecEl.textContent = perSec.toFixed(1);
      updateUpgradeBtns();
      showGraphic(button);
    }
  });
});
