let homeScoreEl = document.getElementById("home-score");
let guestScoreEl = document.getElementById("guest-score");
let timerEl = document.getElementById("timer");
let startGameBtn = document.getElementById("start-game-btn");
let startPerBtn = document.getElementById("start-period-btn");
let periodEls = document.getElementsByClassName("period");
let pointsBtns = document.getElementsByClassName("points-btns");
    pointsBtns = Array.from(pointsBtns);
const NUMBER_OF_PERIODS = 4;
const TOTAL_PERIOD_TIME = 10 * 60;
let timerInterval = null;
let homeScore;
let guestScore;
let periodTime ;
let periods;

resetValues();




function startNewGame(){

    if (timerInterval != null ){
        clearInterval(timerInterval);
    }

    resetValues();

    timerEl.textContent = getTimeString(Math.floor(TOTAL_PERIOD_TIME/60) , TOTAL_PERIOD_TIME%60);
    enableBtn(startPerBtn);
    switchPeriodLight(true,0);

}

function startPeriod(){

    disableBtn(startPerBtn);
    controlPointsBtns('enable');

    periodTime = TOTAL_PERIOD_TIME;
    let minutes , seconds;
    timerInterval = setInterval(updateTimer,1000);

    function updateTimer (){
        periodTime--;
        minutes = Math.floor(periodTime/60);
        seconds = periodTime%60;

        timerEl.textContent = getTimeString(minutes,seconds)  ;

        if( periodTime < 1 ){
            clearInterval(timerInterval);
            periods--;
            timerEl.textContent = getTimeString(Math.floor(TOTAL_PERIOD_TIME/60) , TOTAL_PERIOD_TIME%60);
            if(periods > 0 ){
                switchPeriodLight(true,NUMBER_OF_PERIODS-periods);
            }
            else{
                    
                timerEl.textContent = "Game Over!";
                disableBtn(startPerBtn);
                controlPointsBtns('disable');
                return;
            }
            enableBtn(startPerBtn);
            controlPointsBtns('disable');
        }   
    }
}


function addPoints(points,team){

  if(team === 'home'){
    homeScore += points;
    homeScoreEl.textContent  = homeScore;
  }

  else if(team === 'guest'){
    guestScore += points;
    guestScoreEl.textContent  = guestScore;
  }

}

function controlPointsBtns(action){
    if(action === 'enable'){
        pointsBtns.forEach(btn => {
        enableBtn(btn);
    });
    }
    

    else if(action === 'disable')
        pointsBtns.forEach(btn => {
            disableBtn(btn);
        });
    
}

function enableBtn(btn){
    btn.classList.remove("hidden");
    btn.disabled=false;
}

function disableBtn(btn){
    btn.classList.add("hidden");
    btn.disabled=true;
}


function resetValues(){
    homeScore = 0;
    guestScore = 0;
    periods = NUMBER_OF_PERIODS;

    for(let i = 0 ; i < NUMBER_OF_PERIODS ; i++ ){
        switchPeriodLight(false,i);
    }

    homeScoreEl.textContent = homeScore;
    guestScoreEl.textContent = guestScore;

    controlPointsBtns('disable');
    disableBtn(startPerBtn);

}

function getTimeString(minutes , seconds){
    return (minutes>=10? minutes : "0" + minutes) + " : " + (seconds>=10? seconds : "0" + seconds);
}

function switchPeriodLight(flag , position){
    if(position > NUMBER_OF_PERIODS-1 || position < 0){
        return;
    }

    if(flag){
        periodEls[position].classList.add("period-reached");
        periodEls[position].classList.remove("period-not-reached");
    }
    else{
        periodEls[position].classList.remove("period-reached");
        periodEls[position].classList.add("period-not-reached");
    }
}