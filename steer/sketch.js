const nbFood=20;
var vs=[];
var food=[];

function setup(){
	createCanvas(800,800);
    vs[0]=new Vehicule(50,400);
    for(var i=0;i<nbFood;i++)food.push(new Food());
}

function draw(){
	background(0);

    for(let f of food)f.show();
    for(let v of vs){
        v.seek(food);
        v.update();
        if(!v.dead())v.show();
    }
}

function mousePressed(){
    vs.push(new Vehicule(mouseX,mouseY));
}
