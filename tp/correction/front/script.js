(function(pm) {

    const host = 'http://192.168.0.32:3000';
    const btn = document.getElementById('btn');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    btn.addEventListener('click', () => {
        loginRequest(username.value, password.value);
    })
    
    function loginRequest(u, p) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({u,p})
        };
    
        fetch(host + '/login', options)
            .then(res => res.json())
            .then(res => {
                const { message } = res;
                handleMessage(message);
            })
    }

    function handleMessage(message) {
        const widget = new pm.DomComponent();

        if (message === "success") {
            const successWidget = new pm.SuccessDecorator(
                widget, 
                "nous avons pu vous identifié"
            );
            successWidget.component.present();

        } else if( message === "failure") {
            const failureWidget = new pm.FailureDecorator(
                widget,
                "identification impossible"
            );
            failureWidget.component.present();

        } else if (message === "ban") {
            widget.setMessage("Trop de tentatives").present();
            
        } else if (message === "session_exists") {
            widget.setMessage("Session déjà ouverte").present();
        }
        
    }

})(patternModule)

