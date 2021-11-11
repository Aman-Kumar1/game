// add text

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#ff8";

class Circle{
    constructor(xpos,ypos,radius,color, text){
        this.xpos = xpos;
        this.ypos  = ypos;
        this.radius = radius;
        this.color = color;
        this.text = text;
    }
    draw(context){
        context.beginPath();

        context.strokeStyle = this.color;// for text 
        context.textAligne = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text,this.xpos , this.ypos);//text parameter
        
        context.lineWidth  = 5;
        context.arc(this.xpos, this.ypos, this.radius , 0, Math.PI * 2, false)
        context.stroke();
        context.closePath();
    }
}

let circle_count = 2;

let all_circle = [];
let createCircle = function(circle){
    circle.draw(context);
}
for(var number = 0 ; number < 10 ; number++){
    let random_x = Math.random() * window_width;
    let random_y = Math.random() * window_height;

    let My_circle = new Circle(random_x, random_y ,50 , "black",circle_count);
    all_circle.push(My_circle);
    createCircle(all_circle[number]);
    circle_count += 2 ;
}