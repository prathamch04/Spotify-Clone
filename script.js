console.log('Lets write javascript');

let currentSong = new Audio();

async function getSongs() {
    let a = await fetch('http://127.0.0.1:5500/songs/')
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName('a')
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }

    }
    // console.log(songs);
    return songs

}

playMusic = (track) => {
    // var audio = new Audio("/songs/" + track);
    currentSong.src = "/songs/" + track
    currentSong.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(duration);
    // });
}


async function main() {

    // get the list of all songs
    let songs = await getSongs()
    console.log(songs);

    //show all songs in the playlist
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML +
            `<li> 
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div>${song.replaceAll("%20", " ")}</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class = "invert" src="play.svg" alt="">
        </div>        
        </li>`;

    }



    //attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        let play = e.getElementsByTagName('img')[1];
        play.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })
}

main()





