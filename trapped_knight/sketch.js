
var nb_cell=9;//min=57
var w;
var dir;//0=down(0,1),1=left(-1,0),2=up(0,-1),3=right(1,0)

var stuck;
var mode;
var c=[];
var h;
var ph;
var cCell;

function Cell(i,j){
    this.i=i;
    this.j=j;
    this.nb=0;
    this.visited=false;
    this.show=function(){
        if(checkbox.checked()){
            colorMode(RGB,255);
            stroke(0);
            strokeWeight(1);
            if(this.visited){
                fill(0,255,0);
            }else{
                fill(255);
            }
            rect(this.i*w,this.j*w,w,w);
            fill(0);
            noStroke();
            text(this.nb,this.i*w,this.j*w);
        }
    }
    
}
function Horse(){
    this.i=floor(nb_cell/2);
    this.j=floor(nb_cell/2);
    this.nb=0;
    this.show=function(){
        if(checkbox.checked()){
            c[this.i][this.j].show();
            noFill();
            stroke(0);
            strokeWeight(1);
            ellipse(this.i*w,this.j*w,2*w/3,2*w/3);
        }
    }
    this.move=function(){//(1,2)(1,-2)(2,1)(2,-1)()
        var ct;
        var retval=0;
        for(var j=-2;j<3;j++){
            for(var k=-2;k<3;k++){
                if(abs(j)!=abs(k) && j!=0 && k!=0){
                    if((this.i+j)<nb_cell && (this.j+k) <nb_cell && (this.i+j)>=0 && (this.j+k)>=0){
                        var tc=c[this.i+j][this.j+k];
                        if(tc.visited==false){
                            if(ct){
                                if(tc.nb<ct.nb)ct=tc;
                            }else{
                                ct=tc;
                            }
                        }
                    }else{
                        retval=1;
                    }
                }
            }
        }
        if(ct){
            this.i=ct.i;
            this.j=ct.j;
            ct.visited=true;
            this.nb++;
            return 0;
        }else{
            console.log(c[this.i][this.j].nb);
            return 1+retval;
        }
    }
}
function gotoNext(){
    var nextnb=cCell.nb+1;
    if(dir==0){
        if(c[cCell.i-1][cCell.j].nb==0){
            dir=1;
            cCell=c[cCell.i-1][cCell.j];
        }else{
            cCell=c[cCell.i][cCell.j+1];
        }
    }else if(dir==1){
        if(c[cCell.i][cCell.j-1].nb==0){
            dir=2;
            cCell=c[cCell.i][cCell.j-1];
        }else{
            cCell=c[cCell.i-1][cCell.j];
        }
    }else if(dir==2){
        if(c[cCell.i+1][cCell.j].nb==0){
            dir=3;
            cCell=c[cCell.i+1][cCell.j];
        }else{
            cCell=c[cCell.i][cCell.j-1];
        }
    }else if(dir==3){
        if(c[cCell.i][cCell.j+1].nb==0){
            dir=0;
            cCell=c[cCell.i][cCell.j+1];
        }else{
            cCell=c[cCell.i+1][cCell.j];
        }
    }
    cCell.nb=nextnb;
}
function init(){
    nb_cell=slider.value();
    colorMode(RGB,255);
    background(255);
    w=floor(min(width,height)/nb_cell);
    h=new Horse();
    textSize(w/3);
    c=[];
    mode=0;
    dir=0;
    stuck=false;
    for(var i=0;i<nb_cell;i++){
        let a=[];
        for(var j=0;j<nb_cell;j++){
            let nc=new Cell(i,j)
            a.push(nc);
        }
        c.push(a);
    }
    cCell=c[floor(nb_cell/2)][floor(nb_cell/2)];
    cCell.nb=1;
    cCell.visited=true;
    cCell=c[floor(nb_cell/2)][floor(nb_cell/2)+1];
    cCell.nb=2;
    cCell.show();
    loop();
    
}
function setup() {
	createCanvas(801, 801);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    button1 = createButton('Reset');
    button1.mousePressed(init);
    button = createButton('Run');
    button.mousePressed(run);  
    slider = createSlider(11, 65, 15,2);
    checkbox = createCheckbox('Debug', true);
    init();
}
function draw() {
    translate(w/2,w/2);
    if(mode==0){
        if(cCell){
            gotoNext();
            cCell.show();
            if(cCell.nb>=nb_cell*nb_cell){
                cCell=null;
            }
        }else{
            mode=1;
            console.log("finished drawing cases");
        }
    }
    if((cCell && mode>0)||mode==1){
        while(cCell){
            gotoNext();
            cCell.show();
            if(cCell.nb>=nb_cell*nb_cell){
                cCell=null;
            }
        }
        console.log(c[nb_cell-1][nb_cell-1].nb);
        ph=new Horse();
        ph.i=h.i;
        ph.j=h.j;
        console.log("finished filling cases");
        mode=2;
    }
    if(!stuck && mode>1){
        if(mode>2)stuck=h.move();
        h.show();
        colorMode(HSB,2084);
        strokeWeight(2);
        stroke((3*h.nb)%2084,2084,2084);
        line(ph.i*w,ph.j*w,h.i*w,h.j*w);
        ph.i=h.i;
        ph.j=h.j;
    }
    if(stuck){
        if(stuck>1){
            console.log("finished path abnormaly, maybe canvas too small ?");
        }else{
            console.log("finished path normally");
        }
        noLoop();
    }
}
function run(){
    mode++;
    console.log(mode);
}
function mousePressed(){
    if(mode>1 && mouseX<width && mouseY<height)stuck=h.move();
}

