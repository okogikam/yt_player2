class viewPage{
    constructor(conf){
        this.Ytvideo = conf.Ytvideo;
        this.idVideo = conf.idVideo;
    }
    next_video(data){
        let videoList = this.Ytvideo.element.querySelector("#videoList");
        videoList.innerHTML = "<h3>Watch Next</h3>";
        data.forEach(vid => {
            let btn = document.createElement("div");
            btn.setAttribute("class","col-12");
            btn.innerHTML = `
            <div class="card aside" title="${vid.title.simpleText}">
              <div class="row">
                <div class="col-4 p-0 m-0">
                    <img src="${vid.thumbnail.thumbnails[0].url}" alt="">
                </div>
                <div class="col-8">
                    <p class="no-wrap title">${vid.title.simpleText}</p>
                    <p class="channel">
                    <img src="${vid.channelThumbnail.thumbnails[0].url}">
                    ${vid.longBylineText.runs[0].text}</p>
                    <p class="durasi">${vid.lengthText.simpleText}</p>
                </div>
              </div>
            </div>`;
            videoList.appendChild(btn);
            btn.addEventListener("click",()=>{
                videoList.innerHTML = "";
                this.Ytvideo.player.init({
                    type: "playVideo",
                    videoId: vid.videoId
                })
                this.Ytvideo.displayViewPage(vid.videoId);
            })   
        });  
    }
    videos(data){}
    async display(){
        let data = await fetch(`${this.Ytvideo.url}?type=viewpage&v=${this.idVideo}`);
        let dataJson = await data.json();
        Object.keys(dataJson).forEach(key=>{
            this[`${key}`](dataJson[key]);
        })        
    }
}