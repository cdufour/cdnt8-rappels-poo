var patternModule = (function(dom) {

    var DomComponent = function() {
        this.widget = document.createElement("div");
        this.widget.style.width = "100px";
        this.widget.style.height = "40px";
        this.widget.style.backgroundColor = "#EEE";
        this.widget.style.padding = "10px";
        this.widget.style.fontSize = "8pt";
        this.widget.style.position = "absolute";
        this.widget.style.left = "100px";
        this.widget.style.top = "10px";

        this.present = function() {
            setTimeout(() => {
                dom.body.appendChild(this.widget)
            }, 250)
            setTimeout(() => {
                dom.body.removeChild(this.widget)
            }, 2250)
        };

        this.setMessage = (message) => {
            this.widget.innerText = message || '';
            return this;
        }
           
    }

    var FailureDecorator = function(component, message) {
        this.component = component;
        this.component.widget.innerText = "Echec: " + message;
        this.component.widget.style.color = "red"; 
    }

    var SuccessDecorator = function(component, message) {
        this.component = component;
        this.component.widget.innerText = "Réussite: " + message;
        this.component.widget.style.color = "green"; 
    }

    return {
        DomComponent,
        FailureDecorator,
        SuccessDecorator
    }

})(document)