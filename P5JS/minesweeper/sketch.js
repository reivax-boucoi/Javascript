var w=20;
function Cell(i,j){
    this.i=i;
    this.j=j;
    this.nb=0;
    this.revealed=false;
    this.show=function(){
        if(!this.revealed){
            fill(200);
        }else if(this.nb==-1){
            fill(255,0,0);
            rect(this.i*w,this.j*w,w,w);
        }else{
            fill(128);
            rect(this.i*w,this.j*w,w,w);
            if(nb!=0){
                fill(0);
                text(this.nb,this.i*w,this.j*w);
            }
        }
    }
    
}
//Cell c;
function setup() {
	createCanvas(400, 400);
  //  c=new Cell(0,0);
}

function draw() {
	background(0);
    //c.show();
}
