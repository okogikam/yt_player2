const main = document.querySelector("main");

async function load(){
    let result = main.querySelector("#result");
    let load = await fetch("../api.php");
    // let data = load.json;
    // result.innerHTML = load.body;
    console.log(load)
}


