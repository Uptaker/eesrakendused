/* sources:

https://www.w3schools.com/html/html5_canvas.asp
seletas HTML5 canvas ja kuidas manipuleerida seda.

https://www.youtube.com/watch?v=pufKO5EG8nc
freeCodeCamp'i video - flappy bird loogika ja aitas canvasi paremini lahti selgitada

https://kondoy.artstation.com/projects/XnzWDD
background citadel image (edited)

https://www.pinclipart.com/maxpin/iRbmixR/
pixel wrench (edited)

https://www.pixilart.com/art/half-life-headcrab-bda088ca1e50ab0
pixel headcrab (edited)

https://www.seekpng.com/ipng/u2e6w7e6q8e6a9i1_ground-sprite-for-technology-assignment-pixel-art-ground/
foreground (size & color edited)

Features:
- leaderboard
- game
- set name before playing


maybe try this
https://www.youtube.com/watch?v=cXgA1d_E-jY
*/


// const canvas = $('#canvas'); only accepts pure Canvas elements, not jQuery objects
// https://stackoverflow.com/questions/5808162/getcontext-is-not-a-function
$("#game").hide();


let pName;
let score;
let game;
$(document).on('keypress', () => {
    if (JSON.parse(localStorage.getItem('score'))) {
        pName = JSON.parse(localStorage.getItem('score')).name;
        score = JSON.parse(localStorage.getItem('score')).score;
    } else {
        pName = prompt("Welcome. Please, enter your username");
        score = 0;
    }
    $("#tutorial").hide();
    $("#game").show();
    game = new Game(pName, score);
    $(document).off("keypress");
});
class Game {
    constructor(pName, score) {

        this.c = document.querySelector("#canvas");
        this.ctx = this.c.getContext("2d"); // context
        this.sprites = 5;
        this.loadedSprites = 0;
        this.score = 0;
        this.gravity = 0.8;
        this.pName = pName;
        this.highestScore = score;
        console.log(this.highestScore);
        this.failed = false;

        this.player = new Image();
        this.player.reference = this;
        this.bg = new Image();
        this.bg.reference = this;
        this.fg = new Image();
        this.fg.reference = this;
        this.north = new Image();
        this.north.reference = this;
        this.south = new Image();
        this.south.reference = this;
        this.gameOver = new Image();
        this.gameOver.reference = this;

        //obstacle coordinates
        this.obstacle = [];
        this.obstacle[0] = {
            x: this.c.width,
            y: 0,
        }

        //audio
        this.fly = new Audio();
        this.scored = new Audio();
        this.die = new Audio();
        this.music = new Audio();
        this.fly.src = "audio/wpn_denyselect.wav";
        this.scored.src = "audio/hc_alert1.wav";
        this.die.src = "audio/hc_die1.wav";
        this.music.src = "audio/Half-Life03.mp3"




        this.pX = 50; // player starting location
        this.pY = 150;

        // set sprite locations and load.
        this.bg.onload = this.loaded;
        this.bg.src = "images/bg.png";

        this.player.onload = this.loaded;
        this.player.src = "images/crab.png";

        this.fg.onload = this.loaded;
        this.fg.src = "images/fg.png";

        this.north.onload = this.loaded;
        this.north.src = "images/north.png";

        this.gap = 85;
        this.constant = this.north.height + this.gap;

        this.south.onload = this.loaded;
        this.south.src = "images/south.png";

        this.gameOver.onload = this.loaded;
        this.gameOver.src = "images/gameover.png";

        $(document).on('keydown', (e) => {
            this.moveUp(e.key)
        });
        console.log("Ignore the play() exception, it expects a user to interact with the site before playing");
    }

    // make sure every image is loaded before drawing (else you'll have a baaaad time)
    async loaded() {
        let ref = this.reference;
        ref.loadedSprites += 1;
        if (ref.loadedSprites >= ref.sprites) {
            window.requestAnimationFrame(ref.draw.bind(ref));
        }
    }

    drawScore() {
        $('#score').html(`Score: ${this.score}`);
        $('#highestScore').html(`Hiscore of ${this.pName}: ${this.highestScore}`);
    }

    draw() {
        if (!this.failed) {
            this.music.play();
            let constant = this.gap + this.north.height;
            this.ctx.drawImage(this.bg, 0, 0);
            this.ctx.drawImage(this.player, this.pX, this.pY);
            this.pY += this.gravity

            for (var i = 0; i < this.obstacle.length; i++) {
                this.ctx.drawImage(this.north, this.obstacle[i].x, this.obstacle[i].y);
                this.ctx.drawImage(this.south, this.obstacle[i].x, this.obstacle[i].y + constant);

                this.obstacle[i].x--;

                if (this.obstacle[i].x == 225) {
                    this.obstacle.push({
                        x: this.c.width,
                        y: Math.floor(Math.random() * this.north.height) - this.north.height
                    });
                }

                // detect collision
                if (this.pX + this.player.width >= this.obstacle[i].x &&
                    this.pX <= this.obstacle[i].x + this.north.width &&
                    (this.pY <= this.obstacle[i].y + this.north.height ||
                        this.pY + this.player.height >= this.obstacle[i].y + constant) ||
                    this.pY + this.player.height >= this.c.height - this.fg.height) {
                    this.die.play();
                    this.failed = true;
                    this.ctx.drawImage(this.gameOver, 0, 0);
                    $(document).off();
                    this.restart();
                }

                if (this.obstacle[i].x == 5) {
                    this.score++
                    $('#score').css("color", "purple");
                    $('#score').css("transform", "scale(1.05)");
                    setTimeout(() => {
                        $('#score').css("color", "black");
                        $('#score').css("transform", "scale(1.0)");
                    }, 1000);
                    this.scored.play();
                    if (this.score > this.highestScore) {
                        this.highestScore = this.score;
                        $('#highestScore').css("color", "purple");
                        $('#highestScore').css("transform", "scale(1.05)");
                        setTimeout(() => {
                            $('#highestScore').css("color", "black");
                            $('#highestScore').css("transform", "scale(1.0)");
                        }, 1000);
                        this.saveResult();
                    }
                }
                this.drawScore();
            }
            this.ctx.drawImage(this.fg, 0, this.c.height - this.fg.height);
            window.requestAnimationFrame(this.draw.bind(this));
        }
    }

    restart() {
        this.ctx.drawImage(this.gameOver, 0, 0);
        setTimeout(() => {
            location.reload()
        }, 3000);
    }

    saveResult() {
        let result = {
            name: this.pName,
            score: this.highestScore
        }
        localStorage.setItem('score', JSON.stringify(result));
    }
    moveUp(e) {
        if (e == "w" || e == " " || e == "ArrowUp") {
            this.pY -= 30;
            this.fly.play();
        } else if (e == "s" || e == "ArrowDown") {
            this.pY += 5;
            this.fly.play();
        }

    }
}