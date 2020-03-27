function Boundary(x1,x2,y1,y2){
	this.x1=x1;
	this.x2=x2;
	this.y1=y1;
	this.y2=y2;

	this.contains=function(pt){
		return (pt.x>=x1 && pt.x<x2 && pt.y>=y1 && pt.y<y2);
	}
	this.intersects=function(b){
		return !(x2<b.x1 || x1>b.x2 || y1>b.y2 || y2<b.y1);
	}

	this.show=function(f){
		stroke(255);
		strokeWeight(1);
		line(x1,y1,x1,y2);
		line(x2,y1,x2,y2);
		line(x1,y1,x2,y1);
		line(x1,y2,x2,y2);
		if(f){
			fill(0,255,0,50);
			rect(x1,y1,x2,y2);
		}
	}
}
const maxElts=5;
function tree(b){
	this.b=b;
	this.elts=[];
	this.children=null;
	this.add=function(pt){
		if(this.children){
			if(this.children[0].b.contains(pt))this.children[0].add(pt);
			else if(this.children[1].b.contains(pt))this.children[1].add(pt);
			else if(this.children[2].b.contains(pt))this.children[2].add(pt);
			else if(this.children[3].b.contains(pt))this.children[3].add(pt);
			else console.log("Placement error");
		}else{
			this.elts.push(pt);
			if(this.elts.length>maxElts)this.split();
		}
	}
	this.split=function(){
		this.children=[];
		let hx=(b.x2-b.x1)/2+b.x1;
		let hy=(b.y2-b.y1)/2+b.y1;
		this.children.push(new tree(new Boundary(b.x1,hx,b.y1,hy)));
		this.children.push(new tree(new Boundary(b.x1,hx,hy,b.y2)));
		this.children.push(new tree(new Boundary(hx,b.x2,b.y1,hy)));
		this.children.push(new tree(new Boundary(hx,b.x2,hy,b.y2)));
		while(this.elts.length>0){
			this.add(this.elts.pop());
		}
	}
	this.show=function(bm){
		if(this.children){
			for(let c of this.children)c.show(bm);
		}else{
			if(b.intersects(bm)){
				b.show(true);
				strokeWeight(6);
				for(p of this.elts){
					if(bm.contains(p)){
						stroke(0,255,0);
					}else{
						stroke(255,0,0);
					}
					point(p.x,p.y);
				}
			}else{
				b.show();
				stroke(255,0,0);
				strokeWeight(6);
				for(p of this.elts){
					point(p.x,p.y);
				}
			}
		}
	}
}

var myTree;
function setup(){
    cnv=createCanvas(640,480);
	let b=new Boundary(0,width,0,height);
	myTree=new tree(b);
    cnv.mousePressed(click);
    
    textAlign(CENTER,CENTER);
	rectMode(CORNERS);
    
	for(let i=0;i<15;i++){
		let v=createVector(random(0,width),random(0,height));
	//	myTree.add(v);
	}
    
}
function click(){
	let v=createVector(mouseX,mouseY);
	myTree.add(v);
}

function draw(){
    background(0);
	let bm=new Boundary(mouseX-50,mouseX+50,mouseY-50,mouseY+50);
    myTree.show(bm);
	bm.show(true);
}
