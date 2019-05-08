var N=[];
var Nnv=[];
let json;
let cnv;
let checkbox;

var sequence=[];
var current;
var end;

function preload(){
    json=loadJSON("Nodes.json");
}
function showPaths(){
    for(p of json.Paths){
        stroke(220);
        strokeWeight(15/sqrt(p.w));
        line(N[p.n1].x,N[p.n1].y,N[p.n2].x,N[p.n2].y);
    }
    for(p of sequence){
        stroke(200,0,0);
        strokeWeight(15/sqrt(p.w));
        line(p.n1.x,p.n1.y,p.n2.x,p.n2.y);
    }
    for(p of json.Paths){
        stroke(0);
        strokeWeight(3);
        fill(255);
        textSize(15);
        text(p.w,(N[p.n1].x+N[p.n2].x)/2,(N[p.n1].y+N[p.n2].y)/2);
    }
    noStroke();
    fill(255);
    textSize(40);
    text("Best="+end.w,width-135,50);
}

function setup(){
    cnv=createCanvas(windowWidth, windowHeight*.9);
    cnv.mousePressed(click);
    checkbox = createCheckbox('Weights/Indexes', false);
    
    textAlign(CENTER,CENTER);
    
    for(n of json.Nodes){
        N[n.nb]=new Node(n.x,n.y,n.nb);
        if(n.start){
            N[n.nb].w=0;
            current=N[n.nb];
        }
        if(n.end){
            N[n.nb].visited=2;
            end=N[n.nb];
        }
    }
    for(p of json.Paths){
        N[p.n1].addPath(N[p.n2],p.w);
        N[p.n2].addPath(N[p.n1],p.w);
    }
    console.log(N);
    Nnv=N.slice(0,N.length);
}
function backtrack(){
    sequence=[];
    while(current.nb!=0){
        for(p of current.paths){
            if((current.w-p.w)==p.n2.w){
                sequence.push(p);
                current=p.n2;
                break;
            }
        }
    }
}
function click(){
    Nnv.sort(function(a, b){return a.w-b.w;});
    if(Nnv.includes(end) && Nnv[0].w!=Infinity){
        current=Nnv[0];
        calculateNeighbors(current);
        if(current.visited==0)current.visited=3;
        Nnv.splice(0,1);
    }else if(!Nnv.includes(end)){
        console.log("found path in "+end.w);
        current=end;
    }else{
        console.log("Impossible graph ?");
    }
    
    backtrack();
}
function calculateNeighbors(c){
    var ps=c.getPath();
    for(p of ps){
        var d=c.w+p.w;
        if(d<p.n2.w){
            p.n2.w=d;
        }
    }
}

function draw(){
    background(0);
    showPaths();
    for(n of N){
        n.show(current);
    }
}
