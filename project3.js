//Introduction: Here is my js code for the first game I have ever made!

//define variables and constants

let canvas = document.getElementById('canvas');
let button = document.getElementById('button');
let ctx = canvas.getContext('2d');
const DOTNUM = 100;
// initially, I just used i < 100 in my for loop to create the array of dots, but Mike informed me traditionally if we know this number to be constant we should just create a constant and we can re-use that in the future. So here I define a constant for 100, for my dot array.


// TIMER
let timerID;
let seconds = 30;

let alert1 = document.getElementById('end_game');

function countDown(){
    if(seconds > 0){
        seconds--;
    }else{
        ctx.clearRect(0,0,800,700);
        clearInterval(timerID);
        clearInterval(timertwoID);
        alert1.innerHTML = ('Your score is ' + score + '! Refresh the page to play again.');
    }
}
// this count down checks if there is time left on the clock, subtract by 1 every 1000 ms or 1 second. when the time is up i clear the canvas so the user cannot click on any extra dots, and we clear both timers. the first timer is for the countdown and the second timer is for the dot animation.
function startTimer(){
    timerID = setInterval(countDown,1000);
}

button.addEventListener('click', startTimer);





// DOTS
// width 800 (canvas)
// height 700 (canvas)

function Dot(){
    this.x = (Math.random() * 760) + 20;
    this.y = (Math.random() * 620) + 40;
    this.radius = 20
    this.draw = function (){
        ctx.clearRect(0,0,800,700);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = '#13D209';
        ctx.fill();
    }
}
//here I used a constructor function that creates dot objects. pretty simple stuff here, the x and y is well within the boundary of the canvas, the radius is set to 20 by default, and i found a different shade of green than what we have used in class ('green').

button.addEventListener('click', startGame);


let dotArray = [];

function createArray(){    
    for(let i = 0; i < DOTNUM; i++){
        dotArray.push(new Dot());
        if(easy.style.background == 'green'){
            for(let j=0; j < dotArray.length; j++){
                dotArray[i].radius = 40;
            }
        }
        if(hard.style.background == 'red'){
            for(let k=0; k < dotArray.length; k++){
                dotArray[i].radius = 10;
            }
        }
    }
}
//here I create an array when the play game button is pressed. if the user clicks Easy or Hard BEFORE pressing play game, the dots in the array will have a different radius property.

button.addEventListener('click', createArray);
//testing
// initially I used window event listener on page load, because i didnt have other difficulty options. Then I had to figure out how to change the radius of the array depending on the difficulty. I finally realized I can just change the event listener.

let timertwoID;
let count = 1;
function startGame(){
    timertwoID = setInterval(drawDot,100)
    }


function drawDot(){
    dotArray[count].draw();
}

// click event
let score = 0;

function clickDot(e){
    let a = e.offsetX;
    let b = e.offsetY;

    if(easy.style.background == 'green'){
        if (Math.sqrt(Math.pow(a-dotArray[count].x, 2)+Math.pow(b-dotArray[count].y, 2))<=40){
            score++;
            count++;
            document.getElementById('score').innerHTML = score;
            ctx.clearRect(0,0,800,700);
        }
    } else if(hard.style.background == 'red'){
        if (Math.sqrt(Math.pow(a-dotArray[count].x, 2)+Math.pow(b-dotArray[count].y, 2))<=10){
            score++;
            count++;
            document.getElementById('score').innerHTML = score;
            ctx.clearRect(0,0,800,700);
        }
    }else{
        if (Math.sqrt(Math.pow(a-dotArray[count].x, 2)+Math.pow(b-dotArray[count].y, 2))<=20){
            score++;
            count++;
            document.getElementById('score').innerHTML = score;
            ctx.clearRect(0,0,800,700);
        }
    }
}

//this function finds out if the user has clicked the dot or not, and I used if else if else for the difficulty conditions, the only thing that changes though is the radius, so the first part of the formula stays the same.

canvas.addEventListener('click', clickDot);

//active button styling

let easy = document.getElementById('easy');
let normal = document.getElementById('normal');
let hard = document.getElementById('hard');

easy.addEventListener('click', easyStyle);
normal.addEventListener('click', normalStyle);
hard.addEventListener('click', hardStyle);

normal.style.background = 'rgb(53, 45, 35)';

function easyStyle(){
    easy.style.background = 'green';
    if(normal.style.background == 'rgb(53, 45, 35)'){
        normal.style.background = 'black'
    }
    if(hard.style.background == 'red'){
        hard.style.background = 'black'
    }
}

function normalStyle(){
    normal.style.background = 'rgb(53, 45, 35)';
    if(easy.style.background == 'green'){
        easy.style.background = 'black'
    }
    if(hard.style.background == 'red'){
        hard.style.background = 'black'
    }
}

function hardStyle(){
    hard.style.background = 'red';
    if(normal.style.background == 'rgb(53, 45, 35)'){
        normal.style.background = 'black'
    }
    if(easy.style.background == 'green'){
        easy.style.background = 'black'
    }
}

//I figured out CSS cannot have a psuedo class that checks whether another button is pressed within the same div, so I said why not try within our js file, and voila it works. if you click on a button the color changes, and if the other buttons are clicked, they revert back to the default color.

// Conclusion: This is the very first game I have ever made from scratch in my life and I am pretty proud of how it turned out. In the future, I want to learn the backend so I can add a leaderboard and share with friends.
