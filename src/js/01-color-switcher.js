"use strict";
const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');

btnStartRef.addEventListener('click', onBtnStart);
btnStopRef.addEventListener('click', onBtnStop);

let bgChanger = null;

function onBtnStop() {
    btnStartRef.removeAttribute('disabled');
    clearInterval(bgChanger)
}

function onBtnStart() { 
    btnStartRef.setAttribute('disabled', true);
    bgChanger = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
