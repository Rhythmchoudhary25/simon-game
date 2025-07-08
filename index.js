
let gameSeq=[];
let userSeq=[];

let btns = ["pink", "green", "yellow", "blue"];

let started=false;
let level=0;

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function() {
    if (started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }
}) 



function gameFlash(btn) {
    btn.classList.add("pressed");

    setTimeout(function() {
        btn.classList.remove("pressed");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userPressed");

    setTimeout(function() {
        btn.classList.remove("userPressed");
    }, 250);
}


function levelUp(btn){
    userSeq = [];
    level++;
    h2.innerHTML = "Level " + level;

    let randomNum = Math.floor(Math.random() * 4);
    let randomColor = btns[randomNum];
    let randomBtn = document.querySelector("." + randomColor);
    gameSeq.push(randomColor);
    console.log("Game Sequence: " + gameSeq);
    gameFlash(randomBtn);
}

function checkAnswer(currLevel) {
    //console.log("curr level:", level);
    let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        if( userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score is ${level}. Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "#283149";
        }, 1000);
        restartGame();
    }
}

function btnPress(){
    //console.log(this);
    let btn = this;
    userFlash(btn);
    Usercolor = btn.getAttribute("id");
    userSeq.push(Usercolor);
    checkAnswer(userSeq.length-1);

}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function restartGame() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}

document.getElementById("startBtn").addEventListener("click", function () {
    if (!started) {
        started = true;
        levelUp();
        this.style.display = "none"; // Hide start button after game starts
        restartGame
    }
});