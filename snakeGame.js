// Global variables
let snakeElements = [{ row: 10, col: 6 }, { row: 10, col: 5 }, { row: 10, col: 4 }, { row: 10, col: 3 }];
let foodPosition = { row: 10, col: 15 };
let isEaten = false;
let isWallHit = false;
let isCellTaken = false;
const board = document.getElementById("board");
// loop variables
let animationFrameId;
let lastTime = 0;
let intervalInMilliseconds = 150;
let count = 0;
let isPaused = false;
//player's inputs
let lastKeyPressed = 'ArrowRight';
let oldKey = 'ArrowRight';
// Start the game
const start = () => {
    const splashScreen = document.getElementById("splashScreen");
    splashScreen.style.display = "none";
    document.removeEventListener('keydown', start);
    drawSnake(snakeElements);
    drawFood(foodPosition);
    // Start the loop
    window.requestAnimationFrame(loop);
};
document.addEventListener('keydown', start);
// Update the game
const loop = (timestamp) => {
    if (timestamp - lastTime >= intervalInMilliseconds) {
        lastTime = timestamp;
        // Debug
        count += 1;
        console.log(count);
        checkForCollisions(snakeElements, foodPosition);
        updateSnake(snakeElements);
        while (isCellTaken) {
            updateFood(foodPosition);
            checkForCollisions(snakeElements, foodPosition);
        }
        if (isWallHit) return end();
        // breadcrumbs 
        oldKey = lastKeyPressed;
    };
    // Continue the loop
    animationFrameId = requestAnimationFrame(loop);
};
// end the game
const end = () => {
    cancelAnimationFrame(animationFrameId);
    document.removeEventListener('keydown', onPlay);
    alert("game over!")
}
const drawSnake = (elements) => {
    elements.forEach(position => {
        let snake = document.createElement("div");
        snake.setAttribute("class", "snake");
        snake.style.gridArea = `${position.row}/${position.col}`;
        board.append(snake);
    });
};
const drawFood = (position) => {
    let food = document.createElement("div");
    food.setAttribute("id", "food");
    food.style.gridArea = `${position.row}/${position.col}`;
    board.append(food);
};
const updateSnake = (elements) => {
    updateSnakePosition(elements);
    updateSnakeSize(elements);
    const oldSnake = document.querySelectorAll(".snake");
    oldSnake.forEach((element) => element.remove());
    drawSnake(elements);
};
const checkForCollisions = (player, target) => {
    const checkForFoodEaten = (player, target) => player[0].row === target.row && player[0].col === target.col;
    checkForFoodEaten(player, target) ? isEaten = true : isEaten = false;

    const checkForWallReached = (element) => element.row > 20 || element.col > 20 || element.row < 0 || element.col < 0;
    player.some(checkForWallReached) ? isWallHit = true : isWallHit = false;

    const checkForMatchingCell = (element) => element.row === target.row && element.col === target.col;
    player.some(checkForMatchingCell) ? isCellTaken = true : isCellTaken = false;
};

const updateFood = (position) => {
    updateFoodPosition(position);
    const oldFood = document.getElementById("food");
    if (oldFood) {
        oldFood.remove();
    };
    drawFood(position);
};
const updateSnakePosition = (elements) => {
    // cancel backward movement
    if (oldKey === "ArrowDown" && lastKeyPressed === "ArrowUp") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowUp" && lastKeyPressed === "ArrowDown") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowLeft" && lastKeyPressed === "ArrowRight") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowRight" && lastKeyPressed === "ArrowLeft") lastKeyPressed = oldKey;
    // add a new element at the begining of the snakeElements and remove the last one
    let head = elements[0];
    switch (lastKeyPressed) {
        case "ArrowDown":
            elements.unshift({ row: head.row + 1, col: head.col });
            break;
        case "ArrowUp":
            elements.unshift({ row: head.row - 1, col: head.col });
            break;
        case "ArrowLeft":
            elements.unshift({ row: head.row, col: head.col - 1 });
            break;
        case "ArrowRight":
            elements.unshift({ row: head.row, col: head.col + 1 });
            break;
    };
};
const updateSnakeSize = (elements) => {
    if (!isEaten) elements.pop();
}
const updateFoodPosition = (position) => {
    position.row = Math.floor(Math.random() * 20) + 1;
    position.col = Math.floor(Math.random() * 20) + 1;
};

// listening for player's input

const onPlay = (event) => {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    };
    switch (event.key) {
        case "ArrowDown":
            lastKeyPressed = "ArrowDown";
            break;
        case "ArrowUp":
            lastKeyPressed = "ArrowUp";
            break;
        case "ArrowLeft":
            lastKeyPressed = "ArrowLeft";
            break;
        case "ArrowRight":
            lastKeyPressed = "ArrowRight";
            break;
        case "Enter":
            // Do something for "enter" or "return" key press.
            break;
        case " ":
            // Do something for "space" key press.
            break;
        case "Escape":
            isPaused = !isPaused;
            if (isPaused) cancelAnimationFrame(animationFrameId);
            else if (!isPaused) requestAnimationFrame(loop);
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    };
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
};
document.addEventListener("keydown", onPlay, true)