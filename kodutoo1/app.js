
function clock() {
    const clock = document.querySelector('#clock');
    const date = document.querySelector('#date');
    let d = new Date();

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    date.innerHTML = `${days[d.getDay()]} - ${d.getDate()}. ${months[d.getMonth()]}, ${d.getFullYear()}`

    let hours = d.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let mins = d.getMinutes();
    if (mins < 10) {
        mins = `0${mins}`;
    }
    let sec = d.getSeconds();
    if (sec < 10) {
        sec = `0${sec}`;
    }
    clock.innerHTML = `${hours} : ${mins} : ${sec}`;
}

let nameSubmit = document.querySelector('#nameSubmit');
nameSubmit.addEventListener('click', (e) => {
    let nameInput = document.querySelector('#nameInput');
    e.preventDefault();
    if (nameInput.value == "") {
        let notification = document.createElement('p');
        notification.innerText = `The input field is empty!`;
        notification.classList.add('fail');
        document.body.appendChild(notification);
        setTimeout(() => { document.body.removeChild(notification) }, 5000);
    } else {
        let notification = document.createElement('p');
        notification.innerText = `Hello, ${nameInput.value}, your name has been saved.`;
        notification.classList.add('success');
        document.body.appendChild(notification);

        // check if json doesn't exist
        let obj = JSON.parse(window.localStorage.getItem('info'));
        if (!obj) {
            window.localStorage.setItem('info', JSON.stringify({ name: nameInput.value }));
            showName();
        } else {
            window.localStorage.setItem('info', JSON.stringify({ name: nameInput.value }));
        }
        document.querySelector('.greeting').innerText = `Welcome, ${nameInput.value}`;
        nameInput.value = "";
        setTimeout(() => { document.body.removeChild(notification) }, 5000);
    }
});

let redditInput = document.querySelector('#redditInput');

redditSubmit.addEventListener('click', (e) => {
    let redditInput = document.querySelector('#redditInput');
    e.preventDefault();
    if (redditInput.value == "") {
        let notification = document.createElement('p');
        notification.innerText = `The input field is empty!`;
        notification.classList.add('fail');
        document.body.appendChild(notification);
        setTimeout(() => { document.body.removeChild(notification) }, 4000);
    } else {
        let notification = document.createElement('p');
        notification.innerText = `r/${redditInput.value} has been saved.`;
        notification.classList.add('success');
        document.body.appendChild(notification);
        window.localStorage.setItem('subreddit', JSON.stringify({ sub: redditInput.value }));
        redditInput.value = "";
        setTimeout(() => { document.body.removeChild(notification) }, 4000);
        showSub();
    }
});

document.querySelector('#gitLink').addEventListener('click', () => {
    location.href = 'https://github.com/Uptaker';
});

document.querySelector('#subLink').addEventListener('click', () => {
    let obj = JSON.parse(window.localStorage.getItem('subreddit'));
    if (obj) {
        location.href = `https://reddit.com/r/${obj.sub}`;
    } else {
        location.href = 'https://reddit.com';
    }
});

function showName() {
    let obj = JSON.parse(window.localStorage.getItem('info'));
    if (obj && obj.name != "") {
        let greeting = document.createElement('h1');
        greeting.classList.add('greeting');
        greeting.innerText = `Welcome, ${obj.name}`;
        document.querySelector('#clockArea').prepend(greeting);
    }
}
let color = document.querySelector('#changeColor');
color.addEventListener('change', () => {
    window.localStorage.setItem('color', JSON.stringify({ code: color.value }));
    displayCustomColor();
});
function displayCustomColor() {
    let obj = JSON.parse(window.localStorage.getItem('color'));
    if (obj) {
        let html = document.querySelector("html");
        html.style.backgroundColor = obj.code;
    }
}

function showSub() {
    let obj = JSON.parse(window.localStorage.getItem('subreddit'));
    if (obj && obj.sub != "") {
        document.querySelector('#subLink').innerText = `Reddit.com/r/ ${obj.sub}`;
    }
}
let greeting = new showName();
showSub();
clock();
setInterval(clock, 1000);
displayCustomColor();