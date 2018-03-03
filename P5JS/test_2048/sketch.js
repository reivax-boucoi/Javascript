var w = 150;
var col = 4;
var grid=[];
function setup() {
	createCanvas(w*col+1, w*col+1);
	background(255);
	textSize(32);
	for(var i=0;i<col;i++){
		var a=[];
			for(var j=0;j<col;j++){
			a.push(0);
			}
		grid.push(a);
	}
}

function drawgrid(){
	for(var i=0;i<col;i++){
		for(var j=0;j<col;j++){
			fill(map(grid[j][i],0,maxinGrid(),255,70));
			strokeWeight(2);
			stroke(127);
			rect(i*w,j*w,(i+1)*w,(j+1)*w);
			if(grid[j][i]!=0){
				textAlign(CENTER, CENTER);
				noStroke();
				fill(0);
				text(grid[j][i], i * w + w / 2, j * w + w / 2);
			}
		}
	}
}
function draw() {
	drawgrid();
}
function maxinGrid(){
	var a=[0];
	for(var i=0;i<col;i++){
		a.push(max(grid[i]));
	}
	return max(a);
}
function combine(i,j,a,b){
	if(grid[i][j]==grid[i+b][j+a]){
		grid[i][j]=0;
		grid[i+b][j+a]*=2;
	}else if(grid[i+b][j+a]==0){
		grid[i+b][j+a]=grid[i][j];
		grid[i][j]=0;
	}
}
function MousePressed() {
}
function keyPressed(){
	if (keyCode === RIGHT_ARROW) {
		for(var x=0;x<col;x++){
			for(var y=col-2;y>=0;y--){
				combine(x,y,1,0);
			}
		}
	} else if (keyCode === LEFT_ARROW) {
		for(var x=0;x<col;x++){
			for(var y=1;y<col;y++){
				combine(x,y,-1,0);
			}
		}
	} else if (keyCode === UP_ARROW) {
		for(var x=1;x<col;x++){
			for(var y=0;y<col;y++){
				combine(x,y,0,-1);
			}
		}
	} else if (keyCode === DOWN_ARROW) {
		for(var x=col-2;x>=0;x--){
			for(var y=0;y<col;y++){
			combine(x,y,0,1);
			}
		}
	}
	//generate random tile in empty slot with value 2 or 4
	
	do{
	var index=floor(random(0,16));	
	}while(grid[index%col][index/col]!=0);
	grid[index%col][index/col]=floor(random(0,1))*2+2;
}
