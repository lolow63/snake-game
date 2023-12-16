// Global variables
let snakeElements = [{ x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 }, { x: 12, y: 9 }];
let food = [{ x: 3, y: 3 }];
const board = document.getElementById("board");


// Start the game
const Start = () => {
    const splashScreen = document.getElementById("splashScreen");
    splashScreen.style.display = "none";
};

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
document.addEventListener('keydown', function (event) {
    Start();
    if (event.key === 'Escape') {
        cancelAnimationFrame(animationFrameId);
    }
});

const element = document.getElementById("title");
let animationFrameId;
let lastTime = 0;
let intervalInMilliseconds = 1000;
let count = 0;

function loop(timestamp) {
    // Check if the specified interval has passed
    if (timestamp - lastTime >= intervalInMilliseconds) {
        // Update the lastTime to the current timestamp
        lastTime = timestamp;
        count += 1;
        console.log(count);
        // Run your callback function here
        //callbackFunction();
        element.style.transform = "translateX(10px)";
    }
    // Continue the loop
    animationFrameId = requestAnimationFrame(loop);

}
// Start the loop
window.requestAnimationFrame(loop);