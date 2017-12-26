var puzzle = "6.......7....9..2.3.1..259.8....7.13....8....76.3....8.782..1.6.5..3....2.......9";
//var puzzle = "2..1.5..3.54...71..1.2.3.8.6.28.73.4.........1.53.98.6.2.7.1.6..81...24.7..4.2..1";
//var puzzle = "....6...8......53...2593.4...1.7.3..9.31.56.4..4.3.9...2.3568...98......6...8....";
//var puzzle = ".7.456......7.....4.62..7.95378416928..6923752693754187.3...2.4.....4..7...527...";
//var puzzle = "000023000004000100050084090001070902093006000000010760000000000800000004060000587";
//var puzzle = "050007690000040000009000000000100004000230008008000150000400003006080209002005000";
var grid = [];
var current;
var step;
var solve;
var debug;
var stuck;
var BoxType = function () {
	this.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function setBox(index, val) {
	grid[index].nums = [];
	grid[index].nums.push(int(val));
}

function drawGrid() {
	background(255);
	var spacing = width / 9;
	if (debug.checked()) {
		fill(255, 0, 0);
		rect((current % 9) * spacing, floor(current / 9) * spacing, spacing, spacing);
	}
	for (var i = 0; i < 9; i++) {
		if (i % 3 == 2) {
			strokeWeight(4);
		} else {
			strokeWeight(1);
		}
		line(0, (i + 1) * spacing, width, (i + 1) * spacing);
		line((i + 1) * spacing, 0, (i + 1) * spacing, width);

		for (var j = 0; j < 9; j++) {
			if (grid[i + j * 9].nums.length == 1) {
				if (debug.checked()) {
					fill(0, 255, 0);
					strokeWeight(1);
					rect(i * spacing + 5, j * spacing + 5, spacing - 10, spacing - 10);
				}
				fill(0);
				text(grid[i + j * 9].nums[0], i * spacing + 20, j * spacing + 25);
			} else {
				if (debug.checked()) {
					for (var x = 0; x < grid[i + j * 9].nums.length; x++) {
						fill(0);
						text(grid[i + j * 9].nums[x], i * spacing + ((x % 3) * spacing / 4) + 5, j * spacing + (floor(x / 3) * spacing / 4) + 15);
					}
				}
			}
		}
	}
}

function solveGrid() {
	while (!checkFinished() && stuck < 5) {
		simplify();
	}
	drawGrid();
	if (stuck < 5) {
		console.log("Finished Solving !");
	} else {
		console.log("hum...");
		stuck = 0;
		var trueGrid = grid;


	}
}

function checkFinished() {
	var finished = true;
	var i = 0;
	while (i < 81 && finished) {
		if (grid[i].nums.length > 1) {
			finished = false;
		}
		i++;
	}
	return finished;
}

function checkRow(i) {
	for (var j = 0; j < 9; j++) {
		if (grid[floor(i / 9) * 9 + j].nums.length == 1 && floor(i / 9) * 9 + j != i) {
			for (var x = 0; x < grid[i].nums.length; x++) {
				if (grid[floor(i / 9) * 9 + j].nums[0] == grid[i].nums[x]) {
					grid[i].nums.splice(x, 1);
				}
			}
		}
	}
}

function checkCol(x) {
	
	var cnt=[0,0,0,0,0,0,0,0,0];
	for (var j = 0; j < 9; j++) {
		var index = (x % 9) + j * 9;
		if (grid[index].nums.length == 1 && index != x) {
			var i = grid[index].nums[0];
			if (grid[x].nums.indexOf(i)!=-1) {
				grid[x].nums.splice(grid[x].nums.indexOf(i), 1);
			}
		}
	}
}

function checkSquare(x) {
	var cnt=[0,0,0,0,0,0,0,0,0];
	for (var j = 0; j < 3; j++) {
		for (var k = 0; k < 3; k++) {
			var index = 3 * floor((x % 9) / 3) + 27 * floor(x / 27) + j + k * 9;
			for(var i=1;i<10;i++){
				if (grid[index].nums.length == 1 && index != x) {
					if((grid[x].nums.indexOf(i)!=-1) && grid[index].nums[0]==i){
						grid[x].nums.splice(grid[x].nums.indexOf(i),1);
					}
				}
				if(grid[index].nums.indexOf(i)!=-1){
					cnt[i-1]++;
				}
			}
		}
	}
	for(var i=0;i<9;i++){
		if(cnt[i]==1){
			for (var j = 0; j < 3; j++) {
				for (var k = 0; k < 3; k++) {
					var index = 3 * floor((x / 3) % 3) + 27 * floor(x / 27) + j + k * 9;
					if(grid[index].nums.indexOf(i+1)!=-1){
						setBox(index,i+1);
					}
				}
			}
		}
	}
}

function simplify() {
	if (checkFinished()) {
		console.log("finished !");
	} else {
		if (current >= 81) {
			current = 0;
			console.log("seems stuck...");
			stuck++;
		} else {
			if (grid[current].nums.length == 1) {
				current++;
			} else {
				checkSquare(current);
				checkRow(current);
				checkCol(current);
				//useHypo(current);
				if (grid[current].nums.length == 1) {
					current = 0;
					console.log("restarting");
				} else {
					current++;
				}
			}
		}
		if (debug.checked()) {
			drawGrid();
		}
	}
}

function populateGrid() {
	for (var i = 0; i < 81; i++) {
		grid[i] = new BoxType();
		if (puzzle[i] > 0) {
			setBox(i, puzzle[i]);
		}
	}
}

function setup() {
	createCanvas(400, 400);
	background(200);
	step = createButton("step");
	step.mousePressed(simplify);

	solve = createButton("solve!");
	solve.mousePressed(solveGrid);

	debug = createCheckbox("Enable debugging", true);
	debug.changed(drawGrid);

	current = 0;
	stuck = 0;

	populateGrid();
	console.log(grid);
	drawGrid();
}

function draw() {
}
