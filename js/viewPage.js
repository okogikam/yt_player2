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
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${this.vidId}?si=-gWDYU0RPKmksWg1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

        this.element.appendChild(div);
    }
    videos(){
       
    }
    async display(){
        await this.load();

        if(this.loaded){
          this.element.innerHTML = "";
          this.playVideo();
        }       
    }
}
