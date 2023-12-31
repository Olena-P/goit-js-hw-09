function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const body = document.body;
let intervalId;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(intervalId);
});
