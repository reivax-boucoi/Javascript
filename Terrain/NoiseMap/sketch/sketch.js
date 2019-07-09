
var nm;
var nr;

function setup() {
  createCanvas(640, 480);
  nm=new NoiseMap(width, height, 100, 4, 2, 0.5);
  nr=new NoiseRenderer(nm);
  background(0);
  nr.render();
}

function draw() {
	
}

function mouseReleased(){
	nr.renderMode=1-nr.renderMode;
	nr.render();
}
