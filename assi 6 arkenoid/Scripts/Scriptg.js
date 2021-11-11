const canvas = document.getElementById("BallGame");
const context = canvas.getContext("2d");

//cover

canvas.style.border = "2px solid black";

// for strokeline heavy
context.lineWidth = 2;

const pad_width = 100;
const pad_margin_Bottom = 50;
const pad_height = 20;
let leftArrow = false;
let rightArrow = false;
const ballradius = 7;
let life  = 3;

const pad = {
     x : canvas.width/2 - pad_width / 2,
     y : canvas.height - pad_margin_Bottom - pad_height,
     width : pad_width,
     height : pad_height,
     dx : 5
}

function drawpad(){
    context.fillStyle = "blue";
    console.log(pad.x);
    console.log(pad.y);
    context.fillRect(pad.x, pad.y, pad.width, pad.height);

    context.strokeStyle = "red";
    context.strokeRect(pad.x, pad.y, pad.width, pad.height);
}
//-- controle pad
document.addEventListener("keydown", function (event){
    if(event.keyCode == '37'){
        leftArrow = true;
    }else if(event.keyCode == '39'){
        rightArrow = true;
    }
});

document.addEventListener("keyup",function(event){
    if(event.keyCode == '37'){
        leftArrow = false;
    }else if(event.keyCode == '39'){
        rightArrow = false;
    }
});

//------ move pad

function padMove(){
    if(rightArrow && pad.x + pad.width < canvas.width){
        pad.x += pad.dx;
    }else if(leftArrow && pad.x > 0){
        pad.x -= pad.dx;
    }
}
//------------------------------------- create ball-------------------
const ball = {
    x : canvas.width /2,
    y: pad.y - ballradius,
    radius: ballradius,
    speed : 6,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}
//draw the ball
function drawball(){
    context.beginPath();
    context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    context.fillStyle = "black";
    context.fill();

    context.strokeStyle = "red";
    context.stroke();
    context.closePath();
}

// move the ball -------------------------------
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}


// draw function
function draw(){
    drawpad();
    drawball();
}

// Ball and Wall Colide
function ballwall(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    }
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }

    if(ball.y + ball.radius > canvas.height){
        life--;
        resetball();
    }
}

// -------- ball and pad------
function padball(){
    if(ball.x < pad.x + pad.width && 
        ball.x > pad.x && 
        pad.y < pad.y + pad.height && 
        ball.y > pad.y){
        
        //     ball.dx = -ball.dx;
        // ball.dy = -ball.dy;
        let colide = ball.x - (pad.x + pad.width/2);
        colide = colide / (pad.width / 2);

        let angle = colide * Math.PI/3;
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}

//// reset the ball
function resetball(){
    ball.x = canvas.width /2;
    ball.y = pad.y - ballradius;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;    
}

function update(){
      padMove();
      moveBall();
      ballwall();
      padball();
}

function loop(){

    context.drawImage(BgImg,0,0)
    draw();

    update();
    
    requestAnimationFrame(loop);
}

loop();