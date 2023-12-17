// Global variables
let snakeElements = [{ row: 10, col: 6 }, { row: 10, col: 5 }, { row: 10, col: 4 }, { row: 10, col: 3 }];
let foodPosition = { row: 10, col: 15 };
const board = document.getElementById("board");
// loop variables
let animationFrameId;
let lastTime = 0;
let intervalInMilliseconds = 150;
let count = 0;
//player's inputs
let lastKeyPressed = 'ArrowRight';
let oldKey = 'ArrowRight';

// Start the game
const Start = () => {
    const splashScreen = document.getElementById("splashScreen");
    splashScreen.style.display = "none";
    document.removeEventListener('keydown', Start);
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
        console.log('lastKeyPressed:', lastKeyPressed);
        draw();
        oldKey = lastKeyPressed;

    }
    // Continue the loop
    animationFrameId = requestAnimationFrame(loop);
}

const draw = () => {
    updateSnake(snakeElements);
    updateFood(foodPosition);
}

const updateSnake = (elements) => {
    updateSnakePosition(elements);

    const oldSnake = document.querySelectorAll(".snake");
    oldSnake.forEach((element) => element.remove());

    elements.forEach(position => {
        let snake = document.createElement("div");
        snake.setAttribute("class", "snake");
        snake.style.gridArea = `${position.row}/${position.col}`
        board.append(snake);
        console.log(snake);
    });
}

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

    let food = document.createElement("div");
    food.setAttribute("id", "food");
    food.style.gridArea = `${position.row}/${position.col}`
    board.append(food);
}

//listening for player's input
document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "ArrowDown":
            console.log("ArrowDown");
            lastKeyPressed = "ArrowDown"
            break;
        case "ArrowUp":
            console.log("ArrowUp");
            lastKeyPressed = "ArrowUp"
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            lastKeyPressed = "ArrowLeft"
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            lastKeyPressed = "ArrowRight"
            break;
        case "Enter":
            // Do something for "enter" or "return" key press.
            break;
        case " ":
            // Do something for "space" key press.
            break;
        case "Escape":
            cancelAnimationFrame(animationFrameId);
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
},
    true,
);