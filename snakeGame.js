// Global variables
let snakeElements = [{ x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 }, { x: 12, y: 9 }];
let food = [{ x: 3, y: 3 }];
const board = document.getElementById("board");
// loop variables
let animationFrameId;
let lastTime = 0;
let intervalInMilliseconds = 1000;
let count = 0;
//player's inputs
let lastKeyPressed;

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

        // Run your callback function here

    }
    // Continue the loop
    animationFrameId = requestAnimationFrame(loop);
}

const Draw = () => {
    createSnake(snakeElements);
}

const createSnake = (snakeElements) => {
    snakeElements.forEach(element => {
        let snake = document.createElement("div");
        snake.setAttribute("class", "snake");
        snake.style.gridArea = `${element.x}/${element.y}`
        board.append(snake);
        console.log(snake);
    });
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