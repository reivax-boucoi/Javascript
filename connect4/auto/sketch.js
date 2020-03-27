let grid=[];
let w;
let h;
let currentPlayer='r';
function setup() {
	createCanvas(700,600);
	w=width/7;
	h=height/6;
	for(let i=0;i<7;i++){
		let row=[];
		for(let j=0;j<6;j++){
			row.push('');
		}
		grid.push(row);
	}
}
function dropToken(c,player){
	if(grid[c][0]!=''){
		return -1;
	}
	let i=0;
	while(grid[c][i+1]=='' && (i+1)<6)i++;
	
	grid[c][i]=player;
	return i;
	
}

function checkWin(p){
	
	for(let i=0;i<7;i++){
		for(let j=0;j<6;j++){
			if(grid[i][j]==p){
				let r=checkAligned(p,i,j,0,1);
				if(r==1)return 1;
			}
		}
	}
	return checkTie();
	
}

function checkAligned(p,x,y,dir,nb){
	if(nb==4)return 1;
	let res=0
	switch(dir){
		case 0:
		for(let d=1;d<9;d++){
			res+=checkAligned(p,x,y,d,nb);
		}
		break;
		case 1:
			if(x<6){
				if(grid[x+1][y]==p)res=checkAligned(p,x+1,y,dir,nb+1);
			}
		break;
		case 2:
			if(y<5){
				if(grid[x][y+1]==p)res=checkAligned(p,x,y+1,dir,nb+1);
			}
		break;
		case 3:
			if(x>1){
				if(grid[x-1][y]==p)res=checkAligned(p,x-1,y,dir,nb+1);
			}
		break;
		case 4:
			if(y>1){
				if(grid[x][y-1]==p)res=checkAligned(p,x,y-1,dir,nb+1);
			}
		break;
		case 5:
			if(y>1 && x>1){
				if(grid[x-1][y-1]==p)res=checkAligned(p,x-1,y-1,dir,nb+1);
			}
		break;
		case 6:
			if(y>1 && x<6){
				if(grid[x+1][y-1]==p)res=checkAligned(p,x+1,y-1,dir,nb+1);
			}
		break;
		case 7:
			if(y<5 && x<6){
				if(grid[x+1][y+1]==p)res=checkAligned(p,x+1,y+1,dir,nb+1);
			}
		break;
		case 8:
			if(x>1 && y<5){
				if(grid[x-1][y+1]==p)res=checkAligned(p,x-1,y+1,dir,nb+1);
			}
		break;
	}
	return res;
	
}

function checkTie(){
	for(let i=0;i<7;i++){
		for(let j=0;j<6;j++){
			if(grid[i][j]=='')return 0;
		}
	}
	return -1;	
}
function mousePressed(){
	if(currentPlayer!='f'){
		let c=floor(mouseX/w);
		if(dropToken(c,currentPlayer)==-1){
			console.log("column full !");
		}else{
			let r=checkWin(currentPlayer);
			if(r==1){
				noLoop();
				console.log("Player "+currentPlayer+ " won !");
				currentPlayer='f';
			}else if(r==-1){
				noLoop();
				console.log("Tie !");
				currentPlayer='f';
			}else{
				if(currentPlayer=='y'){
					currentPlayer='r';
				}else{
					currentPlayer='y';
				}
			}
			checkTie();
		}
	}
	
}
function drawGrid(){
  stroke(0);
  strokeWeight(6);
	for(let i=0;i<7;i++){
		line(0,i*h,width,i*h);
	}
	for(let i=0;i<8;i++){
		line(i*w,0,i*w,height);
	}
	strokeWeight(1);
	for(let i=0;i<7;i++){
		for(let j=0;j<6;j++){
			if(grid[i][j]=='r'){
				fill(200,0,0);
				ellipse(i*w+w/2,j*h+h/2,w*.9,h*.9);
			}
			if(grid[i][j]=='y'){
				fill(255,255,0);
				ellipse(i*w+w/2,j*h+h/2,w*.9,h*.9);
			}
		}
	}
	
}
function draw() {
  background(255);
  drawGrid();
}