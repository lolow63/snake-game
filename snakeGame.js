// Global variables
let snakeElements = [{ row: 10, col: 6 }, { row: 10, col: 5 }, { row: 10, col: 4 }, { row: 10, col: 3 }];
let foodPosition = { row: 10, col: 15 };
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
const Start = () => {
    const splashScreen = document.getElementById("splashScreen");
    splashScreen.style.display = "none";
    document.removeEventListener('keydown', Start);
    drawSnake(snakeElements);
    drawFood(foodPosition);
    // Start the loop
    window.requestAnimationFrame(loop);
};
document.addEventListener('keydown', Start);


function loop(timestamp) {
    if (timestamp - lastTime >= intervalInMilliseconds) {
        lastTime = timestamp;
        // Debug
        count += 1;
        console.log(count);
        updateSnake(snakeElements)
        // loop breadcrumbs 
        oldKey = lastKeyPressed;
    }
    // Continue the loop
    animationFrameId = requestAnimationFrame(loop);
}

const drawSnake = (elements) => {
    elements.forEach(position => {
        let snake = document.createElement("div");
        snake.setAttribute("class", "snake");
        snake.style.gridArea = `${position.row}/${position.col}`
        board.append(snake);
    });
}

const drawFood = (position) => {
    let food = document.createElement("div");
    food.setAttribute("id", "food");
    food.style.gridArea = `${position.row}/${position.col}`
    board.append(food);
}
const updateSnake = (elements) => {
    updateSnakePosition(elements);
    const oldSnake = document.querySelectorAll(".snake");
    oldSnake.forEach((element) => element.remove());
    drawSnake(elements)
};


const updateSnakePosition = (elements) => {
    //cancel backward movement
    if (oldKey === "ArrowDown" && lastKeyPressed === "ArrowUp") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowUp" && lastKeyPressed === "ArrowDown") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowLeft" && lastKeyPressed === "ArrowRight") lastKeyPressed = oldKey;
    else if (oldKey === "ArrowRight" && lastKeyPressed === "ArrowLeft") lastKeyPressed = oldKey;

    let head = elements[0];
    switch (lastKeyPressed) {
        case "ArrowDown":
            elements.unshift({ row: head.row + 1, col: head.col })
            elements.pop();
            break;
        case "ArrowUp":
            elements.unshift({ row: head.row - 1, col: head.col })
            elements.pop();
            break;
        case "ArrowLeft":
            elements.unshift({ row: head.row, col: head.col - 1 })
            elements.pop();
            break;
        case "ArrowRight":
            elements.unshift({ row: head.row, col: head.col + 1 })
            elements.pop();
            break;
    }
}

const updateFood = (position) => {
    const oldFood = document.getElementById("food")
    if (oldFood) {
        oldFood.remove();
    }
    drawFood(position);
}

//listening for player's input
document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "ArrowDown":
            lastKeyPressed = "ArrowDown"
            break;
        case "ArrowUp":
            lastKeyPressed = "ArrowUp"
            break;
        case "ArrowLeft":
            lastKeyPressed = "ArrowLeft"
            break;
        case "ArrowRight":
            lastKeyPressed = "ArrowRight"
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
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
},
    true,
);