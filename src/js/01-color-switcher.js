const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopChangeColor);

let colorId = null;

function changeColor() {
        colorId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
            startBtn.setAttribute('disabled', true);
            stopBtn.removeAttribute('disabled');
        }, 1000);
};

function stopChangeColor() {
    clearInterval(colorId);
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};