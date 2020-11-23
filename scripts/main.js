const gameWindow = document.getElementById("renderWindow");
const gameGrid = document.getElementById("gameGrid");
const sizeInput = document.getElementById("sizeInput");
const sizeSubmit = document.getElementById("sizeSubmit");
const colorSubmit = document.getElementById("colorSubmit");

let isRendered = false;

function generateColor(){
    const red = Math.floor(Math.random() * 255)
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `${red}, ${green}, ${blue}`;
}

function drawDivs(numberOfDivs){
    if (!isRendered) {
        for (let i = 0; i < numberOfDivs; i++){
            for (let j = 0; j < numberOfDivs; j++){
                let cells = document.createElement("div");
                cells.id = `row${i + 1}, collumn${j + 1}`;
                cells.className = "cells";
                gameGrid.appendChild(cells);
            }
        }
        gameGrid.style.gridTemplateColumns = `repeat(${numberOfDivs}, 1fr)`
        isRendered = true;
    } else {
        while (gameGrid.firstChild) {
            gameGrid.removeChild(gameGrid.lastChild)   
        }
        gameGrid.style.gridTemplateColumns = '';
        isRendered = false;
        drawDivs(parseInt(sizeInput.value));
    }
}

sizeSubmit.addEventListener("click", () => {
    drawDivs(parseInt(sizeInput.value));
});

colorSubmit.addEventListener("click", () => {
    if (document.getElementById("colorRed").checked){
        paintColors("red");
    } else if (document.getElementById("colorGreen").checked) {
        paintColors("green");
    } else if (document.getElementById("colorBlue").checked) {
        paintColors("blue");
    } else if (document.getElementById("colorRainbow").checked) {
        paintColors("rainbow");
    }
})

function paintColors(colorToPaint){
    const divList = document.getElementsByClassName("cells");
    switch (colorToPaint) {
        case "red":
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = "red"; 
                });
            }
            break;
        case "green":
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = "green"; 
                });
            }
            break;
        case "blue":
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = "blue"; 
                });
            }
            break;
        case "rainbow":
            for (let i = 0; i < divList.length; i++) {
                divList[i].addEventListener("mouseover", () => {
                    divList[i].style.backgroundColor = `rgb(${generateColor()})`; 
                });
            }
            break;
    }
    
}


