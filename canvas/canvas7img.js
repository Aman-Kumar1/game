// images

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#ff8";


class image{
    constructor(imagepath , xpos , ypos , width , height){
        this.imagepath = imagepath;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
    }
}

function createImage(context, imagepath , xpos ,ypos , width, height){
    let myimage = document.createElement('img');
    myimage.src = imagepath;
    myimage.onload = function(){
        context.drawImage(myimage, xpos ,ypos , width, height);
    }
}

let Image = new image('11.jpg',50,100,250,400);
createImage(context,Image.imagepath ,Image.xpos , Image.ypos, Image.width , Image.height); 