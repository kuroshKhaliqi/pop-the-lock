let ballHolderElement = document.getElementById("ball-holder");
let barHolderElement = document.getElementById("bar-holder");
let ballElement = document.getElementById("ball");
let barElement = document.getElementById("bar");
let gameElement = document.getElementById("game");
let intervalId;
let barRotationDeg = 0;
let ballRotationDeg = 0;
let popUpBgElement = document.getElementById("pop-up-bg");
let popUpMessageElement = document.getElementById("pop-up-message");
ballHolderElement.style.transform = "rotate(200deg)";

function rotateBall() {
  let randomDeg = Math.floor(Math.random() * 361);
  ballRotationDeg = randomDeg;
  ballHolderElement.style.transform = "rotate(" + randomDeg + "deg)";
  barHolderElement.style.transform = "rotate(" + (randomDeg - 200) + "deg)";
}

function rotateBarClockwise() {
  barRotationDeg++;
  barHolderElement.style.transform = "rotate(" + barRotationDeg + "deg)";
}

function rotateBarCounterClockwise() {
  barRotationDeg--;
  barHolderElement.style.transform = "rotate(" + barRotationDeg + "deg)";
}

function checkResult() {
  let result = isColliding();
  if (result == true) {
    showPopUp("YOU WON");
    rotateBall();
  } else {
    showPopUp("YOU LOST");
    rotateBall();
  }
}

function isColliding() {
  a = ballElement.getBoundingClientRect();
  b = barElement.getBoundingClientRect();
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    return true;
  }
}

function startGame() {
  rotateBall();
  intervalId = setInterval(rotateBarClockwise, 15);
  gameElement.addEventListener("click", checkResult);
}

function closePopUp() {
  popUpBgElement.classList.add("d-none");
  startGame();
}

function showPopUp(message) {
  popUpMessageElement.innerText = message;

  popUpBgElement.classList.remove("d-none");
  clearInterval(intervalId);
  gameElement.removeEventListener("click", checkResult);
}
startGame();
