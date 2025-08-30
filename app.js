// references to HTML-elements
const cookieEl = document.querySelector(".cookie");
const cookiesEl = document.querySelector(".num-cookies-container");
const perSecEl = document.querySelector(".per-second-text");
const cookieAudio = document.querySelector(".cookie-audio");
const upgradeBtns = document.querySelectorAll(".upgrade-btn");

// init of variables
let cookies = 0;
let perSec = 0;

document.title = Math.floor(cookies).toLocaleString("en-US") + " cookies";

// init of on-page text
cookiesEl.textContent = Math.floor(cookies).toLocaleString("en-US");
perSecEl.textContent = perSec.toFixed(1);

// play animation on page load
window.onload = function () {
  cookieEl.classList.add("start-bouncing");
};

// check if upgrade buttons should be enabled or disabled and toggle them
function toggleUpgradeBtns() {
  upgradeBtns.forEach((button) => {
    const cost = parseInt(button.dataset.cost);
    // equation returns a boolean that toggles button
    button.disabled = cookies < cost;
  });
}

// show graphics of upgrades dynamically
function showGraphics(button) {
  // initializing image source file and image variable
  const imageSrc = `assets/${button.dataset.name}.png`;
  const image = document.createElement("img");

  //setting image properties
  image.src = imageSrc;
  image.style.position = "absolute";
  image.classList.add("graphics");
  image.style.opacity = 0.5;

  //make position random
  const maxX = window.innerWidth;
  const maxY = window.innerHeight;

  const posX = Math.random() * maxX;
  const posY = Math.random() * maxY;

  //placing image
  image.style.left = `${posX}px`;
  image.style.top = `${posY}px`;

  // make rotation random
  const rotation = Math.random() * 90 - 45; // 0–90 minus 45 = -45 til +45
  image.style.transform = `rotate(${rotation}deg)`;

  // appending to doc body
  document.body.appendChild(image);
}

// interval running every 0.1 secs in order to autoclick
setInterval(() => {
  cookies += perSec / 10;
  cookiesEl.textContent = Math.floor(cookies).toLocaleString("en-US");
  document.title = Math.floor(cookies).toLocaleString("en-US") + " cookies";
  toggleUpgradeBtns();
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

  //adding cookies to cookies variable and to interface
  cookies++;
  cookiesEl.textContent = Math.floor(cookies).toLocaleString("en-US");
});

// dynamic event listener for upgrade btns
upgradeBtns.forEach((button) => {
  // initialize dynamic cost and rate variables based on data attributes in the html
  const cost = parseInt(button.dataset.cost);
  const rate = parseFloat(button.dataset.rate);

  // button text equal to data-name
  const btnText = button.dataset.name;
  button.textContent =
    btnText.charAt(0).toUpperCase() + btnText.slice(1).toLowerCase();

  // change syntax if rate is 1
  if (rate == 1) {
    button.title = `Produces ${rate.toLocaleString(
      "en-US"
    )} cookie/sec\nCost: ${cost.toLocaleString("en-US")} cookies`;
  } else {
    button.title = `Produces ${rate.toLocaleString(
      "en-US"
    )} cookies/sec\nCost: ${cost.toLocaleString("en-US")} cookies`;
  }

  button.addEventListener("click", () => {
    // check if user has enough cookies
    if (cookies >= cost) {
      // subtract cost to cookies, add rate to perSec
      cookies -= cost;
      perSec += rate;

      // show results on page elements
      cookiesEl.textContent = Math.floor(cookies).toLocaleString("en-US");
      document.title = Math.floor(cookies).toLocaleString("en-US") + " cookies";
      perSecEl.textContent = perSec.toFixed(1);
      // check whether button should be enabled or disabled
      toggleUpgradeBtns();
      // show upgrade graphics
      showGraphics(button);
    }
  });
});
