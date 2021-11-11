// moving object

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#ff8";
var circle_count = 0;

class Circle {
  constructor(xpos, ypos, radius, color, text, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    // movement
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }
  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color; // for text
    // context.textAligne = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.xpos, this.ypos); //text parameter

    context.lineWidth = 5;
    context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }
  update() {
      this.text = circle_count;
    context.clearRect(0, 0, window_width, window_height);
    this.draw(context);
    if ((this.xpos + this.radius) > window_width) {
      this.dx = -this.dx;
       circle_count++;
    }

    if ((this.xpos - this.radius < 0)) {
      this.dx = -this.dx;
      circle_count++;

    }
    if ((this.ypos + this.radius ) > window_height) {
        this.dy = -this.dy;
       circle_count++;

      }
  
      if ((this.ypos - this.radius) < 0) {
        this.dy = -this.dy;
       circle_count++;

      }
  

    //----------------
    this.xpos += this.dx;
    this.ypos += this.dy;
  }
}



// let all_circle = [];
// let createCircle = function(circle){
//     circle.draw(context);
// }

// let random_x = Math.random() * window_width;
// let random_y = Math.random() * window_height;
let My_circle = new Circle(200, 150, 50, "black", circle_count, 10);


My_circle.draw(context);


let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  My_circle.update();
};

updateCircle();
// for(var number = 0 ; number < 1 ; number++){
//     let random_x = Math.random() * window_width;
//     let random_y = Math.random() * window_height;

//     let My_circle = new Circle(random_x, random_y ,50 , "black",circle_count, 1);
//     all_circle.push(My_circle);
//     createCircle(all_circle[number]);
//     circle_count += 2 ;
// }
