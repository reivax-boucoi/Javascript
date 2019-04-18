var puzzle = "6.......7....9..2.3.1..259.8....7.13....8....76.3....8.782..1.6.5..3....2.......9";
var grid=[];
var debug=true;
var current=0;

var BoxType = function(){
    this.nums=[1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.square=-1;
    this.line=-1;
    this.col=-1;
}


function setBox(index, val) {
    grid[index].nums = [];
    grid[index].nums.push(int(val));
}

function setupGrid(){
    for(var j=0;j<9;j++){
        for(var i=0;i<9;i++){
            var index=i+j*9;
            b=new BoxType();
            b.line=i;
            b.col=j;
            b.square=floor(i/3)+3*floor(j/3);
            grid[index]=b;
            if(puzzle[index]>0)setBox(index,puzzle[index])
        }
    }
}

function drawGrid() {
    background(255);
    var spacing = width / 9;
    if (debug) {
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
                if (debug) {
                    fill(0, 255, 0);
                    strokeWeight(1);
                    rect(i * spacing + 5, j * spacing + 5, spacing - 10, spacing - 10);
                }
                fill(0);
                text(grid[i + j * 9].nums[0], i * spacing + spacing*.45, j * spacing + spacing*.6);
            } else {
                if (debug) {
                    for (var x = 0; x < grid[i + j * 9].nums.length; x++) {
                        fill(0);
                        text(grid[i + j * 9].nums[x], i * spacing + ((x % 3) * spacing / 4) + spacing*.15, j * spacing + (floor(x / 3) * spacing / 4)+ spacing*.35);
                    }
                }
            }
        }
    }
}
function getLine(g,nb){
    var s=[];
    for(var i=0;i<81;i++){
        if(g[i].line==nb)s.push(g[i]);
    }
    return s;
}
function getCol(g,nb){
    var s=[];
    for(var i=0;i<81;i++){
        if(g[i].col==nb)s.push(g[i]);
    }
    return s;
}
function getSquare(g,nb){
    var s=[];
    for(var i=0;i<81;i++){
        if(g[i].square==nb)s.push(g[i]);
    }
    return s;
}
function getKnown(a){
    var num=[];
    for(var i=0;i<a.length;i++){
        if(a[i].nums.length==1)num.push(a[i].nums[0]);
    }
    return num;
}
function uniq(a) {
    return a.sort().filter(function(item, pos, array) {
        return !pos || item != array[pos - 1];
    })
}
function isFinished(g){
    for(var i=0;i<9;i++){
        if(uniq(getKnown(getCol(g,i))).length!=9){
            return 0;
        }
        if(uniq(getKnown(getLine(g,i))).length!=9){
            return 0;
        }
        if(uniq(getKnown(getSquare(g,i))).length!=9){
            return 0;
        }
    }
    return 1;
}
function isCorrect(g){
    for(var i=0;i<9;i++){
        if(uniq(getKnown(getCol(g,i))).length!=getKnown(getCol(g,i)).length){
            return 0;
        }
        if(uniq(getKnown(getLine(g,i))).length!=getKnown(getLine(g,i)).length){
            return 0;
        }
        if(uniq(getKnown(getSquare(g,i))).length!=getKnown(getSquare(g,i)).length){
            return 0;
        }
    }
    
    for(var i=0;i<81;i++)if(g[i].nums.length==0)return 0;
    
    return 1;
}
function simplifyBox(g,index){
    var reduccnt=0;
    if(g[index].nums.length>1){
        l=getKnown(getLine(g,g[index].line));
        c=getKnown(getCol(g,g[index].col));
        s=getKnown(getSquare(g,g[index].square));
        l=l.concat(c);
        l=uniq(l.concat(s));
        for(var n=0;n<l.length;n++){
            i=g[index].nums.indexOf(l[n]);
            if(i>=0){
                g[index].nums.splice(i,1);
                reduccnt++;
            }
        }
    }
    return reduccnt;
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

function makeHypothesis(ch,i){
    if(isFinished(grid) || ch>=80)return;
    while(grid[ch].nums.length==1){
        ch++;
        i=0;
    }
    
    var bak=deepCopy(grid);
    if(i>=(grid[ch].nums.length))return;
    setBox(ch,grid[ch].nums[i]);
    
    //console.log("guess is "+grid[ch].nums+" on cell "+ch);
    
    while(loopStep()>0);
    if(isCorrect(grid)){
        if(isFinished(grid)){
            console.log("Made right guess !");
            return 1;
        }else{
            console.log("guess seems correct but wasn't enough");
            makeHypothesis(ch+1,0);
        }
    }else{
        console.log("invalid guess, reverting back !");
        grid=bak;
        if(i+1>=(grid[ch].nums.length)){
            console.log("changing hypo cell");
            makeHypothesis(ch+1,0);
        }else{
            console.log("changing index in same hypo cell");
            makeHypothesis(ch,i+1);
        }
    }
}
function setup(){
    setupGrid();
    createCanvas(windowHeight*.9, windowHeight*.9);
    background(200);
    textSize(width/9/4);
    step = createButton("step");
    step.mousePressed(stepF);
    step = createButton("loop");
    step.mousePressed(loopStep);
    
    drawGrid();
}
function stepF(){
    var reduccnt = simplifyBox(grid,current);
    current++;
    if(current>=81){
        current=0;
        console.log("Loopped through !");
    }
    return reduccnt;
}
function loopStep(){
    var reduccnt=stepF();
    while(current!=0)reduccnt+=stepF();
    return reduccnt;
}
function draw(){
    drawGrid();
}
