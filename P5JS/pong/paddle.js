function Paddle(x, y, type) {
    this.pos = createVector(x, y);
    this.length = 150;
    this.larg = 20;
    this.type = type;
    this.move = function (dy) {
        this.pos.y += dy * 10;
        this.pos.y = constrain(this.pos.y, 0, height - this.length);
    }

    this.show = function () {
        noStroke();
        if (type == 0) {
            rect(this.pos.x, this.pos.y, this.larg, this.length);
        } else {
            rect(this.pos.x - this.larg, this.pos.y, this.larg, this.length);
        }
    }

}
