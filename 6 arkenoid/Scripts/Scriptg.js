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
let Life  = 3;
let Score = 0;
let upScore = 5;
let Level = 1;
const Max_level = 3;
let game_over = false;
 

const pad = {
     x : canvas.width/2 - pad_width / 2,
     y : canvas.height - pad_margin_Bottom - pad_height,
     width : pad_width,
     height : pad_height,
     dx : 5
}

function drawpad(){
    context.fillStyle = "blue";
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
    speed : 3,
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

// -- create bricks
const brick = {
    row : 6,
    column : 10,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    marginTop : 40,
    fillCOlor : "#2e3548",
    strokeColor : "#FFF"
}
let bricks = [];
function makeBricks(){
    for(let r = 0 ; r < brick.row ; r++){
        bricks[r] = [];
        for(let c = 0 ; c < brick.column ; c++){
                bricks[r][c] = {
                    x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                    y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                    status : true
                }
        }
    }
}

makeBricks();

//draw bricks

function drawBricks(){
    for(let r = 0 ; r < brick.row ; r++){
        for(let c = 0 ; c < brick.column ; c++){
            let b = bricks[r][c];
            if(b.status){
                context.fillStyle = brick.fillCOlor;
                context.fillRect(b.x ,b.y ,brick.width ,brick.height);

                context.strokeStyle = brick.strokeColor;
                context.strokeRect(b.x ,b.y ,brick.width ,brick.height);
            }
        }
    }

}

//ball brick colied
function ballBrick(){
    for(let r = 0 ; r < brick.row ; r++){
        for(let c = 0 ; c < brick.column ; c++){
            let b = bricks[r][c];
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
                        ball.dy = -ball.dy;
                        b.status = false;
                        Score += upScore;
                }
            }
        }
    }
}

// game stats
function Status(text, textX, textY, img, imgX, imgY){
    context.fillStyle = "#FFF";
    context.font = "25px Germania One";
    context.fillText(text, textX, textY);

    // draw image

    context.drawImage(img, imgX, imgY, width = 25 , height = 25);

}
// draw function
function draw(){
    drawpad();
    drawball();
    drawBricks();

    // score
    Status(Score, 35, 25, ScoreImg, 5, 5);
    // lives
    Status(Life, canvas.width - 25, 25, LifeImg, canvas.width-55, 5);
    // level
    Status(Level, canvas.width/2, 25,LevelImg, canvas.width/2 - 30, 5)
}
// game over
function gameOver(){
    if(Life <= 0){
        game_over = true;
    }
    if(Life == 0){
        window.alert("Game Over");
    }
}

// level up


// Ball and Wall Colide
function ballwall(){
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    }
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }

    if(ball.y + ball.radius > canvas.height){
        Life--;
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
        ball.speed += 0.1;
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
      ballBrick();
      gameOver();
}

function loop(){

    context.drawImage(BgImg,0,0)
    draw();

    update();
    if( ! game_over){
        requestAnimationFrame(loop);
    }
}

loop();

const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwin");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");
restart.addEventListener("click" , function(){
    location.reload();
})

function YouWinn(){
    gameover.style.display = "block";
    youwin.style.display = "block";
}

function Youlose(){
    gameover.style.display = "block";
    youlose.style.display = "block";
}