// Game variables initialisation
let snakeSegments = [{ row: 10, col: 6 }, { row: 10, col: 5 }, { row: 10, col: 4 }, { row: 10, col: 3 }];
let foodPosition = { row: 10, col: 15 };
let isBodyBitten = false;
let isEaten = false;
let isWallHit = false;
let isCellTaken = false;
let isGameStarted = false;
let isGamePaused = false;

const gameBoardElement = document.getElementById("gameBoard");
const splashScreenElement = document.getElementById("splashScreen");

// gameLoop variables initialisation
let animationFrameId;
let lastTimestampChecked = 0;
let snakeSpeed = 150;

//player's inputs initialisation
let lastKeyPressed = 'ArrowRight';
let oldKey = 'ArrowRight';

// Launch the game
const startGame = () => {
    splashScreenElement.style.display = "none";
    renderSnakeOnBoard(snakeSegments);
    renderFoodOnBoard(foodPosition);
    // Start the gameLoop
    window.requestAnimationFrame(gameLoop);
};

// Update the game
const gameLoop = (timestamp) => {
    if (timestamp - lastTimestampChecked >= snakeSpeed) {
        detectCollisions(snakeSegments, foodPosition);
        updateSnake(snakeSegments);
        while (isCellTaken) {
            updateFood(foodPosition);
            detectCollisions(snakeSegments, foodPosition);
        }
        if (isWallHit) return endGame();
        if (isBodyBitten) return endGame();
        // breadcrumbs 
        lastTimestampChecked = timestamp;
        oldKey = lastKeyPressed;
    };
    // Continue the gameLoop
    animationFrameId = requestAnimationFrame(gameLoop);
};

// end the game
const endGame = () => {
    cancelAnimationFrame(animationFrameId);
    document.removeEventListener('keydown', onPlay);
    alert("game over!")
};

// high level functions
const renderSnakeOnBoard = (elements) => {
    elements.forEach(position => {
        let snake = document.createElement("div");
        snake.setAttribute("class", "snake");
        snake.style.gridArea = `${position.row}/${position.col}`;
        gameBoardElement.append(snake);
    });
};
const renderFoodOnBoard = (position) => {
    let food = document.createElement("div");
    food.setAttribute("id", "food");
    food.style.gridArea = `${position.row}/${position.col}`;
    gameBoardElement.append(food);
};
const updateSnake = (elements) => {
    const oldSnake = document.querySelectorAll(".snake");
    oldSnake.forEach((element) => element.remove());
    moveSnake(elements);
    shrinkSnakeIfNotEaten(elements);
    renderSnakeOnBoard(elements);
};
const updateFood = (position) => {
    document.getElementById("food").remove();
    generateRandomFoodPosition(position);
    renderFoodOnBoard(position);
};
const detectCollisions = (snake, target) => {
    detectBodyBitten(snake) >= 2 ? isBodyBitten = true : isBodyBitten = false;
    detectFoodEaten(snake, target) ? isEaten = true : isEaten = false;

    const detectWallReached = (element) => element.row > 20 || element.col > 20 || element.row < 0 || element.col < 0;
    snake.some(detectWallReached) ? isWallHit = true : isWallHit = false;

    const detectMatchingCell = (element) => element.row === target.row && element.col === target.col;
    snake.some(detectMatchingCell) ? isCellTaken = true : isCellTaken = false;
};

// Mid level functions
const moveSnake = (elements) => {
    // cancel backward movement
    if (oldKey === "ArrowDown" && lastKeyPressed === "ArrowUp") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowUp" && lastKeyPressed === "ArrowDown") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowLeft" && lastKeyPressed === "ArrowRight") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowRight" && lastKeyPressed === "ArrowLeft") lastKeyPressed = oldKey;
    // add a new segment at the begining of the snakeSegments
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
const shrinkSnakeIfNotEaten = (elements) => {
    if (!isEaten) elements.pop();
}
const generateRandomFoodPosition = (position) => {
    position.row = Math.floor(Math.random() * 20) + 1;
    position.col = Math.floor(Math.random() * 20) + 1;
};

// Low level functions
const detectBodyBitten = (snake) => {
    let duplicate = 0;
    const checkForDuplicate = (element) => {
        if (snake[0].row === element.row && snake[0].col === element.col) duplicate += 1;
    };
    snake.forEach(checkForDuplicate);
    return duplicate;
};
const detectFoodEaten = (snake, target) => snake[0].row === target.row && snake[0].col === target.col;

// listening for player's input
const onPlay = (event) => {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    };
    // start the game using any keys but escape
    if (!isGameStarted) {
        if (event.key !== "Escape") {
            isGameStarted = true;
            startGame();
        }
    }
    // control handling
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
            if (isGameStarted) {
                // use Escape to toggle between pause and start
                isGamePaused = !isGamePaused;
                if (isGamePaused) {
                    cancelAnimationFrame(animationFrameId);
                } else {
                    requestAnimationFrame(gameLoop);
                }
            } else {
                // start the game using Escape
                isGameStarted = true;
                startGame();
            }
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    };
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
};
document.addEventListener("keydown", onPlay, true);