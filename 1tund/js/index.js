let first = document.getElementById("title")
first.style.display = "none";

let demoElement = document.getElementsByClassName("hidden");
function demoFunction() {
    for (let i = 0; i < demoElement.length; i++) {
        demoElement[i].innerHTML = "OH NO YOU CAN SEE ME";
    }
}

function changeColor() {
    for (let i = 0; i < demoElement.length; i++) {
        demoElement[i].style.backgroundColor = "yellow";
    }
}
function revertColor() {
    for (let i = 0; i < demoElement.length; i++) {
        demoElement[i].style.backgroundColor = "white";
    }
}
