var N;
function setup(){
    createCanvas(windowHeight*.9, windowHeight*.9);
   N=new Node(100,100);
}
function draw(){
    background(0);
    N.show();
}
