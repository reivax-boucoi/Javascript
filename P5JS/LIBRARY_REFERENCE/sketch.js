var acolor = 0;
var b;
var ps;

function setup() {
	createCanvas(400, 400);
	createP(random(100));
	b = createButton("Click Me !");
	b.mouseOver(ButtonPress);
	ps = select('#MyId');
}

function draw() {
	background(255 - acolor);
	fill(acolor);
	ellipse(200, 200, 100, 100);
	acolor = (acolor + 1) % 255;
	ps.style('background', '#F0F');
	//console.log(frameCount +"  "+acolor);
}

function MousePressed() {
	createP(random(100));
}

function ButtonPress() {
	createP(random(100));
}
