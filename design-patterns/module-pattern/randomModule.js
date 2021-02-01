var randMod = (function() {

    // private space
    var _min = 0;
    var _max = 100;


    var _randInt = function() {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }

    var _randFloat = function() {
        return parseFloat((Math.random() * (_max - _min) + _min).toFixed(2));
    }

    var _rand = function(type) {
        if (type === 'i') return _randInt();
        if (type === 'f') return _randFloat();
    }

    var _setConfig = function(min, max) {
        _min = min;
        _max = max;
    }

    // public space
    return {
        //randInt: _randInt,
        //randFloat: _randFloat,
        config: _setConfig,
        rand: _rand
    }

})()
