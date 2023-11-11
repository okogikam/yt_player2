class Ytvideo{
    constructor(config){
        this.element = config.element;
        this.url = config.url;
        
        this.history = config.history || [];
        
        this.listVideo = this.element.querySelector(".list-video");
        this.autoPlay = false;       
        this.dataVideo = [];
        this.playnow = 0;
        this.isDone = false;
        this.displayListNow = [];
        this.isPlaying = false;
        this.dataVideo = [];
        this.qHistory = "";
    }
    setPlayer(player){
        this.player = player;
        this.homePage = new homePage({
            url: this.url,
            element: this.element,
            player: this.player,
            Ytvideo: this
        });
        this.starLoop();
    }
    search(conf){
        if(conf.q != ''){
            this.searchData = new Search({
                Ytvideo: this,
                s: conf
            });
            this.searchData.display();
        }
    }
    
    //memulai looping untuk mengecek status video 0 jika sudah selesai
    starLoop(){
        this.player.startLoop();
        if(this.player.playerState === 0){
            // console.log("video End")            
            setTimeout(()=>{
                this.isDone = true;
            },500)
            if(this.isDone && this.autoPlay){             
                this.playnow += 1;
                if(this.playnow >= this.displayListNow.length){
                    this.playnow = 0;
                }
                this.playVideo(this.playnow);
                this.isDone = false;
                // console.log("next")
                
            }else{
                const playerVideo = this.element.querySelector("#videoPlaying");
                // playerVideo.classList.add("d-none");
            }
        }
                
        requestAnimationFrame(()=>{
            this.starLoop()
        })
    }    
    //menyimpan history ke localhost
    saveHistory(){
        localStorage.setItem("history",JSON.stringify(this.history));
    }
    
    //menghapus history ke localhost
    removeHistory(){
        this.history = [];
        this.saveHistory();
        this.display("history")
    }
    display(type){
        this[type]();
    }
    history(){

    }
    //homepage
    displayHomePage(){
        this.homePage.display();
    }
    displayViewPage(idVideo){
        this.viewPage = new viewPage({
            Ytvideo: this,
            idVideo: idVideo
        })
        this.viewPage.display();
    }

    //memuat halaman awal
    load(){
        if(this.history.length > 0 ){
            this.display("search");
        }   
    }
}
