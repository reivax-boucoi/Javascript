var w=100;
var margin=5;
var gameOver=0;//0=playing, 1=user won, 2=computer won, 3=draw

// 1=user=cross, 0=null=white, 2=computer=nought
var current=[[0,0,0],
			 [0,0,0],
			 [0,0,0]];
function setup() {
	createCanvas(w*3+1, w*3+1);
	rectMode(CORNERS);
	stroke(0);
	strokeWeight(3);
	background(255);
	line(3*w,0,3*w,width);
	line(0,3*w,width,3*w);
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			line(i*w,0,i*w,width);
			line(0,j*w,width,j*w);
		}
	}
}

function play(grid){
	var temp=grid.slice();
	
	//check 1 move solution
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(temp[i][j]==0){//if free
				temp[i][j]=2;//test computer here
				if(checkWon(temp,2)){//if right solution
					grid[i][j]=2;
					console.log("found winning move");
					return 2; //2 won
				}
				temp[i][j]=0;
			}
		}
	}
	
	//check 1 move loose
		for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(temp[i][j]==0){//if free
				temp[i][j]=1;//test player here
				if(checkWon(temp,1)){//if right solution
					grid[i][j]=2;
					console.log("found saving move");
					return 0; //0 played, but no win
				}
				temp[i][j]=0;
			}
		}
	}
	
	//try 2 move loose-avoidance solution
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(temp[i][j]==0){//if free
				temp[i][j]=1; //play here
							//test if second move is a loose
				for(var x=0;x<3;x++){
					for(var y=0;y<3;y++){
						if(temp[x][y]==0){
							temp[x][y]=1;
							if(checkWon(temp,1)){// if so play here first
								temp[x][y]=0;
								grid[i][j]=2;
								console.log("found 2 moves loose-avoidance solution");
								return 0;
							}
							temp[x][y]=0;
						}
					}
				}
				temp[i][j]=0;
			}
		}
	}
	
	//try 2 move winning solution
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(temp[i][j]==0){//if free
				temp[i][j]=2; //play here
							//test if second move is a win
				for(var x=0;x<3;x++){
					for(var y=0;y<3;y++){
						if(temp[x][y]==0){
							temp[x][y]=2;
							if(checkWon(temp,2)){// if so play here first
								temp[x][y]=0;
								grid[i][j]=2;
								console.log("found 2 moves solution");
								return 0;
							}
							temp[x][y]=0;
						}
					}
				}
				temp[i][j]=0;
			}
		}
	}
	
	//pick random
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if(grid[i][j]==0){
				grid[i][j]=2;
				console.log("played random");
				return 0;
			}
		}
	}
	
	console.log("couldn't play");
	return 3;//3 draw
}
function checkWon(grid,who){
	for(var i=0;i<3;i++){
		if(grid[i][0]==who && grid[i][1]==who && grid[i][2]==who){
			console.log("line");
			return 1;
		}else if(grid[0][i]==who && grid[1][i]==who && grid[2][i]==who){
			console.log("col");
			return 1;
		}
	}
	if(grid[0][0]==who && grid[1][1]==who && grid[2][2]==who){
		console.log("diag right");
		return 1;
	}else if(grid[0][2]==who && grid[1][1]==who && grid[2][0]==who){
		console.log("diag left");
		return 1;
	}
	return 0;
}
function userInput(x,y,grid){
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			if( x > (w*i)+margin	 &&
				y > (w*j)+margin	 &&
				x < ((i+1)*w)-margin &&
				y < ((j+1)*w)-margin){
				if(grid[j][i]==0){
					grid[j][i]=1;
					return 1;//success
				}else{
					return 2;//already taken
				}
			}
		}
	}
	return 0;//out of field
}
function drawgrid(grid){
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			switch(grid[j][i]){
				case 1:
					line((w*i)+w/4,(w*j)+w/4,
					((i+1)*w)-w/4,((j+1)*w)-w/4);
					line((w*i)+w/4,(w*(j+1))-w/4,
					((i+1)*w)-w/4,(j*w)+w/4);
				break;
				case 2:
					ellipse(w*i+w/2,w*j+w/2,w/2,w/2);	
				break;
			}
		}
	}
}
function draw() {
}
function mousePressed() {
	if(0==gameOver){
		if(userInput(mouseX,mouseY,current)==1){
			gameOver=checkWon(current,1);
			if(gameOver==0)gameOver=play(current);
		}
		drawgrid(current);
		if(gameOver !=0){
			switch(gameOver){
				case 3:
					console.log("Draw!");
				break;
				case 1:
					console.log("Player Won !");
				break;
				case 2:
					console.log("Computer Won !");
				break;
			}
		}
	}
}