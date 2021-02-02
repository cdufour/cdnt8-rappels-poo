/*
* Design Pattern: Factory
*/

function ShapeFactory(ctx) {
    var _ctx = document.body;
    var _defaultColor = "orange";

    this.createShape = function(type) {
        var shape;
 
        if (type === "rect") {
            shape = new Rectangle();
        } else if (type === "sq") {
            shape = new Square();
        } else if (type === "circ") {
            shape = new Circle();
        }

        shape.render = function() {
            var domElem = document.createElement(this.renderElement);

            // stylisation de l'élément
            domElem.style.width = this.width + 'px';
            domElem.style.height = this.height + 'px';
            domElem.style.backgroundColor = this.color || _defaultColor;
            domElem.style.borderRadius = this.borderRadius || 0;
            domElem.style.marginBottom = '10px';
            
            _ctx.appendChild(domElem);
        }

        shape.setHeight = function(value) {
            this.height = value;
        }

        shape.setWidth = function(value) {
            this.width = value;
        }

        shape.setColor = function(value) {
            this.color = value;
            this.update();
        }

        shape.update = function() {
            domElem.style.width = this.width + 'px';
            domElem.style.height = this.height + 'px';
            domElem.style.backgroundColor = this.color;
        }

        return shape;
    }
}


var Rectangle = function() {
    this.renderElement = "div";
    this.width = 100;
    this.height = 50;
    this.color = "green";
};

var Square = function() {
    this.renderElement = "p";
    this.width = this.height = 100;
};

var Circle = function() {
    this.renderElement = "section";
    this.width = this.height = 80;
    this.borderRadius = "50%";
};


/*
* Code client
/*/

// Instanciation du Factory
var factory = new ShapeFactory();
var r1 = factory.createShape('rect');
var r2 = factory.createShape('rect');

r1.render();
r2.render();