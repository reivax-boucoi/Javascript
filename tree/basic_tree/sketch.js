var tree;

function setup(){
    cnv=createCanvas(640,480);
    cnv.mousePressed(click);
    
    textAlign(CENTER,CENTER);
    
    tree=new Tree(5);
    
}
function click(){
}

function draw(){
    background(0);
    tree.show();
}
