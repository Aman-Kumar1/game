// object interection event
//     working inside the object

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#bbd";

class Circle {
    constructor(xpiont,ypoint,radious,color){
        this.xpiont = xpiont;
        this.ypoint = ypoint;
        this.radious = radious;
        this.color = color;
    }

    draw(context){
        context.beginPath();
        context.arc(this.xpiont,this.ypoint,this.radious,0 ,Math.PI * 2,false);
        context.strokeStyle = "gray";
        context.lineWidth = 4;
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
        context.closePath();
    }
    changeColor(newcolor){
        this.color = newcolor;
        this.draw(context);
    }

    clickcircle(xmouse, ymouse){
        const distance = Math.sqrt(
            ( (xmouse - this.xpiont) * (xmouse - this.xpiont))
            +
            ( (ymouse - this.ypoint ) * (ymouse - this.ypoint))
        );
        if(distance < this.radious){
            this.changeColor("blue");
            return true;
        } else {
            this.changeColor("red");
            return false;
        }
    }
}

let circle = new Circle(200, 200, 100, '#f56');
circle.draw(context);

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let z = circle.clickcircle(x, y);
    console.log(z);
});