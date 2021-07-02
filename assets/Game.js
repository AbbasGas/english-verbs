import { irregularVerbs } from './irregular-verbs.js';

let data = getRandomNSubset(irregularVerbs, 35)

function getRandomNSubset(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

const getRandom = (array) => {
    const randomNumber = Math.random() * array.length;
    const floorNumber = Math.floor(randomNumber);
    return floorNumber
}

const infinitivesContainer = document.querySelector('#infinitive_container');
const pastSimpleContainer = document.querySelector('#past-simple_container');
const pastParticipleContainer = document.querySelector('#past-participle_container');


class Game {
    constructor () {
        this.selectTileVerb = this.selectTileVerb.bind(this)
        this.generateIdentifiers()
        this.generateTiles();
    }

    generateIdentifiers() {
        this.idInfinitives = [];
        while (this.idInfinitives.length != data.length) {
            const id = getRandom(data)
            if (!this.idInfinitives.includes(id)) {
                this.idInfinitives.push(id)
            }
        }

        this.idPastSimple = [];
        while (this.idPastSimple.length != data.length) {
            const id = getRandom(data)
            if (!this.idPastSimple.includes(id)) {
                this.idPastSimple.push(id)
            }
        }

        this.idPastParticiple = [];
        while (this.idPastParticiple.length != data.length) {
            const id = getRandom(data)
            if (!this.idPastParticiple.includes(id)) {
                this.idPastParticiple.push(id)
            }
        }
    }

    generateTiles () {
        for (let [i, id] of this.idInfinitives.entries()) {
            if (i <= 35) {
                const tile = document.createElement('div');
                tile.id = id;
                tile.className = 'tile';
                tile.innerText = data[id]['infinitive'];

                const infinitivesContainer = document.querySelector('#infinitive_container');
                infinitivesContainer.appendChild(tile)

                this.addClickEventListener(tile)
            }
        }

        for (let id of this.idPastSimple) {
            const tile = document.createElement('div');
            tile.id = id;
            tile.className = 'tile';
            tile.innerText = data[id]['past'];

            const pastSimpleContainer = document.querySelector('#past-simple_container');
            pastSimpleContainer.appendChild(tile)

            this.addClickEventListener(tile)
        }

        for (let id of this.idPastParticiple) {
            const tile = document.createElement('div');
            tile.id = id;
            tile.className = 'tile';
            tile.innerText = data[id]['participle'];

            const pastParticipleContainer = document.querySelector('#past-participle_container');
            pastParticipleContainer.appendChild(tile)

            this.addClickEventListener(tile)
        }
    }

    addClickEventListener (element) {
        return element.addEventListener('click', this.selectTileVerb);
    }

    removeClickEventListener (element) {
        element.removeEventListener('click', this.selectTileVerb);
    }

    removePreviusClickEvent (element) {
        element.removeAttribute('selected');
    }

    selectTileVerb (ev) {
        const target = ev.target;
        const parentOfTarget = target.parentNode;

        if (target.hasAttribute("selected")) {
            return this.removePreviusClickEvent(target);
        }

        let listElementSelected = parentOfTarget.querySelectorAll('[selected="True"]');
        [].forEach.call(listElementSelected, function(el) {
            if (el !== target) {
                this.removePreviusClickEvent(el);
            }
        }, this);

        target.setAttribute('selected', true)

        if (
            infinitivesContainer.querySelector('[selected="True"]') &&
            pastSimpleContainer.querySelector('[selected="True"]') &&
            pastParticipleContainer.querySelector('[selected="True"]')
        ) {
            this.checkSelectedOptions()
        }
    }

    checkSelectedOptions() {
        const infinitiveElementSelected = infinitivesContainer.querySelector('[selected="True"]');
        const infinitiveSelected = infinitiveElementSelected.innerText;
        const pastSimpleElementSelected = pastSimpleContainer.querySelector('[selected="True"]');
        const pastParticipleElementSelected = pastParticipleContainer.querySelector('[selected="True"]');
        const pastSimpleAnswer =  data.find(e => e.infinitive === infinitiveSelected)['past']
        const pastParticipleAnswer =  data.find(e => e.infinitive === infinitiveSelected)['participle']
        if (
            pastSimpleAnswer === pastSimpleElementSelected.innerText &&
            pastParticipleAnswer === pastParticipleElementSelected.innerText
        ) {
            console.log('ready!');
            this.markAsCorrectAnswer([
                infinitiveElementSelected,
                pastSimpleElementSelected,
                pastParticipleElementSelected
            ])
        } else {
            this.markAsWrongAnswer([
                infinitiveElementSelected,
                pastSimpleElementSelected,
                pastParticipleElementSelected
            ])
        }
    }

    markAsCorrectAnswer(elements) {
        setTimeout(() => {
            elements.forEach(e => {
                this.removePreviusClickEvent(e)
                this.removeClickEventListener(e)
                this.changeStyleToCorrect(e)
            });
        }, 300)
    }

    markAsWrongAnswer(elements) {
        elements.forEach(e => {
            this.removePreviusClickEvent(e)
            this.changeStyleToWrong(e)
        });
    }

    changeStyleToCorrect (e) {
        e.style.background = '#67f56e';
        e.style.cursor = 'default';
    }

    changeStyleToWrong (e) {
        e.style.background = '#f43636';
        setTimeout(() => {
            e.style.background = '';
        }, 300)
    }
}

export default Game
