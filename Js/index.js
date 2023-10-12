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
let sessionTime = document.querySelectorAll(".time-display")[0];
let breakTime = document.querySelectorAll(".time-display")[1];
let intervaltime;
let interval;

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
sessionIncrease.addEventListener('click', () => {
    sessionDisplay.innerHTML = "Session 1"
    sessionDisplay.style.color = "white"
    let ButtonValue = parseInt(sessionTime.innerHTML)
    getMin += ButtonValue;
    if (getMin > 60) {
        getHour++;
        getMin = 0;
    }
    display();
})
sessionDecrease.addEventListener("click", () => {
    sessionDisplay.innerHTML = "Session 1"
    sessionDisplay.style.color = "white"
    let value = parseInt(sessionTime.innerHTML);
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
function ProgressBar(totalTime) {
    let circlecontainer = document.querySelector("rect");
    let value = 0;
    let stop = 775;
    let intervaltime; // Declare intervaltime variable

    intervaltime = setInterval(() => {
        // console.log(`value = ${value}`);
        if (value >= stop) {
            clearInterval(intervaltime);
        }
        circlecontainer.style.strokeDashoffset = stop - value; // Fix the strokeDashoffset calculation
        value += stop/totalTime;
    }, 1000); // Update the interval time based on totalTime
}
startTime.addEventListener('click', (e) => {
    let totalTime = (getHour * 3600) + (getMin * 60) + getSec; // Calculate totalTime in seconds
    if(totalTime === 0) alert("Plz add time to Start Clock...")
    if (sessionDisplay.innerHTML === 'Session 1') {
        if (typeof interval === 'undefined') { // Check if interval is undefined
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
            clearInterval(intervaltime);
            clearInterval(interval);
            getHour = 0, getMin = 0, getSec = 0;
            display();
            startTime.innerHTML = 'Start';
            window.location.reload();
        }
        else {
            startTime.innerHTML = 'Reset';
            ProgressBar(totalTime);
        }
    }
    else {
        let totalTime = (getBreakHour * 3600) + (getBreakMin * 60) + getBreakSec; // Calculate totalTime in seconds
        if(totalTime === 0) alert("Plz add time to Start Clock...")
        if (typeof interval === 'undefined') { // Check if interval is undefined
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
            clearInterval(interval);
            clearInterval(intervaltime);
            BreakDisplay();
            startTime.innerHTML = 'Start';
            window.location.reload();
        }
        else {
            startTime.innerHTML = 'Reset';
            ProgressBar(totalTime);
        }
    }
    showHideButton();
});
pauseTime.addEventListener("click", (e) => {
    let totalTime = (getHour * 3600) + (getMin * 60) + getSec;
    let totalBreakTime = (getBreakHour * 3600) + (getBreakMin * 60) + getBreakSec;
    if((totalTime + totalBreakTime) === 0) alert("Plz add time to Start Clock...")
    sessionIncrease.disabled = true;
    sessionDecrease.disabled = true;
    breakIncrease.disabled = true;
    breakDecrease.disabled = true;
    if (interval) {
        clearInterval(interval); // Clear the timer interval.
    }
    if (intervaltime) {
        clearInterval(intervaltime); // Clear the ProgressBar interval.
    }
    showHideButton();
    startTime.innerHTML = "Start";
});
breakIncrease.addEventListener("click", () => {
    sessionDisplay.innerHTML = "Break !!"
    sessionDisplay.style.color = "red"
    if (getBreakMin >= 60) {
        getBreakHour++;
    }
    else {
        getBreakMin += parseInt(breakTime.innerHTML);
    }
    BreakDisplay();
})
breakDecrease.addEventListener('click', (e) => {
    sessionDisplay.innerHTML = "Break !!"
    sessionDisplay.style.color = "red"
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
        getBreakMin -= parseInt(breakTime.innerHTML);
    }
    BreakDisplay();
})
sessionTime.addEventListener("click", ()=>{
    let text = prompt("Customize your time : ");
    if(text == null){        
    }
    else{
        sessionTime.innerHTML = `${text} min`
    }
})
breakTime.addEventListener("click", ()=>{
    let text = prompt("Customize your time : ");
    if(text == null){        
    }
    else{
        breakTime.innerHTML = `${text} min`
    }
})
