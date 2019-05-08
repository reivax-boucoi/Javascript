var N=[];
let json;
let cnv;

var sequence;
var current;

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
    for(var n=0;n<sequence.length;n++){
        p=sequence[n];
        stroke(200,0,0);
        strokeWeight(2);
        line(p.n1.x,p.n1.y,p.n2.x,p.n2.y);
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
        }
    }
    for(var n=0;n<json.Paths.length;n++){
        p=json.Paths[n];
        N[p.n1].addPath(N[p.n2],p.w);
        N[p.n2].addPath(N[p.n1],p.w);
    }
    sequence=new Sequence();
}
function click(){
    var p=current.pickPath();
    Sequence.add(p);
    current=p.n2;
    if(current.visited==2){
        console.log("Found path !");
        cnv.mousePressed(false);
    }
    if(current.visited==0)current.visited=3;
}

function draw(){
    background(0);
    showPaths();
    for(var n=0;n<N.length;n++){
        N[n].show(current);
    }
}
