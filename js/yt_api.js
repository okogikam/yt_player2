// const api_link = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=anime&key=AIzaSyCHjRJIK4diEwjSvJe1zPgarVhmuItQtZI";
const domain = location.origin;
const searchBtn = document.querySelector(".cari-btn");
let btnMenu = document.querySelectorAll(".btn-menu");
const historyVideo = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [];
const Playlist = localStorage.getItem("playlist") ? JSON.parse(localStorage.getItem("playlist")) : [];
let searchInput = document.querySelector(".search");
let player = new Player({
    element: document.querySelector("#video-player"),
    origin: domain,
})

const Ytsearch = new Ytvideo({
    element: document.querySelector("main"),    
    playlist: Playlist,
    history: historyVideo,
    url: "https://api.hancau.net/",
})

window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
       await navigator.serviceWorker.register("./service-worker.js");
    }

    player.makeElement();

    Ytsearch.setPlayer(player);
    Ytsearch.displayHomePage();
});


btnMenu.forEach((btn,i)=>{
    btn.addEventListener("click",()=>{
        if(btn.dataset.menu === "dark-mode" || btn.dataset.menu === "white-mode"){
            changeMode(btn);
        }else{
            btnMenu.forEach((b)=>{
                b.classList.remove("active");
            })
            btnMenu[i].classList.add("active");
            menubtn(btn.dataset.menu)
        }
    })
})
function menubtn(type){    
    Ytsearch.display(type);    
}
function changeMode(btn){
    let body = document.querySelector("body");
    if(btn.dataset.menu === "dark-mode"){
        body.dataset.bsTheme = "dark";
        btn.innerHTML = `
        <i class="fa-solid fa-toggle-off"></i> <i class="fa-solid fa-sun"></i>`;
        btn.dataset.menu = "white-mode";
        return
    }
    if(btn.dataset.menu === "white-mode"){
        body.dataset.bsTheme = "white";
        btn.innerHTML = `
        <i class="fa-solid fa-toggle-on"></i> <i class="fa-solid fa-moon"></i>`;
        btn.dataset.menu = "dark-mode";
        return
    }
}
searchBtn.addEventListener("click",()=>{
    let searchQuery = searchInput.value;
    let videoType = searchQuery.split(":");
    let type = "video";
    if(videoType[0].toLowerCase() === "pl"){
        type = "playlist";
    }
    Ytsearch.search({
        q: searchQuery,
        type: type,
        maxResults: "50"
    });
    //btnMenu[0].click()
})

searchInput.addEventListener("keydown",(event)=>{   
    if(event.code === "Enter"){
        event.preventDefault();
        let searchQuery = searchInput.value;
        let videoType = searchQuery.split(":");
        let type = "video";
        if(videoType[0].toLowerCase() === "pl"){
            type = "playlist";
        }
        Ytsearch.search({
            q: searchQuery,
            type: type,
            maxResults: "50"
        });
        //btnMenu[0].click()
    }
})



