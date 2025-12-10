//Variables for goalies, ball, and container
const lGoalie = document.getElementById("left");
const rGoalie = document.getElementById("right");
const ball = document.getElementById("ball");
const container = document.getElementById("container");
let score = document.getElementById("Score");

//Initial position of the box
let LPosition = { top: 205, left: 25 };
let RPosition = { top: 205, left: 750 };
let ballPosition = { top: 240, left: 390 };

//Key movement step size
let step = 5;

//Code to animate ball movement
//Does not work properly, will not bounce off goalies and instead goes through them
function startGame() {
    const containerRect = container.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    //Simple horizontal movement logic
    if (ballPosition.left + ballRect.width >= containerRect.right || ballPosition.left <= containerRect.left) {
        step = -step; //Reverse direction on hitting container edges
    } else {
        ballPosition.left += step;
    }

    //Update the position of the ball
    ball.style.top = ballPosition.top + "px";
    ball.style.left = ballPosition.left + "px";

    //Code to make ball constantly move
    requestAnimationFrame(startGame);
}

//Move Goalies based on W/S and Up/Down key inputs
function moveLeftGoalie(event) {
    const containerRect = container.getBoundingClientRect();
    const lGoalieRect = lGoalie.getBoundingClientRect();
    switch (event.key) {
        case "w":
            if (LPosition.top > 0) {
                LPosition.top -= step;
            }
            break;
        case "s":
            if (lGoalieRect.bottom + step <= containerRect.bottom) {
                LPosition.top += step;
            }
            break;
        default:
            break;
    }
    // Update the position of the left goalie
    lGoalie.style.top = LPosition.top + "px";
}

function moveRightGoalie(event) {
    const containerRect = container.getBoundingClientRect();
    const rGoalieRect = rGoalie.getBoundingClientRect();
    switch (event.key) {
        case "ArrowUp":
            if (RPosition.top > 0) {
                RPosition.top -= step;
            }
            break;
        case "ArrowDown":
            if (rGoalieRect.bottom + step <= containerRect.bottom) {
                RPosition.top += step;
            }
            break;
        default:
            break;
    }
    // Update the position of the right goalie
    rGoalie.style.top = RPosition.top + "px";
}

// Listen for keydown events
document.addEventListener("keydown", moveLeftGoalie);
document.addEventListener("keydown", moveRightGoalie);

//Reset ball position in a snapback to center
//Does not work
function resetBall() {
    ballPosition = { top: 240, left: 390 };
    ball.style.top = ballPosition.top + "px";
    ball.style.left = ballPosition.left + "px";
}

//Clear score display
//Does not work, not that score can be increased yet anyway
function clearScore() {
    score.innerHTML = "Score: 0 - 0";
}