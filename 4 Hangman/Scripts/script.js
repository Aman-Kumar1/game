var language = ["hindi","english","french","russian","arabic","spanish","portuguese","japanese","korean","italian"]

let answer = '';
let maxwrong = 6;
let mistakes = 0;
let guesses = [];
let wordstatus = null;

function randomword(){
    answer = language[Math.floor(Math.random() * language.length)];   
}

// make buttons with map

function g_buttons(){ 
    let btnHtml = 'abcdefghijklmnopqrstuvwxyz'.split('').map(latter =>
        `<button
        class = "btn btn-lg btn-primary m-2"
        id = '` + latter + `'
        onclick = "handleGuess('` + latter +`')"
        >
        ` + latter + `
        </button>`).join('');

        document.getElementById('keyboard').innerHTML = btnHtml;
}
// ------ here you guess and update -----

function handleGuess(selectltr){
    guesses.indexOf(selectltr) === -1 ? guesses.push(selectltr) : null;
    document.getElementById(selectltr).setAttribute('disabled',true);

    if(answer.indexOf(selectltr) >= 0){
        g_word();
        gameWon();
    }else if(answer.indexOf(selectltr) === -1){
        mistakes++;
        updateMistakes();
        gameLoss();
        updatepic();
    }
}
function updatepic(){
    document.getElementById('pic').src = './Images/'+ mistakes + '.png'; 
}
function gameWon(){
    if(wordstatus === answer){
        document.getElementById('keyboard').innerHTML = 'You Won';
        
    }
}

function gameLoss(){
    if(mistakes === maxwrong){
        document.getElementById('keyboard').innerHTML = 'You Lost<br>The answere Was: '+ answer;
    }
}

function g_word(){ // guess here
    wordstatus = answer.split('').map(latter => (guesses.indexOf(latter) >= 0 ? latter: " _ ")).join('');

    document.getElementById('word').innerHTML = wordstatus;

}

function updateMistakes(){
    document.getElementById('mistake').innerHTML = mistakes;
}

function reset(){
    mistakes = 0;
    guesses = [];
    document.getElementById('pic').src = './Images/0.png';
    randomword();
    g_buttons();
    g_word();
    g_buttons();
}

document.getElementById('maxwrong').innerHTML = maxwrong;
randomword();
g_buttons();
g_word();