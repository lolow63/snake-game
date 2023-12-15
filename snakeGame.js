
// Start the game
const onStart = () => {
    const splashScreen = document.getElementById("splashScreen");
    splashScreen.style.display = "none";
};
document.addEventListener('keydown', function (event) {
    onStart();
});
