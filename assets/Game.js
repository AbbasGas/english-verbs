import {infinitives, pastSimple, pastParticiple} from './data.js';

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
        while (this.idInfinitives.length != infinitives.length) {
            const id = getRandom(infinitives)
            if (!this.idInfinitives.includes(id)) {
                this.idInfinitives.push(id)
            }
        }

        this.idPastSimple = [];
        while (this.idPastSimple.length != pastSimple.length) {
            const id = getRandom(pastSimple)
            if (!this.idPastSimple.includes(id)) {
                this.idPastSimple.push(id)
            }
        }

        this.idPastParticiple = [];
        while (this.idPastParticiple.length != pastParticiple.length) {
            const id = getRandom(pastSimple)
            if (!this.idPastParticiple.includes(id)) {
                this.idPastParticiple.push(id)
            }
        }
    }

    generateTiles () {
        for (let id of this.idInfinitives) {

            const tile = document.createElement('div');
            tile.id = id;
            tile.className = 'tile'
            tile.innerText = infinitives[id]

            const infinitivesContainer = document.querySelector('#infinitive_container');
            infinitivesContainer.appendChild(tile)

            this.addClickEvents(tile)
        }

        for (let id of this.idPastSimple) {
            const tile = document.createElement('div');
            tile.id = id;
            tile.className = 'tile';
            tile.innerText = pastSimple[id];

            const pastSimpleContainer = document.querySelector('#past-simple_container');
            pastSimpleContainer.appendChild(tile)

            this.addClickEvents(tile)
        }

        for (let id of this.idPastParticiple) {
            const tile = document.createElement('div');
            tile.id = id;
            tile.className = 'tile';
            tile.innerText = pastParticiple[id];

            const pastParticipleContainer = document.querySelector('#past-participle_container');
            pastParticipleContainer.appendChild(tile)

            this.addClickEvents(tile)
        }
    }

    addClickEvents (element) {
        return element.addEventListener('click', this.selectTileVerb);
    }

    removePreviusClickEvent (el) {
        el.removeAttribute('selected');
    }


    selectTileVerb (ev) {
        const target = ev.target;
        if (target.hasAttribute("selected")) {
            return this.removePreviusClickEvent(target);
        }

        let parentNode = ev.target.parentNode;
        let listElementSelected = parentNode.querySelectorAll('[selected="True"]');
        [].forEach.call(listElementSelected, function(el) {
            if (el !== ev.target) {
                this.removePreviusClickEvent(el);
            }
        }, this);

        target.setAttribute('selected', true)

        if (
            infinitivesContainer.querySelector('[selected="True"]') &&
            pastSimpleContainer.querySelector('[selected="True"]') &&
            pastParticipleContainer.querySelector('[selected="True"]')
        ) {
            console.log('ready!');
        }
    }

    ifSelected (cellContainer) {
        if (cellContainer.querySelector('[selected="True"]')) {
            console.log(true);
        }
    }

    onlyOneTilePerCell () {

    }
}

export default Game
