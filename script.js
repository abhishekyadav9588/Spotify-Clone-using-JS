console.log("Welcome to Spotify!");

//initializing all the variables
let songIndex = 0;
let audioElement = new Audio('songFolder/The_Boy_In_The_Bubble.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: 'The_Boy_In_The_Bubble', filePath: 'songFolder/1.mp3', coverPath: 'Cover/1.jpg'},
    {songName: 'Outrunning_Karma', filePath: 'songFolder/2.mp3', coverPath: 'Cover/2.jpg'},
    {songName: 'Gotta_Be_A_Reason', filePath: 'songFolder/3.mp3', coverPath: 'Cover/3.jpg'},
    {songName: 'Let_Me_Down_Slowly', filePath: 'songFolder/4.mp3', coverPath: 'Cover/4.jpg'},
    {songName: 'If_We_Have_Each_Other', filePath: 'songFolder/5.mp3', coverPath: 'Cover/5.jpg'},
    {songName: 'My_Mothers_Eyes', filePath: 'songFolder/6.mp3', coverPath: 'Cover/6.jpg'},
    {songName: 'Steve', filePath: 'songFolder/7.mp3', coverPath: 'Cover/7.jpg'},
    {songName: 'Worst_Day_of_my_Life', filePath: 'songFolder/8.mp3', coverPath: 'Cover/8.jpg'},
    {songName: 'Pretending', filePath: 'songFolder/9.mp3', coverPath: 'Cover/9.jpg'},
    {songName: 'The_Wolf_And_The_Sheep', filePath: 'songFolder/10.mp3', coverPath: 'Cover/10.jpg'}
]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})


//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100
})

const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-circle-pause')
            element.classList.add('fa-circle-play')
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        audioElement.src = `songFolder/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex >= 9){
        songIndex = 0
    }
    else {
    songIndex += 1;
    }
        audioElement.src = `songFolder/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})


document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex <= 0){
        songIndex = 0
    }
    else {
    songIndex -= 1;
    }
        audioElement.src = `songFolder/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})