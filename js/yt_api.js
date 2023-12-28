// const api_link = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=anime&key=AIzaSyCHjRJIK4diEwjSvJe1zPgarVhmuItQtZI";


window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
       await navigator.serviceWorker.register("../service-worker.js");
    }
});


