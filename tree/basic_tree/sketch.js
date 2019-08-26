
function setup(){
    cnv=createCanvas(windowWidth, windowHeight*.95);
    cnv.mousePressed(click);
    button = createButton('Random Search');
    button.mousePressed(randomSearch);
    
    textAlign(CENTER,CENTER);
    sequence=new Sequence();
    bsequence=new Sequence();
    bsequence.w=Infinity;
    
    for(n of json.Nodes){
        N[n.nb]=new Node(n.x,n.y,n.nb);
        if(n.start){
            N[n.nb].visited=1;
            current=N[n.nb];
        }
        if(n.end){
            N[n.nb].visited=2;
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
