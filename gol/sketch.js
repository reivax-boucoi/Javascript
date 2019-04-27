var w = 20;
var cells = [];

function setup() {
	frameRate(1);
	createCanvas(800, 800);
	background(0);
	rectMode(CORNERS);
	fill(255);
	var choice = [];
	choice.push(0);
	choice.push(1);
	for (var j = 0; j < 20; j++) {
		for (var i = 0; i < 20; i++) {
			cells[index(i, j)] = new Cell(i, j, w, random(choice));
			cells[index(i, j)].show();
		}
	}
	//cells[20].alive = true;
}

function index(i, j) {
	return i + j * w;
}

function draw() {

	//update();

}

function mousePressed() {
	update();
}

function update() {
	background(0);
	console.log("clicked");
	var temp = [];
	for (var j = 0; j < 20; j++) {
		for (var i = 0; i < 20; i++) {
			temp[index(i, j)] = new Cell(i, j, w, cells[index(i, j)].check());

		}
	}
	cells = temp;
	for (var j = 0; j < 20; j++) {
		for (var i = 0; i < 20; i++) {
			cells[index(i, j)].show();
		}
	}
}
