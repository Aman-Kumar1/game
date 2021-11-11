// moving object

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#ff8";

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
    this.draw(context);
    if (this.xpos + this.radius > window_width) {
      this.dx = -this.dx;
    }

    if (this.xpos - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.ypos + this.radius > window_height) {
      this.dy = -this.dy;
    }

    if (this.ypos - this.radius < 0) {
      this.dy = -this.dy;
    }

    //----------------
    this.xpos += this.dx;
    this.ypos += this.dy;
  }
}

// circle distance
let getDistance = function (xpos1, ypos1, xpos2, ypos2) {
  var result = Math.sqrt( Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
  return result;
}

var all_circle = [];
let randomNumber = function(min , max){
    var result = Math.random() * (max - min) + min;
    return result;
}

for(var i = 0 ; i < 10 ; i++){
    var radius = 500;
    let ranxomX = randomNumber(radius,(window_width - radius));
    let ranxomY = randomNumber(radius,(window_height - radius));
    
    let My_circle = new Circle(ranxomX, ranxomY, radius, "black", "A", 2);
    // My_circle.draw(context);
    all_circle.push(My_circle);
}



let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  context.clearRect(0, 0, window_width, window_height);

all_circle.forEach(element => {
    element.update();
})
};

updateCircle();