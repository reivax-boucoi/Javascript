var points = [];
var current;
var start;
var canvas;
var started;
var entry;
var startup;
var slider;

function setup() {
    canvas = createCanvas(800, 800);
    canvas.mousePressed(addPoints);
    background(0);
    entry = createInput();
    entry.input(placeShape);
    start = createButton("Start");
    start.mousePressed(run);
    startup = createButton("Restart");
    startup.mousePressed(restartup);
    slider = createSlider(0, 10, 0);
    started = false;

}

function draw() {
    if (started) {
        var i = 0;
        while (i < pow(3, slider.value())) {
            var nb = floor(random(points.length));
            current.x = (current.x + points[nb].x) / 2.01;
            current.y = (current.y + points[nb].y) / 2.01;
            point(current.x, current.y);
            i++;
        }
    }
}

function placeShape() {
    if (!started) {
        background(0);
        points = [];
        noStroke();
        fill(255, 0, 0);
        var v = createVector(0, -3 * width / 7);
        for (var i = 0; i < this.value(); i++) {
            points[i] = new createVector(v.x + width / 2, v.y + width / 2);
            ellipse(v.x + width / 2, v.y + width / 2, 5, 5);
            v.rotate(TWO_PI / this.value());
        }
    }
}

function run() {
    strokeWeight(1);
    stroke(255);
    fill(255);
    //  current = createVector(points[0].x + 1, points[0].y + 1); 
    current = createVector(width / 2, height / 2);
    started = true;
}

function addPoints() {
    if (!started) {
        noStroke();
        fill(255, 0, 0);
        points.push(new p5.Vector(mouseX, mouseY));
        ellipse(mouseX, mouseY, 5, 5);
    }
}

function restartup() {
    points = [];
    background(0);
    started = false;
}
