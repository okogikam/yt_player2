class homePage{
    constructor(conf){
        this.url = "https://api.hancau.net/v2/?type=homepage";
        this.element = conf.element;
        this.loaded = false;
    }
    async load(){
        let data = await fetch(`${this.url}`);
        this.dataJson = await data.json();
        this.loaded = true;        
    }
    displayVideo(){
        let video = this.dataJson.videos;
        let divT = document.createElement("div");
        divT.innerHTML = "<h4>Video</h4>";
        divT.setAttribute("id","video");
        Object.values(video).forEach(v=>{
            let videoT = new Video(v);
            divT.appendChild(videoT.display());
        })
        this.element.appendChild(divT);
    }
    Shorts(){

    }
    displayTrending(){
        let trending = this.dataJson.Trending;
        let divT = document.createElement("div");
        divT.innerHTML = "<h4>Trending</h4>";
        divT.setAttribute("id","trending");
        Object.values(trending).forEach(v=>{
            let videoT = new Video(v);
            divT.appendChild(videoT.display());
        })
        this.element.appendChild(divT);
    }
    async display(){
        await this.load();

        if(this.loaded){
            this.element.innerHTML = ``;  
            this.displayTrending();   
            this.displayVideo();                 
        }
    }
}