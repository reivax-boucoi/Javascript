var N=[];
let json;
function preload(){
    json=loadJSON("Nodes.json");
}
function showPaths(){
    for(var n=0;n<json.Paths.length;n++){
        p=json.Paths[n];
        stroke(255);
        strokeWeight(10/p.w);
        line(N[p.n1].x,N[p.n1].y,N[p.n2].x,N[p.n2].y);
    }
}
function setup(){
    createCanvas(windowHeight*.9, windowHeight*.9);
    
    for(var n=0;n<json.Nodes.length;n++){
        N.push(new Node(json.Nodes[n].x,json.Nodes[n].y));
    }
    for(var n=0;n<json.Paths.length;n++){
        p=json.Paths[n];
        N[p.n1].addPath(N[p.n2],p.w);
    }
}
function draw(){
    background(0);
    showPaths();
    for(var n=0;n<N.length;n++){
        N[n].show();
    }
}
