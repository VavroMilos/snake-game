//! listeners
document.addEventListener("keydown", keyPush);

//! canvas
const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const ctx = canvas.getContext('2d');

//! player
let gameIsRunning = true;

const snakeSize = 50;

let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

const fps = 10;

let velocityX = 1;
let velocityY = 0;

let foodPosX = 0;
let foodPosY = 0;

let tail = []
let snakeLength = 2;

let score = 0;

const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;

//! loop
function gameLoop() { 
    if (gameIsRunning) {
        drawStuff() 
        moveStuff()
        setTimeout(gameLoop, 1000 / fps);    
    }          
}
resetFood();
gameLoop();

//! move
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

//! draw
function drawStuff() {
    rectangle("lightblue", 0, 0, canvas.width, canvas.height)

    drawGrid()

    drawTail()
    
    rectangle("yellowgreen", foodPosX, foodPosY, snakeSize, snakeSize)

    rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize)
}

//! draw rectangle
function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

//! keyboard
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

//! draw grid 
function drawGrid() {
    for (let i = 0; i < tileCountX; i++) {
        for (let j = 0; j < tileCountY; j++) {
            rectangle("white", snakeSize * i, snakeSize * j, snakeSize - 1, snakeSize -1);
        } 
    }
}

//! random food spawn
function resetFood() {
    foodPosX = Math.floor(Math.random() * tileCountX) * snakeSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * snakeSize; 
}

//! update score
function updateScore() {
    title.textContent = ++score;    
}

//! draw tail
function drawTail() {
    tail.forEach(snakePart => 
        rectangle("gray", snakePart.x, snakePart.y, snakeSize, snakeSize)  
    )
}

//! update snake
function updateSnake() {
    snakeLength++;
}

//! game over
function gameOver() {
    gameIsRunning = false;
}