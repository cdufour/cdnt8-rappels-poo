/*
    Design Pattern: PubSub
*/

const btn = document.getElementById('btn');

class UpdateBgEvent {

    // propriétés
    defaultColor = 'green';
    observers = [];

    // méthodes
    subscribe(domId) {
        var elem = document.getElementById(domId);
        this.observers.push(elem);
    }

    unsubscribe(domId) {
        this.observers = this.observers
            .filter(observer => observer.id !== domId);
    }

    publish(color) {
        var col = !color ? this.defaultColor : color;
        this.observers.forEach(observer => {
            observer.style.backgroundColor = col;
        })
    }

}

function init() {
    btn.addEventListener('click', () => {
        myEvent.publish('green');
    })

    // déclaration de l'événement
    myEvent = new UpdateBgEvent();

    // souscriptions à l'événement
    myEvent.subscribe('box1');
    myEvent.subscribe('box3');
}

var myEvent; // globale (pour la démo)
init();



