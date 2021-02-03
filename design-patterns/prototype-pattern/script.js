/*
* Design Pattern: Prototype
*/
var Pixel = function() {
    this.target = null;
    this.interval = null;
    this.left = 0;
};

Pixel.prototype = (function() {
    var _width = 10,
        _height = 10,
        _bgColor = "orange";


    var _animate = function() {
        if (this.target) {
            
            this.interval = setInterval(() => {
                this.left += 10;
                this.target.style.left = this.left + 'px';
            }, 500)

        }
    };

    var _stop = function() {
        clearInterval(this.interval);
    };

    var _attachTo = function(target) {
        this.target = document.getElementById(target);
        this.target.style.width = _width + 'px';
        this.target.style.height = _height + 'px';
        this.target.style.backgroundColor = _bgColor;
        this.target.style.position = 'absolute';
        this.target.style.left = this.left;
    };

    var _setBgColor = function(color) {
        _bgColor = color;
        this.target.style.backgroundColor = _bgColor;
    };

    var _restart = function() {
        this.left = 0;
        this.target.style.left = this.left;
    }

    return {
        attachTo: _attachTo,
        move: _animate,
        stop: _stop,
        getBgColor: () => _bgColor,
        setBgColor: _setBgColor,
        restart: _restart
    }

})()

// code client
var pixel1 = new Pixel();
pixel1.attachTo('target1');

var pixel2 = new Pixel();
pixel2.attachTo('target2');