//! Get Keys
document.addEventListener("keydown", keyPush);

//! Get Canvas
const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const ctx = canvas.getContext('2d');

//! Main
let gameIsRunning = true;
const fps = 10;

const snakeSize = 50;
const snakeSpeed = snakeSize;

let tail = []
let snakeLength = 2;

let score = 0;

const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;

let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

let foodPosX = 0;
let foodPosY = 0;

//! Game Function
function gameLoop() { 
    if (gameIsRunning) {
        drawStuff()
        moveStuff()
        setTimeout(gameLoop, 1000 / fps);
    }        
}
resetFood();
gameLoop();


//! Function Move Stuff
function moveStuff() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    if (snakePosX > canvas.width) {
        snakePosX = 0;
    }
    if (snakePosX < 0) {
        snakePosX = canvas.width;
    }    
    if (snakePosY > canvas.height) {
        snakePosY = 0; 
    }
    if (snakePosY < 0) {
        snakePosY = canvas.height;
    }

    tail.forEach(snakePart => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
            gameOver()    
        }
    })

    tail.push({ x: snakePosX, y: snakePosY})

    tail = tail.slice(-1 * snakeLength)

    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        updateScore();
        updateSnake();
        resetFood();        
    }
}

//! Function Draw Stuff
function drawStuff() {

    rectangle("lightblue", 0, 0, canvas.width, canvas.height)

    drawGrid()

    drawTail()

    rectangle("yellowgreen", foodPosX, foodPosY, snakeSize, snakeSize)

    rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize)
    
}

//! Drawing Rectangles
function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

//! Buttons for moving
function keyPush(event) {
    switch(event.key) {
        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowUp":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
        case "ArrowDown":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;

        default:    
            if (!gameIsRunning) {
                location.reload()
                break;
            }           
    }
}

//! Drawing Grid
function drawGrid() {
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            rectangle("white", snakeSize * i, snakeSize * j, snakeSize - 1, snakeSize -1);
        } 
    }
}

//! Random Food Spawning
function resetFood() {
    foodPosX = Math.floor(Math.random() * tileCountX) * snakeSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * snakeSize; 
}

//! Updating Score 
function updateScore() {
    title.textContent = ++score;    
}

//! Drawing Snake Tail
function drawTail() {
    tail.forEach(snakePart => 
        rectangle("gray", snakePart.x, snakePart.y, snakeSize, snakeSize)  
    )
}

//! Adding Tail To Snake
function updateSnake() {
    snakeLength++;
}

//! GAME OVER
function gameOver() {
    gameIsRunning = false;
    document.getElementById("game-over").style.display = "flex";
    document.getElementById("score").style.transform = "scale(1.3)";
}