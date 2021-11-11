let Index = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let bar = document.getElementById('bar');
let gif = document.getElementById('gif');
let masterSong = document.getElementById('masterSong');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Glass -", filePath: "songs/1.mp3", coverPath: "Images/logo.png"},
    {songName: "Hulle - ", filePath: "songs/2.mp3", coverPath: "Images/logo.png"},
    {songName: "Lhenga", filePath: "songs/3.mp3", coverPath: "Images/logo.png"},
    {songName: "Tone - 1", filePath: "songs/4.mp3", coverPath: "Images/logo.png"},
    {songName: "Trending", filePath: "songs/5.mp3", coverPath: "Images/logo.png"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// --------- play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// -------------------------
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update bar slider
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    bar.value = progress;
})

bar.addEventListener('change', ()=>{
    audioElement.currentTime = bar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        Index = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${Index+1}.mp3`;
        masterSong
    .innerText = songs[Index].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(Index>=9){
        Index = 0
    }
    else{
        Index += 1;
    }
    audioElement.src = `songs/${Index+1}.mp3`;
    masterSong
.innerText = songs[Index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('Back').addEventListener('click', ()=>{
    if(Index<=0){
        Index = 0
    }
    else{
        Index -= 1;
    }
    audioElement.src = `songs/${Index+1}.mp3`;
    masterSong
.innerText = songs[Index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})