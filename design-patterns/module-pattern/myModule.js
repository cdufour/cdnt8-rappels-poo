var myModule = (function(rm) {

    var _update = function() {
        var target = document.getElementById('target');
        target.innerText = rm.rand('f');
    }

    return {
        updateDom: _update
    }

})(randMod)
