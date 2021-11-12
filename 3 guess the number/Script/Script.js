let btn = document.getElementById("btn");
var output = document.getElementById("outputtext");

//----------------------------

  let number = Math.floor(Math.random() * 100);

  let chance = number;
  let count = 0;
  while (chance > 0) {
    chance = chance / 2;
    chance = Math.floor(chance);
    count = count + 1;
  }
  var x = count * 2;

//-----------------------------
var ch = document.querySelector(".x-class");

var isResetRequired = false;

btn.addEventListener("click", function () {
 
  game();
});
userinput.addEventListener("keypress",function(e){
    if(e.key == "Enter")
        game();
});

function game(){
    if (isResetRequired == true) {
        return;
      }
      x = x - 1;
      console.log(x);
      var input = document.getElementById("userinput").value;
      if (input == number) {
        output.innerHTML = `Yes!! You guess right ${input}`;
        isResetRequired = true;
      } else if (input < number) {
        output.innerHTML = `Too Low ${input}`;
      }else if (input > number) {
        output.innerHTML = `Too high ${input}`;
      }
      if (x == 0) {
        output.innerHTML = `You loss the game Number is ${number}<br>Click Reset For New Game`;
        isResetRequired = true;
      }
      ch.innerText = `${x}`;
      let text1 = document.getElementById("userinput");
  text1.value = "";
}



function fun() {
  output.innerHTML = `Enter a number`;
  let text1 = document.getElementById("userinput");
  text1.value = "";

   number = Math.floor(Math.random() * 100);

   chance = number;
   count = 0;
  while (chance > 0) {
    chance = chance / 2;
    chance = Math.floor(chance);
    count = count + 1;
  }
   x = count * 2;
   ch.innerText = "-/-";
   isResetRequired = false;
   output.innerHTML = ``;
   
  
}
console.log(x);

document.querySelector('#container').addEventListener('mousemove',function(e){
  console.log(e.offsetX, e.offsetY);
  document.body.style.backgroundColor = `rgb(${e.offsetX},100,${e.offsetY})`

})