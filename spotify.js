let songindex = 0;
let audiocomp = new Audio('music/1.mp3');
let playbutton = document.getElementById("playpause");
let progressbar = document.getElementById("progressbar");
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));




let music = [

    { songname: "Alan walker - spectre", filePath: "music/1.mp3", coverPath: "cover/1.jpg" },
    { songname: "The vlog", filePath: "music/2.mp3", coverPath: "cover/2.jpg" },
    { songname: "Journey", filePath: "music/3.mp3", coverPath: "cover/3.jpg" },
    { songname: "Trendy", filePath: "music/4.mp3", coverPath: "cover/4.jpg" },
    { songname: "Sweet heat by Decibel", filePath: "music/5.mp3", coverPath: "cover/5.jpg" },
    { songname: "Mortals", filePath: "music/6.mp3", coverPath: "cover/6.jpg" },
    { songname: "Janji-Heroes Tonight", filePath: "music/7.mp3", coverPath: "cover/7.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = music[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = music[i].songname;
})

playbutton.addEventListener("click", playit);
function playit() {
    if (audiocomp.paused || audiocomp.currentTime <= 0) {
        audiocomp.play();
        playbutton.classList.remove('fa-play');
        playbutton.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audiocomp.pause();
        playbutton.classList.remove('fa-pause');
        playbutton.classList.add('fa-play');
        gif.style.opacity = 0;

    }
}


audiocomp.addEventListener('timeupdate', () => {

    progress = parseInt((audiocomp.currentTime / audiocomp.duration) * 100);
    progressbar.value = progress;
})

progressbar.addEventListener('change', () => {
    audiocomp.currentTime = progressbar.value * audiocomp.duration / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audiocomp.src = `music/${songindex + 1}.mp3`;
        masterSongName.innerText = music[songindex].songname;
        audiocomp.currentTime = 0;
        audiocomp.play();
        gif.style.opacity = 1;
        playbutton.classList.remove('fa-play');
        playbutton.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 7) {
        songindex = 0
    }
    else {
        songindex += 1;
    }
    audiocomp.src = `music/${songindex + 1}.mp3`;
    masterSongName.innerText = music[songindex].songname;
    audiocomp.currentTime = 0;
    audiocomp.play();
    playbutton.classList.remove('fa-play');
    playbutton.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0
    }
    else {
        songindex -= 1;
    }
    audiocomp.src = `music/${songindex + 1}.mp3`;
    masterSongName.innerText = music[songindex].songname;
    audiocomp.currentTime = 0;
    audiocomp.play();
    playbutton.classList.remove('fa-play');
    playbutton.classList.add('fa-pause');
})