var tokens = 0;
var tickSpd = 750; //time in ms inbetween ticks 

plot = class {
    constructor(bought = false, plant = undefined, stage = 1, nutrients=0){
        this.bought = bought;
        this.plant = plant;
        this.stage = stage;
        this.nutrients = nutrients;
    }
}

testPlant = class {
    constructor(growthChance=.5, stage = 1) {
        this.growthChance = growthChance; //chance it will grow every tick
        this.maxstage = 4; //final stage of growth
        this.stage = stage;
    }
}

var farm = [[new plot(true, new testPlant()), new plot()], [new plot()], [new plot()], [new plot()]];


render("farm");

function main(){
    console.log("hey")
    for (let y = 0; y<farm.length; y++){
        for (let x = 0; x<farm[y].length; x++){
            let cp = farm[y][x]; //shorthand for currentplot
            if (cp.bought && cp.plant != undefined){
                if (Math.random() > cp.plant.growthChance && cp.plant.stage < cp.plant.maxstage) {
                    cp.plant.stage += 1;
                    renderTarget(y, x)
                }
            }
        }
    }
}

window.setInterval(main, tickSpd);

function render(type){
    if (type=="farm") {
        for (let y = 0; y<farm.length; y++){
            for (let x = 0; x<farm[y].length; x++){
                let cp = farm[y][x];
                if (cp.bought) {
                    let plotDiv = document.createElement("div");
                    plotDiv.className = "plot";
                    plotDiv.id = String(y)+String(x);
                    plotDiv.innerHTML = '<div class="plantImg"><img/><div> <ul><li><button>Water</button></li><li><button>Harvest</button></li></ul>';
                    plotDiv.childNodes[0].childNodes[0].src="./assets/plant"+farm[y][x].stage+".png";
                    document.getElementById(String(y)).appendChild(plotDiv);
                } else {
                    
                }
            }
        }
    }
}

function renderTarget(y, x) {
    let cp = farm[y][x]; //shorthand for currentplot
    document.getElementById(String(y) + String(x)).childNodes[0].childNodes[0].src = "./assets/plant"+cp.plant.stage+".png";
}

