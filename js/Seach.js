class Search{
    constructor(conf){
        this.Ytvideo = conf.Ytvideo;
        this.q = conf.s.q;
        this.maxResults = conf.s.maxResults || "";
        this.type = conf.s.type || "";
        this.pageToken = conf.s.pageToken || "";
        this.url = `https://api.hancau.net/?&q=${this.q}&pageToken=${this.pageToken}&maxResults=${this.maxResults}&type=${this.type}`
    }
    async video(){
        let el = this.Ytvideo.element.querySelector("#videoList");
        el.innerHTML = "<h3>Search</h3>"
        let data = await fetch(`${this.url}`);
        let dataJson = await data.json();
        Object.values(dataJson).forEach(d=>{
            Object.values(d).forEach(v=>{
                console.log(v.kind)
                if(v.kind === "youtube#searchResult"){
                    const btn = document.createElement("button");
                    btn.classList.add('btn-video');
                    btn.innerHTML = `
                    <div class="card" title="${v.snippet.channelTitle}">
                        <div class="card-header p-0 m-0">
                            <img src="${v.snippet.thumbnails.medium.url}" alt="">
                        </div>
                        <div class="card-body">
                            <p class="title">${v.snippet.title.slice(0,30)}
                            <span class="channel">
                            ${v.snippet.channelTitle}</span>
                            </p>
                        </div>
                    </div>`;
                    btn.addEventListener("click",()=>{
                        el.innerHTML = "";
                        this.Ytvideo.player.init({
                            type: "playVideo",
                            videoId: v.id.videoId
                        })
                        this.Ytvideo.displayViewPage(v.id.videoId);
                    }) 
                    el.appendChild(btn);
                }
            })
        })
    }
    async playlist(){

    }
    display(){
        this[this.type]();
    }
}