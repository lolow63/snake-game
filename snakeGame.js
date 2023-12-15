
// Start the game
const Start = () => {
    const splashScreen = document.getElementById("splashScreen");
    splashScreen.style.display = "none";
};
document.addEventListener('keydown', function (event) {
    Start();
});
