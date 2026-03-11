var totalGuessTime = 0;
var totalGuesses = 0;

function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function hardRandomColor(base) {
    var red = base - Math.floor(Math.random() * 75);
    if (red < 0) {
        red = red * (-1);
    }
    var green = base - Math.floor(Math.random() * 75);
    if (green < 0) {
        green = green * (-1);
    }
    var blue = base - Math.floor(Math.random() * 75);
    if (blue < 0) {
        blue = blue * (-1);
    }
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function generateRandomColors(genColor, hard) {
    var arr = [];
    if (hard) {
            for (var i = 0; i < genColor; i++) {
            var base = Math.floor(Math.random() * 256);
            arr.push(hardRandomColor(base));
        }
    } else {
        for (var i = 0; i < genColor; i++) {
            arr.push(randomColor());
        }
    }

    return arr;
}

function randomColorG() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function changeColors(colors) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors;
    }
}

var numSquares = 6;
var colors = generateRandomColors(numSquares, hard);
var squares = document.querySelectorAll(".square");
var pickedColor = randomColorG();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var threeSquares = document.querySelector("#threesquares");
var sixSquares = document.querySelector("#sixsquares");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var body = document.querySelector("body");
var hard = false;
lastColor = "#555555";
var streak = document.querySelector("#streak");
var guessed = 0;
var clicked = 0;
var time = document.querySelector("#time");
var startTime = Date.now();
var avg = "Average guess time: 0";
time.textContent = avg;

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("reset").click();
    }
});

threeSquares.addEventListener("click", function () {
    sixSquares.classList.remove("selected");
    threeSquares.classList.add("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares, hard);
    pickedColor = randomColorG();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

sixSquares.addEventListener("click", function () {
    threeSquares.classList.remove("selected");
    sixSquares.classList.add("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares, hard);
    pickedColor = randomColorG();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }
});

easyButton.addEventListener("click", function () {
    hard = false;

    colors = generateRandomColors(numSquares, hard);
    pickedColor = randomColorG();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
});

hardButton.addEventListener("click", function () {
    hard = true;

    colors = generateRandomColors(numSquares, hard);
    pickedColor = randomColorG();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
});

resetButton.addEventListener("click", function () {
    colors = generateRandomColors(numSquares, hard);
    pickedColor = randomColorG();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
    clicked = 0;
});

colorDisplay.textContent = pickedColor;

streak.textContent = "Guessed: " + guessed;

for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function () {
        var clickedColor = this.style.backgroundColor;
        if (pickedColor === clickedColor) {
            var guessTime = Date.now() - startTime;
            totalGuessTime += guessTime;
            totalGuesses++;

            var averageGuessTime = totalGuessTime / totalGuesses;
            time.textContent = "Average guess time: " + averageGuessTime.toFixed(2);

            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);
            body.style.backgroundColor = clickedColor;
            lastColor = clickedColor;
            if (clicked === 0) {
                guessed++;
                streak.textContent = "Guessed: " + guessed;
            }
            clicked++;
        } else {
            this.style.backgroundColor = lastColor;
        }
    });
}