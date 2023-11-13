class History{
    constructor(conf){
        this.Ytvideo = conf.Ytvideo;
    }

    display(){
        let a = document.getElementById("videoPlaying");
        let b = document.getElementById("videoLists");
        let history = this.Ytvideo.history;
        a.classList.add("d-none");      
        b.setAttribute("class","col-auto");
        let videoList = this.Ytvideo.element.querySelector("#videoList");
        videoList.innerHTML = "<h3>History</h3>";
        history.forEach(h => {
            let btn = document.createElement("div");
            let durasi = "";
            btn.setAttribute("class","col-12 col-sm-6 col-md-4");
            btn.innerHTML = `
            <div class="card m-2" title="${h.title}">
                <div class="card-header p-0 m-0">
                    <img src="${h.thumbnail}" alt="">
                </div>
                <div class="card-body">
                    <p class="title">${h.title.slice(0,30)}</p>
                    <p class="channel">@ ${h.channel}
                    <span class="durasi">${durasi}</span>
                    </p>
                </div>
            </div>`;
            videoList.appendChild(btn);
            btn.addEventListener("click",()=>{
                videoList.innerHTML = "";
                this.Ytvideo.player.init({
                    type: "playVideo",
                    videoId: h.videoId
                })
            })
        });
    }
}