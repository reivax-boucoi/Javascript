var N=[];
let json;

var start;
var current;
var end;

function preload(){
    json=loadJSON("Nodes.json");
}
function showPaths(){
    for(var n=0;n<json.Paths.length;n++){
        p=json.Paths[n];
        stroke(220);
        strokeWeight(15/sqrt(p.w));
        line(N[p.n1].x,N[p.n1].y,N[p.n2].x,N[p.n2].y);
        stroke(0);
        strokeWeight(2);
        fill(255);
        textSize(20);
        text(p.w,(N[p.n1].x+N[p.n2].x)/2,(N[p.n1].y+N[p.n2].y)/2);
    }
}
function setup(){
    cnv=createCanvas(windowHeight*.9, windowHeight*.9);
    cnv.mousePressed(click);
    textAlign(CENTER,CENTER);
    for(var n=0;n<json.Nodes.length;n++){
        N.push(new Node(json.Nodes[n].x,json.Nodes[n].y,n));
        if(json.Nodes[n].start){
            N[N.length-1].visited=1;
            current=N[N.length-1];
        }
        if(json.Nodes[n].end){
            N[N.length-1].visited=2;
            end=N[N.length-1];
        }
    }
    for(var n=0;n<json.Paths.length;n++){
        p=json.Paths[n];
        N[p.n1].addPath(N[p.n2],p.w);
    }
}
function click(){
    console.log(current.paths);
}

function draw(){
    background(0);
    showPaths();
    for(var n=0;n<N.length;n++){
        N[n].show(current);
    }
}
