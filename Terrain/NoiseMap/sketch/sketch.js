
var nm;
var nr;

function setup() {
  createCanvas(640, 480);
  nm=new NoiseMap(width, height, scale, 1, 2, 0.5);
  nr=new NoiseRenderer(nm);
  nr.render();
}

function draw() {
}

function mouseReleased(){
    if (mouseY>100) {
    nr.renderMode=1-nr.renderMode;
  }else{
    nr.map.scl=100/**/;
  }
    nr.render();
}
