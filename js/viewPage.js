class viewPage{
    constructor(conf){
        this.vidId = conf.id;
        this.url = `https://api.hancau.net/v2/?type=viewpage&v=${this.vidId}`;
        this.loaded = false;
        this.element = conf.element;
    }
    async load(){
      let data = await fetch(this.url);
      this.dataJson = await data.json();
      this.loaded = true;
    }
    playVideo(){
        let div = document.createElement("div");
        div.classList.add("frameVideo");
        div.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${this.vidId}?enablejsapi=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

        this.element.appendChild(div);
    }
    displayvideos(){
      let div = document.createElement("div");
      div.setAttribute("id","video");
      div.innerHTML = "<h4>Video</h4>";
      let vid = this.dataJson.next_video;
      Object.values(vid).forEach(v=>{
        let videoT = new Video(v);
        div.appendChild(videoT.display());
      })
      this.element.appendChild(div);
    }
    async display(){
        await this.load();

        if(this.loaded){
          this.element.innerHTML = "";
          this.playVideo();
          this.displayvideos();
        }       
    }
}
