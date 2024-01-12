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
        <iframe id="player" type="text/html"
  src="http://www.youtube.com/embed/${this.vidId}?enablejsapi=1&autoplay=1&origin=https://okogikam.github.io/yt_player2/"
  frameborder="0"></iframe>`

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
