const gameWindow = document.getElementById("renderWindow");
const gameGrid = document.getElementById("gameGrid");
const sizeInput = document.getElementById("sizeInput");
const sizeSubmit = document.getElementById("sizeSubmit");
const colorSubmit = document.getElementById("colorSubmit");
const settingsButton = document.getElementById("settings");

document.getElementById("gameMenu").style.display = "none";
let isVisible = false;

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
        let redValue = document.getElementById("redValue").value;
        let greenValue = document.getElementById("greenValue").value;
        let blueValue = document.getElementById("blueValue").value;
        paintColors(`rgb(${redValue}, ${greenValue}, ${blueValue})`);
    }
}

// function to define which colors will be used as backgroundColor for each cell. Also draws chosen color on preview box. Takes string input to select color (colorToPaint). returns nothing.

function paintColors(colorToPaint){
    const divList = document.getElementsByClassName("cells");
    switch (colorToPaint) {
        case "red":
            document.getElementById("renderColor").style.background="red";
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = "red";
                });
            }
            break;
        case "green":
            document.getElementById("renderColor").style.background="green";
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = "green";
                });
            }
            break;
        case "blue":
            document.getElementById("renderColor").style.background="blue";
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = "blue";
                });
            }
            break;
        case "rainbow":
            document.getElementById("renderColor").style.background="linear-gradient(45deg, rgba(180,58,58,1) 0%, rgba(198,196,51,1) 18%, rgba(39,227,64,1) 35%, rgba(65,175,168,1) 52%, rgba(100,102,228,1) 66%, rgba(176,139,175,1) 83%, rgba(252,69,69,1) 100%)";
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = `rgb(${generateColor()})`;
                });
            }
        default:
            document.getElementById("renderColor").style.background=colorToPaint;
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = colorToPaint;
                    document.getElementById("renderColor").style.backgroundColor=colorToPaint;
                });
            }
            break;
    }

}

// default state on page load
drawDivs(parseInt(sizeInput.value));
chooseColors();