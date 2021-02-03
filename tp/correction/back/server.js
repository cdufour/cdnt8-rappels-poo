const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { Source, LogerObserver, ResponderObserver, 
    BannisherObserver, SessionObserver } = require('./pattern');

var src = new Source();

var loger           = new LogerObserver();
var responder       = new ResponderObserver();
var bannisher       = new BannisherObserver();
var sessionner      = new SessionObserver();

src.subscribe(loger);
src.subscribe(responder);
src.subscribe(bannisher);
src.subscribe(sessionner);

app.use(bodyParser.json())

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


app.post('/login', (req, res) => {
    src.handleRequest(req, res);
})

app.post('/logout', (req, res) => {
    src.handleRequest(req, res);
})

app.listen(port, () => {
    console.log('[+] Server listening on port ' + port + '...');
})