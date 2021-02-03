const fs = require('fs');

class Source {
    credentials = { username: "root", password: "demo" };
    req = null;
    res = null;
    login = false;
    observers = [];
    bannished = {};
    clients = {};
    sessions = {};

    subscribe(observer) {
        this.observers.push(observer)
    }

    emit(event) {
        this.observers.forEach(o => {
            o.update(this, event);
        })
    }

    handleRequest(req, res) {
        this.req = req;
        this.res = res;

        if (req.path === '/login') {
            this.checkCredendials();
        } else if (req.path === '/logout') {
            this.emit('session-end');
        }
    }

    checkCredendials() {
        const {u,p} = this.req.body;
        this.login = 
            u === this.credentials.username &&
            p === this.credentials.password;
        this.emit('login-attempt');
    }
}

class LogerObserver {
    update(src, event) {
        const d = new Date().toString().split('GMT')[0];
        const client = src.req.hostname;
        let info = '';

        if (event === 'login-attempt') {
            const {u,p} = src.req.body;

            if (src.login) {
                info = `IP:${client},Date:${d},User:${u},Status:success\n`;
            } else {
                info = `IP:${client},Date:${d},User:${u},Status:failure,Pass:${p}\n`;
            }
    
            fs.appendFile("logs/login.log", info, () => {
                console.log('[+] login file updated')
            })
        }

        if (event === 'session-end') {
            info = `IP:${client},Date:${d}\n`;

            fs.appendFile("logs/logout.log", info, () => {
                console.log('[+] logout file updated')
            })
        }

    }
}

class ResponderObserver {
    update(src, event) {
        const client = src.req.hostname;

        if (event === 'login-attempt') {

            if (client in src.bannished) {
                src.res.send({message: "ban"});
                return;
            }

            if (client in src.sessions) {
                src.res.send({message: "session_exists"})
                return;
            }
    
            if (src.login) {
                src.res.set('x-token', 'super-f**king-secret');
                src.res.json({message: "success"})
            } else {
                src.res.json({message: "failure"})
            }
        }

        if (event === 'session-end') {
            src.res.send({message: "session_destroyed"})
        }
    }
}

class BannisherObserver {
    update(src, event) {
        const client = src.req.hostname;

        if (event == 'login-attempt') {
            if (!src.login && client in src.clients) {
                src.clients[client] = src.clients[client] + 1;
    
                if (src.clients[client] > 2) {
                    console.log('[+] 3 wrong attempts');
                    src.bannished[client] = true;
                }
            } else {
                src.clients[client] = 1;
            }
        }
    }
}

class SessionObserver {
    update(src, event) {
        const client = src.req.hostname;

        if (event === 'login-attempt') {
            if (src.login) {
                src.sessions[client] = true;
                console.log('[+] Session opened for: ' + client);
            }
        }

        if (event === 'session-end') {
            delete src.sessions[client];
            console.log('[+] Session destroyed for: ' + client);
        }

    }
}


module.exports = { 
    Source, 
    LogerObserver,
    ResponderObserver,
    BannisherObserver,
    SessionObserver
};