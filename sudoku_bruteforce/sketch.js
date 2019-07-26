//var puzzle = "6.......7....9..2.3.1..259.8....7.13....8....76.3....8.782..1.6.5..3....2.......9";

var puzzle1 = "196583274537249816842716593368427159671395682925861437683952741259174368714638925";//solution
//var puzzle = ".9...3274.3724..1.84.71...33.8..71.94.139...29...614.7..39.274..5.17.36.714..8.2.";//solvable on elimination only
var puzzle = ".............................8..71.94.139...29...614.7..39.274..5.17.36.714..8.2.";//reduced version, gets stuck on elimination only

//var puzzle = "....23.....4...1...5..84.9...1.7.9.2.93..6.......1.76..........8.......4.6....587";

var grid = [];
var current;
var step;
var solve;
var debug;
var stuck;
var cnt;

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
                text(grid[i + j * 9].nums[0], i * spacing + spacing*.45, j * spacing + spacing*.6);
            } else {
                if (debug.checked()) {
                    for (var x = 0; x < grid[i + j * 9].nums.length; x++) {
                        fill(0);
                        text(grid[i + j * 9].nums[x], i * spacing + ((x % 3) * spacing / 4) + spacing*.15, j * spacing + (floor(x / 3) * spacing / 4)+ spacing*.35);
                    }
                }
            }
        }
    }
}
function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}

function solveGrid() {
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

function checkErrors(){
    var errcnt=0;
    for (var i = 0; i < 9; i++) {//col check
        cnt=[0,0,0,0,0,0,0,0,0];
        for (var j = 0; j < 9; j++) {
            for (var k = 1; k < 10; k++) {
                if(grid[j*9+i].nums.indexOf(k)!=-1){
                    cnt[k-1]++;
                }
            }
        }
        if(cnt.filter(n => n!=1).length){
           // console.log("error on col " +(i+1)+" : "+cnt);
            errcnt++;
        }
    }
    for (var i = 0; i < 9; i++) {//row check
        cnt=[0,0,0,0,0,0,0,0,0];
        for (var j = 0; j < 9; j++) {
            for (var k = 1; k < 10; k++) {
                if(grid[j+i*9].nums.indexOf(k)!=-1){
                    cnt[k-1]++;
                }
            }
        }
        if(cnt.filter(n => n!=1).length){
           // console.log("error on row " +(i+1)+" : "+cnt);
            errcnt++;
        }
    }
    for (var i = 0; i < 9; i++) {//square check
        cnt=[0,0,0,0,0,0,0,0,0];
        for (var j = 0; j < 9; j++) {
            for (var k = 1; k < 10; k++) {
                if(grid[j%3+9*floor(j/3)+floor(i/3)*3+(i%3)*27].nums.indexOf(k)!=-1){
                    cnt[k-1]++;
                }
            }
        }
        if(cnt.filter(n => n!=1).length) {
            //console.log("error on square " +(i%3+1)+","+(floor(i/3)+1)+" : "+cnt);
            errcnt++;
        }
    }
    console.log("Found "+errcnt+" errors !");
    return errcnt;
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
    createCanvas(windowHeight*.9, windowHeight*.9);
    background(200);
    textSize(18);
    step = createButton("step");
    step.mousePressed(stepF);
    
    simply = createButton("Simplify!");
    simply.mousePressed(simplify);
    
    solve = createButton("solve!");
    solve.mousePressed(solveGrid);
    
    
    debug = createCheckbox("Enable debugging", false);
    debug.changed(drawGrid);
    
    current = 0;
    stuck = 0;
    
    populateGrid();
    console.log(grid);
    drawGrid();
}

function draw() {
}
