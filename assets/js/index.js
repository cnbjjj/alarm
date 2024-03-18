'use strict';
/* 
    Utility
*/
function query(selector) {
    return document.querySelector(selector);
}
function listen(on, event, call) {
    on.addEventListener(event, call);
}
function valid(input) {
    if (!new RegExp(input.getAttribute('pattern')).test(input.value)) {
        input.focus();
        return false;
    }
    return true;
}

/* 
    Main
*/
function keyUp(event) {
    const element = event.target;
    if (element.getAttribute('type') !== 'text') return;
    element.value = element.value.replace(/\D/g, '');
}
function setAlarm() {
    if (!valid(alarmHour) || !valid(alarmMinutes)) return;
    alarmDisplay.innerText = `${alarmHour.value} : ${alarmMinutes.value}`;
    alarmHour.value = alarmMinutes.value = '';
}
function updateClock() {
    const [hours, minutes, seconds] = new Date().toTimeString().split(" ")[0].split(":");
    nowDisplay.innerHTML = `${hours} <span class="${parseInt(seconds) % 2 === 0 ? "hidden" : ""}">:</span> ${minutes}`;
    if (alarmDisplay.innerText !== '' && nowDisplay.innerText === alarmDisplay.innerText) {
        alarmDisplay.innerText = '';
        alarmAudio.play();
    }
}

// Elements
const alarmAudio = new Audio('./assets/audio/alarm.mp3');
const nowDisplay = query('h1');
const alarmDisplay = query('span');
const alarmMinutes = query('input[name=minute]');
const alarmHour = query('input[name=hour]');
const setButton = query('input[type=button]');

// Start
listen(setButton, 'click', setAlarm);
listen(document, 'keyup', keyUp);
setInterval(updateClock, 1000);
updateClock();
