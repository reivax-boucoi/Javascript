const itemSize=50;
const margin=3;
let inputQueue;
let outputQueue;
let carrierMan;
let grid;

let state=0;
function setup() {
	createCanvas(800,600);
	rectMode(CORNERS);
	textAlign(CENTER,CENTER);
	inputQueue=new Inout("input",5,225,itemSize+5,600);
	outputQueue=new Inout("output",500-itemSize-5,225,500-5,600);
	carrierMan=new Carrier(100,100);
	grid=new Pavage(125,200,4,4);
	grid.write(0,11);
	for(let i=0;i<8;i++){
		inputQueue.pushContent(i-1);
	}
}

function draw() {
	background(255,193,115);
	inputQueue.show();
	outputQueue.show();
	grid.show();
	carrierMan.show();
}

function mousePressed(){
	switch(state){
		case 0:
			CMD_inbox();
			break;
		case 1:
			CMD_copyTo(0,"index");
			break;
		case 2:
			CMD_copyFrom(11,"index");
			break;
		case 3:
			CMD_outbox();
			break;
	}
	if(++state>3)state=0;
}