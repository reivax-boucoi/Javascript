var w=40;
var row;
function Cell(i,j){
    this.i=i;
    this.j=j;
    this.nb=0;
    this.revealed=false;
    this.show=function(){
        if(!this.revealed){
            fill(100);
            rect(this.i*w,this.j*w,w,w);
        }else if(this.nb==-1){
            fill(255,0,0);
            rect(this.i*w,this.j*w,w,w);
        }else{
            fill(255);
            rect(this.i*w,this.j*w,w,w);
            if(this.nb!=0){
                fill(0);
                text(this.nb,this.i*w+w/2,this.j*w+w/2);
            }
        }
    }
    this.calculate=function(){
        if(this.nb!=-1){
            
            for(var i=-1;i<2;i++){
                for(var j=-1;j<2;j++){
                    if((this.i+i)<row && (this.j+j) <row && (this.i+i)>=0 && (this.j+j)>=0){
                        index=(this.i+i)*row+j+this.j;
                        //console.log(index);
                        var cc=cells[index];
                        if(cc.nb==-1)this.nb++;
                    }
                }
            }
        }
    }
    this.revealAdjacent=function(){
        cellsLeft--;
        this.revealed=true;
        if(this.nb==0){
            for(var i=-1;i<2;i++){
                for(var j=-1;j<2;j++){
                    if((this.i+i)<row && (this.j+j) <row && (this.i+i)>=0 && (this.j+j)>=0){
                        index=(this.i+i)*row+j+this.j;
                        var cc=cells[index];
                        if(!cc.revealed)cc.revealAdjacent();
                    }
                }
            }
        }
    }
}
var cells=[];
function setup() {
    createCanvas(401, 401);
    textAlign(CENTER,CENTER);
    textSize(w/2);
    row=floor(width/w);
    cellsLeft=row*row;
    for(var i=0;i<row;i++){
        for(var j=0;j<row;j++){
            cells.push(new Cell(i,j));
            if(random()<.1){
                cells[cells.length-1].nb=-1;
                cellsLeft--;
            }
        }
    }
    
    for(c of cells)c.calculate();
}

function draw() {
    background(200);
    for(c of cells)c.show();
}

function mousePressed(){
    if(cellsLeft>0){
        if(mouseX>=0 && mouseY>=0 && mouseX<width && mouseY<width){
            c=cells[floor(mouseX/w)*row+floor(mouseY/w)];
            if(!c.revealed){
                c.revealed=true;
                if(c.nb==-1){
                    console.log("Hit a mine !");
                    for(c of cells){
                        c.revealed=true;
                        c.show();
                    }
                    noLoop();
                }else if(c.nb==0){
                    c.revealAdjacent();
                }else{
                    cellsLeft--;
                }
            }
        }
        if(cellsLeft==0){
            console.log("You won !");
            noLoop();
        }
    }
}
