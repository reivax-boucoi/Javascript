function Cell(i, j, w, alive) {
	this.i = i;
	this.j = j;
	this.w = 2 * w;
	this.alive = alive;


	this.show = function () {
		var x = this.i * this.w;
		var y = this.j * this.w;
		stroke(255);
		if (alive) {
			fill(0, 255, 0);
		} else {
			fill(0);
		}
		rect(x, y, x + this.w, y + this.w);
	}

	this.cneighbors = function () {
		var x = 0;
		var a = -1;
		var atr = 1;
		var b = -1;
		var btr = 1;
		if (this.i < 1) a = 0;
		if (this.j < 1) b = 0;
		if (this.i > 18) atr = 0;
		if (this.j > 18) btr = 0;
		for (; a < atr; a++) {
			for (; b < btr; b++) {
				if (!(a == 0 && b == 0)) {
					if (cells[index(this.i + a, b + this.j)].alive)
						x++;
				}
			}
		}
		return x;
	}

	this.check = function () {
		var neighbors = this.cneighbors();

		if (this.alive && (neighbors < 2 || neighbors > 3)) {
			return false;
		} else if ((!this.alive) && neighbors == 3) {
			return true
		} else if (this.alive && (neighbors == 2 || neighbors == 2)) {
			return true;
		}
	}
}
