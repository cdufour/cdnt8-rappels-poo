/*
* Design Pattern: Factory
*/
var Player = function(fname, lname) {
    this.fname = fname;
    this.lname = lname;
}

var TeamDecorator = function(player, teamName) {

    // Décoration uniquement si player est un
    // objet de type Player
    if (player instanceof Player ) {
        // Attention: copie par référence
        // Pour une copie par valeur, faire this.player = {...player} 
        this.player = player 
        this.player.teamName = teamName;

        this.player.getTeamName = function() {
            return this.teamName;
        }

        return this.player;
    } else {
        throw Error("player argument must be Player type")
    }

}

/*
* Code client
*/

/*
var player1 = new Player("Cristiano", "Ronaldo");
var player1Decorated = new TeamDecorator(player1, "FC Juventus");
console.log(player1);
console.log(player1Decorated);
*/

var lonelyPlayer = { fname: "Personne", lname: "Nessuno" };

var player1Decorated = new TeamDecorator(
    new Player("Cristiano", "Ronaldo"),
    "FC Juventus"
);

var pDec = new TeamDecorator(lonelyPlayer, "Nothing Forrest");



