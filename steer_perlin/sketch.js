
var vs=[];

function setup(){
	createCanvas(800,800);
    for(var i=0;i<200;i++)vs[i]=new Vehicule(random(width),random(height));
}

function draw(){
	background(0);

    for(let v of vs){
        v.avoid(mouseX,mouseY);
        v.update();
        v.show();
    }
}

function mousePressed(){
    vs.push(new Vehicule(mouseX,mouseY));
}
