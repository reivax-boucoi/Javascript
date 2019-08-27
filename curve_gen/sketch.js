function Node(x,y){
    this.pos=createVector(x,y);
    this.anchor=true;
    this.show=function(){
        if(! this.anchor){
            fill(255,0,0)
        }else{
            fill(0,255,0);
        }
        stroke(250);
        strokeWeight(2);
        circle(this.pos.x,this.pos.y,15);
    }
}
function Path(){
    this.n=[];
    this.selectedNode=null;

    this.insertBetween=function(x,y){
        var insertIndex=0;
        for(var i=0;i<this.n.length;i+=3){
            if(this.n[i].pos.x>x){
                insertIndex=i;
                break;
            }
        }
        var a=new Node(x,y);
        
        var v=p5.Vector.sub(this.n[insertIndex-1].pos,a.pos);
        v.mult(0.5);
        v.add(a.pos);
        var b2=new Node(v.x,v.y);
        b2.anchor=false;
        
        v=p5.Vector.sub(this.n[insertIndex-2].pos,a.pos);
        v.mult(0.5);
        v.add(a.pos);
        var b1=new Node(v.x,v.y);
        b1.anchor=false;        
        console.log(a.pos)      
        console.log(b1.pos)      
        console.log(b2.pos)
        console.log(this.n);
        this.n.splice(insertIndex-1,0,b1,a,b2);
    }
    
    this.init=function(){
        var n=new Node(0,height);
        var n2=new Node(200,height);
        var n3=new Node(width-200,0);
        var n1=new Node(width,0);
        n2.anchor=false;
        n3.anchor=false;
        this.n.push(n);
        this.n.push(n2);
        this.n.push(n3);
        this.n.push(n1);
    }
    
    this.show=function(){
        for(var i=0;i<this.n.length;i+=3){
            
            noFill();
            stroke(255);
            strokeWeight(3);
            if(i+3<this.n.length){
                bezier(this.n[i].pos.x,this.n[i].pos.y,this.n[i+1].pos.x,this.n[i+1].pos.y,this.n[i+2].pos.x,this.n[i+2].pos.y,this.n[i+3].pos.x,this.n[i+3].pos.y,);
            }
            
            stroke(250);
            strokeWeight(1);
            if(i>0){
                line(this.n[i].pos.x,this.n[i].pos.y,this.n[i-1].pos.x,this.n[i-1].pos.y);
                this.n[i-1].show();
                
            }
            if(i+1<this.n.length){
                line(this.n[i].pos.x,this.n[i].pos.y,this.n[i+1].pos.x,this.n[i+1].pos.y);
                this.n[i+1].show();
            }
            
            this.n[i].show();
        }
    }
    
    this.moveNode=function(n,x,y){
        var delta=createVector(x,y);
        delta.sub(this.n[n].pos)
        
        this.n[n].pos.add(delta);
        
        if(this.n[n].anchor){
            if(n>0){
                this.n[n-1].pos.add(delta);
            }
            if(n+1<this.n.length){
                this.n[n+1].pos.add(delta);
            }
        }
    }
    this.removeAnchor=function(n){
        if(n>0 && n<this.n.length-1){
            this.n.splice(n-1,3);
        }
    }
}
function setup(){
    var cnv=createCanvas(800,600);
    cnv.mousePressed(MousePressed);
    cnv.mouseReleased(MouseReleased);
    cnv.mouseMoved(MouseMoved);
    p=new Path();
    p.init();
    p.show();
}

function draw(){
    background(0);
    //translate(width/10,height/10);
    //scale(8/10,8/10);
    p.show();
}

function MouseMoved(){
    var over=false;
    for(var i=0;i<p.n.length;i++){
        if(dist(p.n[i].pos.x,p.n[i].pos.y,mouseX,mouseY)<15){
            over=true;
            break;
        }
    }
    if(over){
        cursor(HAND);
    }else{
        cursor(ARROW);
    }
}

function mouseDragged(){
    if(p.selectedNode!=null){
        p.moveNode(p.selectedNode,mouseX,mouseY);
    }
}

function MouseReleased(){
    p.selectedNode=null;
}

function MousePressed(){
    var over=null;
    for(var i=0;i<p.n.length;i++){
        if(dist(p.n[i].pos.x,p.n[i].pos.y,mouseX,mouseY)<15){
            over=i;
            break;
        }
    }
    if (mouseButton === LEFT) {
        if(p.selectedNode==null && over!= null){
            p.selectedNode=over;
        }else{
            p.insertBetween(mouseX,mouseY);
        }
    }
    if (mouseButton === CENTER) {
        if(over!=null){
            if (p.n[over].anchor)
                p.removeAnchor(over);
        }
    }
}
