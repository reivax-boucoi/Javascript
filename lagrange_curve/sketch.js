function Interpolator(){
    
    this.pts=[];
    this.evaluate=function(t){
        var res=0;
        for(var i=0;i<this.pts.length;i++){
            var inter=1;
            for(var j=0;j<this.pts.length;j++){
                if(i!=j)inter*=(t-this.pts[j].x)/(this.pts[i].x-this.pts[j].x);
            }   
            res+=(inter*this.pts[i].y);
        }
        //console.log("p("+t+")="+res);
        return res;
    }
}

var i;
function setup(){
    var cnv=createCanvas(800,600);
    cnv.mousePressed(MousePressed);
    i=new Interpolator();
    i.pts.push(createVector(0,0));
    i.pts.push(createVector(1,1));
}


function drawGrid(){
    var xspacing=width/10;
    var yspacing=height/10;
    strokeWeight(0.5);
    stroke(200)
    for(var i=0;i<10;i++){
        line(0,yspacing*i,width,yspacing*i);
        line(xspacing*i,0,xspacing*i,height);
    }
}


function draw(){
    background(0);
    drawGrid();
    stroke(255);
    for(var t=0;t<width;t++){
       point(t,map(i.evaluate(t/width),0,1,height,0));
    }
}

function MousePressed(){
    i.pts.push(createVector(mouseX/width,(height-mouseY)/height));
}
