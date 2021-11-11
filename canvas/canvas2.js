let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#ff8";

class Circle{
    constructor(xpos,ypos,radius,color){
        this.xpos = xpos;
        this.ypos  = ypos;
        this.radius = radius;
        this.color = color;
    }
    draw(context){
        context.beginPath();
        context.lineWidth  = 5;
        context.arc(this.xpos, this.ypos, this.radius , 0, Math.PI * 2)
        context.stroke();
        context.closePath();
    }
}

// draw a single circle one by one or we can make loop for this

// let My_circle = new Circle(100,100,50,"black");
// let My_circle2 = new Circle(200,100,50,"black");
// My_circle.draw(context);
// My_circle2.draw(context);

let all_circle = [];
let createCircle = function(circle){
    circle.draw(context);
}
for(var number = 0 ; number < 10 ; number++){
    let random_x = Math.random() * window_width;
    let random_y = Math.random() * window_height;

    let My_circle = new Circle(random_x, random_y ,50 , "black");
    all_circle.push(My_circle);
    createCircle(all_circle[number]);
}