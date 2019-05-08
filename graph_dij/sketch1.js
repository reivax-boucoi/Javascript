var N=[];
let json;
let cnv;

var bsequence;
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
    }
    for(var n=0;n<sequence.p.length;n++){
        p=sequence.p[n];
        stroke(200,0,0);
        strokeWeight(15/sqrt(p.w));
        line(p.n1.x,p.n1.y,p.n2.x,p.n2.y);
    }
    for(var n=0;n<json.Paths.length;n++){
        p=json.Paths[n];
        stroke(0);
        strokeWeight(3);
        fill(255);
        textSize(15);
        text(p.w,(N[p.n1].x+N[p.n2].x)/2,(N[p.n1].y+N[p.n2].y)/2);
    }
    noStroke();
    fill(255);
    textSize(40);
    text("Best="+bsequence.w,width-135,50);
}
function ClearSequence(){
    for(var n=0;n<N.length;n++){
        if(N[n].visited==3)N[n].visited=0;
        if(N[n].visited==1)current=N[n];
    }
    cnv.mousePressed(click);
    sequence=new Sequence();
}
function randomSearch(){
    ClearSequence();
    for(var i=0;i<100000;i++){
        click();
    }
    ClearSequence();
    sequence=bsequence;
    sequence.run(N);
}
function setup(){
    cnv=createCanvas(windowWidth, windowHeight*.95);
    cnv.mousePressed(click);
    button = createButton('Random Search');
    button.mousePressed(randomSearch);
    
    textAlign(CENTER,CENTER);
    sequence=new Sequence();
    bsequence=new Sequence();
    bsequence.w=Infinity;
    
    for(var n=0;n<json.Nodes.length;n++){
        N[json.Nodes[n].nb]=new Node(json.Nodes[n].x,json.Nodes[n].y,json.Nodes[n].nb);
        if(json.Nodes[n].start){
            N[N.length-1].visited=1;
            N[N.length-1].currenWeight=1;
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
}
function click(){
    var p=current.pickPath();
    if(p && current.visited!=2){
        sequence.add(p);
        current=p.n2;
        if(current.visited==2){
            if(sequence.w<=bsequence.w){
                bsequence=sequence;
                console.log("bw="+bsequence.w);
            }
        }
        if(current.visited==0)current.visited=3;
    }else{
        cnv.mousePressed(false);
        ClearSequence();
    }
}

function draw(){
    background(0);
    showPaths();
    for(var n=0;n<N.length;n++){
        N[n].show(current);
    }
}
