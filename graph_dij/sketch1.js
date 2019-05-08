var N=[];
let json;
function preload(){
    json=loadJSON("Nodes.json");
}

function setup(){
    createCanvas(windowHeight*.9, windowHeight*.9);
    
    for(var n=0;n<json.Nodes.length;n++){
        N.push(new Node(json.Nodes[n].x,json.Nodes[n].y));
    }
    for(var n=0;n<json.Paths.length;n++){
        N[json.Paths[n].n1].addPath(N[json.Paths[n].n2],json.Paths[n].w]);
    }
}
function draw(){
    background(0);
    for(var n=0;n<N.length;n++){
        N[n].show();
    }
}
