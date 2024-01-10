class Video{
    constructor(conf){
        this.v = conf;
    }

    display(){
        let vDiv = document.createElement("div");
        vDiv.classList.add("video");
        vDiv.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-5">
                    <img src="${this.v.thumbnail.thumbnails[0].url}" alt="" class="img-fluid rounded-start">
                </div>
                <div class="col-7">
                    <div class="card-body p-1">
                        <a class="video-title" href="#">${this.v.title.runs[0].text}</a>
                        <a class="chanel-title" href="#">${this.v.ownerText.runs[0].text}</a><br>
                        <span class="btn btn-sm">${this.v.publishedTimeText.simpleText}</span>
                    </div>
                </div>
            </div>
        </div>`
        return vDiv;
    }
}