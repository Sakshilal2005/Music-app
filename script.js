const songs = [
    {
        title: "Agar Tum Saath ho",
        src: "Song/song1.mp3",
        img: "Covers/cover.jpg"
    },
    {
        title: "Gaadiya Ucchiya Rakhiya",
        src: "Song/2.mp3",
        img: "Covers/cover1.jpg"
    },
    {
        title: "Tere Vaaste",
        src: "Song/3.mp3",
        img: "Covers/cover2.jpg"
    },
    {
        title: "Excuses",
        src: "Song/4.mp3",
        img: "Covers/cover3.jpg"
    },
    {
        title: "Elevated",
        src: "Song/5.mp3",
        img: "Covers/cover4.jpg"
    }
];

let index = 0;

const audio = document.getElementById("audio");
const titleEl = document.getElementById("title");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const playlist = document.getElementById("playlist");
const playBtn = document.getElementById("playBtn");

/* Load song */
function loadSong(i) {
    index = i;
    audio.src = songs[index].src;
    titleEl.innerText = songs[index].title;
    cover.src = songs[index].img;
    playBtn.innerText = "▶️";
    updateActive();
}

/* Play / Pause toggle */
function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶️";
    }
}

/* Next */
function nextSong() {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.innerText = "⏸";
}

/* Previous */
function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.innerText = "⏸";
}

/* Progress update */
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

/* Seek */
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

/* Playlist UI */
playlist.innerHTML = "";
songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.innerText = song.title;
    li.onclick = () => {
        loadSong(i);
        audio.play();
        playBtn.innerText = "⏸";
    };
    playlist.appendChild(li);
});

/* Active song highlight */
function updateActive() {
    const items = document.querySelectorAll("#playlist li");

    items.forEach((li, i) => {
        li.classList.toggle("active", i === index);

        // auto scroll active song into view
        if (i === index) {
            li.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });
}


/* Auto next */
audio.addEventListener("ended", nextSong);

/* Initial */
loadSong(0);
updateActive();
