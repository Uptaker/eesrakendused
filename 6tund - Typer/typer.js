let playerName = prompt('Palun sisesta oma nimi.');

class Typer {
    constructor(name) {
        this.name = name;
        this.wordsInGame = 2;
        this.startingWordLength = 2;
        this.words = [];
        this.typeWords = [];
        this.wordsTyped = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.results = JSON.parse(localStorage.getItem('score')) || [];
        this.word;
        this.init();
    }

    init() {
        $.get("lemmad2013.txt", (data) => this.getWords(data));
        $('#show-results').on('click', () => { this.showResults(); });
    }

    startTyper() {
        this.generateWords();
        this.startTime = performance.now();
        $(document).on('keypress', (event) => this.shortenWord(event.key));
    }

    shortenWord(keypressed) {
        if (this.word.length > 1 && this.word.charAt(0) == keypressed) {
            console.log(keypressed);
            this.word = this.word.slice(1);
            this.drawWord();
        } else if (this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped != this.wordsInGame - 1) {
            this.wordsTyped++;
            this.selectWord();
        } else if (this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped == this.wordsInGame - 1) {
            console.log('viimane sümbol');
            this.endTime = performance.now();
            $('#score').html(this.name + " sinu aeg oli " + ((this.endTime - this.startTime) / 1000).toFixed(2));
            this.saveResult();
        }
    }

    saveResult() {
        let result = {
            name: this.name,
            time: ((this.endTime - this.startTime) / 1000).toFixed(2)
        }

        this.results.push(result);
        this.results.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
        localStorage.setItem('score', JSON.stringify(this.results));
    }

    generateWords() {
        for (let i = 0; i < this.wordsInGame; i++) {
            const wordLength = this.startingWordLength + i;
            const randomWord = Math.round(Math.random() * this.words[wordLength].length);
            this.typeWords[i] = this.words[wordLength][randomWord];
        }

        console.log(this.typeWords);

        this.selectWord();
    }

    selectWord() {
        this.word = this.typeWords[this.wordsTyped];
        this.drawWord();
    }

    drawWord() {
        $('#wordDiv').html(this.word);
    }

    getWords(data) {
        const dataFromFile = data.split('\n');
        console.log(dataFromFile);
        this.separeteWordsByLength(dataFromFile);
    }

    separeteWordsByLength(data) {
        for (let i = 0; i < data.length; i++) {
            const wordLength = data[i].length;

            if (this.words[wordLength] === undefined) {
                this.words[wordLength] = [];
            }

            this.words[wordLength].push(data[i]);
        }
        console.log(this.words);

        this.startTyper();
    }

    showResults() {
        $('#results').fadeToggle();
        console.log('toon peidust välja')
    }
}

let typer = new Typer(playerName);