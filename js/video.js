class Video{
    constructor(conf){
        // this.v = conf;
        this.origin = "https://okogikam.github.io/yt_player2/";
        this.title = conf.title.accessibility.accessibilityData.label || "";
        this.id = conf.videoId;
        this.img = conf.thumbnail.thumbnails[0].url || "";
        this.chanel = conf.longBylineText.runs[0].text || "";
        this.uploaded = conf.publishedTimeText.simpleText || "";
        this.duration = conf.lengthText.simpleText || "";
        this.chanImg = "";
    }

    display(){
        let vDiv = document.createElement("div");
        vDiv.classList.add("video");
        vDiv.innerHTML = `
        <div class="card mb-3" title="${this.title}">
            <div class="row g-0">
                <div class="col-5">
                    <a href="${this.origin}/view/?id=${this.id}">
                     <img src="${this.img}" alt="" class="img-fluid rounded-start">
                     </a>
                </div>
                <div class="col-7">
                    <div class="card-body p-1">
                        <a class="video-title" href="${this.origin}/view/?id=${this.id}">${this.title}</a>
                        <a class="chanel-title" href="#">
                        <img src="${this.chanImg}" class="chanel-img">${this.chanel}
                        </a>
                        <br>
                        <span class="btn btn-sm">${this.duration}</span>
                        <span class="btn btn-sm float-end">${this.uploaded}</span>
                    </div>
                </div>
            </div>
        </div>`
        return vDiv;
    }
}