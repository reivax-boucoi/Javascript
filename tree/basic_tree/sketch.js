var n;

function setup(){
    cnv=createCanvas(640,480);
    cnv.mousePressed(click);
    
    textAlign(CENTER,CENTER);
    
    n=new Node(null,5);
    
}
function click(){
}

function draw(){
    background(0);
    n.show();
}
