/*
* Design Pattern: Singleton
*/

var dumasSingleton = (function() {

    var _instance; // instance privée

    function _createInstance() {
        console.log('[+] Instance créée');
        var items = ['Athos', 'Porthos', 'Aramis'];
        return items;
    }

    return {
        getInstance: function() {
           if (!_instance) _instance = _createInstance();
           return _instance;
        }
    }

})()

var musketeers      = dumasSingleton.getInstance();
var mousquetaires   = dumasSingleton.getInstance();

console.log(musketeers);
console.log(mousquetaires);
console.log(
    musketeers === mousquetaires
    ? '[+] Les variables désignent la même instance'
    : '[-] Les variables ne désignent pas la même instance'
);

