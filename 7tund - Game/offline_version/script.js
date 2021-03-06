/* sources:
Features:
- leaderboard
- game
- set name before playing
*/
$("#game").hide();


let pName;
let score;
let game;
$(document).on('keypress', () => { startGame() });
$("#tutorial").on('click', () => { startGame() });

function startGame() {
    if (JSON.parse(localStorage.getItem('headcrab'))) {
        pName = JSON.parse(localStorage.getItem('headcrab')).name;
        score = JSON.parse(localStorage.getItem('headcrab')).score;
    } else {
        while (pName == null) {
            pName = prompt("Welcome. Please, enter your username");
        }
        score = 0;
    }
    $("#tutorial").hide();
    $("#game").show();
    game = new Game(pName, score);
    $(document).off("keypress");
}

class Game {
    constructor(pName, score) {
        this.index;
        this.pName = pName;
        this.highestScore = score;
        this.c = document.querySelector("#canvas"); // https://stackoverflow.com/questions/5808162/getcontext-is-not-a-function doesn't accept jQuery
        this.ctx = this.c.getContext("2d"); // context
        this.sprites = 6;
        this.loadedSprites = 0;
        this.score = 0;
        this.gravity = 0.8;
        this.failed = false;
        this.paused = false;

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
        this.pause = new Image();
        this.pause.reference = this;

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

        this.pause.onload = this.loaded;
        this.pause.src = "images/pause.png";


        $(document).on('keydown', (e) => {
            this.moveUp(e.key)
        });
        $("#canvas").on('click', () => {
            this.moveUp("tap")
        });

        this.drawUsername();
    }

    // make sure every image is loaded before drawing (else you'll have a baaaad time)
    loaded() {
        let ref = this.reference;
        ref.loadedSprites += 1;
        if (ref.loadedSprites >= ref.sprites) {
            window.requestAnimationFrame(ref.draw.bind(ref));
        }
    }

    drawScore() {
        $('#score').html(`Score: ${this.score}`);
        $('#highestScore').html(`Hiscore: ${this.highestScore}`);
    }

    drawUsername() {
        $('#showUsername').html(`Playing as: ${this.pName}`);
    }

    draw() {
        if (!this.failed) {
            if (!this.paused) {
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
                        this.restart();
                    }

                    // score
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
            } else {
                this.ctx.drawImage(this.pause, 192, 192);
            }

            window.requestAnimationFrame(this.draw.bind(this));
        }
    }

    restart() {
        if (this.score > this.highestScore) {
            this.saveResult();
        }
        $("#canvas").off("click");
        this.die.play();
        $(document).off();
        this.failed = true;
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
        localStorage.setItem('headcrab', JSON.stringify(result));
    }
    moveUp(e) {
        if (e == "w") {
            this.fly.pause();
            this.fly.currentTime = 0;
            this.pY -= 30;
            this.fly.play();
        } else if (e == "s") {
            this.fly.pause();
            this.fly.currentTime = 0;
            this.pY += 5;
            this.fly.play();
        } else if (e == "tap") {
            this.fly.pause();
            this.fly.currentTime = 0;
            this.pY -= 30;
            this.fly.play();
        } else if (e == "p") {
            if (this.paused == true) {
                console.log("Unpaused!");
                this.paused = false;
                this.music.play();
            } else {
                this.music.pause();
                this.fly.pause();
                this.fly.currentTime = 0;
                console.log("Paused!");
                this.paused = true;
            }
        }
    }
}