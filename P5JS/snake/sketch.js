var gridSize = 30;
var MySnakes = [15];

function setup() {
    createCanvas(600, 600);
    fill(255);
    var button = select("#snaky");
    button.mousePressed(createSnakes);
    noStroke();
    createSnakes();
}

function draw() {
    background(51);
    for (i = 0; i < MySnakes.length; i++) {
        MySnakes[i].update();
        MySnakes[i].show();
    }
}

function createSnakes() {
    for (int i = 0; i < 15; i++) {
        var s = new Snake(300, 300, 'bounce');
        MySnakes.push(s);
    }
}

function Snake(x, y, mode) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D(0, 15);
    this.mode = mode;
    console.log(vel);
    this.show = function () {
        rect(pos.x, pos.y, gridSize, gridSize);
    }
    this.update = function () {
      this.pos.add(this.vel); 
        if (mode == 'bounce') {
            this.bounce();
        } else if (this.mode == 'wrap') {
            this.wrap();
        }
    }
    this.wrap = function () {
        if (pos.x > (width - gridSize)) {
            pos.x = 0;
        } else if (pos.x < 0) {
            pos.x = 600 - gridSize;
        }
        if (pos.y > (height - gridSize)) {
            pos.y = 0;
        } else if (pos.y <= 0) {
            pos.y = 600 - gridSize;
        }
    }
    this.bounce = function () {

        if (pos.x > (width - gridSize) || pos.x < 0) {
            vel.x *= -1;
        }
        if (pos.y > (height - gridSize) || pos.y <= 0) {
            vel.y *= -1;
        }
    }
}
