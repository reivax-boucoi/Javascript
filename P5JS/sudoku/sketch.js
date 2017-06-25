var puzzle = "6.......7....9..2.3.1..259.8....7.13....8....76.3....8.782..1.6.5..3....2.......9";
//var puzzle = "2..1.5..3.54...71..1.2.3.8.6.28.73.4.........1.53.98.6.2.7.1.6..81...24.7..4.2..1";
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
    grid[index].nums.push(val);
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
    while (!checkFinished() && stuck < 99) {
        simplify();
    }
    drawGrid();
    if (stuck < 99) {
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

function checkCol(i) {
    for (var j = 0; j < 9; j++) {
        if (grid[(i % 9) + j * 9].nums.length == 1 && (i % 9) + j * 9 != i) {
            for (var x = 0; x < grid[i].nums.length; x++) {
                if (grid[(i % 9) + j * 9].nums[0] == grid[i].nums[x]) {
                    grid[i].nums.splice(x, 1);
                }
            }
        }
    }
}

function checkSquare(i) {
    for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {
            var index = 3 * floor((i % 9) / 3) + 27 * floor(i / 27) + j + k * 9;
            if (grid[index].nums.length == 1 && index != i) {
                for (var x = 0; x < grid[i].nums.length; x++) {
                    if (grid[index].nums[0] == grid[i].nums[x]) {
                        grid[i].nums.splice(x, 1);
                    }
                }
            }
        }
    }
}

function useHypo(i) {
    var found = false;
    var nb;
    var j = 0;
    for (var x = 0; x < grid[i].nums.length; x++) {
        //        nb = grid[i].nums[x];
        //        while (j < 9 && !found) {
        //            //console.log("looking at " + floor(i / 9) * 9 + j + " and " + (i % 9) + j * 9);
        //            if (grid[floor(i / 9) * 9 + j].nums.indexOf(nb) != -1 && floor(i / 9) * 9 + j != i) {
        //                found = true;
        //                if (debug.checked()) {
        //                    console.log("found row" + nb + " at index " + (floor(i / 9) * 9 + j));
        //                }
        //            } else if (grid[(i % 9) + j * 9].nums.indexOf(nb) != -1 && (i % 9) + j * 9 != i) {
        //                found = true;
        //                if (debug.checked()) {
        //                    console.log("found col " + nb + " at index " + ((i % 9) + j * 9));
        //                }
        //            }
        //            j++;
        //        }
        //        for (j = 0; j < 3; j++) {
        //            for (var k = 0; k < 3; k++) {
        //                var index = 3 * floor((i % 9) / 3) + 27 * floor(i / 27) + j + k * 9;
        //                if (grid[index].nums.indexOf(nb) != -1 && index != i) {
        //                    found = true;
        //                }
        //            }
        //        }
//        if (!found) {
//            setBox(i, grid[i].nums[x]);
//            console.log("used advanced method =)")
//        } else {
//            found = false;
//        }
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
                useHypo(current);
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

function draw() {}
