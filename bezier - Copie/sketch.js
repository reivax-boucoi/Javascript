let Autocheckbox,Hidecheckbox,slider,Ptscheckbox,p;
function Node(x,y){
    this.pos=createVector(x,y);
    this.anchor=true;
    this.show=function(i){
        if(! this.anchor){
            fill(255,0,0)
        }else{
            fill(0,255,0);
        }
        stroke(0);
        strokeWeight(2);
		if(!Hidecheckbox.checked()){
			circle(this.pos.x,this.pos.y,20);
			//fill(255);
			//text(i,this.pos.x,this.pos.y);
		}
    }
}

function EvaluateQuadratic(a,b,c,t){
	let d=p5.Vector.lerp(a,b,t);
	let e=p5.Vector.lerp(b,c,t);
	return p5.Vector.lerp(d,e,t);
}

function EvaluateCubic(a,b,c,d,t){
	let e=EvaluateQuadratic(a,b,c,t);
	let f=EvaluateQuadratic(b,c,d,t);
	return p5.Vector.lerp(e,f,t);
}

function Path(){
    this.n=[];
	this.pts=[];
    this.selectedNode=null;
	this.showPts=function(){
		fill(255);
		strokeWeight(1);
		for(let p of pts){
			circle(p.x,p.y,5);
		}
	}
	this.calculatePts=function(){
		let dst=0;
		pts=[];
		pts.push(p.n[0].pos);
		let ppt=pts[0];
		let spacing=map(slider.value(),0,1,100,5);;
		for(let i=0;i<(p.n.length-1);i+=3){
			let t=0;
			while(t<=1){
				t+=0.01;
				let pt=EvaluateCubic(p.n[i].pos,p.n[i+1].pos,p.n[i+2].pos,p.n[i+3].pos,t);
				dst+=p5.Vector.dist(pt,ppt);
				while(dst>=spacing){
					let overshoot=dst-spacing;
					let newpt=p5.Vector.add(pt,p5.Vector.sub(ppt,pt).normalize().mult(overshoot));
					pts.push(newpt);
					dst=overshoot;
					ppt=newpt;
				}
				ppt=pt;
			}
		}
	}
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
		if(Autocheckbox.checked())AutoSet();
		this.calculatePts();
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
		this.calculatePts();
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
            if(i>0 && !Hidecheckbox.checked()){
                line(this.n[i].pos.x,this.n[i].pos.y,this.n[i-1].pos.x,this.n[i-1].pos.y);
                this.n[i-1].show(i-1);
                
            }
            if(i+1<this.n.length && !Hidecheckbox.checked()){
                line(this.n[i].pos.x,this.n[i].pos.y,this.n[i+1].pos.x,this.n[i+1].pos.y);
                this.n[i+1].show(i+1);
            }
            
            this.n[i].show(i);
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
        }else if(! Autocheckbox.checked()){
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
		if(Autocheckbox.checked())AutoSet();
		this.calculatePts();
    }
    this.removeAnchor=function(n){
        if(n>0 && n<this.n.length-1){
            this.n.splice(n-1,3);
        }
		this.calculatePts();
    }
}
function setup(){
    var cnv=createCanvas(800,600);
    cnv.mousePressed(MousePressed);
    cnv.mouseReleased(MouseReleased);
    cnv.mouseMoved(MouseMoved);
	Autocheckbox = createCheckbox('AutoSet', false);
	Autocheckbox.changed(AutocheckboxChanged);
	Autocheckbox.position(10,600);
	Hidecheckbox=createCheckbox('Hide Handles',false);
	Hidecheckbox.position(Autocheckbox.x+75,Autocheckbox.y);
	slider=createSlider(0,1,0.5,0.01);
	slider.position(Hidecheckbox.x+150,Hidecheckbox.y);
	slider.mouseMoved(sliderChanged);
	Ptscheckbox=createCheckbox('Show Pts',false);
	Ptscheckbox.position(slider.x+180,slider.y);
    p=new Path();
	textSize(15);
	textAlign(CENTER,CENTER);
    p.init();
    p.show();
}

function draw(){
    background(200);
    p.show();
	if(Ptscheckbox.checked())p.showPts();
	//}
}
function sliderChanged(){
	p.calculatePts();
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
function AutocheckboxChanged(){
	AutoSet();
	p.calculatePts();
}

function AutoSet(){
    for(var i=1;i<p.n.length-1;i++){
		if(p.n[i].anchor){
			let current=p.n[i].pos;
			let prev=p.n[i-3].pos;
			let next=p.n[i+3].pos;
			let dir1=p5.Vector.sub(prev,current);
			let Mag1=dir1.mag()/2;
			let dir2=p5.Vector.sub(current,next);
			let Mag2=dir2.mag()/2;
			dir1.normalize();
			dir2.normalize();
			dir1.add(dir2).normalize();
			dir2=p5.Vector.mult(dir1,-Mag2);
			dir1.setMag(Mag1);
			dir2.add(current);
			dir1.add(current);
			p.n[i-1].pos=dir1;
			p.n[i+1].pos=dir2;
		}
	}
	p.n[1].pos=p5.Vector.sub(p.n[2].pos,p.n[0].pos).mult(0.5).add(p.n[0].pos);
	p.n[p.n.length-2].pos=p5.Vector.sub(p.n[p.n.length-3].pos,p.n[p.n.length-1].pos).mult(0.5).add(p.n[p.n.length-1].pos);
}
