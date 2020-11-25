// Button to open/close settings menu

document.getElementById("gameMenu").style.display = "none";
let isVisible = false;
const settingsButton = document.getElementById("settings");
settingsButton.addEventListener("click", () => {
    if (isVisible){
        document.getElementById("gameMenu").style.display = "none";
        isVisible = false;
    } else {
        document.getElementById("gameMenu").style.display = "";
        isVisible = true;
    }
});

let isRendered = false;

// generates random triplet (between 0-255) to be used as RGB color value. Returns string with triplet.

function generateColor(){
    const red = Math.floor(Math.random() * 255)
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `${red}, ${green}, ${blue}`;
}


// creates X (input int numberOfDivs) number of <div> elements in html document. returns nothing.
function drawDivs(numberOfDivs){
    const gameGrid = document.getElementById("gameGrid")
    // Evalute if the grid table is too large (or too small) to be rendered
    if (!(numberOfDivs >= 1) || !(numberOfDivs <= 100)){
        return;
    }

    // If a grid was already rendered remove every div before drawing new grid
    if (isRendered) {
        while (gameGrid.firstChild) {
            gameGrid.removeChild(gameGrid.lastChild)
        }
        gameGrid.style.gridTemplateColumns = '';
        isRendered = false;
        drawDivs(parseInt(sizeInput.value));
        return;
    }

    // draw new grid
    for (let i = 0; i < numberOfDivs; i++){
        for (let j = 0; j < numberOfDivs; j++){
            const cells = document.createElement("div");
            cells.id = `row${i + 1}, collumn${j + 1}`;
            cells.className = "cells";
            gameGrid.appendChild(cells);
        }
    }

    // change grid element style to be a N x N square
    gameGrid.style.gridTemplateColumns = `repeat(${numberOfDivs}, 1fr)`
    isRendered = true;

}



// eventListners for various buttons

sizeSubmit.addEventListener("click", () => {
    drawDivs(parseInt(sizeInput.value));
    chooseColors();
});

colorSubmit.addEventListener("click", () => chooseColors())

// function to chose which color to be rendered on each grid cell. Takes input from html radio button for preset colors (red, green, blue and random color (rainbow)) and from input boxes for custom colors

function chooseColors() {
    if (document.getElementById("colorRed").checked){
        paintColors("red");
    } else if (document.getElementById("colorGreen").checked) {
        paintColors("green");
    } else if (document.getElementById("colorBlue").checked) {
        paintColors("blue");
    } else if (document.getElementById("colorRainbow").checked) {
        paintColors("rainbow");
    } else if (document.getElementById("colorCustom").checked) {
        // ! is accepting input out of expected range! 
        let redValue = document.getElementById("redValue").value;
        if (redValue < 0 || redValue > 255) {
            console.error("Red value out of bounds (0-255)")
        }
        let greenValue = document.getElementById("greenValue").value;
        if (greenValue < 0 || greenValue > 255) {
            console.error("Green value out of bounds (0-255)")
        }
        let blueValue = document.getElementById("blueValue").value;
        if (blueValue < 0 || blueValue > 255) {
            console.error("Blue value out of bounds (0-255)")
        }
        paintColors(`rgb(${redValue}, ${greenValue}, ${blueValue})`);
    }
}

// function to define which colors will be used as backgroundColor for each cell. Also draws chosen color on preview box. Takes string input to select color (colorToPaint). returns nothing.

function paintColors(colorToPaint){
    const divList = document.getElementsByClassName("cells");
    switch (colorToPaint) {
        case "red":
            changeColorInDiv(divList, "red", handlerType());
            break;
        case "green":
            changeColorInDiv(divList, "green", handlerType());
            break;
        case "blue":
            changeColorInDiv(divList, "blue", handlerType());
            break;
        case "rainbow":
            changeColorInDiv(divList, "rainbow", handlerType());
            break;
        default:
            changeColorInDiv(divList, colorToPaint, handlerType());
            break;
    }
}

// defines which color will be applied to each cell and which type of event listner to listen to. takes nodelist, string, string. returns nothing.

function changeColorInDiv(listOfCells, color, eventType){
    if (color === "rainbow") {
        document.documentElement.style.setProperty('--activeColor',"linear-gradient(45deg, rgba(180,58,58,1) 0%, rgba(198,196,51,1) 18%, rgba(39,227,64,1) 35%, rgba(65,175,168,1) 52%, rgba(100,102,228,1) 66%, rgba(176,139,175,1) 83%, rgba(252,69,69,1) 100%)");
        color = `rgb(${generateColor()})` // Generate a random color for the first paint
        for (let i = 0; i < listOfCells.length; i++) {
            listOfCells[i].addEventListener(eventType, () => {
                listOfCells[i].style.backgroundColor = color;
                color = `rgb(${generateColor()})` // Create a new random color for the next paint
                document.documentElement.style.setProperty('--activeColor', color); // SHow next random color in preview
            });
        }
    } else {
        // document.getElementById("renderColor").style.background=color;
        document.documentElement.style.setProperty('--activeColor', color);
        for (let i = 0; i < listOfCells.length; i++) {
            listOfCells[i].addEventListener(eventType, () => {
                listOfCells[i].style.backgroundColor = color;
            });
        } 
    }
    // else {
    //     // document.getElementById("renderColor").style.background=color;
    //     document.documentElement.style.setProperty('--activeColor', color);
    //     for (let i = 0; i < listOfCells.length; i++) {
    //         listOfCells[i].addEventListener(eventType, () => {
    //             listOfCells[i].style.backgroundColor = color;
    //         });
    //     }
    // }
}

// removes all previous eventhandlers and adds new ones defined in settings. returns string with handler to be used by other function.
function handlerType() {
    const oldGrid = document.getElementById("gameGrid");
    const newGrid = oldGrid.cloneNode(true);
    document.getElementById("renderWindow").replaceChild(newGrid, oldGrid);
    if (document.getElementById("hoverRender").checked) {
        return "mouseover";
    } else if (document.getElementById("clickRender").checked) {
        return "click";
    // TODO: Add an option to paint cells with click/drag
    // } else if (document.getElementById("clickHoverRender").checked) {
    //     return "clickHover";
    } else {
        console.error("unexpected handler type!")
    }
}



// default state on page load
drawDivs(parseInt(sizeInput.value));
chooseColors();