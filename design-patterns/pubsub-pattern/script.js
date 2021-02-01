/*
    Design Pattern: PubSub
*/

const btn = document.getElementById('btn');

function UpdateBgEvent() {
    this.defaultColor = 'green';
    this.observers = [];
}

UpdateBgEvent.prototype = {
    subscribe: function(domId) {
        var elem = document.getElementById(domId);
        this.observers.push(elem);
    },
    unsubscribe: function(domId) {
        this.observers = this.observers
            .filter(observer => observer.id !== domId);
    },
    publish: function(color) {
        var col = !color ? this.defaultColor : color;
        this.observers.forEach(observer => {
            observer.style.backgroundColor = col;
        })
    }
}

String.prototype.demo = function() {
    return 'demo';
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



