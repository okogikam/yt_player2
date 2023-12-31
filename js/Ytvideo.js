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
    saveHistory(conf){
        this.history.push(conf);
        localStorage.setItem("history",JSON.stringify(this.history));
        console.log(this.history)
    }
    
    //menghapus history ke localhost
    removeHistory(){
        this.history = [];
        this.display("displayHistory")
        localStorage.removeItem("history")
    }
    loadingView(){
        let videoList = this.element.querySelector("#videoList");
        videoList.innerHTML = `
        <div class="loading">
        <p><i class="fa-solid fa-photo-film fa-bounce"></i> Loading..</p>
        </div>`; 
    }
    display(type){
        this.loadingView();
        this[type]();
    }
    displayHistory(){
        if(this.player.playerState === 1){
            this.player.stopVideo();
        }
        this.daftarHistory = new History({
            Ytvideo: this,            
        })
        this.daftarHistory.display();
    }
    //homepage
    displayHomePage(){
        if(this.player.playerState === 1){
            this.player.stopVideo();
        }
        this.homePage.display();
    }
    displayViewPage(idVideo){
        this.loadingView();
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
