const first = document.querySelector("#first");
let array = ['esimene', 'teine', 'kolmas', 'neljas'];
const button = document.querySelector('#button');
listElement = document.querySelectorAll('.list-element');
let numbers = [1, 2, 49, 104, 3, 4, 5, 6, 7, 8, 9, 10];
const colors = ['yellow', 'orange', 'beige', 'lightgray', 'pink'];
numbers.sort(function(a, b) { return a - b});
numbers.reverse();
console.log(numbers);
const time = document.querySelector('#time');

function updateClock() {
    let date = new Date();
    time.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

setInterval(updateClock, 1000); 


function buttonPressed() {
    for (let i = 0; i < listElement.length; i++) {
        listElement[i].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }
}

function changeColor() {
        r = Math.round(Math.random() * 255);
        g = Math.round(Math.random() * 255);
        b = Math.round(Math.random() * 255);
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b}`;
}

document.body.addEventListener('mouseover', changeColor);

// window.alert(array[0]);

// for (item of array) {
//     console.log(item);
// }

// array.forEach((i) => {
//     window.alert(i);
// })

// for (let i = 0; i < array.length; i++) {
//     window.alert(array[i]);
// }
button.addEventListener('click', buttonPressed);

function addList() {
    array.forEach((item) => {
        let text = `<li>${item}</li>`;
        first.innerHTML = first.innerHTML + text;
    });
    button.disabled = true;
}

for (list of listElement) {
    list.style.color = 'red';
}
let person = {
    firstName: 'Markus',
    lastName: 'Tammeoja',
    age: 20,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
