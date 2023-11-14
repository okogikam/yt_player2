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
            <div class="card aside m-2" title="${vid.title.simpleText}">
              <div class="row">
                <div class="col-4 p-0 m-0">
                    <img src="${vid.thumbnail.thumbnails[0].url}" alt="">
                    </div>
                    <div class="col-8">
                    <p class="no-wrap title">${vid.title.simpleText}</p>
                    <p class="channel">
                    <img src="${vid.channelThumbnail.thumbnails[0].url}">
                    ${vid.longBylineText.runs[0].text.slice(0,15)}
                    <span class="durasi"></span>
                    </p>
                </div>
              </div>
            </div>`;
            videoList.appendChild(btn);
            btn.querySelector(".card").addEventListener("click",()=>{
                videoList.innerHTML = "";
                let detail = this.Ytvideo.element.querySelector(".video-detail");
                detail.innerHTML = ``;
                this.Ytvideo.player.init({
                    type: "playVideo",
                    videoId: vid.videoId? vid.videoId : vid.playlistId
                })
                this.Ytvideo.saveHistory({
                  videoId: vid.videoId? vid.videoId : vid.playlistId,
                  title: vid.title.simpleText,
                  thumbnail: vid.thumbnail.thumbnails[0].url,
                  channel: vid.longBylineText.runs[0].text
                })
                
                this.Ytvideo.displayViewPage(vid.videoId);
            })   
        });  
    }
    videos(data){
        if(!data){return}
        let detail = this.Ytvideo.element.querySelector(".video-detail");
        detail.innerHTML = `
        <div class="card p-2 mb-3">
          <h3 class="title">${data.title[0].runs[0].text}</h3>
          <div class="channel-info mt-2 mb-2">
             <div class="row">
               <div class="col-6">
                 <img src="${data.owner[0].videoOwnerRenderer.thumbnail.thumbnails[0].url}" >
                 <span>@${data.owner[0].videoOwnerRenderer.title.runs[0].text}</span>
               </div>
               <div class="col-6 text-right">
               <p>${data.dateText[0].simpleText}</p>
               </div>
             </div>
          </div>
          <div class="diskripsi text-justify">
            <p>${data.attributedDescription[0].content}</p>
          </div>
        </div>
        `
    }
    async display(){
        let data = await fetch(`${this.Ytvideo.url}?type=viewpage&v=${this.idVideo}`);
        let dataJson = await data.json();
        let c = this.Ytvideo.element.querySelector("#videoList");
        c.innerHTML = "";
        this.videos(dataJson.videos);
        this.next_video(dataJson.next_video);        
    }
}