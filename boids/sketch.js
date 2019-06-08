const flock = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(800, 600);
  alignSlider = .1;
  cohesionSlider = .1;
  separationSlider = .1;
  for (let i = 0; i < 50; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(51);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
