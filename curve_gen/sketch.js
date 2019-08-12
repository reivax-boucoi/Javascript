function Node(x,y){
    this.pos=createVector(x,y);
    this.anchor=true;
    this.show=function(){
        if(! this.anchor){
            fill(255,0,0)
        }else{
            fill(0,255,0);
        }
        stroke(0);
        strokeWeight(2);
        circle(this.pos.x,this.pos.y,15);
    }
}
function Path(){
    this.n=[];
    this.selectedNode=null;
    this.addAnchor=function(x,y){
        var a=new Node(x,y);
        
        var v=p5.Vector.sub(this.n[this.n.length-1].pos,this.n[this.n.length-2].pos);
        v.add(this.n[this.n.length-1].pos);
        var b1=new Node(v.x,v.y);
        b1.anchor=false;
        
        v=p5.Vector.sub(b1.pos,a.pos);
        v.mult(0.5);
        v.add(a.pos);
        var b2=new Node(v.x,v.y);
        b2.anchor=false;        
        
        this.n.push(b1);
        this.n.push(b2);
        this.n.push(a);
    }
    
    this.init=function(){
        var n=new Node(100,100);
        var n1=new Node(200,200);
        var n2=new Node(100,200);
        var n3=new Node(200,100);
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
            stroke(0);
            strokeWeight(3);
            if(i+3<this.n.length){
                bezier(this.n[i].pos.x,this.n[i].pos.y,this.n[i+1].pos.x,this.n[i+1].pos.y,this.n[i+2].pos.x,this.n[i+2].pos.y,this.n[i+3].pos.x,this.n[i+3].pos.y,);
            }
            
            stroke(75);
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
        }else{
            if( (n>1) && (n+2<this.n.length)){
                var indexOffset=1;
                if(n%3==1){
                    indexOffset=-1;
                }
                var v=p5.Vector.sub(this.n[n].pos,this.n[n+indexOffset].pos);
                v.mult(-1);
                v.add(this.n[n+indexOffset].pos);
                this.n[n+2*indexOffset].pos=v;
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
    background(200);
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
            p.addAnchor(mouseX,mouseY);
        }
    }
    if (mouseButton === CENTER) {
        if(over!=null){
            if (p.n[over].anchor)
                p.removeAnchor(over);
        }
    }
}
