class homePage{
    constructor(conf){
        this.url = conf.url;
        this.element = conf.element;
        this.player = conf.player;
        this.Ytvideo = conf.Ytvideo;
    }
    videos(data){
        let videoList = this.element.querySelector("#videoList");
        let daftarVideos = document.createElement("div");
        daftarVideos.classList.add("row");
        daftarVideos.innerHTML = "<h3>Video</h3>";
        data.forEach(vid => {
            let btn = document.createElement("div");
            let durasi = "";
            btn.setAttribute("class","col-12 col-sm-6 col-md-4");
            btn.innerHTML = `
            <div class="card m-2" title="${vid.title.runs[0].text}">
                <div class="card-header p-0 m-0">
                    <img src="${vid.thumbnail.thumbnails[0].url}" alt="">
                </div>
                <div class="card-body">
                    <p class="title">${vid.title.runs[0].text.slice(0,30)}</p>
                    <p class="channel">
                    <img src="${vid.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url}" width="30" height="30">
                    ${vid.ownerText.runs[0].text}
                    <span class="durasi">${durasi}</span>
                    </p>
                </div>
            </div>`;
            daftarVideos.appendChild(btn);
            btn.querySelector(".card").addEventListener("click",()=>{
                videoList.innerHTML = "";
                this.player.init({
                    type: "playVideo",
                    videoId: vid.videoId
                })
                this.Ytvideo.saveHistory({
                    videoId: vid.videoId,
                    title: vid.title.runs[0].text,
                    thumbnail: vid.thumbnail.thumbnails[0].url,
                    channel: vid.ownerText.runs[0].text
                })
                this.Ytvideo.displayViewPage(vid.videoId);
            })   
        }); 
        videoList.appendChild(daftarVideos);    
    }
    Shorts(){

    }
    Trending(data){
        let videoList = this.element.querySelector("#videoList");
        let daftarVideo = document.createElement("div");
        daftarVideo.classList.add("row");
        daftarVideo.innerHTML = "<h3>Trending</h3>";
        data.forEach(vid => {
            let btn = document.createElement("div");
            let durasi = "";
            btn.setAttribute("class","col-12 col-sm-6 col-md-4");
            btn.innerHTML = `
            <div class="card m-2" title="${vid.title.runs[0].text}">
                <div class="card-header p-0 m-0">
                    <img src="${vid.thumbnail.thumbnails[0].url}" alt="">
                </div>
                <div class="card-body">
                    <p class="title">${vid.title.runs[0].text.slice(0,30)}</p>
                    <p class="channel">
                    <img src="${vid.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url}" width="30" height="30">
                    ${vid.ownerText.runs[0].text}
                    <span class="durasi">${durasi}</span>
                    </p>
                </div>
            </div>`;
            daftarVideo.appendChild(btn);
            btn.querySelector(".card").addEventListener("click",()=>{
                videoList.innerHTML = "";
                this.player.init({
                    type: "playVideo",
                    videoId: vid.videoId
                })
                this.Ytvideo.saveHistory({
                    videoId: vid.videoId,
                    title: vid.title.runs[0].text,
                    thumbnail: vid.thumbnail.thumbnails[0].url,
                    channel: vid.ownerText.runs[0].text
                })
                this.Ytvideo.displayViewPage(vid.videoId);
            })   
        }); 
        videoList.appendChild(daftarVideo);
    }
    async display(){
        this.Ytvideo.loadingView();
        let a = document.getElementById("videoPlaying");
        let b = document.getElementById("videoLists");
        a.classList.add("d-none");      
        b.setAttribute("class","col-auto");
        let data = await fetch(`${this.url}?type=homepage`);
        let dataJson = await data.json();
        let c = this.Ytvideo.element.querySelector("#videoList");
        c.innerHTML = "";
        this.Trending(dataJson.Trending);
        this.videos(dataJson.videos);

        // Object.keys(dataJson).forEach(key=>{
        //     this[`${key}`](dataJson[key]);
        // })
    }
}