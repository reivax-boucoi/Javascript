class Inout{
	constructor(inout,a,b,c,d){
		this.contents=[];
		if(inout=="input"){
			this.mode=0;
		}else{
			this.mode=1;
		}
		this.pos=createVector(a,b);;
		this.size=createVector(c-a,d-b);
		this.length=floor(this.size.y/itemSize)+1;
	}
	show(){
		stroke(0);
		strokeWeight(2);
		fill(71,11,11);
		rect(this.pos.x,this.pos.y,this.pos.x+this.size.x,this.pos.y+this.size.y);
		for(let i=0;i<min(this.length,this.contents.length);i++){
			if(this.mode==0){
				drawItem(createVector(this.pos.x,this.pos.y+i*itemSize),this.contents[i]);
			}else{
				drawItem(createVector(this.pos.x,this.pos.y+(this.contents.length-i-1)*itemSize),this.contents[i]);
			}
		}
	}
	pushContent(c){
		if(c!=undefined)this.contents.push(c);
	}
	retrieveContent(){
		return this.contents.splice(0,1)[0];
	}
	
}
class Carrier{
	constructor(x,y){
		this.pos=createVector(x,y);
		this.item=undefined;
	}
	show(){
		stroke(0);
		strokeWeight(2);
		fill(219,0,0);
		rect(this.pos.x,this.pos.y,this.pos.x+itemSize,this.pos.y+itemSize);
		if(this.item!=undefined)drawItem(this.pos,this.item);
	}
	grab(item){
		this.item=item;
	}
	drop(){
		if(this.item!=undefined){
			let val=this.item;
			this.item=undefined;
			return val;
		}//else hand empty
	}
}
class Pavage{
	constructor(x,y,r,c){
		this.pos=createVector(x,y);
		this.length=r*c;
		this.rows=r;
		this.cols=c;
		this.contents=[];
		this.w=itemSize*1.3;
	}
	show(){
		for(let x=0;x<this.rows;x++){
			for(let y=0;y<this.cols;y++){
				let index=x+y*this.rows;
				stroke(0);
				strokeWeight(2);
				fill(111,0,34);
				rect(this.pos.x+x*this.w,this.pos.y+y*this.w,this.pos.x+(x+1)*this.w,this.pos.y+(y+1)*this.w);
				fill(0);
				strokeWeight(1);
				textSize(14);
				text(index,this.pos.x+(x+0.85)*this.w,this.pos.y+(y+0.85)*this.w);
				if(this.contents[index]!=undefined)drawItem(createVector(this.pos.x+x*this.w,this.pos.y+y*this.w),this.contents[index]);
			}
		}
		
	}
	write(item,index){
		this.contents[index]=item;
	}
	read(index){
		return this.contents[index];
	}
}
function drawItem(pos,c){
		stroke(0);
		strokeWeight(1);
		fill(255,146,36);
		rect(pos.x+margin,pos.y+margin,pos.x+itemSize-margin-1,pos.y+itemSize-margin-1);
		fill(0);
		textSize(20);
		text(c,pos.x+itemSize/2,pos.y+itemSize/2);
	
}