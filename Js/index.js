let timerDisplay = document.querySelector(".timer");
let sessionIncrease = document.querySelectorAll("#plus")[0];
let sessionDecrease = document.querySelectorAll("#minus")[0];
let breakIncrease = document.querySelectorAll("#plus")[1];
let breakDecrease = document.querySelectorAll("#minus")[1];
let startTime = document.querySelector(".footer-start");
let pauseTime = document.querySelector(".footer-pause");
let sessionDisplay = document.querySelector('.display');
let getMin = 0, getHour = 0, getSec = 0;
let getBreakMin = 0, getBreakHour = 0, getBreakSec = 0;
let disableButton = true;

function display() {
    let formattedHour = getHour.toString().length === 1 ? `0${getHour}` : getHour;
    let formattedMin = getMin.toString().length === 1 ? `0${getMin}` : getMin;
    let formattedSec = getSec.toString().length === 1 ? `0${getSec}` : getSec;

    timerDisplay.innerHTML = `${formattedHour}:${formattedMin}:${formattedSec}`;
}
function BreakDisplay() {
    let formattedHour = getBreakHour.toString().length === 1 ? `0${getBreakHour}` : getBreakHour;
    let formattedMin = getBreakMin.toString().length === 1 ? `0${getBreakMin}` : getBreakMin;
    let formattedSec = getBreakSec.toString().length === 1 ? `0${getBreakSec}` : getBreakSec;

    timerDisplay.innerHTML = `${formattedHour}:${formattedMin}:${formattedSec}`;
}
function showHideButton() {
    if (disableButton) {
        sessionIncrease.disabled = true;
        sessionDecrease.disabled = true;
        breakIncrease.disabled = true;
        breakDecrease.disabled = true;
        disableButton = false;
    }
    else {
        sessionIncrease.disabled = false;
        sessionDecrease.disabled = false;
        breakIncrease.disabled = false;
        breakDecrease.disabled = false;
        disableButton = true;
    }
}

sessionIncrease.addEventListener('click', (e) => {
    sessionDisplay.innerHTML = "Session 1"
    getMin += parseInt(e.target.value);
    if (getMin > 60) {
        getHour++;
        getMin = 0;
    }
    display();
})
sessionDecrease.addEventListener("click", (e) => {
    sessionDisplay.innerHTML = "Session 1"
    let value = e.target.value;
    if (getMin <= 0) {
        getMin = 0;
        if (getHour > 0) {
            getHour -= 1;
            getMin = 60;
        }
    }
    else {
        getMin -= value;
    }
    display();
})

let interval;

startTime.addEventListener('click', (e) => {
    if (sessionDisplay.innerHTML === 'Session 1') {
        if (interval == 'undefined') {
            getSec = 60;
            getMin = getMin - 1;
        }
        interval = setInterval(() => {
            getSec = getSec - 1;
            if (getSec < 0) {
                if (getMin <= 0) {
                    getMin = 0;
                    getSec = 0;
                }
                else {
                    getMin -= 1;
                    getSec = 59;
                }
            }
            display();

            if (getMin === 0 && getSec === 0) {
                clearInterval(interval);
            }
        }, 1000);
        if (startTime.innerHTML === 'Reset') {
            getHour = 0, getMin = 0, getSec = 0;
            clearInterval(interval)
            display();
            startTime.innerHTML = 'Start';
        }
        else {
            startTime.innerHTML = 'Reset';
        }
    }
    else {
        if (interval == 'undefined') {
            getBreakSec = 60;
            getBreakMin = getBreakMin - 1;
        }
        interval = setInterval(() => {
            getBreakSec = getBreakSec - 1;
            if (getBreakSec < 0) {
                if (getBreakMin <= 0) {
                    getBreakMin = 0;
                    getBreakSec = 0;
                }
                else {
                    getBreakMin -= 1;
                    getBreakSec = 59;
                }
            }
            BreakDisplay();

            if (getBreakMin === 0 && getBreakSec === 0 && getBreakHour === 0) {
                clearInterval(interval);
            }
        }, 1000);
        if (startTime.innerHTML === 'Reset') {
            getBreakHour = 0, getBreakMin = 0, getBreakSec = 0;
            clearInterval(interval)
            BreakDisplay();
            startTime.innerHTML = 'Start';
        }
        else {
            startTime.innerHTML = 'Reset';
        }
    }
    showHideButton();
});

pauseTime.addEventListener("click", (e) => {
    sessionIncrease.disabled = true;
    sessionDecrease.disabled = true;
    breakIncrease.disabled = true;
    breakDecrease.disabled = true;
    if (interval) {
        clearInterval(interval); // Clear the interval when pausing.
    }
    showHideButton();
    startTime.innerHTML = "Start";
});

breakIncrease.addEventListener("click", (e) => {
    sessionDisplay.innerHTML = "Session 2"
    if (getBreakMin >= 60) {
        getBreakHour++;
    }
    else {
        getBreakMin += parseInt(e.target.value);
    }
    BreakDisplay();
})

breakDecrease.addEventListener('click', (e) => {
    if (getBreakMin <= 0) {
        if (getBreakHour > 0) {
            getBreakHour--;
            getBreakMin = 60
        }
        else {
            getBreakHour = 0;
        }
    }
    else {
        getBreakMin -= parseInt(e.target.value);
    }
    BreakDisplay();
})

