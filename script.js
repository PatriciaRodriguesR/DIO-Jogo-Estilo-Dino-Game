const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let score = document.querySelector('#score');
let boxEnd = document.querySelector('#boxEnd');

//score
let interval = null;
let playerScore = 0;

let scoreCounter = () => {
  playerScore++;
  score.innerHTML = `SCORE <b>${playerScore}</b>`;
};

interval = setInterval(scoreCounter, 200);

//start game
let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 150) {
      //Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 25);
    } else {
      //subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 30);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 5000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      //Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //Game Over
      clearInterval(leftTimer);
      isGameOver = true;
      boxEnd.style.display = 'block';
      background.style.animation = 'none';
      clearInterval(interval);
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 35);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);

function reset() {
  location.reload();
}
