var N=[];
let json;
function preload(){
    json=loadJSON("Nodes.json");
}

function setup(){
    createCanvas(windowHeight*.9, windowHeight*.9);
    
    for(var n=0;n<json.Graph.Nodes.length;n++){
        N.push(new Node(json.Graph.Nodes[n].x,json.Graph.Nodes[n].y));
    }
}
function draw(){
    background(0);
    for(var n=0;n<N.length;n++){
        N[n].show();
    }
}
