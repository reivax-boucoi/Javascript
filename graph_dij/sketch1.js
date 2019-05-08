var N;
let json;
function preload(){
    json=loadJSON("Nodes.json");
}

function setup(){
    createCanvas(windowHeight*.9, windowHeight*.9);
   N=new Node(100,100);
}
function draw(){
    background(0);
    N.show();
}
