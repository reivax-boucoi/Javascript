var tree;

function setup(){
    cnv=createCanvas(640,480);
    cnv.mousePressed(click);
    
    textAlign(CENTER,CENTER);
    
    tree=new Tree(50);
    
}
function click(){
    tree.insert(floor(random(100)));
}

function draw(){
    background(0);
    tree.show();
}
