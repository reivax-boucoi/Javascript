function Ball() {
    this.pos = createVector(width / 2, height / 2);
    this.rad = 5;
    this.dir = createVector(1, 1);
    this.dir.setMag(speed);

    this.checkCollision = function (pad) {
        if (((this.pos.x - this.rad) <= (pad.pos.x + pad.larg)) && (pad.type == 1)) {
            // this.dir.x *= -1;
            console.log("hit left paddle");
        }
        if (((this.pos.x + this.rad) >= pad.pos.x) && (pad.type == 0)) {
            // this.dir.x *= -1;
            console.log("hit right paddle");
        }
    }

    this.update = function () {
        this.pos.x += this.dir.x;
        this.pos.y += this.dir.y;
        if (this.pos.x < 0 || this.pos.x > width) {
            this.pos = createVector(width / 2, height / 2);
            this.dir = p5.Vector.random2D();
            this.dir.setMag(speed);
        }
        if ((this.pos.y - this.rad <= 0) || (this.pos.y + this.rad >= height)) {
            this.dir.y *= -1;
        }
        this.checkCollision(rPad);
        this.checkCollision(lPad);
    }


    this.show = function () {
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2);
    }

}
