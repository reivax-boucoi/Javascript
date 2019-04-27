var b;
var rPad;
var lPad;
var speed = 2;

function setup() {
    createCanvas(600, 400);
    background(50);
    b = new Ball();
    rPad = new Paddle(0, 0, 0);
    lPad = new Paddle(width, 0, 1);
}

function draw() {
    background(50);
    b.update();
    b.show();
    rPad.show();
    lPad.show();
}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            lPad.move(1);
            break;
        case DOWN_ARROW:
            lPad.move(-1);
            break;
        case LEFT_ARROW:
            rPad.move(1);
            break;
        case RIGHT_ARROW:
            rPad.move(-1);
            break;
        default:
            console.log("wrong keypress");
            break;
    }

}
