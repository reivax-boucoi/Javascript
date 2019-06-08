const flock = [];
let img;
let alignSlider, cohesionSlider, separationSlider;

function preload(){
    img=loadImage('j.png');
    imgg=loadImage('g.png');
}
function setup() {
  createCanvas(800, 600);
  alignSlider = .1;
  cohesionSlider = .1;
  separationSlider = .1;
  for (let i = 0; i < 75; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(0);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.repel(mouseX,mouseY);
    boid.update();
    boid.show();
  }
  image(imgg,mouseX-imgg.width/2,mouseY-imgg.height/2);
}
