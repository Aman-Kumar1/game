let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
var window_height = window.innerHeight;
var window_width = window.innerWidth;
canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#8ff";

context.fillRect(100,0,50,200);
// context.fillStyle="green";   //declare before the shape
context.fillRect(100,400,50,200);

context.beginPath();
context.strokeStyle = "red"
context.lineWidth = 10;
context.arc(300 , 100 , 20 , 0 , Math.PI * 2 );
context.stroke();